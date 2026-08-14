import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import {
  Search,
  Disc3,
  Users,
  Headphones,
  Megaphone,
  CheckSquare,
  FileText,
  DollarSign,
  ArrowRight,
  X
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity?: (module: string, entityId?: string) => void;
  onNavigate?: (module: string, entityId?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectEntity,
  onNavigate
}) => {
  const { artists, releases, tracks, demos, campaigns, tasks, contacts } = useData();
  const [query, setQuery] = useState('');

  const handleSelect = (module: string, entityId?: string) => {
    if (onNavigate) onNavigate(module, entityId);
    else if (onSelectEntity) onSelectEntity(module, entityId);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Filter entities
  const matchingReleases = releases.filter(
    r => r.title.toLowerCase().includes(q) || r.catalogNumber.toLowerCase().includes(q) || r.artistName.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchingArtists = artists.filter(
    a => a.name.toLowerCase().includes(q) || a.genres.some(g => g.toLowerCase().includes(q))
  ).slice(0, 4);

  const matchingDemos = demos.filter(
    d => d.trackTitle.toLowerCase().includes(q) || d.artistName.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchingTasks = tasks.filter(
    t => t.title.toLowerCase().includes(q) || t.assignedTo?.toLowerCase().includes(q)
  ).slice(0, 3);

  const matchingCampaigns = campaigns.filter(
    c => c.title.toLowerCase().includes(q)
  ).slice(0, 3);

  const hasResults =
    matchingReleases.length > 0 ||
    matchingArtists.length > 0 ||
    matchingDemos.length > 0 ||
    matchingTasks.length > 0 ||
    matchingCampaigns.length > 0;

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-start justify-center pt-16 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#121215] border border-[#27272A] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search input header */}
        <div className="p-3 border-b border-[#27272A] flex items-center space-x-2.5 bg-[#09090B]">
          <Search className="w-4 h-4 text-indigo-400 shrink-0" />
          <input
            id="input-command-palette"
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Indigo HQ by artist, release (IR001-IR004), demo, task..."
            className="w-full bg-transparent text-xs text-[#FAFAFA] placeholder-zinc-500 focus:outline-none font-mono"
          />
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-200">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-2.5 overflow-y-auto space-y-3">
          {!hasResults && query && (
            <div className="py-8 text-center text-zinc-500 text-xs font-mono">
              No matching records found for "{query}".
            </div>
          )}

          {/* Quick Navigation Shortcuts when query is empty */}
          {!query && (
            <div className="space-y-1.5">
              <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 px-1.5">Quick Navigation</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { module: 'releases', label: 'Catalog & Releases (IR001-IR004)', icon: Disc3 },
                  { module: 'artists', label: 'Artist Roster & Profiles', icon: Users },
                  { module: 'ar', label: 'A&R Demo Inbox (TEKK Scores)', icon: Headphones },
                  { module: 'campaigns', label: 'Marketing & DJ Promo Hub', icon: Megaphone },
                  { module: 'tasks', label: 'Operations & Task Board', icon: CheckSquare },
                  { module: 'finance', label: 'Finance & Master Royalty Splits', icon: DollarSign }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.module}
                      onClick={() => handleSelect(item.module)}
                      className="flex items-center space-x-2 p-2 rounded-md bg-[#18181B] hover:bg-[#202025] border border-[#27272A] text-left text-xs text-zinc-200 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate text-[11px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Releases Results */}
          {matchingReleases.length > 0 && (
            <div>
              <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 px-1.5 mb-1">Releases</p>
              <div className="space-y-0.5">
                {matchingReleases.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleSelect('releases', r.id)}
                    className="w-full flex items-center justify-between p-2 rounded-md hover:bg-[#18181B] border border-transparent hover:border-[#27272A] text-left transition-colors group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-6 h-6 rounded bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center font-mono text-[9px] text-indigo-300 font-semibold">
                        {r.catalogNumber}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-zinc-200 group-hover:text-indigo-300">{r.title}</p>
                        <p className="text-[10px] text-zinc-400">{r.artistName} • {r.type} ({r.releaseDate})</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Artists Results */}
          {matchingArtists.length > 0 && (
            <div>
              <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 px-1.5 mb-1">Artists</p>
              <div className="space-y-0.5">
                {matchingArtists.map(a => (
                  <button
                    key={a.id}
                    onClick={() => handleSelect('artists', a.id)}
                    className="w-full flex items-center justify-between p-2 rounded-md hover:bg-[#18181B] border border-transparent hover:border-[#27272A] text-left transition-colors group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <img src={a.photoUrl} alt={a.name} className="w-6 h-6 rounded-full object-cover ring-1 ring-zinc-700" />
                      <div>
                        <p className="text-xs font-medium text-zinc-200 group-hover:text-indigo-300">{a.name}</p>
                        <p className="text-[10px] text-zinc-400">{a.genres.join(', ')} • {a.country}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Demos Results */}
          {matchingDemos.length > 0 && (
            <div>
              <p className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 px-1.5 mb-1">A&R Demos</p>
              <div className="space-y-0.5">
                {matchingDemos.map(d => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect('ar', d.id)}
                    className="w-full flex items-center justify-between p-2 rounded-md hover:bg-[#18181B] border border-transparent hover:border-[#27272A] text-left transition-colors group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Headphones className="w-3.5 h-3.5 text-indigo-400" />
                      <div>
                        <p className="text-xs font-medium text-zinc-200 group-hover:text-indigo-300">{d.trackTitle}</p>
                        <p className="text-[10px] text-zinc-400">By {d.artistName} • Status: {d.status} • Score: {d.score}/10</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2 bg-[#09090B] border-t border-[#27272A] flex items-center justify-between text-[10px] text-zinc-400 font-mono">
          <span>Press ESC to exit</span>
          <span>INDIGO OS SPOTLIGHT</span>
        </div>
      </div>
    </div>
  );
};
