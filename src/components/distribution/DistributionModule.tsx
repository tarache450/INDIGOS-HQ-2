import React from 'react';
import { useData } from '../../context/DataContext';
import { Radio, CheckCircle2, AlertCircle, Disc3, ShieldCheck, Server, Globe } from 'lucide-react';

export const DistributionModule: React.FC = () => {
  const { releases, tracks } = useData();

  const dsps = [
    { name: 'Spotify for Artists', status: 'CONNECTED', feed: 'Direct DDEX Feed', icon: '🟢' },
    { name: 'Beatport for Labels Hub', status: 'CONNECTED', feed: 'Automated Catalog Sync', icon: '🟢' },
    { name: 'Apple Music / iTunes', status: 'CONNECTED', feed: 'High-Res ALAC 24-bit', icon: '🟢' },
    { name: 'Traxsource & Juno Download', status: 'CONNECTED', feed: 'Club Promo Delivery', icon: '🟢' },
    { name: 'Amazon Music & Deezer', status: 'CONNECTED', feed: 'Global Ingest', icon: '🟢' }
  ];

  return (
    <div id="distribution-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              DSP Distribution & Master Delivery Hub
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            DDEX ingestion, ISRC/UPC validation, 24-bit 44.1kHz audio checks, and DSP storefront readiness.
          </p>
        </div>
      </div>

      {/* DSP Pipeline Connections */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {dsps.map((dsp, idx) => (
          <div key={idx} className="bg-[#121215] border border-[#27272A] rounded-lg p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#FAFAFA]">{dsp.name}</span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded">
                {dsp.status}
              </span>
            </div>
            <p className="text-[10px] font-mono text-zinc-400">{dsp.feed}</p>
          </div>
        ))}
      </div>

      {/* Catalog Delivery Audits */}
      <div className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-3">
        <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
          Catalog Metadata & Delivery Audit Check
        </h3>

        <div className="space-y-2">
          {releases.map(rel => (
            <div
              key={rel.id}
              className="p-3 rounded-md bg-[#18181B] border border-[#27272A] flex flex-col md:flex-row md:items-center justify-between gap-2.5"
            >
              <div className="flex items-center space-x-2.5">
                <img src={rel.artworkUrl} alt={rel.title} className="w-10 h-10 rounded-md object-cover" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-medium font-mono text-indigo-300">{rel.catalogNumber}</span>
                    <span className="text-xs font-medium text-zinc-100">{rel.title}</span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-400">
                    UPC: {rel.upc} • ISRC: {rel.isrc} • Release: {rel.releaseDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded-md text-[10px] font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Metadata Passed</span>
                </span>
                <span className="flex items-center space-x-1 px-2 py-0.5 bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 rounded-md text-[10px] font-mono">
                  <span>24-bit Master Ready</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
