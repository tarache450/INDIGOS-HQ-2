import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Contact } from '../../types';
import {
  Contact2,
  Plus,
  Search,
  Mail,
  MapPin,
  Calendar,
  Tag,
  Building,
  ArrowRight
} from 'lucide-react';

interface ContactsModuleProps {
  onOpenQuickCreate: () => void;
}

export const ContactsModule: React.FC<ContactsModuleProps> = ({ onOpenQuickCreate }) => {
  const { contacts } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredContacts = contacts.filter(c => {
    const matchesCat = categoryFilter === 'ALL' || c.category === categoryFilter;
    const matchesQuery =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.territory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div id="contacts-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Contact2 className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              Industry Contacts & Tastemaker CRM
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            Spotify playlist curators, resident club DJs, Beatport editors, radio hosts, and press tastemakers.
          </p>
        </div>

        <button
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[11px]">Add Contact</span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-[#121215] border border-[#27272A] p-2.5 rounded-lg">
        <div className="flex items-center space-x-2 w-full sm:w-72 bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1">
          <Search className="w-3.5 h-3.5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search contacts, companies, territory..."
            className="w-full bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none font-mono"
          />
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'PLAYLIST_CURATOR', 'DJ', 'PROMOTER', 'PRESS', 'LABEL_EXEC'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                categoryFilter === cat
                  ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#18181B]'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {filteredContacts.map(cnt => (
          <div
            key={cnt.id}
            className="bg-[#121215] border border-[#27272A] rounded-lg p-3.5 space-y-2.5 hover:border-[#3F3F46] transition-colors flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-medium uppercase bg-indigo-950/70 text-indigo-300 border border-indigo-500/30 rounded">
                  {cnt.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 flex items-center space-x-1">
                  <MapPin className="w-2.5 h-2.5 text-zinc-500" />
                  <span>{cnt.territory}</span>
                </span>
              </div>

              <div>
                <h3 className="text-xs font-medium text-[#FAFAFA]">{cnt.name}</h3>
                <p className="text-[10px] text-indigo-300 font-mono flex items-center space-x-1 mt-0.5">
                  <Building className="w-2.5 h-2.5" />
                  <span>{cnt.role} at {cnt.company}</span>
                </p>
              </div>

              <p className="text-[11px] text-zinc-400 bg-[#18181B] border border-[#27272A] p-2 rounded-md leading-relaxed">
                {cnt.notes}
              </p>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-[#27272A]">
              {cnt.nextActionNotes && (
                <div className="text-[10px] font-mono text-amber-300/90 bg-amber-950/40 p-1.5 rounded border border-amber-500/30">
                  <strong>Next Action ({cnt.nextActionDate}):</strong> {cnt.nextActionNotes}
                </div>
              )}

              <div className="flex items-center justify-between pt-0.5">
                <a
                  href={`mailto:${cnt.email}`}
                  className="flex items-center space-x-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-mono"
                >
                  <Mail className="w-3 h-3" />
                  <span>{cnt.email}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
