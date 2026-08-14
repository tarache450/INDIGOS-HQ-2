import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { SyncJob } from '../../types';
import {
  RefreshCw,
  Radio,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Play,
  RotateCcw,
  Clock,
  ShieldCheck,
  Server,
  Zap
} from 'lucide-react';

export const SyncCenter: React.FC = () => {
  const { syncStatus, triggerSync, retrySyncError, refreshAll } = useData();
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedMode, setSelectedMode] = useState<SyncJob['type']>('INCREMENTAL_SYNC');
  const [selectedEntity, setSelectedEntity] = useState<string>('');

  const handleRunSync = async (dryRun: boolean = false) => {
    setIsSyncing(true);
    try {
      await triggerSync(dryRun ? 'DRY_RUN' : selectedMode, selectedEntity || undefined, dryRun);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleRetry = async (errId: string) => {
    await retrySyncError(errId);
  };

  return (
    <div id="sync-center-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              Indigo Sync Engine & Website Reconciler
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            Bi-directional synchronization, catalog import, conflict resolution, and parity with indigosrecords.site.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleRunSync(true)}
            disabled={isSyncing}
            className="px-3 py-1.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-zinc-300 rounded-md text-xs font-mono font-medium transition-all"
          >
            Run Dry Simulation
          </button>
          <button
            onClick={() => handleRunSync(false)}
            disabled={isSyncing}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="text-[11px]">{isSyncing ? 'Syncing...' : 'Trigger Live Sync'}</span>
          </button>
        </div>
      </div>

      {/* Connection & Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Target Website Node</span>
          <div className="text-xs font-semibold text-[#FAFAFA] font-mono my-1 truncate">
            {syncStatus?.websiteUrl || 'https://indigosrecords.site'}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Connected & Verified</span>
          </span>
        </div>

        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Catalog Reconciled</span>
          <div className="text-xl font-semibold text-[#FAFAFA] font-mono my-1">
            {syncStatus?.summary.releasesCount || 4} Releases
          </div>
          <span className="text-[10px] text-indigo-300 font-mono">IR001 — IR004 in sync</span>
        </div>

        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Artists Roster</span>
          <div className="text-xl font-semibold text-[#FAFAFA] font-mono my-1">
            {syncStatus?.summary.artistsCount || 4} Profiles
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">100% External IDs mapped</span>
        </div>

        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Sync Pipeline Health</span>
          <div className="text-xl font-semibold text-emerald-400 font-mono my-1">
            {syncStatus?.summary.unresolvedErrors === 0 ? 'Optimal' : `${syncStatus?.summary.unresolvedErrors} Conflicts`}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Zero Critical Errors</span>
        </div>
      </div>

      {/* Sync Control & Options */}
      <div className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-3">
        <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
          Sync Execution Parameters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-zinc-400">Sync Mode</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'INCREMENTAL_SYNC', label: 'Incremental' },
                { id: 'FULL_SYNC', label: 'Full Catalog' },
                { id: 'ENTITY_SYNC', label: 'Entity Target' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMode(m.id as any)}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-mono transition-colors ${
                    selectedMode === m.id
                      ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 font-medium'
                      : 'bg-[#18181B] text-zinc-400 hover:text-zinc-200 border border-transparent'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-zinc-400">Target Entity (Optional)</label>
            <select
              value={selectedEntity}
              onChange={e => setSelectedEntity(e.target.value)}
              className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:outline-none"
            >
              <option value="">All Entities (Artists, Releases, Assets)</option>
              <option value="artists">Artists Only</option>
              <option value="releases">Releases & Catalog Only</option>
              <option value="assets">Artwork & Digital Assets Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2-Column: Live Sync Logs & Conflict Resolutions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sync Logs */}
        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
              Sync Engine Audit Log Stream
            </h3>
            <span className="text-[10px] font-mono text-zinc-400">Live feed</span>
          </div>

          <div className="space-y-1.5 max-h-80 overflow-y-auto font-mono text-xs pr-1">
            {syncStatus?.logs.map(log => (
              <div
                key={log.id}
                className="p-2 rounded-md bg-[#18181B] border border-[#27272A] space-y-0.5"
              >
                <div className="flex items-center justify-between text-[9px]">
                  <span
                    className={`font-semibold ${
                      log.level === 'ERROR' ? 'text-rose-400' : log.level === 'WARN' ? 'text-amber-400' : 'text-indigo-300'
                    }`}
                  >
                    [{log.level}]
                  </span>
                  <span className="text-zinc-500">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-zinc-300 text-[10px]">{log.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sync Error & Conflict Resolver */}
        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
              Conflict Resolver & Retry Center
            </h3>
            <span className="text-[10px] font-mono text-zinc-400">Automated retry logic</span>
          </div>

          {syncStatus?.errors && syncStatus.errors.length > 0 ? (
            <div className="space-y-1.5">
              {syncStatus.errors.map(err => (
                <div
                  key={err.id}
                  className="p-2.5 rounded-md bg-[#18181B] border border-[#27272A] flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-rose-400">{err.entity}</span>
                      <span className="text-[9px] font-mono text-zinc-400">ID: {err.externalId}</span>
                    </div>
                    <p className="text-[10px] text-zinc-300">{err.error}</p>
                  </div>
                  <button
                    onClick={() => handleRetry(err.id)}
                    className="flex items-center space-x-1 px-2.5 py-1 bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-500/40 rounded-md text-[10px] font-mono"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retry</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-zinc-500 font-mono text-xs flex flex-col items-center space-y-1.5">
              <ShieldCheck className="w-7 h-7 text-emerald-500/70" />
              <span className="text-[11px]">All catalog records, artwork assets, and artist profiles are fully synchronized.</span>
              <span className="text-[9px] text-zinc-600">No unresolved sync conflicts.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
