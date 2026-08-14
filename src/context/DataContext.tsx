import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Artist,
  Release,
  Track,
  Demo,
  Contact,
  Campaign,
  Task,
  CalendarEvent,
  Revenue,
  Expense,
  Royalty,
  Contract,
  Asset,
  ActivityLog,
  Integration,
  SyncJob,
  SyncLog,
  SyncError
} from '../types';

interface DashboardData {
  metrics: {
    totalReleases: number;
    activeArtists: number;
    totalStreams: number;
    pendingTasks: number;
    activeDemos: number;
    grossRevenue: number;
    totalExpenses: number;
    netCashFlow: number;
    activeCampaigns: number;
    upcomingReleases: Release[];
    attentionItems: { id: string; type: string; title: string; urgency: string; link: string }[];
  };
  recentActivity: ActivityLog[];
  tasks: Task[];
  upcomingReleases: Release[];
  artists: Artist[];
  financialSummary: {
    grossRevenue: number;
    totalExpenses: number;
    netCashFlow: number;
    recentRevenues: Revenue[];
    recentExpenses: Expense[];
  };
}

interface SyncStatusData {
  connected: boolean;
  websiteUrl: string;
  lastSync: string | null;
  status: string;
  summary: {
    artistsCount: number;
    releasesCount: number;
    assetsCount: number;
    unresolvedErrors: number;
  };
  recentJobs: SyncJob[];
  logs: SyncLog[];
  errors: SyncError[];
}

interface DataContextType {
  dashboard: DashboardData | null;
  artists: Artist[];
  releases: Release[];
  tracks: Track[];
  demos: Demo[];
  contacts: Contact[];
  campaigns: Campaign[];
  tasks: Task[];
  calendarEvents: CalendarEvent[];
  revenues: Revenue[];
  expenses: Expense[];
  royalties: Royalty[];
  contracts: Contract[];
  assets: Asset[];
  activityLogs: ActivityLog[];
  integrations: Integration[];
  syncStatus: SyncStatusData | null;
  isLoading: boolean;
  refreshAll: () => Promise<void>;
  createArtist: (artist: Partial<Artist>) => Promise<Artist>;
  createRelease: (release: Partial<Release>) => Promise<Release>;
  createDemo: (demo: Partial<Demo>) => Promise<Demo>;
  updateDemoStatus: (id: string, status: Demo['status'], notes?: string, score?: number) => Promise<void>;
  createTask: (task: Partial<Task>) => Promise<Task>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  createCampaign: (campaign: Partial<Campaign>) => Promise<Campaign>;
  createContact: (contact: Partial<Contact>) => Promise<Contact>;
  createExpense: (expense: Partial<Expense>) => Promise<Expense>;
  createRoyalty: (royalty: Partial<Royalty>) => Promise<Royalty>;
  createContract: (contract: Partial<Contract>) => Promise<Contract>;
  triggerSync: (type: SyncJob['type'], entityTarget?: string, dryRun?: boolean) => Promise<SyncJob>;
  retrySyncError: (errorId: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [releases, setReleases] = useState<Release[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [demos, setDemos] = useState<Demo[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [royalties, setRoyalties] = useState<Royalty[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [syncStatus, setSyncStatus] = useState<SyncStatusData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAll = useCallback(async () => {
    try {
      const [
        dashRes,
        artRes,
        relRes,
        trkRes,
        demoRes,
        cntRes,
        cmpRes,
        tskRes,
        calRes,
        finRes,
        cntrRes,
        astRes,
        actRes,
        intRes,
        syncRes
      ] = await Promise.all([
        fetch('/api/dashboard').then(r => r.json()),
        fetch('/api/artists').then(r => r.json()),
        fetch('/api/releases').then(r => r.json()),
        fetch('/api/tracks').then(r => r.json()),
        fetch('/api/demos').then(r => r.json()),
        fetch('/api/contacts').then(r => r.json()),
        fetch('/api/campaigns').then(r => r.json()),
        fetch('/api/tasks').then(r => r.json()),
        fetch('/api/calendar').then(r => r.json()),
        fetch('/api/finance').then(r => r.json()),
        fetch('/api/contracts').then(r => r.json()),
        fetch('/api/assets').then(r => r.json()),
        fetch('/api/activity-logs').then(r => r.json()),
        fetch('/api/integrations').then(r => r.json()),
        fetch('/api/sync/status').then(r => r.json())
      ]);

      setDashboard(dashRes);
      setArtists(artRes);
      setReleases(relRes);
      setTracks(trkRes);
      setDemos(demoRes);
      setContacts(cntRes);
      setCampaigns(cmpRes);
      setTasks(tskRes);
      setCalendarEvents(calRes);
      if (finRes) {
        setRevenues(finRes.revenues || []);
        setExpenses(finRes.expenses || []);
        setRoyalties(finRes.royalties || []);
      }
      setContracts(cntrRes);
      setAssets(astRes);
      setActivityLogs(actRes);
      setIntegrations(intRes);
      setSyncStatus(syncRes);
    } catch (err) {
      console.error('Error refreshing Indigo HQ data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const createArtist = async (artist: Partial<Artist>): Promise<Artist> => {
    const res = await fetch('/api/artists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(artist)
    });
    const saved = await res.json();
    await refreshAll();
    return saved;
  };

  const createRelease = async (release: Partial<Release>): Promise<Release> => {
    const res = await fetch('/api/releases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(release)
    });
    const saved = await res.json();
    await refreshAll();
    return saved;
  };

  const createDemo = async (demo: Partial<Demo>): Promise<Demo> => {
    const res = await fetch('/api/demos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(demo)
    });
    const saved = await res.json();
    await refreshAll();
    return saved;
  };

  const updateDemoStatus = async (id: string, status: Demo['status'], notes?: string, score?: number) => {
    await fetch(`/api/demos/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes, score })
    });
    await refreshAll();
  };

  const createTask = async (task: Partial<Task>): Promise<Task> => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    const saved = await res.json();
    await refreshAll();
    return saved;
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    await refreshAll();
  };

  const createCampaign = async (campaign: Partial<Campaign>): Promise<Campaign> => {
    const res = await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaign)
    });
    const saved = await res.json();
    await refreshAll();
    return saved;
  };

  const createContact = async (contact: Partial<Contact>): Promise<Contact> => {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact)
    });
    const saved = await res.json();
    await refreshAll();
    return saved;
  };

  const createExpense = async (expense: Partial<Expense>): Promise<Expense> => {
    const res = await fetch('/api/finance/expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense)
    });
    const saved = await res.json();
    await refreshAll();
    return saved;
  };

  const createRoyalty = async (royalty: Partial<Royalty>): Promise<Royalty> => {
    const res = await fetch('/api/finance/royalty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(royalty)
    });
    const saved = await res.json();
    await refreshAll();
    return saved;
  };

  const createContract = async (contract: Partial<Contract>): Promise<Contract> => {
    const res = await fetch('/api/contracts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contract)
    });
    const saved = await res.json();
    await refreshAll();
    return saved;
  };

  const triggerSync = async (type: SyncJob['type'], entityTarget?: string, dryRun?: boolean): Promise<SyncJob> => {
    const res = await fetch('/api/sync/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, entityTarget, dryRun })
    });
    const data = await res.json();
    await refreshAll();
    return data.job;
  };

  const retrySyncError = async (errorId: string) => {
    await fetch('/api/sync/retry-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ errorId })
    });
    await refreshAll();
  };

  return (
    <DataContext.Provider
      value={{
        dashboard,
        artists,
        releases,
        tracks,
        demos,
        contacts,
        campaigns,
        tasks,
        calendarEvents,
        revenues,
        expenses,
        royalties,
        contracts,
        assets,
        activityLogs,
        integrations,
        syncStatus,
        isLoading,
        refreshAll,
        createArtist,
        createRelease,
        createDemo,
        updateDemoStatus,
        createTask,
        updateTask,
        createCampaign,
        createContact,
        createExpense,
        createRoyalty,
        createContract,
        triggerSync,
        retrySyncError
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
