import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Layers, Plus, Download, Search, HardDrive, FileAudio, Image as ImageIcon, ExternalLink } from 'lucide-react';

interface AssetsModuleProps {
  onOpenQuickCreate: () => void;
}

export const AssetsModule: React.FC<AssetsModuleProps> = ({ onOpenQuickCreate }) => {
  const { assets } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const filteredAssets = assets.filter(a => {
    const matchesType = typeFilter === 'ALL' || a.type === typeFilter;
    const matchesQuery =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div id="assets-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              Master Audio & High-Res Artwork Vault
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            Uncompressed WAV 24-bit/44.1kHz masters, 3000x3000px artwork covers, vector logo packs, and stems.
          </p>
        </div>

        <button
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[11px]">Upload New Asset</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-[#121215] border border-[#27272A] p-2.5 rounded-lg">
        <div className="flex items-center space-x-2 w-full sm:w-72 bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1">
          <Search className="w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search vault files, catalog items..."
            className="w-full bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none font-mono"
          />
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'AUDIO_MASTER', 'ARTWORK', 'CONTRACT_PDF', 'PRESS_KIT'].map(tp => (
            <button
              key={tp}
              onClick={() => setTypeFilter(tp)}
              className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                typeFilter === tp
                  ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B]'
              }`}
            >
              {tp.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {filteredAssets.map(ast => (
          <div
            key={ast.id}
            className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-3 hover:border-[#3F3F46] transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-medium uppercase bg-indigo-950/70 text-indigo-300 border border-indigo-500/30 rounded">
                  {ast.type.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">{ast.size}</span>
              </div>

              <div className="flex items-start space-x-2.5">
                <div className="w-8 h-8 rounded-md bg-[#18181B] border border-[#27272A] flex items-center justify-center text-indigo-400 shrink-0">
                  {ast.type === 'AUDIO_MASTER' ? (
                    <FileAudio className="w-4 h-4" />
                  ) : ast.type === 'ARTWORK' ? (
                    <ImageIcon className="w-4 h-4" />
                  ) : (
                    <HardDrive className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-medium text-[#FAFAFA] truncate">{ast.title}</h3>
                  <p className="text-[10px] font-mono text-zinc-400 mt-0.5 truncate">{ast.format} • {ast.category}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#27272A] flex items-center justify-between">
              <span className="text-[9px] font-mono text-zinc-500">Updated: {ast.updatedAt}</span>
              <a
                href={ast.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 px-2 py-1 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-indigo-300 rounded text-[11px] font-mono transition-colors"
              >
                <Download className="w-3 h-3" />
                <span>Download</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
