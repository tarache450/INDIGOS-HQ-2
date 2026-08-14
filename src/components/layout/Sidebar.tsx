import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  LayoutDashboard,
  Users,
  Disc3,
  Headphones,
  Contact2,
  Megaphone,
  Calendar,
  CheckSquare,
  DollarSign,
  PieChart,
  FileText,
  Radio,
  FolderLock,
  BarChart3,
  RefreshCw,
  Sparkles,
  History,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule?: (m: string) => void;
  onSelectModule?: (m: string) => void;
  onOpenAiDrawer?: () => void;
  className?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  permission: string;
  alias?: string[];
  badge?: number | string;
  badgeColor?: string;
  highlight?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  setActiveModule,
  onSelectModule,
  onOpenAiDrawer,
  className = ''
}) => {
  const { hasPermission, currentUser } = useAuth();
  const { demos, tasks, syncStatus } = useData();

  const handleSelect = (mod: string) => {
    if (onSelectModule) onSelectModule(mod);
    else if (setActiveModule) setActiveModule(mod);
  };

  const pendingDemosCount = demos.filter(d => d.status === 'NEW' || d.status === 'LISTENING').length;
  const pendingTasksCount = tasks.filter(t => t.status !== 'DONE').length;
  const syncErrorsCount = syncStatus?.summary?.unresolvedErrors || 0;

  const navSections: NavSection[] = [
    {
      title: 'EXECUTIVE & OPERATIONS',
      items: [
        { id: 'command-center', alias: ['dashboard', 'command-center'], label: 'Command Center', icon: LayoutDashboard, permission: 'dashboard' },
        { id: 'tasks', label: 'Tasks & Operations', icon: CheckSquare, badge: pendingTasksCount, permission: 'tasks' },
        { id: 'calendar', label: 'Release Calendar', icon: Calendar, permission: 'calendar' }
      ]
    },
    {
      title: 'MUSIC & ROSTER',
      items: [
        { id: 'releases', label: 'Catalog & Releases', icon: Disc3, permission: 'releases' },
        { id: 'artists', label: 'Artist Roster', icon: Users, permission: 'artists' },
        { id: 'ar', label: 'A&R Demo Inbox', icon: Headphones, badge: pendingDemosCount, badgeColor: 'bg-indigo-950/70 text-indigo-300 border-indigo-500/40', permission: 'ar' },
        { id: 'assets', label: 'Assets & Masters Vault', icon: FolderLock, permission: 'assets' }
      ]
    },
    {
      title: 'GROWTH & PROMO',
      items: [
        { id: 'campaigns', label: 'Marketing & Campaigns', icon: Megaphone, permission: 'marketing' },
        { id: 'contacts', label: 'Industry CRM', icon: Contact2, permission: 'contacts' },
        { id: 'distribution', label: 'DSP Distribution', icon: Radio, permission: 'releases' },
        { id: 'analytics', label: 'Analytics & DSP Feeds', icon: BarChart3, permission: 'analytics' }
      ]
    },
    {
      title: 'BUSINESS & ROYALTY',
      items: [
        { id: 'finance', label: 'Finance & Cash Flow', icon: DollarSign, permission: 'finance' },
        { id: 'royalties', label: 'Royalty Splits (50/50)', icon: PieChart, permission: 'finance' },
        { id: 'contracts', label: 'Contracts & Legal', icon: FileText, permission: 'finance' }
      ]
    },
    {
      title: 'INTELLIGENCE & ENGINE',
      items: [
        { id: 'ai', label: 'Indigo AI Brain', icon: Sparkles, permission: 'ai', highlight: true },
        { id: 'sync', label: 'Website Sync Engine', icon: RefreshCw, badge: syncErrorsCount ? `${syncErrorsCount} alert` : undefined, badgeColor: 'bg-amber-950/70 text-amber-300 border-amber-500/40', permission: 'dashboard' },
        { id: 'activity', label: 'System Audit Logs', icon: History, permission: 'dashboard' }
      ]
    }
  ];

  return (
    <aside
      id="indigo-sidebar"
      className={`w-60 bg-[#09090B] border-r border-[#27272A] flex flex-col justify-between shrink-0 h-[calc(100vh-3.25rem)] overflow-y-auto select-none ${className}`}
    >
      <div className="py-3 px-2 space-y-4">
        {navSections.map((section, sIdx) => {
          const visibleItems = section.items.filter(item => hasPermission(item.permission));
          if (visibleItems.length === 0) return null;

          return (
            <div key={sIdx} className="space-y-0.5">
              <p className="px-2.5 text-[9px] font-mono font-medium tracking-wider text-zinc-400 uppercase">
                {section.title}
              </p>
              <div className="space-y-0.5 mt-0.5">
                {visibleItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeModule === item.id || (item.alias && item.alias.includes(activeModule));

                  return (
                    <button
                      key={item.id}
                      id={`nav-${item.id}`}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-normal transition-all group ${
                        isActive
                          ? item.highlight
                            ? 'bg-indigo-950/80 text-indigo-100 border border-indigo-500/40 font-medium'
                            : 'bg-[#18181B] text-[#FAFAFA] border border-[#3F3F46] font-medium'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#121215] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon
                          className={`w-3.5 h-3.5 transition-colors ${
                            isActive
                              ? item.highlight
                                ? 'text-indigo-300'
                                : 'text-indigo-400'
                              : 'text-zinc-500 group-hover:text-zinc-300'
                          }`}
                        />
                        <span className="truncate text-[11px]">{item.label}</span>
                      </div>

                      {item.badge !== undefined && item.badge !== 0 && (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                            item.badgeColor || 'bg-[#18181B] text-zinc-300 border-[#27272A]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer connection summary */}
      <div className="p-2.5 border-t border-[#27272A] bg-[#09090B]">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="truncate">indigosrecords.site</span>
          </div>
          <span className="text-zinc-400 text-[9px]">LIVE</span>
        </div>
        <p className="text-[9px] text-zinc-400 mt-0.5 font-mono truncate">
          Op: <span className="text-zinc-300">{currentUser.displayName.split('(')[0].trim()}</span>
        </p>
      </div>
    </aside>
  );
};
