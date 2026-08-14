import React from 'react';
import { useData } from '../../context/DataContext';
import {
  Megaphone,
  Plus,
  Target,
  DollarSign,
  TrendingUp,
  Radio,
  Share2,
  Calendar,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface CampaignsModuleProps {
  onOpenQuickCreate: () => void;
}

export const CampaignsModule: React.FC<CampaignsModuleProps> = ({ onOpenQuickCreate }) => {
  const { campaigns, releases } = useData();

  return (
    <div id="campaigns-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Megaphone className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              Marketing, Campaigns & DJ Promo Pools
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            DSP playlist pitching, Beatport banners, Inflyte underground promo pools, and ad spend tracking.
          </p>
        </div>

        <button
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[11px]">Launch Campaign</span>
        </button>
      </div>

      {/* Campaigns List */}
      <div className="space-y-3">
        {campaigns.map(cmp => {
          const budgetUsedPercent = Math.min(100, Math.round((cmp.spent / (cmp.budget || 1)) * 100));
          return (
            <div
              key={cmp.id}
              className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#27272A] pb-2.5">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xs font-medium text-[#FAFAFA]">{cmp.title}</h2>
                    <span className="px-1.5 py-0.2 text-[9px] font-mono font-medium uppercase bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded">
                      {cmp.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-indigo-300 font-mono">
                    Target Goal: {cmp.goal}
                  </p>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-[9px] text-zinc-500 block uppercase">TIMEFRAME</span>
                  <span className="text-[11px] text-zinc-300">{cmp.startDate} → {cmp.endDate}</span>
                </div>
              </div>

              {/* Metrics and Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                <div className="bg-[#18181B] border border-[#27272A] p-2.5 rounded-md">
                  <span className="text-[9px] font-mono uppercase text-zinc-500 block">Budget Allocated</span>
                  <div className="text-sm font-semibold text-[#FAFAFA] font-mono mt-0.5">€{cmp.budget.toLocaleString()}</div>
                  <div className="w-full bg-[#121215] h-1.5 rounded-full mt-1.5 overflow-hidden border border-[#27272A]">
                    <div style={{ width: `${budgetUsedPercent}%` }} className="bg-indigo-500 h-full"></div>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 mt-1 block">€{cmp.spent} spent ({budgetUsedPercent}%)</span>
                </div>

                <div className="bg-[#18181B] border border-[#27272A] p-2.5 rounded-md">
                  <span className="text-[9px] font-mono uppercase text-zinc-500 block">Target Streams</span>
                  <div className="text-sm font-semibold text-indigo-300 font-mono mt-0.5">
                    {cmp.keyMetrics?.targetStreams ? cmp.keyMetrics.targetStreams.toLocaleString() : '300,000'}
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 mt-1.5 block">DSPs (Spotify & Apple)</span>
                </div>

                <div className="bg-[#18181B] border border-[#27272A] p-2.5 rounded-md">
                  <span className="text-[9px] font-mono uppercase text-zinc-500 block">DJ Supports Logged</span>
                  <div className="text-sm font-semibold text-cyan-400 font-mono mt-0.5">
                    {cmp.keyMetrics?.djSupportsCount || 42} DJs
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 mt-1.5 block">Via Inflyte Promo Pool</span>
                </div>

                <div className="bg-[#18181B] border border-[#27272A] p-2.5 rounded-md">
                  <span className="text-[9px] font-mono uppercase text-zinc-500 block">Playlist Placements</span>
                  <div className="text-sm font-semibold text-emerald-400 font-mono mt-0.5">
                    {cmp.keyMetrics?.playlistAdds || 18} Adds
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 mt-1.5 block">Editorial & Curators</span>
                </div>
              </div>

              {/* Channels active */}
              <div className="space-y-1.5 pt-1.5 border-t border-[#27272A]">
                <span className="text-[9px] font-mono uppercase text-zinc-500 block">Active Campaign Channels</span>
                <div className="flex flex-wrap gap-1.5">
                  {cmp.channels.map((ch, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#18181B] border border-[#27272A] rounded text-[10px] font-mono text-zinc-300 flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-indigo-400" />
                      <span>{ch}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
