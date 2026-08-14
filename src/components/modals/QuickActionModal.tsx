import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { X, Disc3, Users, Headphones, CheckSquare, Megaphone, DollarSign, Plus } from 'lucide-react';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ActionTab = 'release' | 'artist' | 'demo' | 'task' | 'campaign' | 'expense';

export const QuickActionModal: React.FC<QuickActionModalProps> = ({ isOpen, onClose }) => {
  const { createRelease, createArtist, createDemo, createTask, createCampaign, createExpense, releases, artists } = useData();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<ActionTab>('release');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  // Release
  const nextIRNumber = `IR00${releases.length + 1}`;
  const [relCatalog, setRelCatalog] = useState(nextIRNumber);
  const [relTitle, setRelTitle] = useState('');
  const [relArtistId, setRelArtistId] = useState(artists[0]?.id || '');
  const [relType, setRelType] = useState<'SINGLE' | 'EP' | 'ALBUM'>('SINGLE');
  const [relDate, setRelDate] = useState(new Date().toISOString().split('T')[0]);
  const [relArtwork, setRelArtwork] = useState('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80');

  // Artist
  const [artName, setArtName] = useState('');
  const [artGenres, setArtGenres] = useState('Deep Tech, Minimal');
  const [artCountry, setArtCountry] = useState('Spain');
  const [artBio, setArtBio] = useState('');
  const [artPhoto, setArtPhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80');

  // Demo
  const [demoArtist, setDemoArtist] = useState('');
  const [demoTitle, setDemoTitle] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoAudio, setDemoAudio] = useState('https://actions.google.com/sounds/v1/ambiences/humming_room.ogg');
  const [demoGenre, setDemoGenre] = useState('Deep Tech');
  const [demoBpm, setDemoBpm] = useState(126);

  // Task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>('HIGH');
  const [taskDeadline, setTaskDeadline] = useState(new Date().toISOString().split('T')[0]);
  const [taskAssignee, setTaskAssignee] = useState(currentUser.displayName);

  // Campaign
  const [cmpTitle, setCmpTitle] = useState('');
  const [cmpBudget, setCmpBudget] = useState(1500);
  const [cmpGoal, setCmpGoal] = useState('Beatport Top 10 Minimal/Deep Tech & 200k Spotify Streams');

  // Expense
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState(250);
  const [expCategory, setExpCategory] = useState<'MASTERING' | 'ARTWORK' | 'PR_DISTRIBUTION' | 'LEGAL' | 'MISC'>('MASTERING');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (activeTab === 'release') {
        const artist = artists.find(a => a.id === relArtistId);
        await createRelease({
          catalogNumber: relCatalog,
          title: relTitle,
          artistId: relArtistId,
          artistName: artist ? artist.name : 'Indigo Roster Artist',
          type: relType,
          releaseDate: relDate,
          status: 'SCHEDULED',
          artworkUrl: relArtwork,
          upc: `19871234${Math.floor(1000 + Math.random() * 9000)}`,
          genres: ['Deep Tech', 'Minimal'],
          tekkScore: 92,
          tracksCount: 2,
          totalStreams: 0,
          labelSharePercentage: 50
        });
      } else if (activeTab === 'artist') {
        await createArtist({
          name: artName,
          slug: artName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          bio: artBio || 'Underground minimal and deep tech producer signed to Indigo Records.',
          photoUrl: artPhoto,
          genres: artGenres.split(',').map(g => g.trim()),
          status: 'ACTIVE',
          country: artCountry,
          monthlyListeners: 15000,
          followersCount: 3500,
          signedDate: new Date().toISOString().split('T')[0],
          links: [{ platform: 'spotify', url: `https://open.spotify.com/artist/${artName.toLowerCase()}` }]
        });
      } else if (activeTab === 'demo') {
        await createDemo({
          artistName: demoArtist,
          trackTitle: demoTitle,
          email: demoEmail,
          audioUrl: demoAudio,
          genre: demoGenre,
          bpm: demoBpm,
          submissionDate: new Date().toISOString().split('T')[0],
          score: 8.5,
          tekkScore: 90,
          status: 'NEW',
          feedbackSent: false,
          notes: 'Submitted via Indigo HQ Quick Submission portal.'
        });
      } else if (activeTab === 'task') {
        await createTask({
          title: taskTitle,
          description: `Created via Quick Actions by ${currentUser.displayName}`,
          priority: taskPriority,
          status: 'TODO',
          deadline: taskDeadline,
          assignedTo: taskAssignee,
          createdAt: new Date().toISOString()
        });
      } else if (activeTab === 'campaign') {
        await createCampaign({
          title: cmpTitle,
          goal: cmpGoal,
          budget: cmpBudget,
          spent: 0,
          status: 'PLANNING',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          channels: ['Spotify Editorial', 'Beatport Banner', 'DJ Inflyte Promo', 'Instagram']
        });
      } else if (activeTab === 'expense') {
        await createExpense({
          title: expTitle,
          amount: expAmount,
          category: expCategory,
          currency: 'EUR',
          date: new Date().toISOString().split('T')[0],
          paid: true
        });
      }
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs: { id: ActionTab; label: string; icon: any }[] = [
    { id: 'release', label: 'Release', icon: Disc3 },
    { id: 'artist', label: 'Artist', icon: Users },
    { id: 'demo', label: 'A&R Demo', icon: Headphones },
    { id: 'task', label: 'Task', icon: CheckSquare },
    { id: 'campaign', label: 'Campaign', icon: Megaphone },
    { id: 'expense', label: 'Expense', icon: DollarSign }
  ];

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-[#121215] border border-[#27272A] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-3 bg-[#09090B] border-b border-[#27272A] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plus className="w-3.5 h-3.5 text-indigo-400" />
            <h3 className="text-xs font-semibold text-[#FAFAFA] font-mono uppercase tracking-wider">Create New Entity</h3>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-200">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#27272A] bg-[#09090B] p-1 gap-1 overflow-x-auto">
          {tabs.map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-normal transition-colors shrink-0 ${
                  isActive
                    ? 'bg-[#18181B] text-[#FAFAFA] border border-[#3F3F46] font-medium'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#121215] border border-transparent'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {activeTab === 'release' && (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Catalog Number</label>
                  <input
                    type="text"
                    required
                    value={relCatalog}
                    onChange={e => setRelCatalog(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] font-mono focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. IR005"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Release Type</label>
                  <select
                    value={relType}
                    onChange={e => setRelType(e.target.value as any)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="SINGLE">Single</option>
                    <option value="EP">EP</option>
                    <option value="ALBUM">Album</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Release Title</label>
                <input
                  type="text"
                  required
                  value={relTitle}
                  onChange={e => setRelTitle(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Subterranean Pulse"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Signed Artist</label>
                  <select
                    value={relArtistId}
                    onChange={e => setRelArtistId(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  >
                    {artists.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Target Release Date</label>
                  <input
                    type="date"
                    required
                    value={relDate}
                    onChange={e => setRelDate(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'artist' && (
            <>
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Artist Stage Name</label>
                <input
                  type="text"
                  required
                  value={artName}
                  onChange={e => setArtName(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Solaire Minimal"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Genres (Comma separated)</label>
                  <input
                    type="text"
                    value={artGenres}
                    onChange={e => setArtGenres(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Country / City</label>
                  <input
                    type="text"
                    value={artCountry}
                    onChange={e => setArtCountry(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Short Bio</label>
                <textarea
                  value={artBio}
                  onChange={e => setArtBio(e.target.value)}
                  rows={2}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  placeholder="Sound style, club aesthetics, notable DJ supports..."
                />
              </div>
            </>
          )}

          {activeTab === 'demo' && (
            <>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Artist / Producer</label>
                  <input
                    type="text"
                    required
                    value={demoArtist}
                    onChange={e => setDemoArtist(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. Viktor Kline"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Track Title</label>
                  <input
                    type="text"
                    required
                    value={demoTitle}
                    onChange={e => setDemoTitle(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                    placeholder="e.g. Nocturnal Axis"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Artist Email</label>
                  <input
                    type="email"
                    required
                    value={demoEmail}
                    onChange={e => setDemoEmail(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none font-mono"
                    placeholder="contact@producer.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">BPM & Genre</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={demoBpm}
                      onChange={e => setDemoBpm(Number(e.target.value))}
                      className="w-20 bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] font-mono"
                    />
                    <input
                      type="text"
                      value={demoGenre}
                      onChange={e => setDemoGenre(e.target.value)}
                      className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'task' && (
            <>
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Review final WAV master for IR005"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={e => setTaskPriority(e.target.value as any)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Deadline</label>
                  <input
                    type="date"
                    required
                    value={taskDeadline}
                    onChange={e => setTaskDeadline(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] font-mono focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'campaign' && (
            <>
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={cmpTitle}
                  onChange={e => setCmpTitle(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. IR005 Release Worldwide Blitz"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Budget (€ EUR)</label>
                  <input
                    type="number"
                    value={cmpBudget}
                    onChange={e => setCmpBudget(Number(e.target.value))}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Campaign Goal</label>
                  <input
                    type="text"
                    value={cmpGoal}
                    onChange={e => setCmpGoal(e.target.value)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA]"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'expense' && (
            <>
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Expense Description</label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={e => setExpTitle(e.target.value)}
                  className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  placeholder="e.g. Analog Vinyl & Digital Mastering (2 Tracks)"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Amount (€ EUR)</label>
                  <input
                    type="number"
                    value={expAmount}
                    onChange={e => setExpAmount(Number(e.target.value))}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">Category</label>
                  <select
                    value={expCategory}
                    onChange={e => setExpCategory(e.target.value as any)}
                    className="w-full bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="MASTERING">Mastering</option>
                    <option value="ARTWORK">Artwork & Design</option>
                    <option value="PR_DISTRIBUTION">PR & Distribution</option>
                    <option value="LEGAL">Legal & Contracts</option>
                    <option value="MISC">Miscellaneous</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-2 pt-2.5 border-t border-[#27272A]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-normal text-zinc-400 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs flex items-center space-x-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Saving...' : 'Save & Register'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
