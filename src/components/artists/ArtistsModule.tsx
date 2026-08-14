import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Artist } from '../../types';
import {
  Users,
  Plus,
  Search,
  ExternalLink,
  MapPin,
  Calendar,
  Radio,
  FileText,
  Disc3,
  Award,
  Music2
} from 'lucide-react';

interface ArtistsModuleProps {
  onOpenQuickCreate: () => void;
  onSelectRelease?: (releaseId: string) => void;
}

export const ArtistsModule: React.FC<ArtistsModuleProps> = ({ onOpenQuickCreate, onSelectRelease }) => {
  const { artists, releases, contracts } = useData();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(artists[0] || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtists = artists.filter(
    a =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.country && a.country.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const artistReleases = selectedArtist
    ? releases.filter(r => r.artistId === selectedArtist.id || r.artistName.includes(selectedArtist.name))
    : [];

  const artistContracts = selectedArtist
    ? contracts.filter(c => c.artistId === selectedArtist.id)
    : [];

  return (
    <div id="artists-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              Artist Roster & Management
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            Exclusive artist roster, bio assets, discographies, contracts, and DSP listener metrics.
          </p>
        </div>

        <button
          id="btn-create-artist"
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[11px]">Add Artist</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between bg-[#121215] border border-[#27272A] p-2.5 rounded-lg">
        <div className="flex items-center space-x-2 w-full sm:w-80 bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1">
          <Search className="w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search artists by name, genre, territory..."
            className="w-full bg-transparent text-xs text-[#FAFAFA] placeholder-zinc-500 focus:outline-none font-mono"
          />
        </div>
        <div className="text-[11px] font-mono text-zinc-400">
          Showing {filteredArtists.length} of {artists.length} signed artists
        </div>
      </div>

      {/* 2-Column Grid: Roster Cards & Artist Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Col: Artist Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredArtists.map(artist => {
            const isSelected = selectedArtist?.id === artist.id;
            return (
              <div
                key={artist.id}
                onClick={() => setSelectedArtist(artist)}
                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center space-x-3 ${
                  isSelected
                    ? 'bg-[#18181B] border-indigo-500/60 shadow-xs ring-1 ring-indigo-500/30'
                    : 'bg-[#121215] border-[#27272A] hover:bg-[#18181B] hover:border-[#3F3F46]'
                }`}
              >
                <img
                  src={artist.photoUrl}
                  alt={artist.name}
                  className="w-11 h-11 rounded-full object-cover ring-1 ring-zinc-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-medium text-[#FAFAFA] truncate">{artist.name}</h3>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                      {artist.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">{artist.genres.join(' • ')}</p>
                  
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-1.5 mt-1.5 border-t border-[#27272A]">
                    <span>{artist.country || 'Global'}</span>
                    <span className="text-indigo-400 font-medium">
                      {artist.monthlyListeners ? `${(artist.monthlyListeners / 1000).toFixed(1)}k listeners` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Col: Artist Workspace / Dossier */}
        <div className="lg:col-span-7">
          {selectedArtist ? (
            <div className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-4">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row gap-4 pb-3.5 border-b border-[#27272A]">
                <img
                  src={selectedArtist.photoUrl}
                  alt={selectedArtist.name}
                  className="w-20 h-20 rounded-lg object-cover ring-1 ring-zinc-700 shadow-sm self-center sm:self-start shrink-0"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-[#FAFAFA]">{selectedArtist.name}</h2>
                    <span className="px-1.5 py-0.2 text-[10px] font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 rounded">
                      Signed: {selectedArtist.signedDate || '2024'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {selectedArtist.genres.map((g, idx) => (
                      <span key={idx} className="px-1.5 py-0.2 text-[10px] font-mono bg-[#18181B] text-zinc-300 rounded border border-[#27272A]">
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3 text-[11px] font-mono text-zinc-400 pt-0.5">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-indigo-400" />
                      <span>{selectedArtist.city ? `${selectedArtist.city}, ` : ''}{selectedArtist.country || 'Global'}</span>
                    </span>
                    <span>•</span>
                    <span className="text-indigo-300 font-medium">
                      {selectedArtist.monthlyListeners?.toLocaleString()} monthly listeners
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio & Philosophy */}
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400">
                  Artist Biography & Sound Identity
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed bg-[#18181B] border border-[#27272A] p-3 rounded-md">
                  {selectedArtist.bio}
                </p>
              </div>

              {/* Discography on Indigo Records */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400">
                  Label Discography ({artistReleases.length} Releases)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {artistReleases.map(rel => (
                    <div
                      key={rel.id}
                      className="p-2.5 rounded-md bg-[#18181B] border border-[#27272A] flex items-center space-x-2.5"
                    >
                      <img src={rel.artworkUrl} alt={rel.title} className="w-10 h-10 rounded-md object-cover" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-mono text-indigo-400 font-semibold">{rel.catalogNumber}</span>
                        <h5 className="text-xs font-medium text-zinc-100 truncate">{rel.title}</h5>
                        <p className="text-[9px] font-mono text-zinc-400">{rel.releaseDate} • {rel.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* External Sync Reference */}
              {selectedArtist.externalReference && (
                <div className="p-2.5 rounded-md bg-[#09090B] border border-[#27272A] flex items-center justify-between text-[11px] font-mono">
                  <div className="space-y-0.5">
                    <span className="text-zinc-500 text-[9px]">WEBSITE SYNC REFERENCE</span>
                    <p className="text-zinc-300">ID: {selectedArtist.externalReference.externalId}</p>
                  </div>
                  <span className="px-1.5 py-0.2 text-[9px] font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded">
                    SYNCED WITH indigosrecords.site
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#121215] border border-[#27272A] rounded-lg p-10 text-center text-zinc-500 font-mono text-xs">
              Select an artist to view full roster dossier.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
