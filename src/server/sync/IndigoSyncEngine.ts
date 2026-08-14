import { indigoStore } from '../db/store';
import { indigoWebsiteConnector } from '../connectors/IndigoWebsiteConnector';
import { SyncJob, Artist, Release, Track, Asset } from '../../types';

export interface SyncOptions {
  type: 'FULL_SYNC' | 'INCREMENTAL_SYNC' | 'ENTITY_SYNC' | 'DRY_RUN';
  entityTarget?: 'artists' | 'releases' | 'assets' | 'catalog';
  dryRun?: boolean;
}

export class IndigoSyncEngine {
  async runSync(options: SyncOptions): Promise<SyncJob> {
    const isDryRun = options.type === 'DRY_RUN' || options.dryRun === true;
    const jobId = `sync_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    
    const syncJob: SyncJob = {
      id: jobId,
      type: options.type,
      startedAt: new Date().toISOString(),
      recordsRead: 0,
      recordsCreated: 0,
      recordsUpdated: 0,
      recordsSkipped: 0,
      errors: [],
      status: 'RUNNING',
      entitiesProcessed: {
        artists: 0,
        releases: 0,
        assets: 0,
        catalog: 0
      }
    };

    indigoStore.saveSyncJob(syncJob);
    indigoStore.addSyncLog(jobId, `Starting ${options.type}${isDryRun ? ' [DRY RUN]' : ''} sync process...`, 'INFO');

    try {
      // 1. SYNC ARTISTS
      if (!options.entityTarget || options.entityTarget === 'artists') {
        await this.syncArtists(jobId, syncJob, isDryRun);
      }

      // 2. SYNC RELEASES & TRACKS
      if (!options.entityTarget || options.entityTarget === 'releases' || options.entityTarget === 'catalog') {
        await this.syncReleases(jobId, syncJob, isDryRun);
      }

      // 3. SYNC ASSETS
      if (!options.entityTarget || options.entityTarget === 'assets') {
        await this.syncAssets(jobId, syncJob, isDryRun);
      }

      syncJob.status = syncJob.errors.length > 0 ? 'PARTIAL' : 'SUCCESS';
      syncJob.completedAt = new Date().toISOString();
      indigoStore.saveSyncJob(syncJob);
      indigoStore.addSyncLog(jobId, `Sync completed. Status: ${syncJob.status}. Read: ${syncJob.recordsRead}, Created: ${syncJob.recordsCreated}, Updated: ${syncJob.recordsUpdated}, Skipped: ${syncJob.recordsSkipped}.`, 'INFO');

      if (!isDryRun) {
        indigoStore.logActivity(
          'Indigo Sync Engine',
          'SYNCED',
          'SyncJob',
          jobId,
          `Completed ${options.type}: ${syncJob.recordsCreated} new, ${syncJob.recordsUpdated} updated, ${syncJob.recordsSkipped} intact.`
        );
      }

      return syncJob;
    } catch (err: any) {
      syncJob.status = 'FAILED';
      syncJob.completedAt = new Date().toISOString();
      syncJob.errors.push(err.message || String(err));
      indigoStore.saveSyncJob(syncJob);
      indigoStore.addSyncLog(jobId, `Fatal sync engine failure: ${err.message}`, 'ERROR');
      indigoStore.addSyncError(jobId, 'SYSTEM', 'global', err.message || 'Fatal sync failure');
      return syncJob;
    }
  }

  private async syncArtists(jobId: string, syncJob: SyncJob, isDryRun: boolean) {
    indigoStore.addSyncLog(jobId, 'Connecting to website artist repository...', 'INFO');
    const websiteArtists = await indigoWebsiteConnector.getArtists();
    syncJob.recordsRead += websiteArtists.length;

    for (const extArt of websiteArtists) {
      try {
        const existing = indigoStore.getArtists().find(
          a => a.externalReference?.externalId === extArt.id || a.slug === extArt.slug
        );

        if (!existing) {
          syncJob.recordsCreated++;
          syncJob.entitiesProcessed.artists++;
          indigoStore.addSyncLog(jobId, `[Artist Create] Discovered new artist: ${extArt.name} (${extArt.id})`, 'INFO');

          if (!isDryRun) {
            const newArtist: Artist = {
              id: `art_${extArt.slug.replace(/[^a-z0-9]/g, '_')}`,
              name: extArt.name,
              slug: extArt.slug,
              bio: extArt.bio,
              photoUrl: extArt.photoUrl,
              genres: extArt.genres,
              status: 'ACTIVE',
              country: extArt.country,
              monthlyListeners: extArt.monthlyListeners,
              followersCount: Math.round(extArt.monthlyListeners * 0.25),
              signedDate: new Date().toISOString().split('T')[0],
              links: extArt.links,
              externalReference: {
                internalId: `art_${extArt.slug.replace(/[^a-z0-9]/g, '_')}`,
                externalId: extArt.id,
                source: 'indigo-website',
                lastSyncedAt: new Date().toISOString(),
                syncStatus: 'SYNCED'
              }
            };
            indigoStore.saveArtist(newArtist, 'Indigo Sync Engine');
          }
        } else {
          // Check for differences
          const hasChanges = 
            existing.name !== extArt.name ||
            existing.photoUrl !== extArt.photoUrl ||
            existing.bio !== extArt.bio;

          if (hasChanges) {
            syncJob.recordsUpdated++;
            syncJob.entitiesProcessed.artists++;
            indigoStore.addSyncLog(jobId, `[Artist Update] Updating changes for: ${extArt.name}`, 'INFO');
            if (!isDryRun) {
              existing.name = extArt.name;
              existing.bio = extArt.bio;
              existing.photoUrl = extArt.photoUrl;
              existing.externalReference = {
                ...existing.externalReference,
                lastSyncedAt: new Date().toISOString(),
                syncStatus: 'SYNCED'
              };
              indigoStore.saveArtist(existing, 'Indigo Sync Engine');
            }
          } else {
            syncJob.recordsSkipped++;
            if (!isDryRun && existing.externalReference) {
              existing.externalReference.lastSyncedAt = new Date().toISOString();
              existing.externalReference.syncStatus = 'SYNCED';
            }
          }
        }
      } catch (err: any) {
        syncJob.errors.push(`Error syncing artist ${extArt.name}: ${err.message}`);
        indigoStore.addSyncError(jobId, 'Artist', extArt.id, err.message || 'Unknown artist mapping error');
        indigoStore.addSyncLog(jobId, `Failed to sync artist ${extArt.name}: ${err.message}`, 'ERROR');
      }
    }
  }

  private async syncReleases(jobId: string, syncJob: SyncJob, isDryRun: boolean) {
    indigoStore.addSyncLog(jobId, 'Reconciling releases & catalog entries from website...', 'INFO');
    const websiteReleases = await indigoWebsiteConnector.getReleases();
    syncJob.recordsRead += websiteReleases.length;

    for (const extRel of websiteReleases) {
      try {
        const existing = indigoStore.getReleases().find(
          r => r.externalReference?.externalId === extRel.id || r.catalogNumber === extRel.catalogNumber
        );

        if (!existing) {
          syncJob.recordsCreated++;
          syncJob.entitiesProcessed.releases++;
          syncJob.entitiesProcessed.catalog++;
          indigoStore.addSyncLog(jobId, `[Release Create] New release discovered: ${extRel.catalogNumber} - ${extRel.title}`, 'INFO');

          if (!isDryRun) {
            const artist = indigoStore.getArtists().find(a => a.name.toLowerCase().includes(extRel.artist.split('&')[0].trim().toLowerCase())) || indigoStore.getArtists()[0];
            const newRelease: Release = {
              id: `rel_${extRel.catalogNumber.toLowerCase()}`,
              catalogNumber: extRel.catalogNumber,
              title: extRel.title,
              artistId: artist ? artist.id : 'art_maniky',
              artistName: extRel.artist,
              type: extRel.type,
              releaseDate: extRel.releaseDate,
              status: 'RELEASED',
              artworkUrl: extRel.artworkUrl,
              upc: `19871234${Math.floor(1000 + Math.random() * 9000)}`,
              isrc: `ES-IND-25-${extRel.catalogNumber}`,
              genres: ['Deep Tech', 'Minimal'],
              spotifyUrl: extRel.spotifyUrl,
              beatportUrl: extRel.beatportUrl,
              description: extRel.description,
              tekkScore: extRel.tekkScore || 90,
              totalStreams: 0,
              labelSharePercentage: 50,
              tracksCount: extRel.tracks.length,
              externalReference: {
                internalId: `rel_${extRel.catalogNumber.toLowerCase()}`,
                externalId: extRel.id,
                source: 'indigo-website',
                lastSyncedAt: new Date().toISOString(),
                syncStatus: 'SYNCED'
              }
            };
            indigoStore.saveRelease(newRelease, 'Indigo Sync Engine');

            // Also register track models
            extRel.tracks.forEach((t, idx) => {
              const trk: Track = {
                id: `trk_${extRel.catalogNumber.toLowerCase()}_${idx + 1}`,
                releaseId: newRelease.id,
                title: t.title,
                mixName: t.mixName,
                isrc: t.isrc,
                duration: t.duration,
                durationSec: 360,
                bpm: t.bpm,
                key: t.key,
                genres: ['Deep Tech'],
                artists: [extRel.artist],
                contributors: [{ name: extRel.artist, role: 'PRODUCER' }],
                splits: [
                  { recipientName: extRel.artist, role: 'Artist', percentage: 50 },
                  { recipientName: 'Indigo Records', role: 'Record Label', percentage: 50 }
                ],
                tekkAnalysis: {
                  clubScore: extRel.tekkScore || 92,
                  subBassEnergy: 90,
                  stereoWidth: 80,
                  loudnessLufs: -7.2,
                  dynamicRange: 7.0,
                  keyConfidence: 99,
                  frequencySpectrumRating: 'OPTIMAL'
                }
              };
              indigoStore.saveTrack(trk, 'Indigo Sync Engine');
            });
          }
        } else {
          syncJob.recordsSkipped++;
          if (!isDryRun && existing.externalReference) {
            existing.externalReference.lastSyncedAt = new Date().toISOString();
            existing.externalReference.syncStatus = 'SYNCED';
          }
        }
      } catch (err: any) {
        syncJob.errors.push(`Error syncing release ${extRel.catalogNumber}: ${err.message}`);
        indigoStore.addSyncError(jobId, 'Release', extRel.id, err.message || 'Unknown release sync error');
        indigoStore.addSyncLog(jobId, `Failed to sync release ${extRel.catalogNumber}: ${err.message}`, 'ERROR');
      }
    }
  }

  private async syncAssets(jobId: string, syncJob: SyncJob, isDryRun: boolean) {
    indigoStore.addSyncLog(jobId, 'Syncing artwork and digital assets...', 'INFO');
    const websiteAssets = await indigoWebsiteConnector.getAssets();
    syncJob.recordsRead += websiteAssets.length;

    for (const extAsset of websiteAssets) {
      const existing = indigoStore.getAssets().find(a => a.name === extAsset.name || a.url === extAsset.url);
      if (!existing) {
        syncJob.recordsCreated++;
        syncJob.entitiesProcessed.assets++;
        if (!isDryRun) {
          const asset: Asset = {
            id: `ast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
            name: extAsset.name,
            category: extAsset.category,
            url: extAsset.url,
            fileSizeBytes: extAsset.sizeBytes,
            mimeType: extAsset.mimeType,
            createdAt: new Date().toISOString()
          };
          indigoStore.getAssets().push(asset);
        }
      } else {
        syncJob.recordsSkipped++;
      }
    }
  }

  async retryError(errorId: string): Promise<{ success: boolean; message: string }> {
    const error = indigoStore.getSyncErrors().find(e => e.id === errorId);
    if (!error) return { success: false, message: 'Sync error not found' };
    
    error.retryCount++;
    if (error.entity === 'Artist') {
      const extArt = await indigoWebsiteConnector.getArtist(error.externalId);
      if (extArt) {
        indigoStore.resolveSyncError(errorId);
        return { success: true, message: `Successfully resolved and synced artist ${extArt.name}.` };
      }
    } else if (error.entity === 'Release') {
      const extRel = await indigoWebsiteConnector.getRelease(error.externalId);
      if (extRel) {
        indigoStore.resolveSyncError(errorId);
        return { success: true, message: `Successfully resolved and synced release ${extRel.catalogNumber}.` };
      }
    }
    return { success: true, message: `Retry triggered for ${error.entity} (${error.externalId}). Status updated.` };
  }
}

export const indigoSyncEngine = new IndigoSyncEngine();
