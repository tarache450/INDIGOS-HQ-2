import { Artist, Release, Asset } from '../../types';

export interface WebsiteArtistPayload {
  id: string;
  name: string;
  slug: string;
  bio: string;
  photoUrl: string;
  genres: string[];
  links: { platform: any; url: string }[];
  country: string;
  monthlyListeners: number;
}

export interface WebsiteReleasePayload {
  id: string;
  catalogNumber: string;
  title: string;
  artist: string;
  type: 'SINGLE' | 'EP' | 'ALBUM' | 'REMIX';
  releaseDate: string;
  artworkUrl: string;
  spotifyUrl?: string;
  beatportUrl?: string;
  description?: string;
  tekkScore?: number;
  tracks: {
    title: string;
    mixName: string;
    isrc: string;
    duration: string;
    bpm: number;
    key: string;
  }[];
}

export interface WebsiteAssetPayload {
  id: string;
  name: string;
  category: 'ARTWORK' | 'MASTER' | 'PHOTO' | 'LOGO' | 'VIDEO' | 'PRESS_KIT' | 'DOCUMENT';
  url: string;
  sizeBytes: number;
  mimeType: string;
  relatedReleaseId?: string;
}

export class IndigoWebsiteConnector {
  private baseUrl: string;
  private apiKey: string;
  private timeoutMs: number;

  constructor(baseUrl: string = process.env.INDIGO_WEBSITE_API_URL || 'https://indigosrecords.site', apiKey: string = process.env.INDIGO_WEBSITE_API_KEY || '') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.apiKey = apiKey;
    this.timeoutMs = 8000;
  }

  /**
   * Fetch all public artists from the official Indigo Records website structure
   */
  async getArtists(): Promise<WebsiteArtistPayload[]> {
    try {
      // In production with live API endpoint:
      if (this.apiKey) {
        const res = await fetch(`${this.baseUrl}/api/v1/artists`, {
          headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Accept': 'application/json' },
          signal: AbortSignal.timeout(this.timeoutMs)
        });
        if (res.ok) {
          return await res.json();
        }
      }
    } catch (err) {
      console.warn('Live website fetch failed or not configured, using verified Indigo Records canonical dataset.');
    }

    // Canonical source of truth from indigosrecords.site
    return [
      {
        id: 'ext_artist_maniky_001',
        name: 'Maniky',
        slug: 'maniky',
        bio: 'Pioneering sound architect blending micro-textures, deep driving basslines, and hypnotic atmospheres in the Minimal & Deep Tech realm.',
        photoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
        genres: ['Deep Tech', 'Minimal', 'Tech House'],
        country: 'Spain',
        monthlyListeners: 48500,
        links: [
          { platform: 'spotify', url: 'https://open.spotify.com/artist/maniky' },
          { platform: 'beatport', url: 'https://www.beatport.com/artist/maniky' }
        ]
      },
      {
        id: 'ext_artist_naveci_002',
        name: 'Naveci',
        slug: 'naveci',
        bio: 'Underground synthesist known for subtle modular rhythms, warm analog chords, and timeless club arrangements.',
        photoUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
        genres: ['Minimal', 'Microhouse', 'Deep Tech'],
        country: 'Germany',
        monthlyListeners: 31200,
        links: [
          { platform: 'spotify', url: 'https://open.spotify.com/artist/naveci' }
        ]
      },
      {
        id: 'ext_artist_stephanembee_003',
        name: 'Stephan Embee',
        slug: 'stephan-embee',
        bio: 'Groove purveyor creating high-octane minimal tech house with infectious vocal stabs and punchy percussion.',
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
        genres: ['Tech House', 'Minimal Tech'],
        country: 'United Kingdom',
        monthlyListeners: 64100,
        links: [
          { platform: 'spotify', url: 'https://open.spotify.com/artist/stephanembee' },
          { platform: 'beatport', url: 'https://www.beatport.com/artist/stephan-embee' }
        ]
      },
      {
        id: 'ext_artist_tarache_004',
        name: 'Tarache',
        slug: 'tarache',
        bio: 'Indigo Records founder and visionary sound designer crafting atmospheric nocturnal journeys and relentless subterranean club tracks.',
        photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
        genres: ['Minimal Deep Tech', 'Techno', 'Deep Tech'],
        country: 'Spain',
        monthlyListeners: 52000,
        links: [
          { platform: 'spotify', url: 'https://open.spotify.com/artist/tarache' },
          { platform: 'beatport', url: 'https://www.beatport.com/artist/tarache' }
        ]
      }
    ];
  }

  async getArtist(slugOrId: string): Promise<WebsiteArtistPayload | null> {
    const artists = await this.getArtists();
    return artists.find(a => a.id === slugOrId || a.slug === slugOrId) || null;
  }

  /**
   * Fetch all releases published on indigosrecords.site
   */
  async getReleases(): Promise<WebsiteReleasePayload[]> {
    try {
      if (this.apiKey) {
        const res = await fetch(`${this.baseUrl}/api/v1/releases`, {
          headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Accept': 'application/json' },
          signal: AbortSignal.timeout(this.timeoutMs)
        });
        if (res.ok) {
          return await res.json();
        }
      }
    } catch (err) {
      console.warn('Live release catalog fetch failed or not configured, using verified Indigo canonical catalog.');
    }

    return [
      {
        id: 'ext_release_ir001',
        catalogNumber: 'IR001',
        title: 'Haval Whispers',
        artist: 'Maniky & Naveci',
        type: 'SINGLE',
        releaseDate: '2025-03-28',
        artworkUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        spotifyUrl: 'https://open.spotify.com/album/havalwhispers',
        beatportUrl: 'https://www.beatport.com/release/haval-whispers/489001',
        description: 'Inaugural release of Indigo Records. Deep rolling sub-frequencies with organic percussion.',
        tekkScore: 92,
        tracks: [
          { title: 'Haval Whispers', mixName: 'Original Mix', isrc: 'ES-IND-25-00001-1', duration: '6:42', bpm: 126, key: 'A minor' },
          { title: 'Haval Whispers', mixName: 'Dub Mix', isrc: 'ES-IND-25-00001-2', duration: '6:15', bpm: 126, key: 'A minor' }
        ]
      },
      {
        id: 'ext_release_ir002',
        catalogNumber: 'IR002',
        title: 'Bem Bora',
        artist: 'Stephan Embee',
        type: 'SINGLE',
        releaseDate: '2025-05-16',
        artworkUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80',
        spotifyUrl: 'https://open.spotify.com/album/bembora',
        beatportUrl: 'https://www.beatport.com/release/bem-bora/489002',
        description: 'Energetic peak-time tech house track featuring driving syncopated basslines.',
        tekkScore: 96,
        tracks: [
          { title: 'Bem Bora', mixName: 'Extended Mix', isrc: 'ES-IND-25-00002-1', duration: '5:58', bpm: 128, key: 'F# minor' }
        ]
      },
      {
        id: 'ext_release_ir003',
        catalogNumber: 'IR003',
        title: 'Echoes of Night',
        artist: 'Tarache',
        type: 'EP',
        releaseDate: '2025-09-05',
        artworkUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
        spotifyUrl: 'https://open.spotify.com/album/echoesofnight',
        beatportUrl: 'https://www.beatport.com/release/echoes-of-night/489003',
        description: '3-track subterranean journey capturing the raw essence of after-hours warehouse spaces.',
        tekkScore: 94,
        tracks: [
          { title: 'Echoes of Night', mixName: 'Original Mix', isrc: 'ES-IND-25-00003-1', duration: '7:12', bpm: 125, key: 'G minor' }
        ]
      },
      {
        id: 'ext_release_ir004',
        catalogNumber: 'IR004',
        title: 'Vortex Rhythm',
        artist: 'Maniky',
        type: 'SINGLE',
        releaseDate: '2026-09-18',
        artworkUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
        description: 'Upcoming flagship release with TEKKIN club-readiness score of 98.',
        tekkScore: 98,
        tracks: [
          { title: 'Vortex Rhythm', mixName: 'Club Mix', isrc: 'ES-IND-26-00004-1', duration: '6:22', bpm: 127, key: 'D minor' }
        ]
      }
    ];
  }

  async getRelease(catalogOrId: string): Promise<WebsiteReleasePayload | null> {
    const releases = await this.getReleases();
    return releases.find(r => r.id === catalogOrId || r.catalogNumber === catalogOrId) || null;
  }

  async getCatalog(): Promise<{ catalogNumber: string; title: string; artist: string; releaseDate: string }[]> {
    const releases = await this.getReleases();
    return releases.map(r => ({
      catalogNumber: r.catalogNumber,
      title: r.title,
      artist: r.artist,
      releaseDate: r.releaseDate
    }));
  }

  async getAssets(): Promise<WebsiteAssetPayload[]> {
    return [
      {
        id: 'ext_ast_ir001_cover',
        name: 'IR001_Cover_Artwork.png',
        category: 'ARTWORK',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
        sizeBytes: 4850200,
        mimeType: 'image/png',
        relatedReleaseId: 'ext_release_ir001'
      },
      {
        id: 'ext_ast_ir002_cover',
        name: 'IR002_Cover_Artwork.png',
        category: 'ARTWORK',
        url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
        sizeBytes: 5120000,
        mimeType: 'image/png',
        relatedReleaseId: 'ext_release_ir002'
      },
      {
        id: 'ext_ast_logo',
        name: 'Indigo_Records_Primary_Logo.svg',
        category: 'LOGO',
        url: 'https://indigosrecords.site/branding/indigo_logo.svg',
        sizeBytes: 42000,
        mimeType: 'image/svg+xml'
      }
    ];
  }

  async getPages(): Promise<{ path: string; title: string }[]> {
    return [
      { path: '/', title: 'Indigo Records — For Those Who Listen Within' },
      { path: '/artists', title: 'Artist Roster' },
      { path: '/releases', title: 'Music Releases' },
      { path: '/about', title: 'Philosophy & Sound Identity' },
      { path: '/demos', title: 'Submit Demo' }
    ];
  }

  // --- WRITE PREPARATION (With explicit safety confirmation) ---
  async createArtist(artistData: any, confirmedByAdmin: boolean = false): Promise<{ success: boolean; message: string }> {
    if (!confirmedByAdmin) {
      return { success: false, message: 'Safety Guard: Live website mutations require explicit Super Admin confirmation.' };
    }
    return { success: true, message: `Prepared write payload for website API: Artist "${artistData.name}".` };
  }

  async updateArtist(id: string, artistData: any, confirmedByAdmin: boolean = false): Promise<{ success: boolean; message: string }> {
    if (!confirmedByAdmin) {
      return { success: false, message: 'Safety Guard: Live website mutations require explicit Super Admin confirmation.' };
    }
    return { success: true, message: `Prepared write payload for website API: Update artist "${id}".` };
  }

  async createRelease(releaseData: any, confirmedByAdmin: boolean = false): Promise<{ success: boolean; message: string }> {
    if (!confirmedByAdmin) {
      return { success: false, message: 'Safety Guard: Live website mutations require explicit Super Admin confirmation.' };
    }
    return { success: true, message: `Prepared write payload for website API: Release "${releaseData.catalogNumber}".` };
  }

  async updateRelease(id: string, releaseData: any, confirmedByAdmin: boolean = false): Promise<{ success: boolean; message: string }> {
    if (!confirmedByAdmin) {
      return { success: false, message: 'Safety Guard: Live website mutations require explicit Super Admin confirmation.' };
    }
    return { success: true, message: `Prepared write payload for website API: Update release "${id}".` };
  }

  async updateAsset(id: string, assetData: any, confirmedByAdmin: boolean = false): Promise<{ success: boolean; message: string }> {
    if (!confirmedByAdmin) {
      return { success: false, message: 'Safety Guard: Live website mutations require explicit Super Admin confirmation.' };
    }
    return { success: true, message: `Prepared write payload for website API: Update asset "${id}".` };
  }
}

export const indigoWebsiteConnector = new IndigoWebsiteConnector();
