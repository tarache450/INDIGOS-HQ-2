import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider, useData } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/modals/CommandPalette';
import { QuickActionModal } from './components/modals/QuickActionModal';
import { IndigoAiDrawer } from './components/ai/IndigoAiDrawer';

// Module Components
import { CommandCenter } from './components/command-center/CommandCenter';
import { ReleasesModule } from './components/releases/ReleasesModule';
import { ArtistsModule } from './components/artists/ArtistsModule';
import { ArModule } from './components/ar/ArModule';
import { FinanceModule } from './components/finance/FinanceModule';
import { CampaignsModule } from './components/campaigns/CampaignsModule';
import { TasksModule } from './components/tasks/TasksModule';
import { CalendarModule } from './components/calendar/CalendarModule';
import { ContactsModule } from './components/contacts/ContactsModule';
import { DistributionModule } from './components/distribution/DistributionModule';
import { AssetsModule } from './components/assets/AssetsModule';
import { AnalyticsModule } from './components/analytics/AnalyticsModule';
import { ContractsModule } from './components/contracts/ContractsModule';
import { SyncCenter } from './components/sync/SyncCenter';
import { IndigoAiModule } from './components/ai/IndigoAiModule';
import { ActivityModule } from './components/activity/ActivityModule';

const MainLayout: React.FC = () => {
  const [activeModule, setActiveModule] = useState('command-center');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { currentUser, hasPermission } = useAuth();
  const { isLoading } = useData();

  // Keyboard shortcut handlers (Cmd+K / Ctrl+K and Cmd+J / Ctrl+J)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        setIsAiDrawerOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'command-center':
      case 'dashboard':
        return (
          <CommandCenter
            onNavigate={setActiveModule}
            onOpenQuickCreate={() => setIsQuickActionOpen(true)}
            onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
          />
        );
      case 'releases':
        return <ReleasesModule onOpenQuickCreate={() => setIsQuickActionOpen(true)} />;
      case 'artists':
        return <ArtistsModule onOpenQuickCreate={() => setIsQuickActionOpen(true)} />;
      case 'ar':
        return <ArModule onOpenQuickCreate={() => setIsQuickActionOpen(true)} />;
      case 'finance':
      case 'royalties':
        return <FinanceModule onOpenQuickCreate={() => setIsQuickActionOpen(true)} />;
      case 'campaigns':
        return <CampaignsModule onOpenQuickCreate={() => setIsQuickActionOpen(true)} />;
      case 'tasks':
        return <TasksModule onOpenQuickCreate={() => setIsQuickActionOpen(true)} />;
      case 'calendar':
        return <CalendarModule onOpenQuickCreate={() => setIsQuickActionOpen(true)} />;
      case 'contacts':
        return <ContactsModule onOpenQuickCreate={() => setIsQuickActionOpen(true)} />;
      case 'distribution':
        return <DistributionModule />;
      case 'assets':
        return <AssetsModule onOpenQuickCreate={() => setIsQuickActionOpen(true)} />;
      case 'analytics':
        return <AnalyticsModule />;
      case 'contracts':
        return <ContractsModule onOpenQuickCreate={() => setIsQuickActionOpen(true)} />;
      case 'sync':
        return <SyncCenter />;
      case 'ai':
        return <IndigoAiModule />;
      case 'activity':
        return <ActivityModule />;
      default:
        return (
          <CommandCenter
            onNavigate={setActiveModule}
            onOpenQuickCreate={() => setIsQuickActionOpen(true)}
            onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenQuickCreate={() => setIsQuickActionOpen(true)}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
        onNavigate={setActiveModule}
        activeModule={activeModule}
      />

      {/* Body: Sidebar + Dynamic Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={mod => {
            setActiveModule(mod);
            setIsMobileMenuOpen(false);
          }}
          onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
          className={isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-40 w-60' : 'hidden lg:block'}
        />

        {/* Backdrop for mobile menu */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-30 lg:hidden"
          />
        )}

        {/* Central Workspace Container */}
        <main className="flex-1 overflow-y-auto bg-[#09090B]">
          {isLoading ? (
            <div className="p-8 flex items-center justify-center min-h-[500px]">
              <div className="flex flex-col items-center space-y-2.5 font-mono text-xs text-indigo-400">
                <span className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></span>
                <span className="text-[11px] text-zinc-400">Connecting to Indigo Records Operating System...</span>
              </div>
            </div>
          ) : (
            renderActiveModule()
          )}
        </main>
      </div>

      {/* Global Modals & Overlays */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setActiveModule}
      />

      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        onSuccess={() => {}}
      />

      <IndigoAiDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <MainLayout />
      </DataProvider>
    </AuthProvider>
  );
}
