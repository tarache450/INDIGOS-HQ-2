import React from 'react';
import { useData } from '../../context/DataContext';
import { BarChart3, TrendingUp, Radio, Disc3, Award, Zap, Globe } from 'lucide-react';

export const AnalyticsModule: React.FC = () => {
  const { dashboard, releases } = useData();

  const streamsByTrack = [
    { name: 'Vortex Rhythm (Original)', artist: 'Tarache', streams: 142300, dsp: 'Spotify', share: 44 },
    { name: 'Echoes of the Underground', artist: 'Maniky', streams: 88400, dsp: 'Beatport', share: 27 },
    { name: 'Deep Signal Flow', artist: 'Naveci', streams: 54100, dsp: 'Apple Music', share: 17 },
    { name: 'Minimal Resonance', artist: 'Stephan Embee', streams: 38200, dsp: 'Spotify', share: 12 }
  ];

  return (
    <div id="analytics-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              DSP Analytics, TEKK Signals & Stream Velocity
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            Cross-platform consumption telemetry across Spotify, Beatport Top 100 Minimal/Deep Tech, and Apple Music.
          </p>
        </div>
      </div>

      {/* Top Stream Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Total Catalog Streams</span>
          <div className="text-xl font-semibold text-[#FAFAFA] font-mono my-1">
            {dashboard?.metrics.totalStreams.toLocaleString() || '323,000'}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">+18.4% this month</span>
        </div>

        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Beatport Top 100 Rank</span>
          <div className="text-xl font-semibold text-cyan-400 font-mono my-1">#14 Peak</div>
          <span className="text-[10px] text-zinc-400 font-mono">IR004 "Vortex Rhythm"</span>
        </div>

        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Spotify Monthly Listeners</span>
          <div className="text-xl font-semibold text-emerald-400 font-mono my-1">68,400</div>
          <span className="text-[10px] text-emerald-400 font-mono">Across 4 signed artists</span>
        </div>

        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Average TEKK Club Score</span>
          <div className="text-xl font-semibold text-indigo-300 font-mono my-1">94.2 / 100</div>
          <span className="text-[10px] text-indigo-400 font-mono">High Club Dynamic Range</span>
        </div>
      </div>

      {/* Track stream leaderboards */}
      <div className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-3">
        <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
          Catalog Stream Leaderboard & DSP Distribution
        </h3>

        <div className="space-y-2.5">
          {streamsByTrack.map((trk, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-1.5">
                  <span className="text-zinc-500 text-[11px]">{idx + 1}.</span>
                  <span className="font-medium text-zinc-100 text-xs">{trk.name}</span>
                  <span className="text-zinc-400 text-[10px]">({trk.artist})</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="text-indigo-300 text-[10px]">{trk.dsp}</span>
                  <span className="font-semibold text-emerald-400 text-[11px]">{trk.streams.toLocaleString()} streams</span>
                </div>
              </div>
              <div className="w-full bg-[#18181B] h-1.5 rounded-full overflow-hidden border border-[#27272A]">
                <div style={{ width: `${trk.share}%` }} className="bg-indigo-600 h-full rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
