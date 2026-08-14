import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
  Disc3,
  Users,
  Headphones,
  CheckSquare,
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Sparkles,
  Zap,
  Activity,
  Play,
  Calendar,
  Layers
} from 'lucide-react';

interface CommandCenterProps {
  onNavigate: (module: string) => void;
  onOpenQuickCreate: () => void;
  onOpenAiDrawer: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onNavigate,
  onOpenQuickCreate,
  onOpenAiDrawer
}) => {
  const { dashboard, releases, tasks, artists, demos, syncStatus } = useData();
  const { currentUser } = useAuth();

  if (!dashboard) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[500px]">
        <div className="flex items-center space-x-3 text-indigo-400 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
          <span>Loading Indigo HQ Command Center...</span>
        </div>
      </div>
    );
  }

  const { metrics, recentActivity, financialSummary } = dashboard;

  const kpis = [
    {
      title: 'TOTAL RELEASES',
      value: metrics.totalReleases,
      sub: 'IR001 — IR004 in catalog',
      icon: Disc3,
      change: '+1 scheduled',
      trend: 'up',
      module: 'releases'
    },
    {
      title: 'SIGNED ARTISTS',
      value: metrics.activeArtists,
      sub: 'Active roster',
      icon: Users,
      change: '4 Exclusive',
      trend: 'neutral',
      module: 'artists'
    },
    {
      title: 'TOTAL STREAMS',
      value: metrics.totalStreams.toLocaleString(),
      sub: 'Spotify / Beatport / Apple',
      icon: TrendingUp,
      change: '+18.4% MoM',
      trend: 'up',
      module: 'analytics'
    },
    {
      title: 'A&R DEMO INBOX',
      value: metrics.activeDemos,
      sub: 'Pending review',
      icon: Headphones,
      change: '1 in Negotiation',
      trend: 'highlight',
      module: 'ar'
    },
    {
      title: 'NET CASH FLOW',
      value: `€${metrics.netCashFlow.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sub: `Gross: €${metrics.grossRevenue.toLocaleString()}`,
      icon: Activity,
      change: '100% Split Verified',
      trend: 'up',
      module: 'finance'
    }
  ];

  return (
    <div id="command-center-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Top Banner / Operator Status */}
      <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight">
              INDIGO RECORDS OPERATING SYSTEM
            </h1>
            <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase bg-zinc-800 text-zinc-300 border border-zinc-700 rounded">
              Command Center
            </span>
          </div>
          <p className="text-[11px] text-zinc-400">
            Welcome back, <span className="text-zinc-200 font-medium">{currentUser.displayName}</span>. 
            DSP connections, website sync engine, and TEKK audio signals are operational.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenAiDrawer}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/40 text-indigo-200 text-xs font-medium font-mono transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px]">Ask Indigo AI</span>
          </button>
          <button
            onClick={onOpenQuickCreate}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-xs transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[11px]">Quick Action</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(kpi.module)}
              className="bg-[#121215] border border-[#27272A] hover:border-[#3F3F46] rounded-lg p-3 transition-all hover:bg-[#18181B] cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase text-zinc-400 tracking-wider">
                  {kpi.title}
                </span>
                <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div className="my-1.5">
                <div className="text-lg font-bold text-[#FAFAFA] font-mono leading-tight">{kpi.value}</div>
                <div className="text-[10px] text-zinc-400 truncate">{kpi.sub}</div>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono pt-1.5 border-t border-[#27272A]">
                <span className="text-emerald-400">{kpi.change}</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Immediate Attention Board */}
      <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <h2 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
              Immediate Operations Attention Board
            </h2>
          </div>
          <span className="text-[9px] font-mono text-zinc-400">3 Pending Action Triggers</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {metrics.attentionItems.map(item => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.link.replace('/', ''))}
              className="bg-[#18181B] border border-[#27272A] hover:border-amber-500/50 rounded-md p-3 flex flex-col justify-between transition-all cursor-pointer group"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.2 text-[9px] font-mono font-semibold uppercase bg-amber-950/70 text-amber-300 border border-amber-500/30 rounded">
                    {item.type}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500">REQUIRED</span>
                </div>
                <p className="text-xs font-medium text-zinc-200 group-hover:text-[#FAFAFA] pt-0.5">
                  {item.title}
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 text-[10px] text-indigo-400 font-mono">
                <span>Resolve in workspace</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Main Layout: Upcoming Releases & Active Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Catalog in Flight & Upcoming Releases */}
        <div className="lg:col-span-2 space-y-4">
          {/* Releases Pipeline */}
          <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Disc3 className="w-3.5 h-3.5 text-indigo-400" />
                <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
                  Music Catalog & Release Timeline
                </h3>
              </div>
              <button
                onClick={() => onNavigate('releases')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono flex items-center space-x-1"
              >
                <span>View Full Catalog</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {releases.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate('releases')}
                  className="bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] rounded-md p-2.5 flex space-x-2.5 transition-all cursor-pointer group"
                >
                  <img
                    src={rel.artworkUrl}
                    alt={rel.title}
                    className="w-14 h-14 rounded-md object-cover ring-1 ring-zinc-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono text-[9px] font-medium text-indigo-300 bg-indigo-950/80 px-1 py-0.2 rounded border border-indigo-500/30">
                          {rel.catalogNumber}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase px-1 py-0.2 rounded ${
                            rel.status === 'RELEASED'
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {rel.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-medium text-zinc-100 group-hover:text-indigo-300 truncate mt-0.5">
                        {rel.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 truncate">{rel.artistName}</p>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-0.5">
                      <span>{rel.releaseDate}</span>
                      {rel.tekkScore && (
                        <span className="text-indigo-300">TEKK: {rel.tekkScore}/100</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity Logs */}
          <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
                <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
                  Live System Audit & Operation Feed
                </h3>
              </div>
              <button
                onClick={() => onNavigate('activity')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono"
              >
                Full Audit Trail
              </button>
            </div>

            <div className="space-y-1.5">
              {recentActivity.map(act => (
                <div
                  key={act.id}
                  className="p-2 rounded-md bg-[#18181B] border border-[#27272A] flex items-start justify-between text-xs space-x-2"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-medium text-zinc-200 text-[11px]">{act.actor}</span>
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                        {act.action}
                      </span>
                      <span className="text-zinc-500 text-[10px] truncate">{act.entityType}</span>
                    </div>
                    <p className="text-zinc-400 text-[10px] truncate">{act.description}</p>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 whitespace-nowrap">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Tasks & Quick Ops */}
        <div className="space-y-4">
          {/* Operations & Tasks Board */}
          <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
                <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
                  Operational Tasks
                </h3>
              </div>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono"
              >
                Board
              </button>
            </div>

            <div className="space-y-2">
              {tasks.slice(0, 4).map(t => (
                <div
                  key={t.id}
                  className="p-2.5 rounded-md bg-[#18181B] border border-[#27272A] space-y-1.5"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`text-[9px] font-mono uppercase px-1 py-0.2 rounded ${
                        t.priority === 'URGENT'
                          ? 'bg-rose-950/70 text-rose-300 border border-rose-500/30'
                          : t.priority === 'HIGH'
                          ? 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                          : 'bg-indigo-950/70 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {t.priority}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">Due {t.deadline}</span>
                  </div>
                  <p className="text-[11px] font-medium text-zinc-200 truncate">{t.title}</p>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1 border-t border-[#27272A]">
                    <span className="truncate">{t.assignedTo}</span>
                    <span className="font-mono text-[9px] text-indigo-400 shrink-0">{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Roster Glance */}
          <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
                  Roster Highlights
                </h3>
              </div>
              <button
                onClick={() => onNavigate('artists')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono"
              >
                All Artists
              </button>
            </div>

            <div className="space-y-1">
              {artists.map(a => (
                <div
                  key={a.id}
                  onClick={() => onNavigate('artists')}
                  className="flex items-center justify-between p-1.5 rounded-md hover:bg-[#18181B] border border-transparent hover:border-[#27272A] cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={a.photoUrl}
                      alt={a.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-zinc-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-[11px] font-medium text-zinc-200 truncate">{a.name}</h4>
                      <p className="text-[9px] text-zinc-400 font-mono truncate">{a.genres.join(', ')}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] font-mono text-indigo-300">
                      {a.monthlyListeners ? `${(a.monthlyListeners / 1000).toFixed(1)}k` : 'N/A'}
                    </div>
                    <span className="text-[8px] text-zinc-400 font-mono">Listeners</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
