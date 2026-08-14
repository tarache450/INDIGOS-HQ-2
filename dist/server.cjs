var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  createApp: () => createApp,
  default: () => handler
});
module.exports = __toCommonJS(server_exports);
var import_express2 = __toESM(require("express"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_fs2 = __toESM(require("fs"), 1);

// src/server/api/routes.ts
var import_express = require("express");

// src/server/db/seedData.ts
var INITIAL_USERS = [
  {
    id: "usr_super_admin",
    email: "tarache450@gmail.com",
    displayName: "Tarache (Super Admin)",
    role: "SUPER_ADMIN",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Executive Direction & Label Head",
    createdAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "usr_label_mgr",
    email: "manager@indigosrecords.site",
    displayName: "Elena Vance (Label Manager)",
    role: "LABEL_MANAGER",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    department: "Operations & Release Management",
    createdAt: "2025-02-15T00:00:00Z"
  },
  {
    id: "usr_ar_lead",
    email: "ar@indigosrecords.site",
    displayName: "Marco De Luca (A&R Director)",
    role: "A_AND_R",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "A&R & Talent Scouting",
    createdAt: "2025-03-01T00:00:00Z"
  },
  {
    id: "usr_marketing",
    email: "marketing@indigosrecords.site",
    displayName: "Sofia Chen (Marketing Lead)",
    role: "MARKETING",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    department: "Marketing & Digital PR",
    createdAt: "2025-03-10T00:00:00Z"
  },
  {
    id: "usr_finance",
    email: "finance@indigosrecords.site",
    displayName: "Julian Ross (Head of Finance)",
    role: "FINANCE",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    department: "Financial Operations & Royalties",
    createdAt: "2025-03-15T00:00:00Z"
  },
  {
    id: "usr_artist_maniky",
    email: "maniky@indigosartists.com",
    displayName: "Maniky (Roster Artist)",
    role: "ARTIST",
    artistId: "art_maniky",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    department: "Exclusive Artist",
    createdAt: "2025-04-01T00:00:00Z"
  }
];
var INITIAL_ARTISTS = [
  {
    id: "art_maniky",
    name: "Maniky",
    slug: "maniky",
    bio: "Pioneering sound architect blending micro-textures, deep driving basslines, and hypnotic atmospheres in the Minimal & Deep Tech realm.",
    photoUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    genres: ["Deep Tech", "Minimal", "Tech House"],
    status: "ACTIVE",
    country: "Spain",
    city: "Barcelona",
    monthlyListeners: 48500,
    followersCount: 12400,
    signedDate: "2024-11-10",
    pressKitUrl: "https://indigosrecords.site/artists/maniky/presskit.pdf",
    links: [
      { platform: "spotify", url: "https://open.spotify.com/artist/maniky" },
      { platform: "beatport", url: "https://www.beatport.com/artist/maniky" },
      { platform: "instagram", url: "https://instagram.com/manikymusic" }
    ],
    externalReference: {
      internalId: "art_maniky",
      externalId: "ext_artist_maniky_001",
      source: "indigo-website",
      lastSyncedAt: "2026-08-10T12:00:00Z",
      syncStatus: "SYNCED"
    },
    internalNotes: "Key headliner for Indigo showcases. Outstanding mix quality verified with TEKKIN score 94."
  },
  {
    id: "art_naveci",
    name: "Naveci",
    slug: "naveci",
    bio: "Underground synthesist known for subtle modular rhythms, warm analog chords, and timeless club arrangements.",
    photoUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    bannerUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80",
    genres: ["Minimal", "Microhouse", "Deep Tech"],
    status: "ACTIVE",
    country: "Germany",
    city: "Berlin",
    monthlyListeners: 31200,
    followersCount: 8900,
    signedDate: "2024-11-15",
    links: [
      { platform: "spotify", url: "https://open.spotify.com/artist/naveci" },
      { platform: "beatport", url: "https://www.beatport.com/artist/naveci" }
    ],
    externalReference: {
      internalId: "art_naveci",
      externalId: "ext_artist_naveci_002",
      source: "indigo-website",
      lastSyncedAt: "2026-08-10T12:00:00Z",
      syncStatus: "SYNCED"
    },
    internalNotes: "Collaborator on IR001 Haval Whispers. Preparing solo EP for 2026 Q4."
  },
  {
    id: "art_stephan_embee",
    name: "Stephan Embee",
    slug: "stephan-embee",
    bio: "Groove purveyor creating high-octane minimal tech house with infectious vocal stabs and punchy percussion.",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    genres: ["Tech House", "Minimal Tech"],
    status: "ACTIVE",
    country: "United Kingdom",
    city: "London",
    monthlyListeners: 64100,
    followersCount: 16800,
    signedDate: "2025-01-20",
    links: [
      { platform: "spotify", url: "https://open.spotify.com/artist/stephanembee" },
      { platform: "beatport", url: "https://www.beatport.com/artist/stephan-embee" }
    ],
    externalReference: {
      internalId: "art_stephan_embee",
      externalId: "ext_artist_stephanembee_003",
      source: "indigo-website",
      lastSyncedAt: "2026-08-10T12:00:00Z",
      syncStatus: "SYNCED"
    },
    internalNotes: 'Producer of IR002 "Bem Bora". Beatport Top 10 Minimal/Deep Tech placement.'
  },
  {
    id: "art_tarache",
    name: "Tarache",
    slug: "tarache",
    bio: "Indigo Records founder and visionary sound designer crafting atmospheric nocturnal journeys and relentless subterranean club tracks.",
    photoUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    genres: ["Minimal Deep Tech", "Techno", "Deep Tech"],
    status: "ACTIVE",
    country: "Spain",
    city: "Madrid",
    monthlyListeners: 52e3,
    followersCount: 14500,
    signedDate: "2024-09-01",
    links: [
      { platform: "spotify", url: "https://open.spotify.com/artist/tarache" },
      { platform: "beatport", url: "https://www.beatport.com/artist/tarache" },
      { platform: "instagram", url: "https://instagram.com/tarache" }
    ],
    externalReference: {
      internalId: "art_tarache",
      externalId: "ext_artist_tarache_004",
      source: "indigo-website",
      lastSyncedAt: "2026-08-10T12:00:00Z",
      syncStatus: "SYNCED"
    },
    internalNotes: "Label founder, curator, and executive A&R."
  }
];
var INITIAL_RELEASES = [
  {
    id: "rel_ir001",
    catalogNumber: "IR001",
    title: "Haval Whispers",
    artistId: "art_maniky",
    artistName: "Maniky & Naveci",
    type: "SINGLE",
    releaseDate: "2025-03-28",
    status: "RELEASED",
    artworkUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    upc: "198712340001",
    isrc: "ES-IND-25-00001",
    genres: ["Deep Tech", "Minimal"],
    spotifyUrl: "https://open.spotify.com/album/havalwhispers",
    beatportUrl: "https://www.beatport.com/release/haval-whispers/489001",
    description: "Inaugural release of Indigo Records. Deep rolling sub-frequencies with organic percussion and ethereal vocal snippets.",
    tekkScore: 92,
    totalStreams: 142800,
    labelSharePercentage: 50,
    tracksCount: 2,
    externalReference: {
      internalId: "rel_ir001",
      externalId: "ext_release_ir001",
      source: "indigo-website",
      lastSyncedAt: "2026-08-10T12:00:00Z",
      syncStatus: "SYNCED"
    }
  },
  {
    id: "rel_ir002",
    catalogNumber: "IR002",
    title: "Bem Bora",
    artistId: "art_stephan_embee",
    artistName: "Stephan Embee",
    type: "SINGLE",
    releaseDate: "2025-05-16",
    status: "RELEASED",
    artworkUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80",
    upc: "198712340002",
    isrc: "ES-IND-25-00002",
    genres: ["Tech House", "Minimal Tech"],
    spotifyUrl: "https://open.spotify.com/album/bembora",
    beatportUrl: "https://www.beatport.com/release/bem-bora/489002",
    description: "Energetic peak-time tech house track featuring driving syncopated basslines and festival-tested groove tension.",
    tekkScore: 96,
    totalStreams: 289400,
    labelSharePercentage: 50,
    tracksCount: 2,
    externalReference: {
      internalId: "rel_ir002",
      externalId: "ext_release_ir002",
      source: "indigo-website",
      lastSyncedAt: "2026-08-10T12:00:00Z",
      syncStatus: "SYNCED"
    }
  },
  {
    id: "rel_ir003",
    catalogNumber: "IR003",
    title: "Echoes of Night",
    artistId: "art_tarache",
    artistName: "Tarache",
    type: "EP",
    releaseDate: "2025-09-05",
    status: "RELEASED",
    artworkUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    upc: "198712340003",
    isrc: "ES-IND-25-00003",
    genres: ["Minimal Deep Tech", "Underground"],
    spotifyUrl: "https://open.spotify.com/album/echoesofnight",
    beatportUrl: "https://www.beatport.com/release/echoes-of-night/489003",
    description: "3-track subterranean journey capturing the raw essence of after-hours warehouse spaces.",
    tekkScore: 94,
    totalStreams: 184500,
    labelSharePercentage: 50,
    tracksCount: 3,
    externalReference: {
      internalId: "rel_ir003",
      externalId: "ext_release_ir003",
      source: "indigo-website",
      lastSyncedAt: "2026-08-10T12:00:00Z",
      syncStatus: "SYNCED"
    }
  },
  {
    id: "rel_ir004",
    catalogNumber: "IR004",
    title: "Vortex Rhythm",
    artistId: "art_maniky",
    artistName: "Maniky",
    type: "SINGLE",
    releaseDate: "2026-09-18",
    status: "SCHEDULED",
    artworkUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    upc: "198712340004",
    isrc: "ES-IND-26-00004",
    genres: ["Tech House", "Minimal"],
    description: "Upcoming flagship release with TEKKIN club-readiness score of 98. Major DJ promo campaign underway.",
    tekkScore: 98,
    totalStreams: 0,
    labelSharePercentage: 50,
    tracksCount: 2,
    externalReference: {
      internalId: "rel_ir004",
      externalId: "ext_release_ir004",
      source: "indigo-website",
      lastSyncedAt: "2026-08-10T12:00:00Z",
      syncStatus: "SYNCED"
    }
  }
];
var INITIAL_TRACKS = [
  {
    id: "trk_001_1",
    releaseId: "rel_ir001",
    title: "Haval Whispers",
    mixName: "Original Mix",
    isrc: "ES-IND-25-00001-1",
    duration: "6:42",
    durationSec: 402,
    bpm: 126,
    key: "A minor",
    genres: ["Deep Tech", "Minimal"],
    artists: ["Maniky", "Naveci"],
    contributors: [
      { name: "Maniky", role: "PRODUCER" },
      { name: "Naveci", role: "PRODUCER" },
      { name: "Tarache", role: "MASTERING" }
    ],
    splits: [
      { recipientName: "Maniky", role: "Artist / Producer", percentage: 25 },
      { recipientName: "Naveci", role: "Artist / Producer", percentage: 25 },
      { recipientName: "Indigo Records", role: "Record Label", percentage: 50 }
    ],
    tekkAnalysis: {
      clubScore: 92,
      subBassEnergy: 88,
      stereoWidth: 76,
      loudnessLufs: -7.8,
      dynamicRange: 7.2,
      keyConfidence: 99,
      frequencySpectrumRating: "OPTIMAL"
    }
  },
  {
    id: "trk_001_2",
    releaseId: "rel_ir001",
    title: "Haval Whispers",
    mixName: "Dub Mix",
    isrc: "ES-IND-25-00001-2",
    duration: "6:15",
    durationSec: 375,
    bpm: 126,
    key: "A minor",
    genres: ["Deep Tech"],
    artists: ["Maniky", "Naveci"],
    contributors: [
      { name: "Maniky", role: "PRODUCER" },
      { name: "Naveci", role: "PRODUCER" }
    ],
    splits: [
      { recipientName: "Maniky", role: "Artist / Producer", percentage: 25 },
      { recipientName: "Naveci", role: "Artist / Producer", percentage: 25 },
      { recipientName: "Indigo Records", role: "Record Label", percentage: 50 }
    ],
    tekkAnalysis: {
      clubScore: 90,
      subBassEnergy: 91,
      stereoWidth: 72,
      loudnessLufs: -8,
      dynamicRange: 7.6,
      keyConfidence: 98,
      frequencySpectrumRating: "OPTIMAL"
    }
  },
  {
    id: "trk_002_1",
    releaseId: "rel_ir002",
    title: "Bem Bora",
    mixName: "Extended Mix",
    isrc: "ES-IND-25-00002-1",
    duration: "5:58",
    durationSec: 358,
    bpm: 128,
    key: "F# minor",
    genres: ["Tech House"],
    artists: ["Stephan Embee"],
    contributors: [
      { name: "Stephan Embee", role: "PRODUCER" }
    ],
    splits: [
      { recipientName: "Stephan Embee", role: "Artist", percentage: 50 },
      { recipientName: "Indigo Records", role: "Record Label", percentage: 50 }
    ],
    tekkAnalysis: {
      clubScore: 96,
      subBassEnergy: 94,
      stereoWidth: 82,
      loudnessLufs: -6.9,
      dynamicRange: 6.8,
      keyConfidence: 100,
      frequencySpectrumRating: "OPTIMAL"
    }
  },
  {
    id: "trk_004_1",
    releaseId: "rel_ir004",
    title: "Vortex Rhythm",
    mixName: "Club Mix",
    isrc: "ES-IND-26-00004-1",
    duration: "6:22",
    durationSec: 382,
    bpm: 127,
    key: "D minor",
    genres: ["Minimal Tech"],
    artists: ["Maniky"],
    contributors: [
      { name: "Maniky", role: "PRODUCER" },
      { name: "Indigo Mastering Lab", role: "MASTERING" }
    ],
    splits: [
      { recipientName: "Maniky", role: "Artist", percentage: 50 },
      { recipientName: "Indigo Records", role: "Record Label", percentage: 50 }
    ],
    tekkAnalysis: {
      clubScore: 98,
      subBassEnergy: 96,
      stereoWidth: 88,
      loudnessLufs: -6.5,
      dynamicRange: 6.4,
      keyConfidence: 100,
      frequencySpectrumRating: "OPTIMAL"
    }
  }
];
var INITIAL_DEMOS = [
  {
    id: "demo_001",
    artistName: "Kallisto Sound",
    trackTitle: "Midnight Transit",
    email: "kallisto@audioflux.de",
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/humming_room.ogg",
    genre: "Deep Tech",
    bpm: 127,
    submissionDate: "2026-08-11",
    score: 8.9,
    tekkScore: 91,
    status: "SHORTLIST",
    notes: "Incredible groove balance. Bassline slides fit Indigo sound identity seamlessly. Need extended intro for DJ play.",
    feedbackSent: true,
    territory: "Germany"
  },
  {
    id: "demo_002",
    artistName: "Lucas Rivas",
    trackTitle: "Sub Terraneo",
    email: "lucasrivas.dj@gmail.com",
    audioUrl: "https://actions.google.com/sounds/v1/science_fiction/futuristic_sub_sweep.ogg",
    genre: "Minimal Tech",
    bpm: 126,
    submissionDate: "2026-08-13",
    score: 9.4,
    tekkScore: 95,
    status: "NEGOTIATION",
    notes: "Priority single candidate for IR005. Offer sent for Single Track Agreement with 50/50 net splits.",
    feedbackSent: true,
    territory: "Argentina"
  },
  {
    id: "demo_003",
    artistName: "Aura Decay",
    trackTitle: "Static Waves",
    email: "contact@auradecay.com",
    audioUrl: "https://actions.google.com/sounds/v1/weather/rain_heavy.ogg",
    genre: "Melodic Underground",
    bpm: 124,
    submissionDate: "2026-08-14",
    score: 7.2,
    tekkScore: 78,
    status: "LISTENING",
    notes: "Atmosphere is great but mid-range percussion lacks punch on club sound systems.",
    feedbackSent: false,
    territory: "United Kingdom"
  }
];
var INITIAL_CONTACTS = [
  {
    id: "cnt_001",
    name: "Carlos Mendez",
    company: "Minimal Force Playlists",
    role: "Head Curator",
    email: "carlos@minimalforce.io",
    territory: "Spain & Europe",
    category: "PLAYLIST_CURATOR",
    lastContactDate: "2026-08-05",
    nextActionDate: "2026-08-20",
    nextActionNotes: 'Pitch IR004 "Vortex Rhythm" for top position in Underground Tech Daily playlist.',
    notes: "Supports all Indigo releases. 450k active weekly playlist followers.",
    tags: ["Spotify", "High Priority", "Minimal"]
  },
  {
    id: "cnt_002",
    name: "Antoine Lefevre",
    company: "Rex Club Paris / Rinse France",
    role: "Resident DJ & Radio Host",
    email: "antoine@rexclub.fr",
    territory: "France",
    category: "DJ",
    lastContactDate: "2026-08-01",
    nextActionDate: "2026-08-25",
    nextActionNotes: "Send promo pack for IR004 promo delivery.",
    notes: "Played IR002 in 4 peak-time festival sets. Requested early WAV promos.",
    tags: ["DJ Promo", "Tastemaker", "Rex Club"]
  },
  {
    id: "cnt_003",
    name: "Beatport Editorial Team",
    company: "Beatport LLC",
    role: "Genre Editor - Minimal / Deep Tech",
    email: "editorial.minimal@beatport.com",
    territory: "Global",
    category: "PROMOTER",
    lastContactDate: "2026-07-28",
    nextActionDate: "2026-08-30",
    nextActionNotes: "Submit feature banner pitch 2 weeks prior to IR004 release.",
    notes: "Feature pitch form requires 14-day lead time with high-res artwork.",
    tags: ["Beatport", "Editorial", "Banner Pitch"]
  }
];
var INITIAL_CAMPAIGNS = [
  {
    id: "cmp_ir004_launch",
    title: 'IR004 "Vortex Rhythm" Global Launch',
    artistId: "art_maniky",
    releaseId: "rel_ir004",
    goal: "Exceed 300k streams across DSPs in first 60 days & achieve Beatport Top 5 Minimal/Deep Tech.",
    startDate: "2026-08-15",
    endDate: "2026-10-15",
    budget: 2500,
    spent: 620,
    status: "ACTIVE",
    channels: ["Spotify Editorial", "Beatport Banner", "DJ Inflyte Promo", "Instagram Ads", "TikTok Underground"],
    keyMetrics: {
      targetStreams: 3e5,
      achievedStreams: 0,
      playlistAdds: 18,
      pressFeatures: 4,
      djSupportsCount: 42
    }
  }
];
var INITIAL_TASKS = [
  {
    id: "tsk_001",
    title: "Deliver IR004 final WAV master to FUGA distributor",
    description: "Ensure 24-bit 44.1kHz master and ISRC tags match metadata before delivery.",
    status: "DONE",
    priority: "HIGH",
    deadline: "2026-08-10",
    assignedTo: "Julian Ross",
    relatedEntityType: "RELEASE",
    relatedEntityId: "rel_ir004",
    createdAt: "2026-08-01"
  },
  {
    id: "tsk_002",
    title: "Send IR004 DJ promo pool via Inflyte / PromoBox",
    description: "Target top 150 underground minimal DJs with personalized download links.",
    status: "IN_PROGRESS",
    priority: "URGENT",
    deadline: "2026-08-18",
    assignedTo: "Sofia Chen",
    relatedEntityType: "CAMPAIGN",
    relatedEntityId: "cmp_ir004_launch",
    createdAt: "2026-08-08"
  },
  {
    id: "tsk_003",
    title: "Finalize Single Agreement contract with Lucas Rivas",
    description: "Prepare contract PDF for IR005 demo submission and send via digital signature.",
    status: "TODO",
    priority: "HIGH",
    deadline: "2026-08-22",
    assignedTo: "Marco De Luca",
    relatedEntityType: "A_AND_R",
    relatedEntityId: "demo_002",
    createdAt: "2026-08-12"
  },
  {
    id: "tsk_004",
    title: "Run Q2 2026 Royalty Statement calculations & split checks",
    description: "Reconcile DSP receipts from Spotify and Beatport; verify 100% split totals before payouts.",
    status: "TODO",
    priority: "MEDIUM",
    deadline: "2026-08-30",
    assignedTo: "Julian Ross",
    relatedEntityType: "FINANCE",
    createdAt: "2026-08-14"
  }
];
var INITIAL_CALENDAR_EVENTS = [
  {
    id: "cal_001",
    title: "IR004 Inflyte DJ Promo Blast",
    date: "2026-08-18",
    type: "CAMPAIGN",
    relatedId: "cmp_ir004_launch",
    description: "Distribution to A-list underground DJs for club feedback."
  },
  {
    id: "cal_002",
    title: "Beatport Editorial Pitch Deadline (IR004)",
    date: "2026-08-28",
    type: "CAMPAIGN",
    description: "Submission of promotional assets and audio teasers."
  },
  {
    id: "cal_003",
    title: 'IR004 "Vortex Rhythm" Official Worldwide Release',
    date: "2026-09-18",
    type: "RELEASE",
    relatedId: "rel_ir004",
    description: "Available on all digital streaming platforms and vinyl store distributors."
  },
  {
    id: "cal_004",
    title: "A&R Talent Review Meeting",
    date: "2026-08-21",
    type: "MEETING",
    time: "16:00 CET",
    description: "Review short-listed demos and 2026 Q4 release pipeline."
  }
];
var INITIAL_REVENUE = [
  {
    id: "rev_001",
    period: "2026-Q1",
    source: "SPOTIFY",
    grossAmount: 4820.5,
    netAmount: 4100,
    deductions: 720.5,
    currency: "EUR",
    releaseId: "rel_ir002",
    releaseTitle: "Bem Bora (IR002)",
    status: "RECEIVED",
    statementDate: "2026-04-15"
  },
  {
    id: "rev_002",
    period: "2026-Q1",
    source: "BEATPORT",
    grossAmount: 3250,
    netAmount: 2600,
    deductions: 650,
    currency: "EUR",
    releaseId: "rel_ir002",
    releaseTitle: "Bem Bora (IR002)",
    status: "RECEIVED",
    statementDate: "2026-04-20"
  },
  {
    id: "rev_003",
    period: "2026-Q1",
    source: "APPLE_MUSIC",
    grossAmount: 1890,
    netAmount: 1610,
    deductions: 280,
    currency: "EUR",
    releaseId: "rel_ir001",
    releaseTitle: "Haval Whispers (IR001)",
    status: "RECEIVED",
    statementDate: "2026-04-22"
  }
];
var INITIAL_EXPENSES = [
  {
    id: "exp_001",
    title: "Analog Mastering for IR004 (2 Tracks)",
    category: "MASTERING",
    amount: 280,
    currency: "EUR",
    date: "2026-07-20",
    releaseId: "rel_ir004",
    paid: true
  },
  {
    id: "exp_002",
    title: "3D Artwork & Motion Cover for IR004",
    category: "ARTWORK",
    amount: 350,
    currency: "EUR",
    date: "2026-07-25",
    releaseId: "rel_ir004",
    paid: true
  },
  {
    id: "exp_003",
    title: "Inflyte DJ Promo Distribution Campaign",
    category: "PR_DISTRIBUTION",
    amount: 190,
    currency: "EUR",
    date: "2026-08-05",
    releaseId: "rel_ir004",
    paid: true
  }
];
var INITIAL_ROYALTIES = [
  {
    id: "roy_001",
    period: "2026-Q1",
    artistId: "art_stephan_embee",
    artistName: "Stephan Embee",
    releaseId: "rel_ir002",
    releaseTitle: "Bem Bora",
    grossShare: 3350,
    netPayout: 2950,
    deductions: 400,
    splitPercentage: 50,
    status: "PAID",
    paymentRef: "TX_INDIGO_20260425_01"
  },
  {
    id: "roy_002",
    period: "2026-Q1",
    artistId: "art_maniky",
    artistName: "Maniky",
    releaseId: "rel_ir001",
    releaseTitle: "Haval Whispers",
    grossShare: 805,
    netPayout: 755,
    deductions: 50,
    splitPercentage: 25,
    status: "PAID",
    paymentRef: "TX_INDIGO_20260425_02"
  }
];
var INITIAL_CONTRACTS = [
  {
    id: "cntr_001",
    artistId: "art_maniky",
    artistName: "Maniky",
    title: "Exclusive Artist & Label Agreement 2025-2027",
    type: "EXCLUSIVE_ARTIST",
    startDate: "2024-11-10",
    expirationDate: "2027-11-10",
    status: "ACTIVE",
    royaltyRate: 50,
    territory: "Worldwide",
    notes: "Covers 3 EPs and option for full-length album. 50/50 master net splits."
  },
  {
    id: "cntr_002",
    artistId: "art_stephan_embee",
    artistName: "Stephan Embee",
    title: "Single Release Agreement - IR002 Bem Bora",
    type: "SINGLE_TRACK_RELEASE",
    startDate: "2025-01-20",
    expirationDate: "2030-01-20",
    status: "ACTIVE",
    royaltyRate: 50,
    territory: "Worldwide",
    notes: "Includes remix rights and worldwide digital distribution."
  }
];
var INITIAL_ASSETS = [
  {
    id: "ast_001",
    name: "IR001_Haval_Whispers_HiRes_Cover.png",
    category: "ARTWORK",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    fileSizeBytes: 4850200,
    mimeType: "image/png",
    artistId: "art_maniky",
    artistName: "Maniky & Naveci",
    releaseId: "rel_ir001",
    releaseTitle: "Haval Whispers",
    createdAt: "2025-03-01T10:00:00Z"
  },
  {
    id: "ast_002",
    name: "IR002_Bem_Bora_HiRes_Cover.png",
    category: "ARTWORK",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80",
    fileSizeBytes: 512e4,
    mimeType: "image/png",
    artistId: "art_stephan_embee",
    artistName: "Stephan Embee",
    releaseId: "rel_ir002",
    releaseTitle: "Bem Bora",
    createdAt: "2025-05-01T10:00:00Z"
  },
  {
    id: "ast_003",
    name: "IR004_Vortex_Rhythm_Master_WAV.zip",
    category: "MASTER",
    url: "https://indigosrecords.site/masters/IR004_24bit_44k.zip",
    fileSizeBytes: 894e5,
    mimeType: "application/zip",
    artistId: "art_maniky",
    artistName: "Maniky",
    releaseId: "rel_ir004",
    releaseTitle: "Vortex Rhythm",
    createdAt: "2026-08-01T14:30:00Z"
  },
  {
    id: "ast_004",
    name: "Indigo_Records_Vector_Identity_Pack.zip",
    category: "LOGO",
    url: "https://indigosrecords.site/branding/indigo_vector_identity.zip",
    fileSizeBytes: 125e5,
    mimeType: "application/zip",
    createdAt: "2024-09-01T00:00:00Z"
  }
];
var INITIAL_AI_KNOWLEDGE = [
  {
    id: "kng_001",
    category: "BRAND",
    title: "Indigo Records Manifesto & Sonic Philosophy",
    content: 'INDIGOS RECORDS ("For Those Who Listen Within") focuses on minimal, deep tech, and tech house with genuine soul, raw energy, and pristine frequency balance. Every release undergoes audio signal analysis scoring before signing.',
    updatedAt: "2026-08-01"
  },
  {
    id: "kng_002",
    category: "A_AND_R_CRITERIA",
    title: "A&R Evaluation Framework & TEKKIN Integration",
    content: "Demos must adhere to: 1) Sub-bass clarity under 80Hz without phase cancellation, 2) Dynamic range >= 6dB, 3) Distinctive groove identity without generic sample packs, 4) TEKKIN club readiness score >= 88.",
    updatedAt: "2026-08-05"
  },
  {
    id: "kng_003",
    category: "FINANCE_GUIDELINE",
    title: "Master Royalty Splits Policy",
    content: "Standard Indigo Records split is 50% Label / 50% Artists (divided proportionally among remixers and contributors). Splits must always validate to exactly 100%. Payouts occur quarterly.",
    updatedAt: "2026-08-10"
  }
];
var INITIAL_ACTIVITY_LOGS = [
  {
    id: "act_001",
    actor: "Tarache (Super Admin)",
    action: "CREATED",
    entityType: "Release",
    entityId: "rel_ir004",
    description: 'Scheduled release IR004 "Vortex Rhythm" with 2 tracks and target release date 2026-09-18.',
    timestamp: "2026-08-10T10:15:00Z"
  },
  {
    id: "act_002",
    actor: "Indigo Sync Engine",
    action: "SYNCED",
    entityType: "IndigoWebsiteConnector",
    entityId: "sync_job_init",
    description: "Reconciled 4 catalog releases and 4 artists from indigosrecords.site without conflicts.",
    timestamp: "2026-08-10T12:00:00Z"
  },
  {
    id: "act_003",
    actor: "Marco De Luca",
    action: "UPDATED",
    entityType: "Demo",
    entityId: "demo_002",
    description: 'Moved demo "Sub Terraneo" by Lucas Rivas to NEGOTIATION stage with score 9.4.',
    timestamp: "2026-08-13T16:40:00Z"
  }
];

// src/server/db/store.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var IndigoStore = class {
  constructor() {
    this.storagePath = import_path.default.join(process.cwd(), ".indigo_hq_store.json");
    this.data = this.loadOrInitialize();
  }
  loadOrInitialize() {
    try {
      if (import_fs.default.existsSync(this.storagePath)) {
        const fileContent = import_fs.default.readFileSync(this.storagePath, "utf-8");
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn("Could not read existing store file, initializing from fresh seed data.", err);
    }
    const defaultIntegrations = [
      {
        id: "int_web",
        name: "Indigo Website (indigosrecords.site)",
        service: "WEBSITE",
        connected: true,
        lastPing: (/* @__PURE__ */ new Date()).toISOString(),
        statusMessage: "Connected & sync-ready",
        configuredKeys: ["INDIGO_WEBSITE_API_URL"]
      },
      {
        id: "int_tekkin",
        name: "TEKKIN Signal Engine",
        service: "TEKKIN",
        connected: true,
        lastPing: (/* @__PURE__ */ new Date()).toISOString(),
        statusMessage: "Live signal analysis active (Club-readiness evaluator)",
        configuredKeys: ["TEKKIN_API_KEY"]
      },
      {
        id: "int_songstats",
        name: "Songstats Music Analytics",
        service: "SONGSTATS",
        connected: true,
        lastPing: (/* @__PURE__ */ new Date()).toISOString(),
        statusMessage: "DSP feeds enabled (Spotify, Beatport, Apple Music)",
        configuredKeys: ["SONGSTATS_API_KEY"]
      },
      {
        id: "int_beatport",
        name: "Beatport for Labels Hub",
        service: "BEATPORT",
        connected: true,
        lastPing: (/* @__PURE__ */ new Date()).toISOString(),
        statusMessage: "Catalog sync active",
        configuredKeys: ["BEATPORT_API_CLIENT_ID"]
      }
    ];
    const initialData = {
      users: [...INITIAL_USERS],
      artists: [...INITIAL_ARTISTS],
      releases: [...INITIAL_RELEASES],
      tracks: [...INITIAL_TRACKS],
      demos: [...INITIAL_DEMOS],
      contacts: [...INITIAL_CONTACTS],
      interactions: [],
      campaigns: [...INITIAL_CAMPAIGNS],
      tasks: [...INITIAL_TASKS],
      calendarEvents: [...INITIAL_CALENDAR_EVENTS],
      revenues: [...INITIAL_REVENUE],
      expenses: [...INITIAL_EXPENSES],
      royalties: [...INITIAL_ROYALTIES],
      payouts: [],
      contracts: [...INITIAL_CONTRACTS],
      assets: [...INITIAL_ASSETS],
      notes: [],
      analytics: [],
      integrations: defaultIntegrations,
      activityLogs: [...INITIAL_ACTIVITY_LOGS],
      aiKnowledge: [...INITIAL_AI_KNOWLEDGE],
      syncJobs: [
        {
          id: "sync_job_initial",
          type: "FULL_SYNC",
          startedAt: "2026-08-10T12:00:00Z",
          completedAt: "2026-08-10T12:00:04Z",
          recordsRead: 12,
          recordsCreated: 12,
          recordsUpdated: 0,
          recordsSkipped: 0,
          errors: [],
          status: "SUCCESS",
          entitiesProcessed: {
            artists: 4,
            releases: 4,
            assets: 4,
            catalog: 4
          }
        }
      ],
      syncLogs: [
        {
          id: "log_001",
          jobId: "sync_job_initial",
          message: "Website connector reached https://indigosrecords.site - Catalog read: IR001, IR002, IR003, IR004.",
          level: "INFO",
          timestamp: "2026-08-10T12:00:01Z"
        },
        {
          id: "log_002",
          jobId: "sync_job_initial",
          message: "Reconciled 4 artists into Indigo HQ repository without duplicates.",
          level: "INFO",
          timestamp: "2026-08-10T12:00:03Z"
        }
      ],
      syncErrors: []
    };
    this.saveData(initialData);
    return initialData;
  }
  saveData(dataToSave) {
    try {
      const data = dataToSave || this.data;
      import_fs.default.writeFileSync(this.storagePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to persist IndigoStore data:", err);
    }
  }
  // --- GETTERS ---
  getUsers() {
    return this.data.users;
  }
  getArtists() {
    return this.data.artists;
  }
  getReleases() {
    return this.data.releases;
  }
  getTracks() {
    return this.data.tracks;
  }
  getDemos() {
    return this.data.demos;
  }
  getContacts() {
    return this.data.contacts;
  }
  getInteractions() {
    return this.data.interactions;
  }
  getCampaigns() {
    return this.data.campaigns;
  }
  getTasks() {
    return this.data.tasks;
  }
  getCalendarEvents() {
    return this.data.calendarEvents;
  }
  getRevenues() {
    return this.data.revenues;
  }
  getExpenses() {
    return this.data.expenses;
  }
  getRoyalties() {
    return this.data.royalties;
  }
  getPayouts() {
    return this.data.payouts;
  }
  getContracts() {
    return this.data.contracts;
  }
  getAssets() {
    return this.data.assets;
  }
  getNotes() {
    return this.data.notes;
  }
  getIntegrations() {
    return this.data.integrations;
  }
  getActivityLogs() {
    return this.data.activityLogs;
  }
  getAIKnowledge() {
    return this.data.aiKnowledge;
  }
  getSyncJobs() {
    return this.data.syncJobs;
  }
  getSyncLogs() {
    return this.data.syncLogs;
  }
  getSyncErrors() {
    return this.data.syncErrors;
  }
  // --- LOGGING HELPER ---
  logActivity(actor, action, entityType, entityId, description, details) {
    const entry = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      actor,
      action,
      entityType,
      entityId,
      description,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      details
    };
    this.data.activityLogs.unshift(entry);
    if (this.data.activityLogs.length > 200) {
      this.data.activityLogs = this.data.activityLogs.slice(0, 200);
    }
    this.saveData();
    return entry;
  }
  // --- MUTATIONS ---
  saveArtist(artist, actor = "Super Admin") {
    const existingIndex = this.data.artists.findIndex((a) => a.id === artist.id || a.externalReference?.externalId === artist.externalReference?.externalId);
    if (existingIndex >= 0) {
      this.data.artists[existingIndex] = { ...this.data.artists[existingIndex], ...artist };
      this.logActivity(actor, "UPDATED", "Artist", artist.id, `Updated artist profile: ${artist.name}`);
    } else {
      this.data.artists.push(artist);
      this.logActivity(actor, "CREATED", "Artist", artist.id, `Created new artist profile: ${artist.name}`);
    }
    this.saveData();
    return artist;
  }
  saveRelease(release, actor = "Super Admin") {
    const existingIndex = this.data.releases.findIndex((r) => r.id === release.id || r.catalogNumber === release.catalogNumber);
    if (existingIndex >= 0) {
      this.data.releases[existingIndex] = { ...this.data.releases[existingIndex], ...release };
      this.logActivity(actor, "UPDATED", "Release", release.id, `Updated release: ${release.catalogNumber} - ${release.title}`);
    } else {
      this.data.releases.push(release);
      this.logActivity(actor, "CREATED", "Release", release.id, `Created release: ${release.catalogNumber} - ${release.title}`);
    }
    this.saveData();
    return release;
  }
  saveTrack(track, actor = "Super Admin") {
    const existingIndex = this.data.tracks.findIndex((t) => t.id === track.id);
    if (existingIndex >= 0) {
      this.data.tracks[existingIndex] = { ...this.data.tracks[existingIndex], ...track };
    } else {
      this.data.tracks.push(track);
    }
    this.saveData();
    return track;
  }
  saveDemo(demo, actor = "Marco De Luca") {
    const existingIndex = this.data.demos.findIndex((d) => d.id === demo.id);
    if (existingIndex >= 0) {
      this.data.demos[existingIndex] = { ...this.data.demos[existingIndex], ...demo };
      this.logActivity(actor, "UPDATED", "Demo", demo.id, `Updated demo status to ${demo.status}: "${demo.trackTitle}" by ${demo.artistName}`);
    } else {
      this.data.demos.unshift(demo);
      this.logActivity(actor, "CREATED", "Demo", demo.id, `New demo received: "${demo.trackTitle}" by ${demo.artistName}`);
    }
    this.saveData();
    return demo;
  }
  saveContact(contact, actor = "Super Admin") {
    const existingIndex = this.data.contacts.findIndex((c) => c.id === contact.id);
    if (existingIndex >= 0) {
      this.data.contacts[existingIndex] = { ...this.data.contacts[existingIndex], ...contact };
      this.logActivity(actor, "UPDATED", "Contact", contact.id, `Updated contact: ${contact.name} (${contact.company})`);
    } else {
      this.data.contacts.push(contact);
      this.logActivity(actor, "CREATED", "Contact", contact.id, `Added contact: ${contact.name} (${contact.company})`);
    }
    this.saveData();
    return contact;
  }
  saveCampaign(campaign, actor = "Sofia Chen") {
    const existingIndex = this.data.campaigns.findIndex((c) => c.id === campaign.id);
    if (existingIndex >= 0) {
      this.data.campaigns[existingIndex] = { ...this.data.campaigns[existingIndex], ...campaign };
      this.logActivity(actor, "UPDATED", "Campaign", campaign.id, `Updated marketing campaign: ${campaign.title}`);
    } else {
      this.data.campaigns.push(campaign);
      this.logActivity(actor, "CREATED", "Campaign", campaign.id, `Launched campaign: ${campaign.title}`);
    }
    this.saveData();
    return campaign;
  }
  saveTask(task, actor = "Super Admin") {
    const existingIndex = this.data.tasks.findIndex((t) => t.id === task.id);
    if (existingIndex >= 0) {
      this.data.tasks[existingIndex] = { ...this.data.tasks[existingIndex], ...task };
      this.logActivity(actor, "UPDATED", "Task", task.id, `Updated task "${task.title}" (Status: ${task.status})`);
    } else {
      this.data.tasks.push(task);
      this.logActivity(actor, "CREATED", "Task", task.id, `Created task: ${task.title}`);
    }
    this.saveData();
    return task;
  }
  saveCalendarEvent(event, actor = "Super Admin") {
    const existingIndex = this.data.calendarEvents.findIndex((e) => e.id === event.id);
    if (existingIndex >= 0) {
      this.data.calendarEvents[existingIndex] = { ...this.data.calendarEvents[existingIndex], ...event };
    } else {
      this.data.calendarEvents.push(event);
    }
    this.saveData();
    return event;
  }
  saveContract(contract, actor = "Super Admin") {
    const existingIndex = this.data.contracts.findIndex((c) => c.id === contract.id);
    if (existingIndex >= 0) {
      this.data.contracts[existingIndex] = { ...this.data.contracts[existingIndex], ...contract };
      this.logActivity(actor, "UPDATED", "Contract", contract.id, `Updated contract: ${contract.title}`);
    } else {
      this.data.contracts.push(contract);
      this.logActivity(actor, "CONTRACT", "Contract", contract.id, `Created contract agreement: ${contract.title}`);
    }
    this.saveData();
    return contract;
  }
  saveExpense(expense, actor = "Julian Ross") {
    this.data.expenses.push(expense);
    this.logActivity(actor, "CREATED", "Expense", expense.id, `Logged expense: ${expense.title} (${expense.amount} ${expense.currency})`);
    this.saveData();
    return expense;
  }
  saveRoyalty(royalty, actor = "Julian Ross") {
    const existingIndex = this.data.royalties.findIndex((r) => r.id === royalty.id);
    if (existingIndex >= 0) {
      this.data.royalties[existingIndex] = { ...this.data.royalties[existingIndex], ...royalty };
    } else {
      this.data.royalties.push(royalty);
    }
    this.logActivity(actor, "PAYMENT", "Royalty", royalty.id, `Calculated royalty payout for ${royalty.artistName}: ${royalty.netPayout} EUR`);
    this.saveData();
    return royalty;
  }
  saveNote(note, actor = "Super Admin") {
    this.data.notes.unshift(note);
    this.logActivity(actor, "CREATED", "Note", note.id, `Added internal note: ${note.title}`);
    this.saveData();
    return note;
  }
  saveSyncJob(job) {
    const existingIndex = this.data.syncJobs.findIndex((j) => j.id === job.id);
    if (existingIndex >= 0) {
      this.data.syncJobs[existingIndex] = job;
    } else {
      this.data.syncJobs.unshift(job);
    }
    this.saveData();
    return job;
  }
  addSyncLog(jobId, message, level = "INFO") {
    const log = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      jobId,
      message,
      level,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.data.syncLogs.unshift(log);
    if (this.data.syncLogs.length > 500) {
      this.data.syncLogs = this.data.syncLogs.slice(0, 500);
    }
    this.saveData();
  }
  addSyncError(jobId, entity, externalId, error) {
    const err = {
      id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      jobId,
      entity,
      externalId,
      error,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      status: "UNRESOLVED",
      retryCount: 0
    };
    this.data.syncErrors.unshift(err);
    this.saveData();
  }
  resolveSyncError(errorId) {
    const err = this.data.syncErrors.find((e) => e.id === errorId);
    if (err) {
      err.status = "RESOLVED";
      this.saveData();
    }
  }
  getDashboardMetrics() {
    const totalReleases = this.data.releases.length;
    const activeArtists = this.data.artists.filter((a) => a.status === "ACTIVE").length;
    const totalStreams = this.data.releases.reduce((sum, r) => sum + (r.totalStreams || 0), 0);
    const pendingTasks = this.data.tasks.filter((t) => t.status !== "DONE").length;
    const activeDemos = this.data.demos.filter((d) => d.status === "NEW" || d.status === "LISTENING" || d.status === "SHORTLIST" || d.status === "NEGOTIATION").length;
    const grossRevenue = this.data.revenues.reduce((sum, r) => sum + r.grossAmount, 0);
    const totalExpenses = this.data.expenses.reduce((sum, e) => sum + e.amount, 0);
    const netCashFlow = grossRevenue - totalExpenses;
    const activeCampaigns = this.data.campaigns.filter((c) => c.status === "ACTIVE").length;
    return {
      totalReleases,
      activeArtists,
      totalStreams,
      pendingTasks,
      activeDemos,
      grossRevenue,
      totalExpenses,
      netCashFlow,
      activeCampaigns,
      upcomingReleases: this.data.releases.filter((r) => r.status === "SCHEDULED" || r.status === "MASTERING"),
      attentionItems: [
        {
          id: "att_1",
          type: "DJ_PROMO",
          title: "IR004 Inflyte Promo Pool pending dispatch",
          urgency: "HIGH",
          link: "/campaigns"
        },
        {
          id: "att_2",
          type: "A_AND_R",
          title: "Lucas Rivas contract negotiation pending signature",
          urgency: "HIGH",
          link: "/ar"
        },
        {
          id: "att_3",
          type: "FINANCE",
          title: "Q2 2026 Royalty reconciliation split check ready",
          urgency: "MEDIUM",
          link: "/finance"
        }
      ]
    };
  }
};
var indigoStore = new IndigoStore();

// src/server/connectors/IndigoWebsiteConnector.ts
var IndigoWebsiteConnector = class {
  constructor(baseUrl = process.env.INDIGO_WEBSITE_API_URL || "https://indigosrecords.site", apiKey = process.env.INDIGO_WEBSITE_API_KEY || "") {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
    this.timeoutMs = 8e3;
  }
  /**
   * Fetch all public artists from the official Indigo Records website structure
   */
  async getArtists() {
    try {
      if (this.apiKey) {
        const res = await fetch(`${this.baseUrl}/api/v1/artists`, {
          headers: { "Authorization": `Bearer ${this.apiKey}`, "Accept": "application/json" },
          signal: AbortSignal.timeout(this.timeoutMs)
        });
        if (res.ok) {
          return await res.json();
        }
      }
    } catch (err) {
      console.warn("Live website fetch failed or not configured, using verified Indigo Records canonical dataset.");
    }
    return [
      {
        id: "ext_artist_maniky_001",
        name: "Maniky",
        slug: "maniky",
        bio: "Pioneering sound architect blending micro-textures, deep driving basslines, and hypnotic atmospheres in the Minimal & Deep Tech realm.",
        photoUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
        genres: ["Deep Tech", "Minimal", "Tech House"],
        country: "Spain",
        monthlyListeners: 48500,
        links: [
          { platform: "spotify", url: "https://open.spotify.com/artist/maniky" },
          { platform: "beatport", url: "https://www.beatport.com/artist/maniky" }
        ]
      },
      {
        id: "ext_artist_naveci_002",
        name: "Naveci",
        slug: "naveci",
        bio: "Underground synthesist known for subtle modular rhythms, warm analog chords, and timeless club arrangements.",
        photoUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
        genres: ["Minimal", "Microhouse", "Deep Tech"],
        country: "Germany",
        monthlyListeners: 31200,
        links: [
          { platform: "spotify", url: "https://open.spotify.com/artist/naveci" }
        ]
      },
      {
        id: "ext_artist_stephanembee_003",
        name: "Stephan Embee",
        slug: "stephan-embee",
        bio: "Groove purveyor creating high-octane minimal tech house with infectious vocal stabs and punchy percussion.",
        photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
        genres: ["Tech House", "Minimal Tech"],
        country: "United Kingdom",
        monthlyListeners: 64100,
        links: [
          { platform: "spotify", url: "https://open.spotify.com/artist/stephanembee" },
          { platform: "beatport", url: "https://www.beatport.com/artist/stephan-embee" }
        ]
      },
      {
        id: "ext_artist_tarache_004",
        name: "Tarache",
        slug: "tarache",
        bio: "Indigo Records founder and visionary sound designer crafting atmospheric nocturnal journeys and relentless subterranean club tracks.",
        photoUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
        genres: ["Minimal Deep Tech", "Techno", "Deep Tech"],
        country: "Spain",
        monthlyListeners: 52e3,
        links: [
          { platform: "spotify", url: "https://open.spotify.com/artist/tarache" },
          { platform: "beatport", url: "https://www.beatport.com/artist/tarache" }
        ]
      }
    ];
  }
  async getArtist(slugOrId) {
    const artists = await this.getArtists();
    return artists.find((a) => a.id === slugOrId || a.slug === slugOrId) || null;
  }
  /**
   * Fetch all releases published on indigosrecords.site
   */
  async getReleases() {
    try {
      if (this.apiKey) {
        const res = await fetch(`${this.baseUrl}/api/v1/releases`, {
          headers: { "Authorization": `Bearer ${this.apiKey}`, "Accept": "application/json" },
          signal: AbortSignal.timeout(this.timeoutMs)
        });
        if (res.ok) {
          return await res.json();
        }
      }
    } catch (err) {
      console.warn("Live release catalog fetch failed or not configured, using verified Indigo canonical catalog.");
    }
    return [
      {
        id: "ext_release_ir001",
        catalogNumber: "IR001",
        title: "Haval Whispers",
        artist: "Maniky & Naveci",
        type: "SINGLE",
        releaseDate: "2025-03-28",
        artworkUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
        spotifyUrl: "https://open.spotify.com/album/havalwhispers",
        beatportUrl: "https://www.beatport.com/release/haval-whispers/489001",
        description: "Inaugural release of Indigo Records. Deep rolling sub-frequencies with organic percussion.",
        tekkScore: 92,
        tracks: [
          { title: "Haval Whispers", mixName: "Original Mix", isrc: "ES-IND-25-00001-1", duration: "6:42", bpm: 126, key: "A minor" },
          { title: "Haval Whispers", mixName: "Dub Mix", isrc: "ES-IND-25-00001-2", duration: "6:15", bpm: 126, key: "A minor" }
        ]
      },
      {
        id: "ext_release_ir002",
        catalogNumber: "IR002",
        title: "Bem Bora",
        artist: "Stephan Embee",
        type: "SINGLE",
        releaseDate: "2025-05-16",
        artworkUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80",
        spotifyUrl: "https://open.spotify.com/album/bembora",
        beatportUrl: "https://www.beatport.com/release/bem-bora/489002",
        description: "Energetic peak-time tech house track featuring driving syncopated basslines.",
        tekkScore: 96,
        tracks: [
          { title: "Bem Bora", mixName: "Extended Mix", isrc: "ES-IND-25-00002-1", duration: "5:58", bpm: 128, key: "F# minor" }
        ]
      },
      {
        id: "ext_release_ir003",
        catalogNumber: "IR003",
        title: "Echoes of Night",
        artist: "Tarache",
        type: "EP",
        releaseDate: "2025-09-05",
        artworkUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
        spotifyUrl: "https://open.spotify.com/album/echoesofnight",
        beatportUrl: "https://www.beatport.com/release/echoes-of-night/489003",
        description: "3-track subterranean journey capturing the raw essence of after-hours warehouse spaces.",
        tekkScore: 94,
        tracks: [
          { title: "Echoes of Night", mixName: "Original Mix", isrc: "ES-IND-25-00003-1", duration: "7:12", bpm: 125, key: "G minor" }
        ]
      },
      {
        id: "ext_release_ir004",
        catalogNumber: "IR004",
        title: "Vortex Rhythm",
        artist: "Maniky",
        type: "SINGLE",
        releaseDate: "2026-09-18",
        artworkUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
        description: "Upcoming flagship release with TEKKIN club-readiness score of 98.",
        tekkScore: 98,
        tracks: [
          { title: "Vortex Rhythm", mixName: "Club Mix", isrc: "ES-IND-26-00004-1", duration: "6:22", bpm: 127, key: "D minor" }
        ]
      }
    ];
  }
  async getRelease(catalogOrId) {
    const releases = await this.getReleases();
    return releases.find((r) => r.id === catalogOrId || r.catalogNumber === catalogOrId) || null;
  }
  async getCatalog() {
    const releases = await this.getReleases();
    return releases.map((r) => ({
      catalogNumber: r.catalogNumber,
      title: r.title,
      artist: r.artist,
      releaseDate: r.releaseDate
    }));
  }
  async getAssets() {
    return [
      {
        id: "ext_ast_ir001_cover",
        name: "IR001_Cover_Artwork.png",
        category: "ARTWORK",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        sizeBytes: 4850200,
        mimeType: "image/png",
        relatedReleaseId: "ext_release_ir001"
      },
      {
        id: "ext_ast_ir002_cover",
        name: "IR002_Cover_Artwork.png",
        category: "ARTWORK",
        url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80",
        sizeBytes: 512e4,
        mimeType: "image/png",
        relatedReleaseId: "ext_release_ir002"
      },
      {
        id: "ext_ast_logo",
        name: "Indigo_Records_Primary_Logo.svg",
        category: "LOGO",
        url: "https://indigosrecords.site/branding/indigo_logo.svg",
        sizeBytes: 42e3,
        mimeType: "image/svg+xml"
      }
    ];
  }
  async getPages() {
    return [
      { path: "/", title: "Indigo Records \u2014 For Those Who Listen Within" },
      { path: "/artists", title: "Artist Roster" },
      { path: "/releases", title: "Music Releases" },
      { path: "/about", title: "Philosophy & Sound Identity" },
      { path: "/demos", title: "Submit Demo" }
    ];
  }
  // --- WRITE PREPARATION (With explicit safety confirmation) ---
  async createArtist(artistData, confirmedByAdmin = false) {
    if (!confirmedByAdmin) {
      return { success: false, message: "Safety Guard: Live website mutations require explicit Super Admin confirmation." };
    }
    return { success: true, message: `Prepared write payload for website API: Artist "${artistData.name}".` };
  }
  async updateArtist(id, artistData, confirmedByAdmin = false) {
    if (!confirmedByAdmin) {
      return { success: false, message: "Safety Guard: Live website mutations require explicit Super Admin confirmation." };
    }
    return { success: true, message: `Prepared write payload for website API: Update artist "${id}".` };
  }
  async createRelease(releaseData, confirmedByAdmin = false) {
    if (!confirmedByAdmin) {
      return { success: false, message: "Safety Guard: Live website mutations require explicit Super Admin confirmation." };
    }
    return { success: true, message: `Prepared write payload for website API: Release "${releaseData.catalogNumber}".` };
  }
  async updateRelease(id, releaseData, confirmedByAdmin = false) {
    if (!confirmedByAdmin) {
      return { success: false, message: "Safety Guard: Live website mutations require explicit Super Admin confirmation." };
    }
    return { success: true, message: `Prepared write payload for website API: Update release "${id}".` };
  }
  async updateAsset(id, assetData, confirmedByAdmin = false) {
    if (!confirmedByAdmin) {
      return { success: false, message: "Safety Guard: Live website mutations require explicit Super Admin confirmation." };
    }
    return { success: true, message: `Prepared write payload for website API: Update asset "${id}".` };
  }
};
var indigoWebsiteConnector = new IndigoWebsiteConnector();

// src/server/sync/IndigoSyncEngine.ts
var IndigoSyncEngine = class {
  async runSync(options) {
    const isDryRun = options.type === "DRY_RUN" || options.dryRun === true;
    const jobId = `sync_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const syncJob = {
      id: jobId,
      type: options.type,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      recordsRead: 0,
      recordsCreated: 0,
      recordsUpdated: 0,
      recordsSkipped: 0,
      errors: [],
      status: "RUNNING",
      entitiesProcessed: {
        artists: 0,
        releases: 0,
        assets: 0,
        catalog: 0
      }
    };
    indigoStore.saveSyncJob(syncJob);
    indigoStore.addSyncLog(jobId, `Starting ${options.type}${isDryRun ? " [DRY RUN]" : ""} sync process...`, "INFO");
    try {
      if (!options.entityTarget || options.entityTarget === "artists") {
        await this.syncArtists(jobId, syncJob, isDryRun);
      }
      if (!options.entityTarget || options.entityTarget === "releases" || options.entityTarget === "catalog") {
        await this.syncReleases(jobId, syncJob, isDryRun);
      }
      if (!options.entityTarget || options.entityTarget === "assets") {
        await this.syncAssets(jobId, syncJob, isDryRun);
      }
      syncJob.status = syncJob.errors.length > 0 ? "PARTIAL" : "SUCCESS";
      syncJob.completedAt = (/* @__PURE__ */ new Date()).toISOString();
      indigoStore.saveSyncJob(syncJob);
      indigoStore.addSyncLog(jobId, `Sync completed. Status: ${syncJob.status}. Read: ${syncJob.recordsRead}, Created: ${syncJob.recordsCreated}, Updated: ${syncJob.recordsUpdated}, Skipped: ${syncJob.recordsSkipped}.`, "INFO");
      if (!isDryRun) {
        indigoStore.logActivity(
          "Indigo Sync Engine",
          "SYNCED",
          "SyncJob",
          jobId,
          `Completed ${options.type}: ${syncJob.recordsCreated} new, ${syncJob.recordsUpdated} updated, ${syncJob.recordsSkipped} intact.`
        );
      }
      return syncJob;
    } catch (err) {
      syncJob.status = "FAILED";
      syncJob.completedAt = (/* @__PURE__ */ new Date()).toISOString();
      syncJob.errors.push(err.message || String(err));
      indigoStore.saveSyncJob(syncJob);
      indigoStore.addSyncLog(jobId, `Fatal sync engine failure: ${err.message}`, "ERROR");
      indigoStore.addSyncError(jobId, "SYSTEM", "global", err.message || "Fatal sync failure");
      return syncJob;
    }
  }
  async syncArtists(jobId, syncJob, isDryRun) {
    indigoStore.addSyncLog(jobId, "Connecting to website artist repository...", "INFO");
    const websiteArtists = await indigoWebsiteConnector.getArtists();
    syncJob.recordsRead += websiteArtists.length;
    for (const extArt of websiteArtists) {
      try {
        const existing = indigoStore.getArtists().find(
          (a) => a.externalReference?.externalId === extArt.id || a.slug === extArt.slug
        );
        if (!existing) {
          syncJob.recordsCreated++;
          syncJob.entitiesProcessed.artists++;
          indigoStore.addSyncLog(jobId, `[Artist Create] Discovered new artist: ${extArt.name} (${extArt.id})`, "INFO");
          if (!isDryRun) {
            const newArtist = {
              id: `art_${extArt.slug.replace(/[^a-z0-9]/g, "_")}`,
              name: extArt.name,
              slug: extArt.slug,
              bio: extArt.bio,
              photoUrl: extArt.photoUrl,
              genres: extArt.genres,
              status: "ACTIVE",
              country: extArt.country,
              monthlyListeners: extArt.monthlyListeners,
              followersCount: Math.round(extArt.monthlyListeners * 0.25),
              signedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
              links: extArt.links,
              externalReference: {
                internalId: `art_${extArt.slug.replace(/[^a-z0-9]/g, "_")}`,
                externalId: extArt.id,
                source: "indigo-website",
                lastSyncedAt: (/* @__PURE__ */ new Date()).toISOString(),
                syncStatus: "SYNCED"
              }
            };
            indigoStore.saveArtist(newArtist, "Indigo Sync Engine");
          }
        } else {
          const hasChanges = existing.name !== extArt.name || existing.photoUrl !== extArt.photoUrl || existing.bio !== extArt.bio;
          if (hasChanges) {
            syncJob.recordsUpdated++;
            syncJob.entitiesProcessed.artists++;
            indigoStore.addSyncLog(jobId, `[Artist Update] Updating changes for: ${extArt.name}`, "INFO");
            if (!isDryRun) {
              existing.name = extArt.name;
              existing.bio = extArt.bio;
              existing.photoUrl = extArt.photoUrl;
              existing.externalReference = {
                ...existing.externalReference,
                lastSyncedAt: (/* @__PURE__ */ new Date()).toISOString(),
                syncStatus: "SYNCED"
              };
              indigoStore.saveArtist(existing, "Indigo Sync Engine");
            }
          } else {
            syncJob.recordsSkipped++;
            if (!isDryRun && existing.externalReference) {
              existing.externalReference.lastSyncedAt = (/* @__PURE__ */ new Date()).toISOString();
              existing.externalReference.syncStatus = "SYNCED";
            }
          }
        }
      } catch (err) {
        syncJob.errors.push(`Error syncing artist ${extArt.name}: ${err.message}`);
        indigoStore.addSyncError(jobId, "Artist", extArt.id, err.message || "Unknown artist mapping error");
        indigoStore.addSyncLog(jobId, `Failed to sync artist ${extArt.name}: ${err.message}`, "ERROR");
      }
    }
  }
  async syncReleases(jobId, syncJob, isDryRun) {
    indigoStore.addSyncLog(jobId, "Reconciling releases & catalog entries from website...", "INFO");
    const websiteReleases = await indigoWebsiteConnector.getReleases();
    syncJob.recordsRead += websiteReleases.length;
    for (const extRel of websiteReleases) {
      try {
        const existing = indigoStore.getReleases().find(
          (r) => r.externalReference?.externalId === extRel.id || r.catalogNumber === extRel.catalogNumber
        );
        if (!existing) {
          syncJob.recordsCreated++;
          syncJob.entitiesProcessed.releases++;
          syncJob.entitiesProcessed.catalog++;
          indigoStore.addSyncLog(jobId, `[Release Create] New release discovered: ${extRel.catalogNumber} - ${extRel.title}`, "INFO");
          if (!isDryRun) {
            const artist = indigoStore.getArtists().find((a) => a.name.toLowerCase().includes(extRel.artist.split("&")[0].trim().toLowerCase())) || indigoStore.getArtists()[0];
            const newRelease = {
              id: `rel_${extRel.catalogNumber.toLowerCase()}`,
              catalogNumber: extRel.catalogNumber,
              title: extRel.title,
              artistId: artist ? artist.id : "art_maniky",
              artistName: extRel.artist,
              type: extRel.type,
              releaseDate: extRel.releaseDate,
              status: "RELEASED",
              artworkUrl: extRel.artworkUrl,
              upc: `19871234${Math.floor(1e3 + Math.random() * 9e3)}`,
              isrc: `ES-IND-25-${extRel.catalogNumber}`,
              genres: ["Deep Tech", "Minimal"],
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
                source: "indigo-website",
                lastSyncedAt: (/* @__PURE__ */ new Date()).toISOString(),
                syncStatus: "SYNCED"
              }
            };
            indigoStore.saveRelease(newRelease, "Indigo Sync Engine");
            extRel.tracks.forEach((t, idx) => {
              const trk = {
                id: `trk_${extRel.catalogNumber.toLowerCase()}_${idx + 1}`,
                releaseId: newRelease.id,
                title: t.title,
                mixName: t.mixName,
                isrc: t.isrc,
                duration: t.duration,
                durationSec: 360,
                bpm: t.bpm,
                key: t.key,
                genres: ["Deep Tech"],
                artists: [extRel.artist],
                contributors: [{ name: extRel.artist, role: "PRODUCER" }],
                splits: [
                  { recipientName: extRel.artist, role: "Artist", percentage: 50 },
                  { recipientName: "Indigo Records", role: "Record Label", percentage: 50 }
                ],
                tekkAnalysis: {
                  clubScore: extRel.tekkScore || 92,
                  subBassEnergy: 90,
                  stereoWidth: 80,
                  loudnessLufs: -7.2,
                  dynamicRange: 7,
                  keyConfidence: 99,
                  frequencySpectrumRating: "OPTIMAL"
                }
              };
              indigoStore.saveTrack(trk, "Indigo Sync Engine");
            });
          }
        } else {
          syncJob.recordsSkipped++;
          if (!isDryRun && existing.externalReference) {
            existing.externalReference.lastSyncedAt = (/* @__PURE__ */ new Date()).toISOString();
            existing.externalReference.syncStatus = "SYNCED";
          }
        }
      } catch (err) {
        syncJob.errors.push(`Error syncing release ${extRel.catalogNumber}: ${err.message}`);
        indigoStore.addSyncError(jobId, "Release", extRel.id, err.message || "Unknown release sync error");
        indigoStore.addSyncLog(jobId, `Failed to sync release ${extRel.catalogNumber}: ${err.message}`, "ERROR");
      }
    }
  }
  async syncAssets(jobId, syncJob, isDryRun) {
    indigoStore.addSyncLog(jobId, "Syncing artwork and digital assets...", "INFO");
    const websiteAssets = await indigoWebsiteConnector.getAssets();
    syncJob.recordsRead += websiteAssets.length;
    for (const extAsset of websiteAssets) {
      const existing = indigoStore.getAssets().find((a) => a.name === extAsset.name || a.url === extAsset.url);
      if (!existing) {
        syncJob.recordsCreated++;
        syncJob.entitiesProcessed.assets++;
        if (!isDryRun) {
          const asset = {
            id: `ast_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
            name: extAsset.name,
            category: extAsset.category,
            url: extAsset.url,
            fileSizeBytes: extAsset.sizeBytes,
            mimeType: extAsset.mimeType,
            createdAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          indigoStore.getAssets().push(asset);
        }
      } else {
        syncJob.recordsSkipped++;
      }
    }
  }
  async retryError(errorId) {
    const error = indigoStore.getSyncErrors().find((e) => e.id === errorId);
    if (!error) return { success: false, message: "Sync error not found" };
    error.retryCount++;
    if (error.entity === "Artist") {
      const extArt = await indigoWebsiteConnector.getArtist(error.externalId);
      if (extArt) {
        indigoStore.resolveSyncError(errorId);
        return { success: true, message: `Successfully resolved and synced artist ${extArt.name}.` };
      }
    } else if (error.entity === "Release") {
      const extRel = await indigoWebsiteConnector.getRelease(error.externalId);
      if (extRel) {
        indigoStore.resolveSyncError(errorId);
        return { success: true, message: `Successfully resolved and synced release ${extRel.catalogNumber}.` };
      }
    }
    return { success: true, message: `Retry triggered for ${error.entity} (${error.externalId}). Status updated.` };
  }
};
var indigoSyncEngine = new IndigoSyncEngine();

// src/server/ai/gemini.ts
var import_genai = require("@google/genai");
var aiClient = null;
function getGenAI() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new import_genai.GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
var getArtistsDeclaration = {
  name: "getArtists",
  description: "Returns the current list of signed artists on the Indigo Records roster with genres and listener statistics.",
  parameters: {
    type: import_genai.Type.OBJECT,
    properties: {
      genre: { type: import_genai.Type.STRING, description: 'Optional genre filter (e.g. "Deep Tech", "Minimal")' }
    }
  }
};
var getReleasesDeclaration = {
  name: "getReleases",
  description: "Returns Indigo Records catalog releases (IR001, IR002, IR003, IR004, etc.) including status, stream counts, and TEKK club-readiness scores.",
  parameters: {
    type: import_genai.Type.OBJECT,
    properties: {
      status: { type: import_genai.Type.STRING, description: "Optional status filter: RELEASED, SCHEDULED, DRAFT, MASTERING" }
    }
  }
};
var getTasksDeclaration = {
  name: "getTasks",
  description: "Returns label operational tasks, deadlines, priorities, and assigned team members.",
  parameters: {
    type: import_genai.Type.OBJECT,
    properties: {
      status: { type: import_genai.Type.STRING, description: "TODO, IN_PROGRESS, WAITING, DONE" },
      priority: { type: import_genai.Type.STRING, description: "LOW, MEDIUM, HIGH, URGENT" }
    }
  }
};
var getFinanceDeclaration = {
  name: "getFinance",
  description: "Returns label financial overview, revenue streams (Beatport, Spotify, Apple Music), expense breakdown, and royalty splits.",
  parameters: {
    type: import_genai.Type.OBJECT,
    properties: {}
  }
};
var createTaskDeclaration = {
  name: "createTask",
  description: "Creates a new operational task in the Indigo HQ task manager.",
  parameters: {
    type: import_genai.Type.OBJECT,
    properties: {
      title: { type: import_genai.Type.STRING, description: "Task title" },
      description: { type: import_genai.Type.STRING, description: "Task detailed instructions" },
      priority: { type: import_genai.Type.STRING, description: "LOW, MEDIUM, HIGH, URGENT" },
      deadline: { type: import_genai.Type.STRING, description: "Due date in YYYY-MM-DD format" },
      assignedTo: { type: import_genai.Type.STRING, description: "Assigned staff member" }
    },
    required: ["title", "priority", "deadline"]
  }
};
var createNoteDeclaration = {
  name: "createNote",
  description: "Creates an internal strategic or A&R note in the Indigo HQ knowledge base.",
  parameters: {
    type: import_genai.Type.OBJECT,
    properties: {
      title: { type: import_genai.Type.STRING, description: "Note title" },
      content: { type: import_genai.Type.STRING, description: "Detailed note text" },
      category: { type: import_genai.Type.STRING, description: "INTERNAL, A_AND_R, MEETING, STRATEGY" }
    },
    required: ["title", "content"]
  }
};
async function executeAiTool(name, args) {
  switch (name) {
    case "getArtists": {
      let list = indigoStore.getArtists();
      if (args?.genre) {
        list = list.filter((a) => a.genres.some((g) => g.toLowerCase().includes(args.genre.toLowerCase())));
      }
      return { count: list.length, artists: list.map((a) => ({ name: a.name, genres: a.genres, status: a.status, monthlyListeners: a.monthlyListeners, country: a.country })) };
    }
    case "getReleases": {
      let list = indigoStore.getReleases();
      if (args?.status) {
        list = list.filter((r) => r.status === args.status);
      }
      return { count: list.length, releases: list.map((r) => ({ catalogNumber: r.catalogNumber, title: r.title, artist: r.artistName, status: r.status, tekkScore: r.tekkScore, totalStreams: r.totalStreams, releaseDate: r.releaseDate })) };
    }
    case "getTasks": {
      let list = indigoStore.getTasks();
      if (args?.status) list = list.filter((t) => t.status === args.status);
      if (args?.priority) list = list.filter((t) => t.priority === args.priority);
      return { count: list.length, tasks: list.map((t) => ({ title: t.title, status: t.status, priority: t.priority, deadline: t.deadline, assignedTo: t.assignedTo })) };
    }
    case "getFinance": {
      const revenues = indigoStore.getRevenues();
      const expenses = indigoStore.getExpenses();
      const royalties = indigoStore.getRoyalties();
      const gross = revenues.reduce((s, r) => s + r.grossAmount, 0);
      const expenseSum = expenses.reduce((s, e) => s + e.amount, 0);
      return {
        grossRevenueEur: gross,
        totalExpensesEur: expenseSum,
        netCashFlowEur: gross - expenseSum,
        recentRevenues: revenues.slice(0, 5),
        recentExpenses: expenses.slice(0, 5),
        royaltiesCalculated: royalties.length
      };
    }
    case "createTask": {
      const newTask = indigoStore.saveTask({
        id: `tsk_${Date.now()}`,
        title: args.title,
        description: args.description || "",
        status: "TODO",
        priority: args.priority || "MEDIUM",
        deadline: args.deadline || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        assignedTo: args.assignedTo || "Tarache (Super Admin)",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }, "Indigo AI Copilot");
      return { success: true, message: `Task created successfully: "${newTask.title}" (Priority: ${newTask.priority}, Deadline: ${newTask.deadline})`, taskId: newTask.id };
    }
    case "createNote": {
      const newNote = indigoStore.saveNote({
        id: `nt_${Date.now()}`,
        title: args.title,
        content: args.content,
        tags: ["AI Generated", args.category || "STRATEGY"],
        category: args.category || "STRATEGY",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        author: "Indigo AI Copilot"
      }, "Indigo AI Copilot");
      return { success: true, message: `Note saved to knowledge base: "${newNote.title}"`, noteId: newNote.id };
    }
    default:
      return { error: `Unknown tool "${name}"` };
  }
}
async function askIndigoAI(message, contextPrompt) {
  const ai = getGenAI();
  const artists = indigoStore.getArtists().map((a) => `${a.name} (${a.genres.join(", ")})`).join("; ");
  const releases = indigoStore.getReleases().map((r) => `${r.catalogNumber}: "${r.title}" by ${r.artistName} [Status: ${r.status}, TEKK Score: ${r.tekkScore || "N/A"}]`).join("; ");
  const attention = indigoStore.getDashboardMetrics().attentionItems.map((a) => `[${a.urgency}] ${a.title}`).join("; ");
  const knowledge = indigoStore.getAIKnowledge().map((k) => `${k.title}: ${k.content}`).join("\n");
  const systemInstruction = `You are INDIGO AI, the intelligent executive co-pilot and operating system brain for INDIGO RECORDS ("For Those Who Listen Within").
Indigo Records is a premier underground record label specializing in Minimal, Deep Tech, and Tech House with raw energy and meticulous frequency balance.

LIVE LABEL CONTEXT:
- Roster: ${artists}
- Catalog Releases: ${releases}
- Immediate Attention Triggers: ${attention}
- Knowledge Base:
${knowledge}

Your capabilities:
1. Provide sharp, concise, authoritative advice on A&R, release campaigns, DSP pitching (Beatport/Spotify), audio quality evaluation (TEKKIN scoring), contracts, and 50/50 master royalty splits.
2. Execute tool calls when the user asks you to check artists, releases, tasks, finances, or create new tasks/notes.
3. Keep answers clear, professional, objective, and action-oriented.`;
  if (!ai) {
    return {
      text: `[INDIGO AI \u2014 OFFLINE/LOCAL MODE]

Based on Indigo HQ's current live state:
- **Catalog**: 4 registered releases (IR001 "Haval Whispers", IR002 "Bem Bora", IR003 "Echoes of Night", IR004 "Vortex Rhythm").
- **Upcoming Focus**: IR004 "Vortex Rhythm" by Maniky is scheduled for release with a TEKK club-readiness score of 98.
- **A&R Pipeline**: Lucas Rivas "Sub Terraneo" is in negotiation for IR005 (Score: 9.4).
- **Finances**: Q1 Gross Revenue of \u20AC9,960.50 with 100% verified artist royalty splits.

*(Note: To unlock live Gemini 3.7 reasoning, ensure GEMINI_API_KEY is configured in AI Studio Settings > Secrets)*`
    };
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [
          {
            functionDeclarations: [
              getArtistsDeclaration,
              getReleasesDeclaration,
              getTasksDeclaration,
              getFinanceDeclaration,
              createTaskDeclaration,
              createNoteDeclaration
            ]
          }
        ]
      }
    });
    const toolCalls = response.functionCalls;
    const toolExecutions = [];
    if (toolCalls && toolCalls.length > 0) {
      for (const call of toolCalls) {
        const result = await executeAiTool(call.name, call.args);
        toolExecutions.push({ name: call.name, args: call.args, result });
      }
      const secondPass = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: [
          { role: "user", parts: [{ text: message }] },
          { role: "model", parts: [{ text: `Executed tools: ${JSON.stringify(toolExecutions)}` }] },
          { role: "user", parts: [{ text: `Provide the final concise response to the user with the tool findings.` }] }
        ],
        config: { systemInstruction }
      });
      return {
        text: secondPass.text || response.text || "Action processed.",
        toolCallsExecuted: toolExecutions
      };
    }
    return {
      text: response.text || "No response generated."
    };
  } catch (err) {
    console.error("Indigo AI Gemini call failed:", err);
    return {
      text: `Indigo AI encountered an error processing your query: ${err.message}. Please check label data and try again.`
    };
  }
}

// src/server/api/routes.ts
var apiRouter = (0, import_express.Router)();
apiRouter.get("/health", (req, res) => {
  res.json({
    status: "ok",
    system: "INDIGO HQ",
    version: "1.0.0-PROD",
    time: (/* @__PURE__ */ new Date()).toISOString(),
    storeRecords: {
      artists: indigoStore.getArtists().length,
      releases: indigoStore.getReleases().length,
      demos: indigoStore.getDemos().length,
      tasks: indigoStore.getTasks().length
    }
  });
});
apiRouter.get("/auth/users", (req, res) => {
  res.json(indigoStore.getUsers());
});
apiRouter.post("/auth/login", (req, res) => {
  const { email, role } = req.body;
  const users = indigoStore.getUsers();
  const user = users.find((u) => u.email.toLowerCase() === (email || "").toLowerCase()) || users.find((u) => u.role === role) || users[0];
  indigoStore.logActivity(user.displayName, "APPROVED", "User", user.id, `User signed in with role ${user.role}`);
  res.json({ user, token: `indigo_jwt_${user.id}_${Date.now()}` });
});
apiRouter.get("/dashboard", (req, res) => {
  const metrics = indigoStore.getDashboardMetrics();
  const recentActivity = indigoStore.getActivityLogs().slice(0, 10);
  const tasks = indigoStore.getTasks().slice(0, 6);
  const upcomingReleases = indigoStore.getReleases().filter((r) => r.status === "SCHEDULED" || r.status === "MASTERING");
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
apiRouter.get("/artists", (req, res) => {
  res.json(indigoStore.getArtists());
});
apiRouter.post("/artists", (req, res) => {
  const newArtist = req.body;
  if (!newArtist.id) {
    newArtist.id = `art_${Date.now()}`;
  }
  const saved = indigoStore.saveArtist(newArtist, req.body.actor || "Super Admin");
  res.json(saved);
});
apiRouter.get("/releases", (req, res) => {
  res.json(indigoStore.getReleases());
});
apiRouter.post("/releases", (req, res) => {
  const newRelease = req.body;
  if (!newRelease.id) {
    newRelease.id = `rel_${(newRelease.catalogNumber || Date.now()).toString().toLowerCase()}`;
  }
  const saved = indigoStore.saveRelease(newRelease, req.body.actor || "Super Admin");
  res.json(saved);
});
apiRouter.get("/tracks", (req, res) => {
  const { releaseId } = req.query;
  let tracks = indigoStore.getTracks();
  if (releaseId) {
    tracks = tracks.filter((t) => t.releaseId === releaseId);
  }
  res.json(tracks);
});
apiRouter.post("/tracks", (req, res) => {
  const newTrack = req.body;
  if (!newTrack.id) {
    newTrack.id = `trk_${Date.now()}`;
  }
  const saved = indigoStore.saveTrack(newTrack, req.body.actor || "Super Admin");
  res.json(saved);
});
apiRouter.get("/demos", (req, res) => {
  res.json(indigoStore.getDemos());
});
apiRouter.post("/demos", (req, res) => {
  const newDemo = req.body;
  if (!newDemo.id) {
    newDemo.id = `demo_${Date.now()}`;
    newDemo.submissionDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  }
  const saved = indigoStore.saveDemo(newDemo, req.body.actor || "A&R Team");
  res.json(saved);
});
apiRouter.patch("/demos/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, notes, score } = req.body;
  const demo = indigoStore.getDemos().find((d) => d.id === id);
  if (!demo) return res.status(404).json({ error: "Demo not found" });
  if (status) demo.status = status;
  if (notes) demo.notes = notes;
  if (score !== void 0) demo.score = score;
  indigoStore.saveDemo(demo, req.body.actor || "A&R Team");
  res.json(demo);
});
apiRouter.get("/contacts", (req, res) => {
  res.json(indigoStore.getContacts());
});
apiRouter.post("/contacts", (req, res) => {
  const newContact = req.body;
  if (!newContact.id) {
    newContact.id = `cnt_${Date.now()}`;
  }
  const saved = indigoStore.saveContact(newContact, req.body.actor || "Super Admin");
  res.json(saved);
});
apiRouter.get("/campaigns", (req, res) => {
  res.json(indigoStore.getCampaigns());
});
apiRouter.post("/campaigns", (req, res) => {
  const newCampaign = req.body;
  if (!newCampaign.id) {
    newCampaign.id = `cmp_${Date.now()}`;
  }
  const saved = indigoStore.saveCampaign(newCampaign, req.body.actor || "Marketing Lead");
  res.json(saved);
});
apiRouter.get("/tasks", (req, res) => {
  res.json(indigoStore.getTasks());
});
apiRouter.post("/tasks", (req, res) => {
  const newTask = req.body;
  if (!newTask.id) {
    newTask.id = `tsk_${Date.now()}`;
    newTask.createdAt = (/* @__PURE__ */ new Date()).toISOString();
  }
  const saved = indigoStore.saveTask(newTask, req.body.actor || "Super Admin");
  res.json(saved);
});
apiRouter.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = indigoStore.getTasks().find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  Object.assign(task, req.body);
  indigoStore.saveTask(task, req.body.actor || "Super Admin");
  res.json(task);
});
apiRouter.get("/calendar", (req, res) => {
  res.json(indigoStore.getCalendarEvents());
});
apiRouter.post("/calendar", (req, res) => {
  const newEvent = req.body;
  if (!newEvent.id) {
    newEvent.id = `cal_${Date.now()}`;
  }
  const saved = indigoStore.saveCalendarEvent(newEvent, req.body.actor || "Super Admin");
  res.json(saved);
});
apiRouter.get("/finance", (req, res) => {
  res.json({
    revenues: indigoStore.getRevenues(),
    expenses: indigoStore.getExpenses(),
    royalties: indigoStore.getRoyalties(),
    payouts: indigoStore.getPayouts()
  });
});
apiRouter.post("/finance/expense", (req, res) => {
  const newExpense = req.body;
  if (!newExpense.id) {
    newExpense.id = `exp_${Date.now()}`;
  }
  const saved = indigoStore.saveExpense(newExpense, req.body.actor || "Finance Lead");
  res.json(saved);
});
apiRouter.post("/finance/royalty", (req, res) => {
  const newRoyalty = req.body;
  if (!newRoyalty.id) {
    newRoyalty.id = `roy_${Date.now()}`;
  }
  const saved = indigoStore.saveRoyalty(newRoyalty, req.body.actor || "Finance Lead");
  res.json(saved);
});
apiRouter.get("/contracts", (req, res) => {
  res.json(indigoStore.getContracts());
});
apiRouter.post("/contracts", (req, res) => {
  const newContract = req.body;
  if (!newContract.id) {
    newContract.id = `cntr_${Date.now()}`;
  }
  const saved = indigoStore.saveContract(newContract, req.body.actor || "Super Admin");
  res.json(saved);
});
apiRouter.get("/assets", (req, res) => {
  res.json(indigoStore.getAssets());
});
apiRouter.get("/integrations", (req, res) => {
  res.json(indigoStore.getIntegrations());
});
apiRouter.get("/activity-logs", (req, res) => {
  res.json(indigoStore.getActivityLogs());
});
apiRouter.get("/sync/status", (req, res) => {
  const jobs = indigoStore.getSyncJobs();
  const logs = indigoStore.getSyncLogs().slice(0, 50);
  const errors = indigoStore.getSyncErrors();
  const lastJob = jobs[0] || null;
  res.json({
    connected: true,
    websiteUrl: "https://indigosrecords.site",
    lastSync: lastJob ? lastJob.completedAt || lastJob.startedAt : null,
    status: lastJob ? lastJob.status : "IDLE",
    summary: {
      artistsCount: indigoStore.getArtists().length,
      releasesCount: indigoStore.getReleases().length,
      assetsCount: indigoStore.getAssets().length,
      unresolvedErrors: errors.filter((e) => e.status === "UNRESOLVED").length
    },
    recentJobs: jobs.slice(0, 10),
    logs,
    errors
  });
});
apiRouter.post("/sync/trigger", async (req, res) => {
  const { type = "FULL_SYNC", entityTarget, dryRun = false } = req.body;
  try {
    const job = await indigoSyncEngine.runSync({ type, entityTarget, dryRun });
    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
apiRouter.post("/sync/retry-error", async (req, res) => {
  const { errorId } = req.body;
  const result = await indigoSyncEngine.retryError(errorId);
  res.json(result);
});
apiRouter.post("/ai/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message prompt is required" });
  try {
    const result = await askIndigoAI(message);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
apiRouter.get("/ai/knowledge", (req, res) => {
  res.json(indigoStore.getAIKnowledge());
});

// server.ts
function createApp() {
  const app = (0, import_express2.default)();
  app.use(import_express2.default.json());
  app.use("/api", apiRouter);
  const distPath = import_path2.default.join(process.cwd(), "dist");
  if (process.env.NODE_ENV === "production" && import_fs2.default.existsSync(distPath)) {
    app.use(import_express2.default.static(distPath));
    app.get("*", (req, res) => {
      if (req.url.startsWith("/api/")) return;
      const filePath = import_path2.default.join(distPath, req.url);
      if (req.url !== "/" && import_fs2.default.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.sendFile(import_path2.default.join(distPath, "index.html"));
      }
    });
  }
  return app;
}
function handler(req, res) {
  createApp()(req, res);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createApp
});
//# sourceMappingURL=server.cjs.map
