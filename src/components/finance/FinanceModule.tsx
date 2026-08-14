import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  DollarSign,
  PieChart,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  Download,
  Percent
} from 'lucide-react';

interface FinanceModuleProps {
  onOpenQuickCreate: () => void;
}

export const FinanceModule: React.FC<FinanceModuleProps> = ({ onOpenQuickCreate }) => {
  const { revenues, expenses, royalties, releases, artists, createRoyalty } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'royalties' | 'revenues' | 'expenses'>('overview');

  // Calculation summaries
  const totalRevenue = revenues.reduce((sum, r) => sum + r.grossAmount, 0);
  const netRevenue = revenues.reduce((sum, r) => sum + r.netAmount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const totalPaidRoyalties = royalties.filter(r => r.status === 'PAID').reduce((sum, r) => sum + r.netPayout, 0);

  // Split Validator Tool State
  const [labelPercent, setLabelPercent] = useState(50);
  const [artist1Percent, setArtist1Percent] = useState(25);
  const [artist2Percent, setArtist2Percent] = useState(25);
  const totalSplitSum = labelPercent + artist1Percent + artist2Percent;
  const isSplitValid = totalSplitSum === 100;

  return (
    <div id="finance-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              Financial Operations & 50/50 Master Royalties
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            DSP statements (Spotify, Beatport, Apple Music), expense ledgers, and strict 100% split validation.
          </p>
        </div>

        <button
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[11px]">Log Expense or Receipt</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Gross DSP Revenue</span>
          <div className="text-xl font-semibold text-[#FAFAFA] font-mono my-1">
            €{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">From Beatport & Spotify</span>
        </div>

        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Total Label Expenses</span>
          <div className="text-xl font-semibold text-rose-400 font-mono my-1">
            €{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">Mastering, Art, Promo</span>
        </div>

        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Net Operating Margin</span>
          <div className="text-xl font-semibold text-indigo-300 font-mono my-1">
            €{netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-indigo-400 font-mono">Healthy Cash Reserve</span>
        </div>

        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3 flex flex-col justify-between">
          <span className="text-[9px] font-mono uppercase text-zinc-400">Disbursed Artist Royalties</span>
          <div className="text-xl font-semibold text-emerald-400 font-mono my-1">
            €{totalPaidRoyalties.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">100% Payout Accuracy</span>
        </div>
      </div>

      {/* Split Verification Tool & Policy Guard */}
      <div className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#27272A] pb-2.5">
          <div className="flex items-center space-x-2">
            <Percent className="w-3.5 h-3.5 text-indigo-400" />
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
              Indigo Master Royalty Split Validator (50/50 Standard)
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            {isSplitValid ? (
              <span className="flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded-md text-[10px] font-mono font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>SPLIT VALIDATED: 100%</span>
              </span>
            ) : (
              <span className="flex items-center space-x-1.5 px-2 py-0.5 bg-rose-950/60 text-rose-300 border border-rose-500/30 rounded-md text-[10px] font-mono font-medium">
                <AlertCircle className="w-3 h-3" />
                <span>INVALID TOTAL: {totalSplitSum}% (Must equal 100%)</span>
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#18181B] border border-[#27272A] p-3 rounded-md space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-zinc-400">
              Indigo Records (Label Share)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={labelPercent}
                onChange={e => setLabelPercent(Number(e.target.value))}
                className="w-full bg-[#121215] border border-[#27272A] rounded-md px-2.5 py-1 text-xs text-[#FAFAFA] font-mono"
              />
              <span className="font-mono text-zinc-400 text-xs">%</span>
            </div>
            <p className="text-[9px] text-zinc-500">Fixed master investment and distribution share.</p>
          </div>

          <div className="bg-[#18181B] border border-[#27272A] p-3 rounded-md space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-zinc-400">
              Lead Artist / Producer
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={artist1Percent}
                onChange={e => setArtist1Percent(Number(e.target.value))}
                className="w-full bg-[#121215] border border-[#27272A] rounded-md px-2.5 py-1 text-xs text-[#FAFAFA] font-mono"
              />
              <span className="font-mono text-zinc-400 text-xs">%</span>
            </div>
            <p className="text-[9px] text-zinc-500">Primary author share.</p>
          </div>

          <div className="bg-[#18181B] border border-[#27272A] p-3 rounded-md space-y-1.5">
            <label className="block text-[10px] font-mono uppercase text-zinc-400">
              Collaborator / Remixer
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={artist2Percent}
                onChange={e => setArtist2Percent(Number(e.target.value))}
                className="w-full bg-[#121215] border border-[#27272A] rounded-md px-2.5 py-1 text-xs text-[#FAFAFA] font-mono"
              />
              <span className="font-mono text-zinc-400 text-xs">%</span>
            </div>
            <p className="text-[9px] text-zinc-500">Featured artist or remix author.</p>
          </div>
        </div>

        {/* Visual Split Distribution Bar */}
        <div className="w-full bg-[#18181B] h-3 rounded-full overflow-hidden flex border border-[#27272A]">
          <div
            style={{ width: `${labelPercent}%` }}
            className="bg-indigo-600 h-full flex items-center justify-center text-[8px] font-mono text-white"
          >
            Label ({labelPercent}%)
          </div>
          <div
            style={{ width: `${artist1Percent}%` }}
            className="bg-emerald-600 h-full flex items-center justify-center text-[8px] font-mono text-white"
          >
            Artist ({artist1Percent}%)
          </div>
          <div
            style={{ width: `${artist2Percent}%` }}
            className="bg-cyan-600 h-full flex items-center justify-center text-[8px] font-mono text-white"
          >
            Collab ({artist2Percent}%)
          </div>
        </div>
      </div>

      {/* Ledgers: Royalties & Revenues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Royalties Calculated */}
        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
              Artist Royalty Payout Statements
            </h3>
            <span className="text-[10px] font-mono text-zinc-400">Quarterly Calculations</span>
          </div>

          <div className="space-y-1.5">
            {royalties.map(roy => (
              <div
                key={roy.id}
                className="p-2.5 rounded-md bg-[#18181B] border border-[#27272A] flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-[#FAFAFA]">{roy.artistName}</p>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Release: {roy.releaseTitle} ({roy.period}) • {roy.splitPercentage}% Split
                  </p>
                  {roy.paymentRef && (
                    <span className="text-[9px] font-mono text-zinc-500 block mt-0.5">
                      Ref: {roy.paymentRef}
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold font-mono text-emerald-400">
                    €{roy.netPayout.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded">
                    {roy.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DSP Revenues */}
        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#FAFAFA]">
              DSP Revenue Feeds
            </h3>
            <span className="text-[10px] font-mono text-zinc-400">Direct Inflows</span>
          </div>

          <div className="space-y-1.5">
            {revenues.map(rev => (
              <div
                key={rev.id}
                className="p-2.5 rounded-md bg-[#18181B] border border-[#27272A] flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-medium text-[#FAFAFA]">{rev.source}</span>
                    <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/80 px-1 py-0.2 rounded border border-indigo-500/30">
                      {rev.period}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400">{rev.releaseTitle}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold font-mono text-[#FAFAFA]">
                    €{rev.grossAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500">
                    Net: €{rev.netAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
