import express, { Router, Request, Response } from 'express';

// ============================================================
// STATIC TYPES (self-contained, no ../src imports)
// ============================================================

type UserRole = 'SUPER_ADMIN' | 'LABEL_MANAGER' | 'MARKETING' | 'A_AND_R' | 'FINANCE' | 'ARTIST';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  artistId?: string;
  department?: string;
  createdAt: string;
}

interface ExternalReference {
  internalId: string;
  externalId: string;
  source: 'indigo-website' | 'songstats' | 'tekkin' | 'spotify' | 'beatport' | 'manual';
  lastSyncedAt: string;
  syncStatus: 'SYNCED' | 'PENDING' | 'CONFLICT' | 'ERROR';
}

interface ArtistLink {
  platform: 'spotify' | 'apple' | 'beatport' | 'soundcloud' | 'instagram' | 'website';
  url: string;
}

interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string;
  photoUrl: string;
  bannerUrl?: string;
  genres: string[];
  status: 'ACTIVE' | 'DEVELOPMENT' | 'ALUMNI';
  country: string;
  city?: string;
  monthlyListeners: number;
  followersCount: number;
  signedDate: string;
  pressKitUrl?: string;
  links: ArtistLink[];
  externalReference: ExternalReference;
  internalNotes?: string;
}

interface TrackContributor {
  name: string;
  role: 'COMPOSER' | 'PRODUCER' | 'VOCALIST' | 'MIXER' | 'MASTERING' | 'REMIXER';
  ipiNumber?: string;
}

interface Split {
  recipientName: string;
  recipientEmail?: string;
  artistId?: string;
  role: string;
  percentage: number;
}

interface TekkAnalysis {
  clubScore: number;
  subBassEnergy: number;
  stereoWidth: number;
  loudnessLufs: number;
  dynamicRange: number;
  keyConfidence: number;
  frequencySpectrumRating: 'OPTIMAL' | 'MODERATE' | 'LOW_ENERGY' | 'OVER_COMPRESSED';
}

interface Track {
  id: string;
  releaseId: string;
  title: string;
  mixName: string;
  isrc: string;
  duration: string;
  durationSec: number;
  bpm: number;
  key: string;
  genres: string[];
  artists: string[];
  previewAudioUrl?: string;
  contributors: TrackContributor[];
  splits: Split[];
  tekkAnalysis?: TekkAnalysis;
}

interface Release {
  id: string;
  catalogNumber: string;
  title: string;
  artistId: string;
  artistName: string;
  type: 'SINGLE' | 'EP' | 'ALBUM' | 'REMIX';
  releaseDate: string;
  status: 'SCHEDULED' | 'RELEASED' | 'DRAFT' | 'MASTERING' | 'DISTRIBUTED';
  artworkUrl: string;
  upc: string;
  isrc: string;
  genres: string[];
  spotifyUrl?: string;
  beatportUrl?: string;
  appleMusicUrl?: string;
  soundcloudUrl?: string;
  description?: string;
  tekkScore?: number;
  totalStreams: number;
  labelSharePercentage: number;
  tracksCount: number;
  tracks?: Track[];
  externalReference: ExternalReference;
}

interface Demo {
  id: string;
  artistName: string;
  trackTitle: string;
  email: string;
  audioUrl: string;
  genre: string;
  bpm: number;
  submissionDate: string;
  score: number;
  tekkScore?: number;
  status: 'NEW' | 'LISTENING' | 'SHORTLIST' | 'CONTACTED' | 'NEGOTIATION' | 'SIGNED' | 'REJECTED';
  notes: string;
  feedbackSent: boolean;
  territory?: string;
}

interface Contact {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone?: string;
  territory: string;
  category: 'A_AND_R' | 'LABEL' | 'DISTRIBUTOR' | 'ARTIST' | 'MANAGER' | 'DJ' | 'PLAYLIST_CURATOR' | 'RADIO' | 'PRESS' | 'PROMOTER' | 'PUBLISHER';
  lastContactDate: string;
  nextActionDate?: string;
  nextActionNotes?: string;
  notes: string;
  tags: string[];
}

interface Campaign {
  id: string;
  title: string;
  artistId: string;
  releaseId: string;
  goal: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  status: 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'DELAYED';
  channels: string[];
  keyMetrics: {
    targetStreams: number;
    achievedStreams: number;
    playlistAdds: number;
    pressFeatures: number;
    djSupportsCount: number;
  };
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'WAITING' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  deadline: string;
  assignedTo: string;
  relatedEntityType?: 'RELEASE' | 'ARTIST' | 'CAMPAIGN' | 'FINANCE' | 'A_AND_R' | 'GENERAL';
  relatedEntityId?: string;
  createdAt: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  type: 'RELEASE' | 'CAMPAIGN' | 'TASK' | 'MEETING' | 'CONTENT' | 'FOLLOW_UP' | 'PAYMENT' | 'CONTRACT';
  relatedId?: string;
  description?: string;
  time?: string;
}

interface Revenue {
  id: string;
  period: string;
  source: 'SPOTIFY' | 'APPLE_MUSIC' | 'BEATPORT' | 'BANDCAMP' | 'YOUTUBE' | 'SYNCH' | 'DIRECT';
  grossAmount: number;
  netAmount: number;
  deductions: number;
  currency: string;
  releaseId?: string;
  releaseTitle?: string;
  status: 'REPORTED' | 'RECEIVED' | 'PROCESSED';
  statementDate: string;
}

interface Expense {
  id: string;
  title: string;
  category: 'MASTERING' | 'ARTWORK' | 'MARKETING_ADS' | 'PR_DISTRIBUTION' | 'LEGAL' | 'PLATFORM_FEE' | 'ADVANCE';
  amount: number;
  currency: string;
  date: string;
  releaseId?: string;
  artistId?: string;
  receiptUrl?: string;
  paid: boolean;
}

interface Royalty {
  id: string;
  period: string;
  artistId: string;
  artistName: string;
  releaseId: string;
  releaseTitle: string;
  grossShare: number;
  netPayout: number;
  deductions: number;
  splitPercentage: number;
  status: 'CALCULATED' | 'APPROVED' | 'PAID' | 'PENDING';
  paymentRef?: string;
}

interface Contract {
  id: string;
  artistId: string;
  artistName: string;
  title: string;
  type: 'EXCLUSIVE_ARTIST' | 'SINGLE_TRACK_RELEASE' | 'EP_AGREEMENT' | 'REMIX_LICENSE' | 'DISTRIBUTION_DEAL';
  startDate: string;
  expirationDate: string;
  status: 'DRAFT' | 'PENDING_SIGNATURE' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
  royaltyRate: number;
  territory: string;
  notes: string;
  fileUrl?: string;
}

interface Asset {
  id: string;
  name: string;
  category: 'ARTWORK' | 'MASTER' | 'PHOTO' | 'LOGO' | 'VIDEO' | 'PRESS_KIT' | 'DOCUMENT';
  url: string;
  fileSizeBytes: number;
  mimeType: string;
  artistId?: string;
  artistName?: string;
  releaseId?: string;
  releaseTitle?: string;
  createdAt: string;
}

interface ActivityLog {
  id: string;
  actor: string;
  action: 'CREATED' | 'UPDATED' | 'DELETED' | 'IMPORTED' | 'SYNCED' | 'PUBLISHED' | 'APPROVED' | 'PAYMENT' | 'CONTRACT' | 'CAMPAIGN' | 'TASK' | 'AI_TOOL_RUN';
  entityType: string;
  entityId: string;
  description: string;
  timestamp: string;
  details?: Record<string, any>;
}

interface AIKnowledge {
  id: string;
  category: 'BRAND' | 'LABEL_POLICY' | 'ARTIST_GUIDE' | 'MARKETING_PLAYBOOK' | 'A_AND_R_CRITERIA' | 'DISTRIBUTION_RULES' | 'FINANCE_GUIDELINE';
  title: string;
  content: string;
  updatedAt: string;
}

interface SyncJob {
  id: string;
  type: 'FULL_SYNC' | 'INCREMENTAL_SYNC' | 'ENTITY_SYNC' | 'DRY_RUN';
  startedAt: string;
  completedAt?: string;
  recordsRead: number;
  recordsCreated: number;
  recordsUpdated: number;
  recordsSkipped: number;
  errors: string[];
  status: 'RUNNING' | 'SUCCESS' | 'PARTIAL' | 'FAILED';
  entitiesProcessed: { artists: number; releases: number; assets: number; catalog: number };
}

interface SyncLog {
  id: string;
  jobId: string;
  message: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  timestamp: string;
}

interface SyncError {
  id: string;
  jobId: string;
  entity: string;
  externalId: string;
  error: string;
  timestamp: string;
  status: 'UNRESOLVED' | 'RESOLVED' | 'IGNORED';
  retryCount: number;
}

interface Integration {
  id: string;
  name: string;
  service: 'WEBSITE' | 'SONGSTATS' | 'TEKKIN' | 'SPOTIFY_FOR_LABELS' | 'BEATPORT' | 'APPLE_MUSIC';
  connected: boolean;
  lastPing?: string;
  statusMessage?: string;
  configuredKeys: string[];
}

// ============================================================
// INLINE SEED DATA
// ============================================================

const INITIAL_USERS: User[] = [
  { id: 'usr_super_admin', email: 'tarache450@gmail.com', displayName: 'Tarache (Super Admin)', role: 'SUPER_ADMIN', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', department: 'Executive Direction & Label Head', createdAt: '2025-01-01T00:00:00Z' },
  { id: 'usr_label_mgr', email: 'manager@indigosrecords.site', displayName: 'Elena Vance (Label Manager)', role: 'LABEL_MANAGER', avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', department: 'Operations & Release Management', createdAt: '2025-02-15T00:00:00Z' },
  { id: 'usr_ar_lead', email: 'ar@indigosrecords.site', displayName: 'Marco De Luca (A&R Director)', role: 'A_AND_R', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', department: 'A&R & Talent Scouting', createdAt: '2025-03-01T00:00:00Z' },
  { id: 'usr_marketing', email: 'marketing@indigosrecords.site', displayName: 'Sofia Chen (Marketing Lead)', role: 'MARKETING', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', department: 'Marketing & Digital PR', createdAt: '2025-03-10T00:00:00Z' },
  { id: 'usr_finance', email: 'finance@indigosrecords.site', displayName: 'Julian Ross (Head of Finance)', role: 'FINANCE', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', department: 'Financial Operations & Royalties', createdAt: '2025-03-15T00:00:00Z' },
  { id: 'usr_artist_maniky', email: 'maniky@indigosartists.com', displayName: 'Maniky (Roster Artist)', role: 'ARTIST', artistId: 'art_maniky', avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', department: 'Exclusive Artist', createdAt: '2025-04-01T00:00:00Z' },
];

const INITIAL_ARTISTS: Artist[] = [
  { id: 'art_maniky', name: 'Maniky', slug: 'maniky', bio: 'Pioneering sound architect blending micro-textures, deep driving basslines, and hypnotic atmospheres in the Minimal & Deep Tech realm.', photoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80', bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80', genres: ['Deep Tech', 'Minimal', 'Tech House'], status: 'ACTIVE', country: 'Spain', city: 'Barcelona', monthlyListeners: 48500, followersCount: 12400, signedDate: '2024-11-10', pressKitUrl: 'https://indigosrecords.site/artists/maniky/presskit.pdf', links: [{ platform: 'spotify', url: 'https://open.spotify.com/artist/maniky' }, { platform: 'beatport', url: 'https://www.beatport.com/artist/maniky' }, { platform: 'instagram', url: 'https://instagram.com/manikymusic' }], externalReference: { internalId: 'art_maniky', externalId: 'ext_artist_maniky_001', source: 'indigo-website', lastSyncedAt: '2026-08-10T12:00:00Z', syncStatus: 'SYNCED' }, internalNotes: 'Key headliner for Indigo showcases. Outstanding mix quality verified with TEKKIN score 94.' },
  { id: 'art_naveci', name: 'Naveci', slug: 'naveci', bio: 'Underground synthesist known for subtle modular rhythms, warm analog chords, and timeless club arrangements.', photoUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80', bannerUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80', genres: ['Minimal', 'Microhouse', 'Deep Tech'], status: 'ACTIVE', country: 'Germany', city: 'Berlin', monthlyListeners: 31200, followersCount: 8900, signedDate: '2024-11-15', links: [{ platform: 'spotify', url: 'https://open.spotify.com/artist/naveci' }, { platform: 'beatport', url: 'https://www.beatport.com/artist/naveci' }], externalReference: { internalId: 'art_naveci', externalId: 'ext_artist_naveci_002', source: 'indigo-website', lastSyncedAt: '2026-08-10T12:00:00Z', syncStatus: 'SYNCED' }, internalNotes: 'Collaborator on IR001 Haval Whispers. Preparing solo EP for 2026 Q4.' },
  { id: 'art_stephan_embee', name: 'Stephan Embee', slug: 'stephan-embee', bio: 'Groove purveyor creating high-octane minimal tech house with infectious vocal stabs and punchy percussion.', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80', genres: ['Tech House', 'Minimal Tech'], status: 'ACTIVE', country: 'United Kingdom', city: 'London', monthlyListeners: 64100, followersCount: 16800, signedDate: '2025-01-20', links: [{ platform: 'spotify', url: 'https://open.spotify.com/artist/stephanembee' }, { platform: 'beatport', url: 'https://www.beatport.com/artist/stephan-embee' }], externalReference: { internalId: 'art_stephan_embee', externalId: 'ext_artist_stephan_embee_003', source: 'indigo-website', lastSyncedAt: '2026-08-10T12:00:00Z', syncStatus: 'SYNCED' }, internalNotes: 'Producer of IR002 "Bem Bora". Beatport Top 10 Minimal/Deep Tech placement.' },
  { id: 'art_tarache', name: 'Tarache', slug: 'tarache', bio: 'Indigo Records founder and visionary sound designer crafting atmospheric nocturnal journeys and relentless subterranean club tracks.', photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80', genres: ['Minimal Deep Tech', 'Techno', 'Deep Tech'], status: 'ACTIVE', country: 'Spain', city: 'Madrid', monthlyListeners: 52000, followersCount: 14500, signedDate: '2024-09-01', links: [{ platform: 'spotify', url: 'https://open.spotify.com/artist/tarache' }, { platform: 'beatport', url: 'https://www.beatport.com/artist/tarache' }, { platform: 'instagram', url: 'https://instagram.com/tarache' }], externalReference: { internalId: 'art_tarache', externalId: 'ext_artist_tarache_004', source: 'indigo-website', lastSyncedAt: '2026-08-10T12:00:00Z', syncStatus: 'SYNCED' }, internalNotes: 'Label founder, curator, and executive A&R.' },
];

const INITIAL_RELEASES: Release[] = [
  { id: 'rel_ir001', catalogNumber: 'IR001', title: 'Haval Whispers', artistId: 'art_maniky', artistName: 'Maniky & Naveci', type: 'SINGLE', releaseDate: '2025-03-28', status: 'RELEASED', artworkUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80', upc: '198712340001', isrc: 'ES-IND-25-00001', genres: ['Deep Tech', 'Minimal'], spotifyUrl: 'https://open.spotify.com/album/havalwhispers', beatportUrl: 'https://www.beatport.com/release/haval-whispers/489001', description: 'Inaugural release of Indigo Records. Deep rolling sub-frequencies with organic percussion and ethereal vocal snippets.', tekkScore: 92, totalStreams: 142800, labelSharePercentage: 50, tracksCount: 2, externalReference: { internalId: 'rel_ir001', externalId: 'ext_release_ir001', source: 'indigo-website', lastSyncedAt: '2026-08-10T12:00:00Z', syncStatus: 'SYNCED' } },
  { id: 'rel_ir002', catalogNumber: 'IR002', title: 'Bem Bora', artistId: 'art_stephan_embee', artistName: 'Stephan Embee', type: 'SINGLE', releaseDate: '2025-05-16', status: 'RELEASED', artworkUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80', upc: '198712340002', isrc: 'ES-IND-25-00002', genres: ['Tech House', 'Minimal Tech'], spotifyUrl: 'https://open.spotify.com/album/bembora', beatportUrl: 'https://www.beatport.com/release/bem-bora/489002', description: 'Energetic peak-time tech house track featuring driving syncopated basslines and festival-tested groove tension.', tekkScore: 96, totalStreams: 289400, labelSharePercentage: 50, tracksCount: 2, externalReference: { internalId: 'rel_ir002', externalId: 'ext_release_ir002', source: 'indigo-website', lastSyncedAt: '2026-08-10T12:00:00Z', syncStatus: 'SYNCED' } },
  { id: 'rel_ir003', catalogNumber: 'IR003', title: 'Echoes of Night', artistId: 'art_tarache', artistName: 'Tarache', type: 'EP', releaseDate: '2025-09-05', status: 'RELEASED', artworkUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80', upc: '198712340003', isrc: 'ES-IND-25-00003', genres: ['Minimal Deep Tech', 'Underground'], spotifyUrl: 'https://open.spotify.com/album/echoesofnight', beatportUrl: 'https://www.beatport.com/release/echoes-of-night/489003', description: '3-track subterranean journey capturing the raw essence of after-hours warehouse spaces.', tekkScore: 94, totalStreams: 184500, labelSharePercentage: 50, tracksCount: 3, externalReference: { internalId: 'rel_ir003', externalId: 'ext_release_ir003', source: 'indigo-website', lastSyncedAt: '2026-08-10T12:00:00Z', syncStatus: 'SYNCED' } },
  { id: 'rel_ir004', catalogNumber: 'IR004', title: 'Vortex Rhythm', artistId: 'art_maniky', artistName: 'Maniky', type: 'SINGLE', releaseDate: '2026-09-18', status: 'SCHEDULED', artworkUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80', upc: '198712340004', isrc: 'ES-IND-26-00004', genres: ['Tech House', 'Minimal'], description: 'Upcoming flagship release with TEKKIN club-readiness score of 98. Major DJ promo campaign underway.', tekkScore: 98, totalStreams: 0, labelSharePercentage: 50, tracksCount: 2, externalReference: { internalId: 'rel_ir004', externalId: 'ext_release_ir004', source: 'indigo-website', lastSyncedAt: '2026-08-10T12:00:00Z', syncStatus: 'SYNCED' } },
];

const INITIAL_TRACKS: Track[] = [
  { id: 'trk_001_1', releaseId: 'rel_ir001', title: 'Haval Whispers', mixName: 'Original Mix', isrc: 'ES-IND-25-00001-1', duration: '6:42', durationSec: 402, bpm: 126, key: 'A minor', genres: ['Deep Tech', 'Minimal'], artists: ['Maniky', 'Naveci'], contributors: [{ name: 'Maniky', role: 'PRODUCER' }, { name: 'Naveci', role: 'PRODUCER' }, { name: 'Tarache', role: 'MASTERING' }], splits: [{ recipientName: 'Maniky', role: 'Artist / Producer', percentage: 25 }, { recipientName: 'Naveci', role: 'Artist / Producer', percentage: 25 }, { recipientName: 'Indigo Records', role: 'Record Label', percentage: 50 }], tekkAnalysis: { clubScore: 92, subBassEnergy: 88, stereoWidth: 76, loudnessLufs: -7.8, dynamicRange: 7.2, keyConfidence: 99, frequencySpectrumRating: 'OPTIMAL' } },
  { id: 'trk_001_2', releaseId: 'rel_ir001', title: 'Haval Whispers', mixName: 'Dub Mix', isrc: 'ES-IND-25-00001-2', duration: '6:15', durationSec: 375, bpm: 126, key: 'A minor', genres: ['Deep Tech'], artists: ['Maniky', 'Naveci'], contributors: [{ name: 'Maniky', role: 'PRODUCER' }, { name: 'Naveci', role: 'PRODUCER' }], splits: [{ recipientName: 'Maniky', role: 'Artist / Producer', percentage: 25 }, { recipientName: 'Naveci', role: 'Artist / Producer', percentage: 25 }, { recipientName: 'Indigo Records', role: 'Record Label', percentage: 50 }], tekkAnalysis: { clubScore: 90, subBassEnergy: 91, stereoWidth: 72, loudnessLufs: -8.0, dynamicRange: 7.6, keyConfidence: 98, frequencySpectrumRating: 'OPTIMAL' } },
  { id: 'trk_002_1', releaseId: 'rel_ir002', title: 'Bem Bora', mixName: 'Extended Mix', isrc: 'ES-IND-25-00002-1', duration: '5:58', durationSec: 358, bpm: 128, key: 'F# minor', genres: ['Tech House'], artists: ['Stephan Embee'], contributors: [{ name: 'Stephan Embee', role: 'PRODUCER' }], splits: [{ recipientName: 'Stephan Embee', role: 'Artist', percentage: 50 }, { recipientName: 'Indigo Records', role: 'Record Label', percentage: 50 }], tekkAnalysis: { clubScore: 96, subBassEnergy: 94, stereoWidth: 82, loudnessLufs: -6.9, dynamicRange: 6.8, keyConfidence: 100, frequencySpectrumRating: 'OPTIMAL' } },
  { id: 'trk_004_1', releaseId: 'rel_ir004', title: 'Vortex Rhythm', mixName: 'Club Mix', isrc: 'ES-IND-26-00004-1', duration: '6:22', durationSec: 382, bpm: 127, key: 'D minor', genres: ['Minimal Tech'], artists: ['Maniky'], contributors: [{ name: 'Maniky', role: 'PRODUCER' }, { name: 'Indigo Mastering Lab', role: 'MASTERING' }], splits: [{ recipientName: 'Maniky', role: 'Artist', percentage: 50 }, { recipientName: 'Indigo Records', role: 'Record Label', percentage: 50 }], tekkAnalysis: { clubScore: 98, subBassEnergy: 96, stereoWidth: 88, loudnessLufs: -6.5, dynamicRange: 6.4, keyConfidence: 100, frequencySpectrumRating: 'OPTIMAL' } },
];

const INITIAL_DEMOS: Demo[] = [
  { id: 'demo_001', artistName: 'Kallisto Sound', trackTitle: 'Midnight Transit', email: 'kallisto@audioflux.de', audioUrl: 'https://actions.google.com/sounds/v1/ambiences/humming_room.ogg', genre: 'Deep Tech', bpm: 127, submissionDate: '2026-08-11', score: 8.9, tekkScore: 91, status: 'SHORTLIST', notes: 'Incredible groove balance. Bassline slides fit Indigo sound identity seamlessly. Need extended intro for DJ play.', feedbackSent: true, territory: 'Germany' },
  { id: 'demo_002', artistName: 'Lucas Rivas', trackTitle: 'Sub Terraneo', email: 'lucasrivas.dj@gmail.com', audioUrl: 'https://actions.google.com/sounds/v1/science_fiction/futuristic_sub_sweep.ogg', genre: 'Minimal Tech', bpm: 126, submissionDate: '2026-08-13', score: 9.4, tekkScore: 95, status: 'NEGOTIATION', notes: 'Priority single candidate for IR005. Offer sent for Single Track Agreement with 50/50 net splits.', feedbackSent: true, territory: 'Argentina' },
  { id: 'demo_003', artistName: 'Aura Decay', trackTitle: 'Static Waves', email: 'contact@auradecay.com', audioUrl: 'https://actions.google.com/sounds/v1/weather/rain_heavy.ogg', genre: 'Melodic Underground', bpm: 124, submissionDate: '2026-08-14', score: 7.2, tekkScore: 78, status: 'LISTENING', notes: 'Atmosphere is great but mid-range percussion lacks punch on club sound systems.', feedbackSent: false, territory: 'United Kingdom' },
];

const INITIAL_CONTACTS: Contact[] = [
  { id: 'cnt_001', name: 'Carlos Mendez', company: 'Minimal Force Playlists', role: 'Head Curator', email: 'carlos@minimalforce.io', territory: 'Spain & Europe', category: 'PLAYLIST_CURATOR', lastContactDate: '2026-08-05', nextActionDate: '2026-08-20', nextActionNotes: 'Pitch IR004 "Vortex Rhythm" for top position in Underground Tech Daily playlist.', notes: 'Supports all Indigo releases. 450k active weekly playlist followers.', tags: ['Spotify', 'High Priority', 'Minimal'] },
  { id: 'cnt_002', name: 'Antoine Lefevre', company: 'Rex Club Paris / Rinse France', role: 'Resident DJ & Radio Host', email: 'antoine@rexclub.fr', territory: 'France', category: 'DJ', lastContactDate: '2026-08-01', nextActionDate: '2026-08-25', nextActionNotes: 'Send promo pack for IR004 promo delivery.', notes: 'Played IR002 in 4 peak-time festival sets. Requested early WAV promos.', tags: ['DJ Promo', 'Tastemaker', 'Rex Club'] },
  { id: 'cnt_003', name: 'Beatport Editorial Team', company: 'Beatport LLC', role: 'Genre Editor - Minimal / Deep Tech', email: 'editorial.minimal@beatport.com', territory: 'Global', category: 'PROMOTER', lastContactDate: '2026-07-28', nextActionDate: '2026-08-30', nextActionNotes: 'Submit feature banner pitch 2 weeks prior to IR004 release.', notes: 'Feature pitch form requires 14-day lead time with high-res artwork.', tags: ['Beatport', 'Editorial', 'Banner Pitch'] },
];

const INITIAL_CAMPAIGNS: Campaign[] = [
  { id: 'cmp_ir004_launch', title: 'IR004 "Vortex Rhythm" Global Launch', artistId: 'art_maniky', releaseId: 'rel_ir004', goal: 'Exceed 300k streams across DSPs in first 60 days & achieve Beatport Top 5 Minimal/Deep Tech.', startDate: '2026-08-15', endDate: '2026-10-15', budget: 2500, spent: 620, status: 'ACTIVE', channels: ['Spotify Editorial', 'Beatport Banner', 'DJ Inflyte Promo', 'Instagram Ads', 'TikTok Underground'], keyMetrics: { targetStreams: 300000, achievedStreams: 0, playlistAdds: 18, pressFeatures: 4, djSupportsCount: 42 } },
];

const INITIAL_TASKS: Task[] = [
  { id: 'tsk_001', title: 'Deliver IR004 final WAV master to FUGA distributor', description: 'Ensure 24-bit 44.1kHz master and ISRC tags match metadata before delivery.', status: 'DONE', priority: 'HIGH', deadline: '2026-08-10', assignedTo: 'Julian Ross', relatedEntityType: 'RELEASE', relatedEntityId: 'rel_ir004', createdAt: '2026-08-01' },
  { id: 'tsk_002', title: 'Send IR004 DJ promo pool via Inflyte / PromoBox', description: 'Target top 150 underground minimal DJs with personalized download links.', status: 'IN_PROGRESS', priority: 'URGENT', deadline: '2026-08-18', assignedTo: 'Sofia Chen', relatedEntityType: 'CAMPAIGN', relatedEntityId: 'cmp_ir004_launch', createdAt: '2026-08-08' },
  { id: 'tsk_003', title: 'Finalize Single Agreement contract with Lucas Rivas', description: 'Prepare contract PDF for IR005 demo submission and send via digital signature.', status: 'TODO', priority: 'HIGH', deadline: '2026-08-22', assignedTo: 'Marco De Luca', relatedEntityType: 'A_AND_R', relatedEntityId: 'demo_002', createdAt: '2026-08-12' },
  { id: 'tsk_004', title: 'Run Q2 2026 Royalty Statement calculations & split checks', description: 'Reconcile DSP receipts from Spotify and Beatport; verify 100% split totals before payouts.', status: 'TODO', priority: 'MEDIUM', deadline: '2026-08-30', assignedTo: 'Julian Ross', relatedEntityType: 'FINANCE', createdAt: '2026-08-14' },
];

const INITIAL_CALENDAR: CalendarEvent[] = [
  { id: 'cal_001', title: 'IR004 Inflyte DJ Promo Blast', date: '2026-08-18', type: 'CAMPAIGN', relatedId: 'cmp_ir004_launch', description: 'Distribution to A-list underground DJs for club feedback.' },
  { id: 'cal_002', title: 'Beatport Editorial Pitch Deadline (IR004)', date: '2026-08-28', type: 'CAMPAIGN', description: 'Submission of promotional assets and audio teasers.' },
  { id: 'cal_003', title: 'IR004 "Vortex Rhythm" Official Worldwide Release', date: '2026-09-18', type: 'RELEASE', relatedId: 'rel_ir004', description: 'Available on all digital streaming platforms and vinyl store distributors.' },
  { id: 'cal_004', title: 'A&R Talent Review Meeting', date: '2026-08-21', type: 'MEETING', time: '16:00 CET', description: 'Review short-listed demos and 2026 Q4 release pipeline.' },
];

const INITIAL_REVENUE: Revenue[] = [
  { id: 'rev_001', period: '2026-Q1', source: 'SPOTIFY', grossAmount: 4820.50, netAmount: 4100.00, deductions: 720.50, currency: 'EUR', releaseId: 'rel_ir002', releaseTitle: 'Bem Bora (IR002)', status: 'RECEIVED', statementDate: '2026-04-15' },
  { id: 'rev_002', period: '2026-Q1', source: 'BEATPORT', grossAmount: 3250.00, netAmount: 2600.00, deductions: 650.00, currency: 'EUR', releaseId: 'rel_ir002', releaseTitle: 'Bem Bora (IR002)', status: 'RECEIVED', statementDate: '2026-04-20' },
  { id: 'rev_003', period: '2026-Q1', source: 'APPLE_MUSIC', grossAmount: 1890.00, netAmount: 1610.00, deductions: 280.00, currency: 'EUR', releaseId: 'rel_ir001', releaseTitle: 'Haval Whispers (IR001)', status: 'RECEIVED', statementDate: '2026-04-22' },
];

const INITIAL_EXPENSES: Expense[] = [
  { id: 'exp_001', title: 'Analog Mastering for IR004 (2 Tracks)', category: 'MASTERING', amount: 280.00, currency: 'EUR', date: '2026-07-20', releaseId: 'rel_ir004', paid: true },
  { id: 'exp_002', title: '3D Artwork & Motion Cover for IR004', category: 'ARTWORK', amount: 350.00, currency: 'EUR', date: '2026-07-25', releaseId: 'rel_ir004', paid: true },
  { id: 'exp_003', title: 'Inflyte DJ Promo Distribution Campaign', category: 'PR_DISTRIBUTION', amount: 190.00, currency: 'EUR', date: '2026-08-05', releaseId: 'rel_ir004', paid: true },
];

const INITIAL_ROYALTIES: Royalty[] = [
  { id: 'roy_001', period: '2026-Q1', artistId: 'art_stephan_embee', artistName: 'Stephan Embee', releaseId: 'rel_ir002', releaseTitle: 'Bem Bora', grossShare: 3350.00, netPayout: 2950.00, deductions: 400.00, splitPercentage: 50, status: 'PAID', paymentRef: 'TX_INDIGO_20260425_01' },
  { id: 'roy_002', period: '2026-Q1', artistId: 'art_maniky', artistName: 'Maniky', releaseId: 'rel_ir001', releaseTitle: 'Haval Whispers', grossShare: 805.00, netPayout: 755.00, deductions: 50.00, splitPercentage: 25, status: 'PAID', paymentRef: 'TX_INDIGO_20260425_02' },
];

const INITIAL_CONTRACTS: Contract[] = [
  { id: 'cntr_001', artistId: 'art_maniky', artistName: 'Maniky', title: 'Exclusive Artist & Label Agreement 2025-2027', type: 'EXCLUSIVE_ARTIST', startDate: '2024-11-10', expirationDate: '2027-11-10', status: 'ACTIVE', royaltyRate: 50, territory: 'Worldwide', notes: 'Covers 3 EPs and option for full-length album. 50/50 master net splits.' },
  { id: 'cntr_002', artistId: 'art_stephan_embee', artistName: 'Stephan Embee', title: 'Single Release Agreement - IR002 Bem Bora', type: 'SINGLE_TRACK_RELEASE', startDate: '2025-01-20', expirationDate: '2030-01-20', status: 'ACTIVE', royaltyRate: 50, territory: 'Worldwide', notes: 'Includes remix rights and worldwide digital distribution.' },
];

const INITIAL_ASSETS: Asset[] = [
  { id: 'ast_001', name: 'IR001_Haval_Whispers_HiRes_Cover.png', category: 'ARTWORK', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80', fileSizeBytes: 4850200, mimeType: 'image/png', artistId: 'art_maniky', artistName: 'Maniky & Naveci', releaseId: 'rel_ir001', releaseTitle: 'Haval Whispers', createdAt: '2025-03-01T10:00:00Z' },
  { id: 'ast_002', name: 'IR002_Bem_Bora_HiRes_Cover.png', category: 'ARTWORK', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80', fileSizeBytes: 5120000, mimeType: 'image/png', artistId: 'art_stephan_embee', artistName: 'Stephan Embee', releaseId: 'rel_ir002', releaseTitle: 'Bem Bora', createdAt: '2025-05-01T10:00:00Z' },
  { id: 'ast_003', name: 'IR004_Vortex_Rhythm_Master_WAV.zip', category: 'MASTER', url: 'https://indigosrecords.site/masters/IR004_24bit_44k.zip', fileSizeBytes: 89400000, mimeType: 'application/zip', artistId: 'art_maniky', artistName: 'Maniky', releaseId: 'rel_ir004', releaseTitle: 'Vortex Rhythm', createdAt: '2026-08-01T14:30:00Z' },
  { id: 'ast_004', name: 'Indigo_Records_Vector_Identity_Pack.zip', category: 'LOGO', url: 'https://indigosrecords.site/branding/indigo_vector_identity.zip', fileSizeBytes: 12500000, mimeType: 'application/zip', createdAt: '2024-09-01T00:00:00Z' },
];

const INITIAL_AI_KNOWLEDGE: AIKnowledge[] = [
  { id: 'kng_001', category: 'BRAND', title: 'Indigo Records Manifesto & Sonic Philosophy', content: 'INDIGOS RECORDS ("For Those Who Listen Within") focuses on minimal, deep tech, and tech house with genuine soul, raw energy, and pristine frequency balance. Every release undergoes audio signal analysis scoring before signing.', updatedAt: '2026-08-01' },
  { id: 'kng_002', category: 'A_AND_R_CRITERIA', title: 'A&R Evaluation Framework & TEKKIN Integration', content: 'Demos must adhere to: 1) Sub-bass clarity under 80Hz without phase cancellation, 2) Dynamic range >= 6dB, 3) Distinctive groove identity without generic sample packs, 4) TEKKIN club readiness score >= 88.', updatedAt: '2026-08-05' },
  { id: 'kng_003', category: 'FINANCE_GUIDELINE', title: 'Master Royalty Splits Policy', content: 'Standard Indigo Records split is 50% Label / 50% Artists (divided proportionally among remixers and contributors). Splits must always validate to exactly 100%. Payouts occur quarterly.', updatedAt: '2026-08-10' },
];

const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'act_001', actor: 'Tarache (Super Admin)', action: 'CREATED', entityType: 'Release', entityId: 'rel_ir004', description: 'Scheduled release IR004 "Vortex Rhythm" with 2 tracks and target release date 2026-09-18.', timestamp: '2026-08-10T10:15:00Z' },
  { id: 'act_002', actor: 'Indigo Sync Engine', action: 'SYNCED', entityType: 'IndigoWebsiteConnector', entityId: 'sync_job_init', description: 'Reconciled 4 catalog releases and 4 artists from indigosrecords.site without conflicts.', timestamp: '2026-08-10T12:00:00Z' },
  { id: 'act_003', actor: 'Marco De Luca', action: 'UPDATED', entityType: 'Demo', entityId: 'demo_002', description: 'Moved demo "Sub Terraneo" by Lucas Rivas to NEGOTIATION stage with score 9.4.', timestamp: '2026-08-13T16:40:00Z' },
];

// ============================================================
// IN-MEMORY STORE
// ============================================================

class IndigoStore {
  users: User[] = [...INITIAL_USERS];
  artists: Artist[] = [...INITIAL_ARTISTS];
  releases: Release[] = [...INITIAL_RELEASES];
  tracks: Track[] = [...INITIAL_TRACKS];
  demos: Demo[] = [...INITIAL_DEMOS];
  contacts: Contact[] = [...INITIAL_CONTACTS];
  campaigns: Campaign[] = [...INITIAL_CAMPAIGNS];
  tasks: Task[] = [...INITIAL_TASKS];
  calendar: CalendarEvent[] = [...INITIAL_CALENDAR];
  revenues: Revenue[] = [...INITIAL_REVENUE];
  expenses: Expense[] = [...INITIAL_EXPENSES];
  royalties: Royalty[] = [...INITIAL_ROYALTIES];
  contracts: Contract[] = [...INITIAL_CONTRACTS];
  assets: Asset[] = [...INITIAL_ASSETS];
  activityLogs: ActivityLog[] = [...INITIAL_ACTIVITY_LOGS];
  aiKnowledge: AIKnowledge[] = [...INITIAL_AI_KNOWLEDGE];

  getUsers() { return this.users; }
  getArtists() { return this.artists; }
  getReleases() { return this.releases; }
  getTracks() { return this.tracks; }
  getDemos() { return this.demos; }
  getContacts() { return this.contacts; }
  getCampaigns() { return this.campaigns; }
  getTasks() { return this.tasks; }
  getCalendarEvents() { return this.calendar; }
  getRevenues() { return this.revenues; }
  getExpenses() { return this.expenses; }
  getRoyalties() { return this.royalties; }
  getPayouts() { return []; }
  getContracts() { return this.contracts; }
  getAssets() { return this.assets; }
  getActivityLogs() { return this.activityLogs; }
  getAIKnowledge() { return this.aiKnowledge; }
  getIntegrations() {
    return [{ id: 'int_website', name: 'Indigo Website', service: 'WEBSITE' as const, connected: true, lastPing: '2026-08-14T00:00:00Z', statusMessage: 'Synced', configuredKeys: ['artists', 'releases', 'tracks', 'assets', 'catalog'] }];
  }

  getDashboardMetrics() {
    const grossRevenue = this.revenues.reduce((s, r) => s + r.grossAmount, 0);
    const totalExpenses = this.expenses.reduce((s, e) => s + e.amount, 0);
    return { grossRevenue, totalExpenses, netCashFlow: grossRevenue - totalExpenses, totalStreams: this.releases.reduce((s, r) => s + r.totalStreams, 0), avgTekkScore: Math.round(this.releases.reduce((s, r) => s + (r.tekkScore || 0), 0) / this.releases.length) };
  }

  saveArtist(artist: any) {
    const idx = this.artists.findIndex(a => a.id === artist.id);
    if (idx >= 0) this.artists[idx] = {...this.artists[idx], ...artist};
    else this.artists.push(artist);
    return artist;
  }
  saveRelease(release: any) {
    const idx = this.releases.findIndex(r => r.id === release.id);
    if (idx >= 0) this.releases[idx] = {...this.releases[idx], ...release};
    else this.releases.push(release);
    return release;
  }
  saveTrack(track: any) {
    const idx = this.tracks.findIndex(t => t.id === track.id);
    if (idx >= 0) this.tracks[idx] = {...this.tracks[idx], ...track};
    else this.tracks.push(track);
    return track;
  }
  saveDemo(demo: any) { const idx = this.demos.findIndex(d => d.id === demo.id); if (idx >= 0) this.demos[idx] = demo; else this.demos.push(demo); return demo; }
  saveContact(contact: any) { const idx = this.contacts.findIndex(c => c.id === contact.id); if (idx >= 0) this.contacts[idx] = contact; else this.contacts.push(contact); return contact; }
  saveCampaign(campaign: any) { const idx = this.campaigns.findIndex(c => c.id === campaign.id); if (idx >= 0) this.campaigns[idx] = campaign; else this.campaigns.push(campaign); return campaign; }
  saveTask(task: any) { const idx = this.tasks.findIndex(t => t.id === task.id); if (idx >= 0) this.tasks[idx] = {...this.tasks[idx], ...task}; else this.tasks.push(task); return task; }
  saveCalendarEvent(event: any) { const idx = this.calendar.findIndex(e => e.id === event.id); if (idx >= 0) this.calendar[idx] = event; else this.calendar.push(event); return event; }
  saveExpense(expense: any) { const idx = this.expenses.findIndex(e => e.id === expense.id); if (idx >= 0) this.expenses[idx] = expense; else this.expenses.push(expense); return expense; }
  saveRoyalty(royalty: any) { const idx = this.royalties.findIndex(r => r.id === royalty.id); if (idx >= 0) this.royalties[idx] = royalty; else this.royalties.push(royalty); return royalty; }
  saveContract(contract: any) { const idx = this.contracts.findIndex(c => c.id === contract.id); if (idx >= 0) this.contracts[idx] = contract; else this.contracts.push(contract); return contract; }
  logActivity(actor: string, action: string, entityType: string, entityId: string, description: string) {
    this.activityLogs.unshift({ id: `act_${Date.now()}`, actor, action: action as any, entityType, entityId, description, timestamp: new Date().toISOString() });
  }
}

const indigoStore = new IndigoStore();

// ============================================================
// ROUTER
// ============================================================

const apiRouter = Router();

// Health check
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    system: 'INDIGO HQ',
    version: '1.0.0-PROD',
    time: new Date().toISOString(),
    storeRecords: { artists: indigoStore.getArtists().length, releases: indigoStore.getReleases().length, demos: indigoStore.getDemos().length, tasks: indigoStore.getTasks().length }
  });
});

// AUTH & RBAC
apiRouter.get('/auth/users', (_req: Request, res: Response) => res.json(indigoStore.getUsers()));

apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, role } = req.body;
  const users = indigoStore.getUsers();
  const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || users.find(u => u.role === role) || users[0];
  indigoStore.logActivity(user.displayName, 'APPROVED', 'User', user.id, `User signed in with role ${user.role}`);
  res.json({ user, token: `indigo_jwt_${user.id}_${Date.now()}` });
});

// COMMAND CENTER / DASHBOARD
apiRouter.get('/dashboard', (_req: Request, res: Response) => {
  const metrics = indigoStore.getDashboardMetrics();
  const recentActivity = indigoStore.getActivityLogs().slice(0, 10);
  const tasks = indigoStore.getTasks().slice(0, 6);
  const upcomingReleases = indigoStore.getReleases().filter(r => r.status === 'SCHEDULED' || r.status === 'MASTERING');
  const artists = indigoStore.getArtists().slice(0, 6);
  const revenues = indigoStore.getRevenues();
  const expenses = indigoStore.getExpenses();
  res.json({
    metrics,
    recentActivity,
    tasks,
    upcomingReleases,
    artists,
    financialSummary: {
      grossRevenue: metrics.grossRevenue,
      totalExpenses: metrics.totalExpenses,
      netCashFlow: metrics.netCashFlow,
      recentRevenues: revenues.slice(0, 4),
      recentExpenses: expenses.slice(0, 4)
    }
  });
});

// ARTISTS
apiRouter.get('/artists', (_req: Request, res: Response) => res.json(indigoStore.getArtists()));

apiRouter.post('/artists', (req: Request, res: Response) => {
  const newArtist = req.body;
  if (!newArtist.id) newArtist.id = `art_${Date.now()}`;
  const saved = indigoStore.saveArtist(newArtist, req.body.actor || 'Super Admin');
  res.json(saved);
});

// RELEASES & CATALOG
apiRouter.get('/releases', (_req: Request, res: Response) => res.json(indigoStore.getReleases()));

apiRouter.post('/releases', (req: Request, res: Response) => {
  const newRelease = req.body;
  if (!newRelease.id) newRelease.id = `rel_${(newRelease.catalogNumber || Date.now()).toString().toLowerCase()}`;
  const saved = indigoStore.saveRelease(newRelease, req.body.actor || 'Super Admin');
  res.json(saved);
});

apiRouter.get('/tracks', (req: Request, res: Response) => {
  let tracks = indigoStore.getTracks();
  if (req.query.releaseId) tracks = tracks.filter(t => t.releaseId === req.query.releaseId);
  res.json(tracks);
});

apiRouter.post('/tracks', (req: Request, res: Response) => {
  const newTrack = req.body;
  if (!newTrack.id) newTrack.id = `trk_${Date.now()}`;
  const saved = indigoStore.saveTrack(newTrack, req.body.actor || 'Super Admin');
  res.json(saved);
});

// A&R DEMOS
apiRouter.get('/demos', (_req: Request, res: Response) => res.json(indigoStore.getDemos()));

apiRouter.post('/demos', (req: Request, res: Response) => {
  const newDemo = req.body;
  if (!newDemo.id) { newDemo.id = `demo_${Date.now()}`; newDemo.submissionDate = new Date().toISOString().split('T')[0]; }
  const saved = indigoStore.saveDemo(newDemo, req.body.actor || 'A&R Team');
  res.json(saved);
});

apiRouter.patch('/demos/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes, score } = req.body;
  const demo = indigoStore.getDemos().find(d => d.id === id);
  if (!demo) return res.status(404).json({ error: 'Demo not found' });
  if (status) demo.status = status;
  if (notes) demo.notes = notes;
  if (score !== undefined) demo.score = score;
  indigoStore.saveDemo(demo, req.body.actor || 'A&R Team');
  res.json(demo);
});

// CONTACTS & CRM
apiRouter.get('/contacts', (_req: Request, res: Response) => res.json(indigoStore.getContacts()));

apiRouter.post('/contacts', (req: Request, res: Response) => {
  const newContact = req.body;
  if (!newContact.id) newContact.id = `cnt_${Date.now()}`;
  const saved = indigoStore.saveContact(newContact, req.body.actor || 'Super Admin');
  res.json(saved);
});

// CAMPAIGNS & MARKETING
apiRouter.get('/campaigns', (_req: Request, res: Response) => res.json(indigoStore.getCampaigns()));

apiRouter.post('/campaigns', (req: Request, res: Response) => {
  const newCampaign = req.body;
  if (!newCampaign.id) newCampaign.id = `cmp_${Date.now()}`;
  const saved = indigoStore.saveCampaign(newCampaign, req.body.actor || 'Marketing Lead');
  res.json(saved);
});

// TASKS
apiRouter.get('/tasks', (_req: Request, res: Response) => res.json(indigoStore.getTasks()));

apiRouter.post('/tasks', (req: Request, res: Response) => {
  const newTask = req.body;
  if (!newTask.id) { newTask.id = `tsk_${Date.now()}`; newTask.createdAt = new Date().toISOString(); }
  const saved = indigoStore.saveTask(newTask, req.body.actor || 'Super Admin');
  res.json(saved);
});

apiRouter.patch('/tasks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const task = indigoStore.getTasks().find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  Object.assign(task, req.body);
  indigoStore.saveTask(task, req.body.actor || 'Super Admin');
  res.json(task);
});

// CALENDAR
apiRouter.get('/calendar', (_req: Request, res: Response) => res.json(indigoStore.getCalendarEvents()));

apiRouter.post('/calendar', (req: Request, res: Response) => {
  const newEvent = req.body;
  if (!newEvent.id) newEvent.id = `cal_${Date.now()}`;
  const saved = indigoStore.saveCalendarEvent(newEvent, req.body.actor || 'Super Admin');
  res.json(saved);
});

// FINANCE & ROYALTIES
apiRouter.get('/finance', (_req: Request, res: Response) => res.json({
  revenues: indigoStore.getRevenues(),
  expenses: indigoStore.getExpenses(),
  royalties: indigoStore.getRoyalties(),
  payouts: indigoStore.getPayouts()
}));

apiRouter.post('/finance/expense', (req: Request, res: Response) => {
  const newExpense = req.body;
  if (!newExpense.id) newExpense.id = `exp_${Date.now()}`;
  const saved = indigoStore.saveExpense(newExpense, req.body.actor || 'Finance Lead');
  res.json(saved);
});

apiRouter.post('/finance/royalty', (req: Request, res: Response) => {
  const newRoyalty = req.body;
  if (!newRoyalty.id) newRoyalty.id = `roy_${Date.now()}`;
  const saved = indigoStore.saveRoyalty(newRoyalty, req.body.actor || 'Finance Lead');
  res.json(saved);
});

// CONTRACTS
apiRouter.get('/contracts', (_req: Request, res: Response) => res.json(indigoStore.getContracts()));

apiRouter.post('/contracts', (req: Request, res: Response) => {
  const newContract = req.body;
  if (!newContract.id) newContract.id = `cntr_${Date.now()}`;
  const saved = indigoStore.saveContract(newContract, req.body.actor || 'Super Admin');
  res.json(saved);
});

// ASSETS
apiRouter.get('/assets', (_req: Request, res: Response) => res.json(indigoStore.getAssets()));

// INTEGRATIONS
apiRouter.get('/integrations', (_req: Request, res: Response) => res.json(indigoStore.getIntegrations()));

// ACTIVITY LOGS
apiRouter.get('/activity-logs', (_req: Request, res: Response) => res.json(indigoStore.getActivityLogs()));

// SYNC CENTER
apiRouter.get('/sync/status', (_req: Request, res: Response) => {
  res.json({
    connected: true,
    websiteUrl: 'https://indigosrecords.site',
    lastSync: null,
    status: 'IDLE',
    summary: {
      artistsCount: indigoStore.getArtists().length,
      releasesCount: indigoStore.getReleases().length,
      assetsCount: indigoStore.getAssets().length,
      unresolvedErrors: 0
    },
    recentJobs: [],
    logs: [],
    errors: []
  });
});

apiRouter.post('/sync/trigger', async (_req: Request, res: Response) => {
  res.json({ success: true, job: { id: `sync_${Date.now()}` }, message: 'Dry run completed - no remote connector configured, data is local only' });
});

apiRouter.post('/sync/retry-error', async (_req: Request, res: Response) => {
  res.json({ success: true, message: 'No errors to retry' });
});

// INDIGO AI
apiRouter.post('/ai/chat', async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message prompt is required' });
  try {
    res.json({
      reply: `Indigo AI: I've received your query about "${message.substring(0, 80)}". This is a placeholder — connect Gemini API key in environment to enable real AI analysis. I know about ${indigoStore.getArtists().length} artists, ${indigoStore.getReleases().length} releases, and ${indigoStore.getTasks().length} open tasks.`,
      context: 'local_store'
    });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

apiRouter.get('/ai/knowledge', (_req: Request, res: Response) => res.json(indigoStore.getAIKnowledge()));

// ============================================================
// HANDLER
// ============================================================

export default function handler(req: Request, res: Response) {
  apiRouter(req, res);
}
