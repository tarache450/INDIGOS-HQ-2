import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { UserRole } from '../../types';
import {
  Search,
  Plus,
  RefreshCw,
  Sliders,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Radio,
  Bell
} from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenQuickCreate: () => void;
  onOpenAiDrawer: () => void;
  activeModule?: string;
  setActiveModule?: (m: string) => void;
  onNavigate?: (m: string) => void;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenQuickCreate,
  onOpenAiDrawer,
  activeModule,
  setActiveModule,
  onNavigate,
  onToggleMobileMenu
}) => {
  const { currentUser, switchRole, users } = useAuth();
  const { syncStatus, triggerSync } = useData();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const navigateTo = (mod: string) => {
    if (onNavigate) onNavigate(mod);
    else if (setActiveModule) setActiveModule(mod);
  };

  const handleQuickSync = async () => {
    setIsSyncing(true);
    try {
      await triggerSync('INCREMENTAL_SYNC');
    } finally {
      setIsSyncing(false);
    }
  };

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'SUPER_ADMIN', label: 'Tarache (Super Admin)', desc: 'Full System & Master Control' },
    { role: 'LABEL_MANAGER', label: 'Elena Vance (Label Manager)', desc: 'Operations & Release Logistics' },
    { role: 'A_AND_R', label: 'Marco De Luca (A&R Director)', desc: 'Talent, Demos & TEKK Review' },
    { role: 'MARKETING', label: 'Sofia Chen (Marketing Lead)', desc: 'Campaigns, DSP & DJ Promo' },
    { role: 'FINANCE', label: 'Julian Ross (Finance & Splits)', desc: 'Royalties, Statements & Payouts' },
    { role: 'ARTIST', label: 'Maniky (Signed Artist)', desc: 'Restricted Artist Portal' }
  ];

  return (
    <header id="indigo-hq-header" className="h-13 bg-[#09090B] border-b border-[#27272A] flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0">
      {/* Left: Mobile menu toggle + Brand Identity */}
      <div className="flex items-center space-x-3 sm:space-x-5">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-[#18181B] border border-[#27272A]"
            aria-label="Toggle menu"
          >
            <Radio className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigateTo('command-center')}>
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center shadow-xs border border-indigo-400/30">
            <Radio className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold tracking-wide text-xs text-[#FAFAFA] font-mono">INDIGO HQ</span>
              <span className="px-1.5 py-0.2 text-[9px] uppercase font-mono tracking-widest bg-zinc-800 text-zinc-300 border border-zinc-700 rounded">
                v1.0
              </span>
            </div>
            <p className="text-[9px] text-zinc-400 font-mono tracking-tight leading-none hidden sm:block">Private Label OS</p>
          </div>
        </div>

        {/* Global Search trigger */}
        <button
          id="btn-global-search"
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center space-x-2.5 px-2.5 py-1 bg-[#121215] hover:bg-[#18181B] border border-[#27272A] rounded-md text-xs text-zinc-400 hover:text-zinc-200 transition-all w-60 justify-between"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-[11px] truncate">Search roster, IR codes, demos...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-[#18181B] text-zinc-400 rounded border border-zinc-700">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* TEKKIN Signal Engine Status Badge */}
        <div className="hidden lg:flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-950/40 border border-emerald-800/40 rounded text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>TEKKIN ACTIVE</span>
        </div>

        {/* Website Sync Trigger */}
        <button
          id="btn-quick-sync"
          onClick={handleQuickSync}
          disabled={isSyncing}
          title="Sync with indigosrecords.site"
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
            isSyncing
              ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300'
              : 'bg-[#121215] hover:bg-[#18181B] border-[#27272A] text-zinc-300'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-400' : 'text-zinc-400'}`} />
          <span className="hidden sm:inline font-mono text-[11px]">Sync</span>
        </button>

        {/* AI Copilot Drawer Trigger */}
        <button
          id="btn-open-ai-copilot"
          onClick={onOpenAiDrawer}
          className="flex items-center space-x-1.5 px-2.5 py-1 bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-500/40 rounded-md text-xs font-medium text-indigo-200 shadow-xs transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline font-mono text-[11px]">Indigo AI</span>
        </button>

        {/* Global Quick Create Action */}
        <button
          id="btn-quick-create-modal"
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">New</span>
        </button>

        <div className="h-4 w-[1px] bg-[#27272A] mx-1"></div>

        {/* Role & Persona Switcher */}
        <div className="relative">
          <button
            id="btn-role-switcher"
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-md hover:bg-[#18181B] border border-transparent hover:border-[#27324A] transition-all"
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.displayName}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-zinc-700"
            />
            <div className="text-left hidden xl:block">
              <div className="text-[11px] font-medium text-zinc-200 truncate max-w-[120px] leading-tight">
                {currentUser.displayName.split('(')[0].trim()}
              </div>
              <div className="text-[9px] text-zinc-400 font-mono leading-none">
                {currentUser.role.replace('_', ' ')}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-72 bg-[#121215] border border-[#27272A] rounded-lg shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-2.5 py-1.5 border-b border-[#27272A] mb-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Operator Persona</p>
                <p className="text-[11px] text-zinc-200 font-medium mt-0.5">Role-Based Access Control (RBAC)</p>
              </div>
              <div className="space-y-0.5 max-h-72 overflow-y-auto">
                {roles.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchRole(r.role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-start justify-between ${
                      currentUser.role === r.role
                        ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30'
                        : 'text-zinc-300 hover:bg-[#18181B]'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-[11px] text-zinc-100">{r.label}</p>
                      <p className="text-[10px] text-zinc-400">{r.desc}</p>
                    </div>
                    {currentUser.role === r.role && (
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
