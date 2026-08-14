import React from 'react';
import { useData } from '../../context/DataContext';
import { FileSignature, Plus, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ContractsModuleProps {
  onOpenQuickCreate: () => void;
}

export const ContractsModule: React.FC<ContractsModuleProps> = ({ onOpenQuickCreate }) => {
  const { contracts } = useData();

  return (
    <div id="contracts-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <FileSignature className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              Artist Contracts & Master Rights Registry
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            50/50 Net master revenue sharing agreements, exclusive label commitments, and sync licensing terms.
          </p>
        </div>

        <button
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[11px]">Draft Contract</span>
        </button>
      </div>

      {/* Contracts List */}
      <div className="space-y-3">
        {contracts.map(cnt => (
          <div
            key={cnt.id}
            className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#27272A] pb-2.5">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xs font-medium text-[#FAFAFA]">{cnt.title}</h3>
                  <span
                    className={`px-1.5 py-0.2 text-[9px] font-mono font-medium uppercase rounded ${
                      cnt.status === 'ACTIVE'
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {cnt.status}
                  </span>
                </div>
                <p className="text-[11px] text-indigo-300 font-mono mt-0.5">
                  Artist: {cnt.artistName} • Territory: {cnt.territory}
                </p>
              </div>

              <div className="text-left sm:text-right font-mono text-xs text-zinc-400">
                <span className="text-[11px]">Royalty Rate: <strong className="text-emerald-400">{cnt.royaltyRate}% Net Master</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="bg-[#18181B] border border-[#27272A] p-2.5 rounded-md">
                <span className="text-zinc-500 block text-[9px] uppercase">Effective Window</span>
                <span className="text-zinc-200 mt-0.5 block text-[11px]">{cnt.startDate} → {cnt.expirationDate}</span>
              </div>
              <div className="bg-[#18181B] border border-[#27272A] p-2.5 rounded-md">
                <span className="text-zinc-500 block text-[9px] uppercase">Agreement Type</span>
                <span className="text-indigo-300 mt-0.5 block text-[11px]">{cnt.type.replace('_', ' ')}</span>
              </div>
              <div className="bg-[#18181B] border border-[#27272A] p-2.5 rounded-md">
                <span className="text-zinc-500 block text-[9px] uppercase">Master Ownership</span>
                <span className="text-emerald-400 mt-0.5 block text-[11px]">50% Indigo / 50% Artist</span>
              </div>
            </div>

            {cnt.notes && (
              <p className="text-xs text-zinc-400 bg-[#18181B] border border-[#27272A] p-2.5 rounded-md">
                {cnt.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
