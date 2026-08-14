import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Disc3, Megaphone, Users, Clock } from 'lucide-react';

interface CalendarModuleProps {
  onOpenQuickCreate: () => void;
}

export const CalendarModule: React.FC<CalendarModuleProps> = ({ onOpenQuickCreate }) => {
  const { calendarEvents, releases, campaigns } = useData();
  const [currentMonth, setCurrentMonth] = useState('August 2026');

  return (
    <div id="calendar-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              Label Release & Marketing Calendar
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            Worldwide release dates, Inflyte promo delivery windows, DSP editorial pitch lead times.
          </p>
        </div>

        <button
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[11px]">Add Milestone</span>
        </button>
      </div>

      {/* Events Timeline */}
      <div className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-[#27272A] pb-2.5">
          <div className="flex items-center space-x-2.5">
            <h3 className="text-xs font-semibold text-[#FAFAFA] font-mono">{currentMonth}</h3>
            <span className="px-1.5 py-0.2 text-[9px] font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 rounded">
              {calendarEvents.length} Events Scheduled
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {calendarEvents.map(evt => (
            <div
              key={evt.id}
              className="p-3 rounded-md bg-[#18181B] border border-[#27272A] space-y-1.5 hover:border-[#3F3F46] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9px] font-mono font-medium uppercase px-1.5 py-0.2 rounded ${
                    evt.type === 'RELEASE'
                      ? 'bg-indigo-950/70 text-indigo-300 border border-indigo-500/30'
                      : evt.type === 'CAMPAIGN'
                      ? 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                      : 'bg-purple-950/70 text-purple-300 border border-purple-500/30'
                  }`}
                >
                  {evt.type}
                </span>
                <span className="text-[11px] font-mono font-medium text-zinc-300">{evt.date}</span>
              </div>

              <h4 className="text-xs font-medium text-zinc-100">{evt.title}</h4>
              {evt.description && (
                <p className="text-[11px] text-zinc-400">{evt.description}</p>
              )}
              {evt.time && (
                <p className="text-[10px] font-mono text-indigo-400 flex items-center space-x-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{evt.time}</span>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
