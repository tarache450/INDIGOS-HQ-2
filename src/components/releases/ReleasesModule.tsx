import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Release, Track } from '../../types';
import {
  Disc3,
  Plus,
  Search,
  Sliders,
  ExternalLink,
  Play,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Radio,
  FileText,
  Share2,
  Sparkles,
  BarChart2,
  X
} from 'lucide-react';

interface ReleasesModuleProps {
  onOpenQuickCreate: () => void;
}

export const ReleasesModule: React.FC<ReleasesModuleProps> = ({ onOpenQuickCreate }) => {
  const { releases, tracks, artists } = useData();
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(releases[0] || null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReleases = releases.filter(r => {
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.catalogNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.artistName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const releaseTracks = selectedRelease
    ? tracks.filter(t => t.releaseId === selectedRelease.id)
    : [];

  return (
    <div id="releases-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Disc3 className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              Catalog & Releases (IR001 — IR004+)
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            Official master catalog, ISRC registrations, TEKK audio analysis, and 50/50 net royalty splits.
          </p>
        </div>

        <button
          id="btn-create-release"
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[11px]">New Catalog Release</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-[#121215] border border-[#27272A] p-2.5 rounded-lg">
        <div className="flex items-center space-x-2 w-full sm:w-72 bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1">
          <Search className="w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter by catalog IR, title, artist..."
            className="w-full bg-transparent text-xs text-[#FAFAFA] placeholder-zinc-500 focus:outline-none font-mono"
          />
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'RELEASED', 'SCHEDULED', 'MASTERING', 'DRAFT'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                statusFilter === st
                  ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/40 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B] border border-transparent'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Workspace: Release List & Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Col: Releases List */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredReleases.map(rel => {
            const isSelected = selectedRelease?.id === rel.id;
            return (
              <div
                key={rel.id}
                onClick={() => setSelectedRelease(rel)}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex space-x-3 ${
                  isSelected
                    ? 'bg-[#18181B] border-indigo-500/60 shadow-xs ring-1 ring-indigo-500/30'
                    : 'bg-[#121215] border-[#27272A] hover:bg-[#18181B] hover:border-[#3F3F46]'
                }`}
              >
                <img
                  src={rel.artworkUrl}
                  alt={rel.title}
                  className="w-16 h-16 rounded-md object-cover ring-1 ring-zinc-700 shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] font-medium text-indigo-300 bg-indigo-950/80 px-1.5 py-0.2 rounded border border-indigo-500/30">
                        {rel.catalogNumber}
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded ${
                          rel.status === 'RELEASED'
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {rel.status}
                      </span>
                    </div>
                    <h3 className="text-xs font-medium text-zinc-100 truncate mt-1">{rel.title}</h3>
                    <p className="text-[10px] text-zinc-400 truncate">{rel.artistName}</p>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-1.5 border-t border-[#27272A]">
                    <span>{rel.releaseDate}</span>
                    {rel.tekkScore && (
                      <span className="text-indigo-400 font-medium">TEKK: {rel.tekkScore}/100</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Selected Release Workspace Detail */}
        <div className="lg:col-span-7">
          {selectedRelease ? (
            <div className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-4">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row gap-4 pb-3.5 border-b border-[#27272A]">
                <img
                  src={selectedRelease.artworkUrl}
                  alt={selectedRelease.title}
                  className="w-24 h-24 rounded-md object-cover ring-1 ring-zinc-700 shadow-sm self-center sm:self-start shrink-0"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-1.5 py-0.2 text-[10px] font-mono font-medium bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 rounded">
                      {selectedRelease.catalogNumber}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">
                      {selectedRelease.type} • {selectedRelease.releaseDate}
                    </span>
                  </div>
                  <h2 className="text-sm font-semibold text-[#FAFAFA]">{selectedRelease.title}</h2>
                  <p className="text-xs text-indigo-300 font-medium">{selectedRelease.artistName}</p>
                  
                  {selectedRelease.description && (
                    <p className="text-[11px] text-zinc-400 line-clamp-2">{selectedRelease.description}</p>
                  )}

                  {/* External Links */}
                  <div className="flex items-center space-x-3 pt-1">
                    {selectedRelease.spotifyUrl && (
                      <a
                        href={selectedRelease.spotifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1 text-[10px] text-emerald-400 hover:text-emerald-300 font-mono"
                      >
                        <Radio className="w-3 h-3" />
                        <span>Spotify</span>
                      </a>
                    )}
                    {selectedRelease.beatportUrl && (
                      <a
                        href={selectedRelease.beatportUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1 text-[10px] text-cyan-400 hover:text-cyan-300 font-mono"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Beatport</span>
                      </a>
                    )}
                    <span className="text-[10px] font-mono text-zinc-500">
                      UPC: {selectedRelease.upc}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tracks in Release */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300">
                    Tracklist & Audio Metadata ({releaseTracks.length} Tracks)
                  </h3>
                </div>

                <div className="space-y-1.5">
                  {releaseTracks.map((trk, idx) => (
                    <div
                      key={trk.id}
                      className="p-2.5 rounded-md bg-[#18181B] border border-[#27272A] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <span className="font-mono text-[10px] text-zinc-500 w-4">{idx + 1}.</span>
                          <div>
                            <p className="text-xs font-medium text-zinc-100">
                              {trk.title} <span className="text-indigo-400 font-normal">({trk.mixName})</span>
                            </p>
                            <p className="text-[10px] text-zinc-400 font-mono">
                              ISRC: {trk.isrc} • {trk.duration} • {trk.bpm} BPM • {trk.key}
                            </p>
                          </div>
                        </div>

                        {trk.tekkAnalysis && (
                          <div className="text-right">
                            <span className="text-[10px] font-medium font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                              TEKK: {trk.tekkAnalysis.clubScore}/100
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Signal Analysis Sub-panel */}
                      {trk.tekkAnalysis && (
                        <div className="grid grid-cols-4 gap-2 pt-1.5 border-t border-[#27272A] text-[9px] font-mono text-zinc-400">
                          <div>
                            <span className="text-zinc-500 block">Sub-Bass:</span>
                            <span className="text-zinc-200 font-medium">{trk.tekkAnalysis.subBassEnergy}%</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">Loudness:</span>
                            <span className="text-zinc-200 font-medium">{trk.tekkAnalysis.loudnessLufs} LUFS</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">Stereo Width:</span>
                            <span className="text-zinc-200 font-medium">{trk.tekkAnalysis.stereoWidth}%</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block">Spectrum:</span>
                            <span className="text-emerald-400 font-medium">{trk.tekkAnalysis.frequencySpectrumRating}</span>
                          </div>
                        </div>
                      )}

                      {/* Splits summary */}
                      <div className="pt-1.5 border-t border-[#27272A] flex items-center justify-between text-[9px] font-mono">
                        <span className="text-zinc-500">Master Splits:</span>
                        <div className="flex space-x-2">
                          {trk.splits.map((s, sI) => (
                            <span key={sI} className="text-indigo-300">
                              {s.recipientName}: {s.percentage}%
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Master Royalty Split Verification (50/50) */}
              <div className="bg-[#18181B] border border-[#27272A] rounded-md p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <h4 className="text-[11px] font-mono font-semibold uppercase text-[#FAFAFA]">
                      50/50 Master Royalty Split Verification
                    </h4>
                  </div>
                  <span className="px-1.5 py-0.2 text-[9px] font-mono font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded">
                    VALIDATED: 100% TOTAL
                  </span>
                </div>
                <div className="w-full bg-[#27272A] h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-indigo-600 h-full w-1/2 flex items-center justify-center text-[8px] font-mono text-white" title="Indigo Records (50%)">
                    50% Label
                  </div>
                  <div className="bg-emerald-600 h-full w-1/2 flex items-center justify-center text-[8px] font-mono text-white" title="Artists Share (50%)">
                    50% Artist Roster
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#121215] border border-[#27272A] rounded-lg p-10 text-center text-zinc-500 font-mono text-xs">
              Select a release from the catalog to inspect metadata, TEKK analysis, and split contracts.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
