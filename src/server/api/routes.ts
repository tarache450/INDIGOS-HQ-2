import { Router, Request, Response } from 'express';
import { indigoStore } from '../db/store';
import { indigoWebsiteConnector } from '../connectors/IndigoWebsiteConnector';
import { indigoSyncEngine } from '../sync/IndigoSyncEngine';
import { askIndigoAI, executeAiTool } from '../ai/gemini';

export const apiRouter = Router();

// Health check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    system: 'INDIGO HQ',
    version: '1.0.0-PROD',
    time: new Date().toISOString(),
    storeRecords: {
      artists: indigoStore.getArtists().length,
      releases: indigoStore.getReleases().length,
      demos: indigoStore.getDemos().length,
      tasks: indigoStore.getTasks().length
    }
  });
});

// AUTH & RBAC
apiRouter.get('/auth/users', (req: Request, res: Response) => {
  res.json(indigoStore.getUsers());
});

apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, role } = req.body;
  const users = indigoStore.getUsers();
  const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase()) || 
               users.find(u => u.role === role) || 
               users[0]; // Default Super Admin
  
  indigoStore.logActivity(user.displayName, 'APPROVED', 'User', user.id, `User signed in with role ${user.role}`);
  res.json({ user, token: `indigo_jwt_${user.id}_${Date.now()}` });
});

// COMMAND CENTER / DASHBOARD
apiRouter.get('/dashboard', (req: Request, res: Response) => {
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
apiRouter.get('/artists', (req: Request, res: Response) => {
  res.json(indigoStore.getArtists());
});

apiRouter.post('/artists', (req: Request, res: Response) => {
  const newArtist = req.body;
  if (!newArtist.id) {
    newArtist.id = `art_${Date.now()}`;
  }
  const saved = indigoStore.saveArtist(newArtist, req.body.actor || 'Super Admin');
  res.json(saved);
});

// RELEASES & CATALOG
apiRouter.get('/releases', (req: Request, res: Response) => {
  res.json(indigoStore.getReleases());
});

apiRouter.post('/releases', (req: Request, res: Response) => {
  const newRelease = req.body;
  if (!newRelease.id) {
    newRelease.id = `rel_${(newRelease.catalogNumber || Date.now()).toString().toLowerCase()}`;
  }
  const saved = indigoStore.saveRelease(newRelease, req.body.actor || 'Super Admin');
  res.json(saved);
});

apiRouter.get('/tracks', (req: Request, res: Response) => {
  const { releaseId } = req.query;
  let tracks = indigoStore.getTracks();
  if (releaseId) {
    tracks = tracks.filter(t => t.releaseId === releaseId);
  }
  res.json(tracks);
});

apiRouter.post('/tracks', (req: Request, res: Response) => {
  const newTrack = req.body;
  if (!newTrack.id) {
    newTrack.id = `trk_${Date.now()}`;
  }
  const saved = indigoStore.saveTrack(newTrack, req.body.actor || 'Super Admin');
  res.json(saved);
});

// A&R DEMOS
apiRouter.get('/demos', (req: Request, res: Response) => {
  res.json(indigoStore.getDemos());
});

apiRouter.post('/demos', (req: Request, res: Response) => {
  const newDemo = req.body;
  if (!newDemo.id) {
    newDemo.id = `demo_${Date.now()}`;
    newDemo.submissionDate = new Date().toISOString().split('T')[0];
  }
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
apiRouter.get('/contacts', (req: Request, res: Response) => {
  res.json(indigoStore.getContacts());
});

apiRouter.post('/contacts', (req: Request, res: Response) => {
  const newContact = req.body;
  if (!newContact.id) {
    newContact.id = `cnt_${Date.now()}`;
  }
  const saved = indigoStore.saveContact(newContact, req.body.actor || 'Super Admin');
  res.json(saved);
});

// CAMPAIGNS & MARKETING
apiRouter.get('/campaigns', (req: Request, res: Response) => {
  res.json(indigoStore.getCampaigns());
});

apiRouter.post('/campaigns', (req: Request, res: Response) => {
  const newCampaign = req.body;
  if (!newCampaign.id) {
    newCampaign.id = `cmp_${Date.now()}`;
  }
  const saved = indigoStore.saveCampaign(newCampaign, req.body.actor || 'Marketing Lead');
  res.json(saved);
});

// TASKS
apiRouter.get('/tasks', (req: Request, res: Response) => {
  res.json(indigoStore.getTasks());
});

apiRouter.post('/tasks', (req: Request, res: Response) => {
  const newTask = req.body;
  if (!newTask.id) {
    newTask.id = `tsk_${Date.now()}`;
    newTask.createdAt = new Date().toISOString();
  }
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
apiRouter.get('/calendar', (req: Request, res: Response) => {
  res.json(indigoStore.getCalendarEvents());
});

apiRouter.post('/calendar', (req: Request, res: Response) => {
  const newEvent = req.body;
  if (!newEvent.id) {
    newEvent.id = `cal_${Date.now()}`;
  }
  const saved = indigoStore.saveCalendarEvent(newEvent, req.body.actor || 'Super Admin');
  res.json(saved);
});

// FINANCE & ROYALTIES
apiRouter.get('/finance', (req: Request, res: Response) => {
  res.json({
    revenues: indigoStore.getRevenues(),
    expenses: indigoStore.getExpenses(),
    royalties: indigoStore.getRoyalties(),
    payouts: indigoStore.getPayouts()
  });
});

apiRouter.post('/finance/expense', (req: Request, res: Response) => {
  const newExpense = req.body;
  if (!newExpense.id) {
    newExpense.id = `exp_${Date.now()}`;
  }
  const saved = indigoStore.saveExpense(newExpense, req.body.actor || 'Finance Lead');
  res.json(saved);
});

apiRouter.post('/finance/royalty', (req: Request, res: Response) => {
  const newRoyalty = req.body;
  if (!newRoyalty.id) {
    newRoyalty.id = `roy_${Date.now()}`;
  }
  const saved = indigoStore.saveRoyalty(newRoyalty, req.body.actor || 'Finance Lead');
  res.json(saved);
});

// CONTRACTS
apiRouter.get('/contracts', (req: Request, res: Response) => {
  res.json(indigoStore.getContracts());
});

apiRouter.post('/contracts', (req: Request, res: Response) => {
  const newContract = req.body;
  if (!newContract.id) {
    newContract.id = `cntr_${Date.now()}`;
  }
  const saved = indigoStore.saveContract(newContract, req.body.actor || 'Super Admin');
  res.json(saved);
});

// ASSETS
apiRouter.get('/assets', (req: Request, res: Response) => {
  res.json(indigoStore.getAssets());
});

// INTEGRATIONS
apiRouter.get('/integrations', (req: Request, res: Response) => {
  res.json(indigoStore.getIntegrations());
});

// ACTIVITY LOGS
apiRouter.get('/activity-logs', (req: Request, res: Response) => {
  res.json(indigoStore.getActivityLogs());
});

// SYNC CENTER
apiRouter.get('/sync/status', (req: Request, res: Response) => {
  const jobs = indigoStore.getSyncJobs();
  const logs = indigoStore.getSyncLogs().slice(0, 50);
  const errors = indigoStore.getSyncErrors();
  const lastJob = jobs[0] || null;

  res.json({
    connected: true,
    websiteUrl: 'https://indigosrecords.site',
    lastSync: lastJob ? lastJob.completedAt || lastJob.startedAt : null,
    status: lastJob ? lastJob.status : 'IDLE',
    summary: {
      artistsCount: indigoStore.getArtists().length,
      releasesCount: indigoStore.getReleases().length,
      assetsCount: indigoStore.getAssets().length,
      unresolvedErrors: errors.filter(e => e.status === 'UNRESOLVED').length
    },
    recentJobs: jobs.slice(0, 10),
    logs,
    errors
  });
});

apiRouter.post('/sync/trigger', async (req: Request, res: Response) => {
  const { type = 'FULL_SYNC', entityTarget, dryRun = false } = req.body;
  try {
    const job = await indigoSyncEngine.runSync({ type, entityTarget, dryRun });
    res.json({ success: true, job });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.post('/sync/retry-error', async (req: Request, res: Response) => {
  const { errorId } = req.body;
  const result = await indigoSyncEngine.retryError(errorId);
  res.json(result);
});

// INDIGO AI
apiRouter.post('/ai/chat', async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message prompt is required' });
  
  try {
    const result = await askIndigoAI(message);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.get('/ai/knowledge', (req: Request, res: Response) => {
  res.json(indigoStore.getAIKnowledge());
});
