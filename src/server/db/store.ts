import {
  Artist,
  Release,
  Track,
  Demo,
  Contact,
  Interaction,
  Campaign,
  Task,
  CalendarEvent,
  Revenue,
  Expense,
  Royalty,
  Payout,
  Contract,
  Asset,
  Note,
  AnalyticsRecord,
  Integration,
  ActivityLog,
  AIKnowledge,
  SyncJob,
  SyncLog,
  SyncError,
  User
} from '../../types';
import {
  INITIAL_USERS,
  INITIAL_ARTISTS,
  INITIAL_RELEASES,
  INITIAL_TRACKS,
  INITIAL_DEMOS,
  INITIAL_CONTACTS,
  INITIAL_CAMPAIGNS,
  INITIAL_TASKS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_REVENUE,
  INITIAL_EXPENSES,
  INITIAL_ROYALTIES,
  INITIAL_CONTRACTS,
  INITIAL_ASSETS,
  INITIAL_AI_KNOWLEDGE,
  INITIAL_ACTIVITY_LOGS
} from './seedData';
import fs from 'fs';
import path from 'path';

interface IndigoStoreData {
  users: User[];
  artists: Artist[];
  releases: Release[];
  tracks: Track[];
  demos: Demo[];
  contacts: Contact[];
  interactions: Interaction[];
  campaigns: Campaign[];
  tasks: Task[];
  calendarEvents: CalendarEvent[];
  revenues: Revenue[];
  expenses: Expense[];
  royalties: Royalty[];
  payouts: Payout[];
  contracts: Contract[];
  assets: Asset[];
  notes: Note[];
  analytics: AnalyticsRecord[];
  integrations: Integration[];
  activityLogs: ActivityLog[];
  aiKnowledge: AIKnowledge[];
  syncJobs: SyncJob[];
  syncLogs: SyncLog[];
  syncErrors: SyncError[];
}

class IndigoStore {
  private data: IndigoStoreData;
  private storagePath: string;

  constructor() {
    this.storagePath = path.join(process.cwd(), '.indigo_hq_store.json');
    this.data = this.loadOrInitialize();
  }

  private loadOrInitialize(): IndigoStoreData {
    try {
      if (fs.existsSync(this.storagePath)) {
        const fileContent = fs.readFileSync(this.storagePath, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn('Could not read existing store file, initializing from fresh seed data.', err);
    }

    const defaultIntegrations: Integration[] = [
      {
        id: 'int_web',
        name: 'Indigo Website (indigosrecords.site)',
        service: 'WEBSITE',
        connected: true,
        lastPing: new Date().toISOString(),
        statusMessage: 'Connected & sync-ready',
        configuredKeys: ['INDIGO_WEBSITE_API_URL']
      },
      {
        id: 'int_tekkin',
        name: 'TEKKIN Signal Engine',
        service: 'TEKKIN',
        connected: true,
        lastPing: new Date().toISOString(),
        statusMessage: 'Live signal analysis active (Club-readiness evaluator)',
        configuredKeys: ['TEKKIN_API_KEY']
      },
      {
        id: 'int_songstats',
        name: 'Songstats Music Analytics',
        service: 'SONGSTATS',
        connected: true,
        lastPing: new Date().toISOString(),
        statusMessage: 'DSP feeds enabled (Spotify, Beatport, Apple Music)',
        configuredKeys: ['SONGSTATS_API_KEY']
      },
      {
        id: 'int_beatport',
        name: 'Beatport for Labels Hub',
        service: 'BEATPORT',
        connected: true,
        lastPing: new Date().toISOString(),
        statusMessage: 'Catalog sync active',
        configuredKeys: ['BEATPORT_API_CLIENT_ID']
      }
    ];

    const initialData: IndigoStoreData = {
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
          id: 'sync_job_initial',
          type: 'FULL_SYNC',
          startedAt: '2026-08-10T12:00:00Z',
          completedAt: '2026-08-10T12:00:04Z',
          recordsRead: 12,
          recordsCreated: 12,
          recordsUpdated: 0,
          recordsSkipped: 0,
          errors: [],
          status: 'SUCCESS',
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
          id: 'log_001',
          jobId: 'sync_job_initial',
          message: 'Website connector reached https://indigosrecords.site - Catalog read: IR001, IR002, IR003, IR004.',
          level: 'INFO',
          timestamp: '2026-08-10T12:00:01Z'
        },
        {
          id: 'log_002',
          jobId: 'sync_job_initial',
          message: 'Reconciled 4 artists into Indigo HQ repository without duplicates.',
          level: 'INFO',
          timestamp: '2026-08-10T12:00:03Z'
        }
      ],
      syncErrors: []
    };

    this.saveData(initialData);
    return initialData;
  }

  private saveData(dataToSave?: IndigoStoreData): void {
    try {
      const data = dataToSave || this.data;
      fs.writeFileSync(this.storagePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist IndigoStore data:', err);
    }
  }

  // --- GETTERS ---
  getUsers(): User[] { return this.data.users; }
  getArtists(): Artist[] { return this.data.artists; }
  getReleases(): Release[] { return this.data.releases; }
  getTracks(): Track[] { return this.data.tracks; }
  getDemos(): Demo[] { return this.data.demos; }
  getContacts(): Contact[] { return this.data.contacts; }
  getInteractions(): Interaction[] { return this.data.interactions; }
  getCampaigns(): Campaign[] { return this.data.campaigns; }
  getTasks(): Task[] { return this.data.tasks; }
  getCalendarEvents(): CalendarEvent[] { return this.data.calendarEvents; }
  getRevenues(): Revenue[] { return this.data.revenues; }
  getExpenses(): Expense[] { return this.data.expenses; }
  getRoyalties(): Royalty[] { return this.data.royalties; }
  getPayouts(): Payout[] { return this.data.payouts; }
  getContracts(): Contract[] { return this.data.contracts; }
  getAssets(): Asset[] { return this.data.assets; }
  getNotes(): Note[] { return this.data.notes; }
  getIntegrations(): Integration[] { return this.data.integrations; }
  getActivityLogs(): ActivityLog[] { return this.data.activityLogs; }
  getAIKnowledge(): AIKnowledge[] { return this.data.aiKnowledge; }
  getSyncJobs(): SyncJob[] { return this.data.syncJobs; }
  getSyncLogs(): SyncLog[] { return this.data.syncLogs; }
  getSyncErrors(): SyncError[] { return this.data.syncErrors; }

  // --- LOGGING HELPER ---
  logActivity(actor: string, action: ActivityLog['action'], entityType: string, entityId: string, description: string, details?: any): ActivityLog {
    const entry: ActivityLog = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      actor,
      action,
      entityType,
      entityId,
      description,
      timestamp: new Date().toISOString(),
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
  saveArtist(artist: Artist, actor: string = 'Super Admin'): Artist {
    const existingIndex = this.data.artists.findIndex(a => a.id === artist.id || a.externalReference?.externalId === artist.externalReference?.externalId);
    if (existingIndex >= 0) {
      this.data.artists[existingIndex] = { ...this.data.artists[existingIndex], ...artist };
      this.logActivity(actor, 'UPDATED', 'Artist', artist.id, `Updated artist profile: ${artist.name}`);
    } else {
      this.data.artists.push(artist);
      this.logActivity(actor, 'CREATED', 'Artist', artist.id, `Created new artist profile: ${artist.name}`);
    }
    this.saveData();
    return artist;
  }

  saveRelease(release: Release, actor: string = 'Super Admin'): Release {
    const existingIndex = this.data.releases.findIndex(r => r.id === release.id || r.catalogNumber === release.catalogNumber);
    if (existingIndex >= 0) {
      this.data.releases[existingIndex] = { ...this.data.releases[existingIndex], ...release };
      this.logActivity(actor, 'UPDATED', 'Release', release.id, `Updated release: ${release.catalogNumber} - ${release.title}`);
    } else {
      this.data.releases.push(release);
      this.logActivity(actor, 'CREATED', 'Release', release.id, `Created release: ${release.catalogNumber} - ${release.title}`);
    }
    this.saveData();
    return release;
  }

  saveTrack(track: Track, actor: string = 'Super Admin'): Track {
    const existingIndex = this.data.tracks.findIndex(t => t.id === track.id);
    if (existingIndex >= 0) {
      this.data.tracks[existingIndex] = { ...this.data.tracks[existingIndex], ...track };
    } else {
      this.data.tracks.push(track);
    }
    this.saveData();
    return track;
  }

  saveDemo(demo: Demo, actor: string = 'Marco De Luca'): Demo {
    const existingIndex = this.data.demos.findIndex(d => d.id === demo.id);
    if (existingIndex >= 0) {
      this.data.demos[existingIndex] = { ...this.data.demos[existingIndex], ...demo };
      this.logActivity(actor, 'UPDATED', 'Demo', demo.id, `Updated demo status to ${demo.status}: "${demo.trackTitle}" by ${demo.artistName}`);
    } else {
      this.data.demos.unshift(demo);
      this.logActivity(actor, 'CREATED', 'Demo', demo.id, `New demo received: "${demo.trackTitle}" by ${demo.artistName}`);
    }
    this.saveData();
    return demo;
  }

  saveContact(contact: Contact, actor: string = 'Super Admin'): Contact {
    const existingIndex = this.data.contacts.findIndex(c => c.id === contact.id);
    if (existingIndex >= 0) {
      this.data.contacts[existingIndex] = { ...this.data.contacts[existingIndex], ...contact };
      this.logActivity(actor, 'UPDATED', 'Contact', contact.id, `Updated contact: ${contact.name} (${contact.company})`);
    } else {
      this.data.contacts.push(contact);
      this.logActivity(actor, 'CREATED', 'Contact', contact.id, `Added contact: ${contact.name} (${contact.company})`);
    }
    this.saveData();
    return contact;
  }

  saveCampaign(campaign: Campaign, actor: string = 'Sofia Chen'): Campaign {
    const existingIndex = this.data.campaigns.findIndex(c => c.id === campaign.id);
    if (existingIndex >= 0) {
      this.data.campaigns[existingIndex] = { ...this.data.campaigns[existingIndex], ...campaign };
      this.logActivity(actor, 'UPDATED', 'Campaign', campaign.id, `Updated marketing campaign: ${campaign.title}`);
    } else {
      this.data.campaigns.push(campaign);
      this.logActivity(actor, 'CREATED', 'Campaign', campaign.id, `Launched campaign: ${campaign.title}`);
    }
    this.saveData();
    return campaign;
  }

  saveTask(task: Task, actor: string = 'Super Admin'): Task {
    const existingIndex = this.data.tasks.findIndex(t => t.id === task.id);
    if (existingIndex >= 0) {
      this.data.tasks[existingIndex] = { ...this.data.tasks[existingIndex], ...task };
      this.logActivity(actor, 'UPDATED', 'Task', task.id, `Updated task "${task.title}" (Status: ${task.status})`);
    } else {
      this.data.tasks.push(task);
      this.logActivity(actor, 'CREATED', 'Task', task.id, `Created task: ${task.title}`);
    }
    this.saveData();
    return task;
  }

  saveCalendarEvent(event: CalendarEvent, actor: string = 'Super Admin'): CalendarEvent {
    const existingIndex = this.data.calendarEvents.findIndex(e => e.id === event.id);
    if (existingIndex >= 0) {
      this.data.calendarEvents[existingIndex] = { ...this.data.calendarEvents[existingIndex], ...event };
    } else {
      this.data.calendarEvents.push(event);
    }
    this.saveData();
    return event;
  }

  saveContract(contract: Contract, actor: string = 'Super Admin'): Contract {
    const existingIndex = this.data.contracts.findIndex(c => c.id === contract.id);
    if (existingIndex >= 0) {
      this.data.contracts[existingIndex] = { ...this.data.contracts[existingIndex], ...contract };
      this.logActivity(actor, 'UPDATED', 'Contract', contract.id, `Updated contract: ${contract.title}`);
    } else {
      this.data.contracts.push(contract);
      this.logActivity(actor, 'CONTRACT', 'Contract', contract.id, `Created contract agreement: ${contract.title}`);
    }
    this.saveData();
    return contract;
  }

  saveExpense(expense: Expense, actor: string = 'Julian Ross'): Expense {
    this.data.expenses.push(expense);
    this.logActivity(actor, 'CREATED', 'Expense', expense.id, `Logged expense: ${expense.title} (${expense.amount} ${expense.currency})`);
    this.saveData();
    return expense;
  }

  saveRoyalty(royalty: Royalty, actor: string = 'Julian Ross'): Royalty {
    const existingIndex = this.data.royalties.findIndex(r => r.id === royalty.id);
    if (existingIndex >= 0) {
      this.data.royalties[existingIndex] = { ...this.data.royalties[existingIndex], ...royalty };
    } else {
      this.data.royalties.push(royalty);
    }
    this.logActivity(actor, 'PAYMENT', 'Royalty', royalty.id, `Calculated royalty payout for ${royalty.artistName}: ${royalty.netPayout} EUR`);
    this.saveData();
    return royalty;
  }

  saveNote(note: Note, actor: string = 'Super Admin'): Note {
    this.data.notes.unshift(note);
    this.logActivity(actor, 'CREATED', 'Note', note.id, `Added internal note: ${note.title}`);
    this.saveData();
    return note;
  }

  saveSyncJob(job: SyncJob): SyncJob {
    const existingIndex = this.data.syncJobs.findIndex(j => j.id === job.id);
    if (existingIndex >= 0) {
      this.data.syncJobs[existingIndex] = job;
    } else {
      this.data.syncJobs.unshift(job);
    }
    this.saveData();
    return job;
  }

  addSyncLog(jobId: string, message: string, level: SyncLog['level'] = 'INFO'): void {
    const log: SyncLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      jobId,
      message,
      level,
      timestamp: new Date().toISOString()
    };
    this.data.syncLogs.unshift(log);
    if (this.data.syncLogs.length > 500) {
      this.data.syncLogs = this.data.syncLogs.slice(0, 500);
    }
    this.saveData();
  }

  addSyncError(jobId: string, entity: string, externalId: string, error: string): void {
    const err: SyncError = {
      id: `err_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      jobId,
      entity,
      externalId,
      error,
      timestamp: new Date().toISOString(),
      status: 'UNRESOLVED',
      retryCount: 0
    };
    this.data.syncErrors.unshift(err);
    this.saveData();
  }

  resolveSyncError(errorId: string): void {
    const err = this.data.syncErrors.find(e => e.id === errorId);
    if (err) {
      err.status = 'RESOLVED';
      this.saveData();
    }
  }

  getDashboardMetrics() {
    const totalReleases = this.data.releases.length;
    const activeArtists = this.data.artists.filter(a => a.status === 'ACTIVE').length;
    const totalStreams = this.data.releases.reduce((sum, r) => sum + (r.totalStreams || 0), 0);
    const pendingTasks = this.data.tasks.filter(t => t.status !== 'DONE').length;
    const activeDemos = this.data.demos.filter(d => d.status === 'NEW' || d.status === 'LISTENING' || d.status === 'SHORTLIST' || d.status === 'NEGOTIATION').length;
    const grossRevenue = this.data.revenues.reduce((sum, r) => sum + r.grossAmount, 0);
    const totalExpenses = this.data.expenses.reduce((sum, e) => sum + e.amount, 0);
    const netCashFlow = grossRevenue - totalExpenses;
    const activeCampaigns = this.data.campaigns.filter(c => c.status === 'ACTIVE').length;

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
      upcomingReleases: this.data.releases.filter(r => r.status === 'SCHEDULED' || r.status === 'MASTERING'),
      attentionItems: [
        {
          id: 'att_1',
          type: 'DJ_PROMO',
          title: 'IR004 Inflyte Promo Pool pending dispatch',
          urgency: 'HIGH',
          link: '/campaigns'
        },
        {
          id: 'att_2',
          type: 'A_AND_R',
          title: 'Lucas Rivas contract negotiation pending signature',
          urgency: 'HIGH',
          link: '/ar'
        },
        {
          id: 'att_3',
          type: 'FINANCE',
          title: 'Q2 2026 Royalty reconciliation split check ready',
          urgency: 'MEDIUM',
          link: '/finance'
        }
      ]
    };
  }
}

export const indigoStore = new IndigoStore();
