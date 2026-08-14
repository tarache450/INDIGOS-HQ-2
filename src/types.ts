export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'LABEL_MANAGER' 
  | 'MARKETING' 
  | 'A_AND_R' 
  | 'FINANCE' 
  | 'ARTIST';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  artistId?: string; // Linked artist if role is ARTIST
  department?: string;
  createdAt: string;
}

export interface ExternalReference {
  internalId: string;
  externalId: string;
  source: 'indigo-website' | 'songstats' | 'tekkin' | 'spotify' | 'beatport' | 'manual';
  lastSyncedAt: string;
  syncStatus: 'SYNCED' | 'PENDING' | 'CONFLICT' | 'ERROR';
}

export interface ArtistLink {
  platform: 'spotify' | 'apple' | 'beatport' | 'soundcloud' | 'instagram' | 'website';
  url: string;
}

export interface Artist {
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

export interface TrackContributor {
  name: string;
  role: 'COMPOSER' | 'PRODUCER' | 'VOCALIST' | 'MIXER' | 'MASTERING' | 'REMIXER';
  ipiNumber?: string;
}

export interface Split {
  recipientName: string;
  recipientEmail?: string;
  artistId?: string;
  role: string;
  percentage: number; // Sum must equal 100
}

export interface TekkAnalysis {
  clubScore: number; // 0-100 score from TEKKIN algorithm
  subBassEnergy: number; // percentage
  stereoWidth: number; // percentage
  loudnessLufs: number; // e.g. -7.8
  dynamicRange: number; // dB
  keyConfidence: number; // percentage
  frequencySpectrumRating: 'OPTIMAL' | 'MODERATE' | 'LOW_ENERGY' | 'OVER_COMPRESSED';
}

export interface Track {
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

export interface Release {
  id: string;
  catalogNumber: string; // e.g. IR001, IR002, IR003, IR004
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

export interface CatalogEntry {
  id: string;
  catalogNumber: string;
  releaseId: string;
  title: string;
  artist: string;
  format: 'DIGITAL' | 'VINYL' | 'STREAMING';
  releaseDate: string;
  masterStatus: 'DELIVERED' | 'PENDING' | 'APPROVED';
  dspStatus: {
    spotify: 'LIVE' | 'PENDING' | 'FAILED';
    appleMusic: 'LIVE' | 'PENDING' | 'FAILED';
    beatport: 'LIVE' | 'PENDING' | 'FAILED';
    soundcloud: 'LIVE' | 'PENDING' | 'FAILED';
    youtubeMusic: 'LIVE' | 'PENDING' | 'FAILED';
  };
}

export interface Demo {
  id: string;
  artistName: string;
  trackTitle: string;
  email: string;
  audioUrl: string;
  genre: string;
  bpm: number;
  submissionDate: string;
  score: number; // 1-10
  tekkScore?: number; // 0-100 club-readiness score
  status: 'NEW' | 'LISTENING' | 'SHORTLIST' | 'CONTACTED' | 'NEGOTIATION' | 'SIGNED' | 'REJECTED';
  notes: string;
  feedbackSent: boolean;
  territory?: string;
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone?: string;
  territory: string;
  category: 
    | 'A_AND_R' 
    | 'LABEL' 
    | 'DISTRIBUTOR' 
    | 'ARTIST' 
    | 'MANAGER' 
    | 'DJ' 
    | 'PLAYLIST_CURATOR' 
    | 'RADIO' 
    | 'PRESS' 
    | 'PROMOTER' 
    | 'PUBLISHER';
  lastContactDate: string;
  nextActionDate?: string;
  nextActionNotes?: string;
  notes: string;
  tags: string[];
}

export interface Interaction {
  id: string;
  contactId: string;
  type: 'EMAIL' | 'CALL' | 'MEETING' | 'DEMO_PITCH' | 'CONTRACT_TALK';
  date: string;
  notes: string;
  loggedBy: string;
}

export interface Campaign {
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

export interface ContentItem {
  id: string;
  campaignId: string;
  title: string;
  type: 'INSTAGRAM_REEL' | 'TIKTOK' | 'TEASER' | 'ARTWORK_REVEAL' | 'PRESS_RELEASE' | 'DJ_CLIP';
  scheduledDate: string;
  status: 'DRAFT' | 'APPROVED' | 'POSTED';
  assetUrl?: string;
  copyText?: string;
  platform: string;
}

export interface Task {
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

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  type: 'RELEASE' | 'CAMPAIGN' | 'TASK' | 'MEETING' | 'CONTENT' | 'FOLLOW_UP' | 'PAYMENT' | 'CONTRACT';
  relatedId?: string;
  description?: string;
  time?: string;
}

export interface Revenue {
  id: string;
  period: string; // e.g. "2026-Q1" or "2026-07"
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

export interface Expense {
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

export interface Royalty {
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

export interface Payout {
  id: string;
  recipient: string;
  artistId: string;
  amount: number;
  currency: string;
  method: 'BANK_TRANSFER' | 'PAYPAL' | 'WISE' | 'CRYPTO';
  date: string;
  status: 'SCHEDULED' | 'PROCESSED' | 'FAILED';
  reference: string;
}

export interface Contract {
  id: string;
  artistId: string;
  artistName: string;
  title: string;
  type: 'EXCLUSIVE_ARTIST' | 'SINGLE_TRACK_RELEASE' | 'EP_AGREEMENT' | 'REMIX_LICENSE' | 'DISTRIBUTION_DEAL';
  startDate: string;
  expirationDate: string;
  status: 'DRAFT' | 'PENDING_SIGNATURE' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
  royaltyRate: number; // percentage e.g. 50
  territory: string;
  notes: string;
  fileUrl?: string;
}

export interface DistributionRecord {
  id: string;
  releaseId: string;
  releaseTitle: string;
  distributor: 'FUGA' | 'DISTROKID' | 'LABEL_ENGINE' | 'BELIEVE' | 'TUNECORE';
  upc: string;
  deliveryDate: string;
  status: 'DELIVERED' | 'PENDING' | 'METADATA_ERROR' | 'TAKEDOWN';
  dsps: {
    spotify: boolean;
    apple: boolean;
    beatport: boolean;
    soundcloud: boolean;
    youtube: boolean;
    tidal: boolean;
    deezer: boolean;
  };
  errors?: string[];
}

export interface Asset {
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

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: 'INTERNAL' | 'A_AND_R' | 'MEETING' | 'STRATEGY';
  relatedEntityType?: string;
  relatedEntityId?: string;
  createdAt: string;
  author: string;
}

export interface AnalyticsRecord {
  id: string;
  entityType: 'LABEL' | 'ARTIST' | 'RELEASE';
  entityId: string;
  period: string;
  streams: number;
  listeners: number;
  saves: number;
  playlistReach: number;
  topTerritories: { country: string; percentage: number }[];
  dspBreakdown: { dsp: string; streams: number; revenue: number }[];
}

export interface Integration {
  id: string;
  name: string;
  service: 'WEBSITE' | 'SONGSTATS' | 'TEKKIN' | 'SPOTIFY_FOR_LABELS' | 'BEATPORT' | 'APPLE_MUSIC';
  connected: boolean;
  lastPing?: string;
  statusMessage?: string;
  configuredKeys: string[];
}

export interface ActivityLog {
  id: string;
  actor: string;
  action: 'CREATED' | 'UPDATED' | 'DELETED' | 'IMPORTED' | 'SYNCED' | 'PUBLISHED' | 'APPROVED' | 'PAYMENT' | 'CONTRACT' | 'CAMPAIGN' | 'TASK' | 'AI_TOOL_RUN';
  entityType: string;
  entityId: string;
  description: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface AIKnowledge {
  id: string;
  category: 'BRAND' | 'LABEL_POLICY' | 'ARTIST_GUIDE' | 'MARKETING_PLAYBOOK' | 'A_AND_R_CRITERIA' | 'DISTRIBUTION_RULES' | 'FINANCE_GUIDELINE';
  title: string;
  content: string;
  updatedAt: string;
}

export interface SyncJob {
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
  entitiesProcessed: {
    artists: number;
    releases: number;
    assets: number;
    catalog: number;
  };
}

export interface SyncLog {
  id: string;
  jobId: string;
  message: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  timestamp: string;
}

export interface SyncError {
  id: string;
  jobId: string;
  entity: string;
  externalId: string;
  error: string;
  timestamp: string;
  status: 'UNRESOLVED' | 'RESOLVED' | 'IGNORED';
  retryCount: number;
}
