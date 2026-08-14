import React from 'react';
import { useData } from '../../context/DataContext';
import { Activity, ShieldCheck, Clock, User, Filter } from 'lucide-react';

export const ActivityModule: React.FC = () => {
  const { dashboard } = useData();
  const activities = dashboard?.recentActivity || [];

  return (
    <div id="activity-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              System Audit & Operation Logs
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            Immutable audit record of all catalog modifications, split updates, A&R stage changes, and sync triggers.
          </p>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-2">
        {activities.map(act => (
          <div
            key={act.id}
            className="p-3 rounded-md bg-[#18181B] border border-[#27272A] flex items-start justify-between space-x-3"
          >
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="font-medium text-[#FAFAFA] text-xs">{act.actor}</span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-medium uppercase bg-indigo-950/70 text-indigo-300 border border-indigo-500/30 rounded">
                  {act.action}
                </span>
                <span className="text-zinc-500 text-[10px] font-mono">[{act.entityType}]</span>
              </div>
              <p className="text-[11px] text-zinc-300">{act.description}</p>
            </div>

            <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap shrink-0">
              {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(act.timestamp).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
