import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Demo } from '../../types';
import {
  Headphones,
  Plus,
  Play,
  Pause,
  Sliders,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Award,
  Zap,
  Volume2,
  Mail,
  FileSignature
} from 'lucide-react';

interface ArModuleProps {
  onOpenQuickCreate: () => void;
  onConvertDemoToRelease?: (demo: Demo) => void;
}

const STAGES: { id: Demo['status']; label: string; color: string }[] = [
  { id: 'NEW', label: 'Incoming Demos', color: 'border-blue-500/40 text-blue-400' },
  { id: 'LISTENING', label: 'In Review / TEKK Analysis', color: 'border-purple-500/40 text-purple-400' },
  { id: 'SHORTLIST', label: 'Shortlisted for Catalog', color: 'border-indigo-500/40 text-indigo-400' },
  { id: 'NEGOTIATION', label: 'Contract & Splits Negotiation', color: 'border-amber-500/40 text-amber-400' },
  { id: 'SIGNED', label: 'Signed to Indigo Records', color: 'border-emerald-500/40 text-emerald-400' },
  { id: 'REJECTED', label: 'Passed / Feedback Sent', color: 'border-gray-500/40 text-gray-500' }
];

export const ArModule: React.FC<ArModuleProps> = ({ onOpenQuickCreate, onConvertDemoToRelease }) => {
  const { demos, updateDemoStatus, createRelease, createContract } = useData();
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(demos[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.warn('Audio play prevented:', e));
      setIsPlaying(true);
    }
  };

  const handleStageChange = async (newStatus: Demo['status']) => {
    if (!selectedDemo) return;
    await updateDemoStatus(selectedDemo.id, newStatus);
    setSelectedDemo({ ...selectedDemo, status: newStatus });
  };

  const handleConvertToRelease = async (demo: Demo) => {
    await updateDemoStatus(demo.id, 'SIGNED');
    const catalogCode = `IR005`;
    await createRelease({
      catalogNumber: catalogCode,
      title: demo.trackTitle,
      artistName: demo.artistName,
      type: 'SINGLE',
      releaseDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'SCHEDULED',
      artworkUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
      genres: [demo.genre],
      tekkScore: demo.tekkScore || 90,
      totalStreams: 0,
      labelSharePercentage: 50,
      tracksCount: 1
    });

    await createContract({
      artistName: demo.artistName,
      title: `Single Track Agreement - ${catalogCode} "${demo.trackTitle}"`,
      type: 'SINGLE_TRACK_RELEASE',
      startDate: new Date().toISOString().split('T')[0],
      expirationDate: new Date(Date.now() + 5 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'PENDING_SIGNATURE',
      royaltyRate: 50,
      territory: 'Worldwide',
      notes: `Generated automatically from A&R demo submission "${demo.trackTitle}". 50/50 net splits.`
    });

    setNotification(`Demo "${demo.trackTitle}" successfully converted into Release ${catalogCode} and Single Track Agreement draft!`);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div id="ar-module-view" className="p-4 sm:p-5 max-w-7xl mx-auto space-y-4 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Headphones className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-[#FAFAFA] font-mono tracking-tight uppercase">
              A&R Demo Inbox & TEKK Signal Evaluation
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400">
            Talent pipeline, club readiness scoring, sub-bass spectral evaluation, and contract conversion.
          </p>
        </div>

        <button
          id="btn-submit-demo"
          onClick={onOpenQuickCreate}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium shadow-xs transition-all self-start md:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="text-[11px]">Submit Demo</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 rounded-md text-xs font-mono flex items-center justify-between animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-zinc-400 hover:text-zinc-200">✕</button>
        </div>
      )}

      {/* Kanban Pipeline Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {STAGES.map(stage => {
          const stageDemos = demos.filter(d => d.status === stage.id);
          return (
            <div
              key={stage.id}
              className="bg-[#121215] border border-[#27272A] rounded-lg p-2.5 flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between border-b border-[#27272A] pb-1.5">
                <span className={`text-[9px] font-mono font-medium uppercase ${stage.color}`}>
                  {stage.label}
                </span>
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-[#18181B] text-zinc-300">
                  {stageDemos.length}
                </span>
              </div>

              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
                {stageDemos.map(d => (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDemo(d)}
                    className={`p-2 rounded-md border transition-all cursor-pointer ${
                      selectedDemo?.id === d.id
                        ? 'bg-[#18181B] border-indigo-500/60 text-white shadow-xs'
                        : 'bg-[#18181B] border-[#27272A] hover:border-[#3F3F46] text-zinc-300'
                    }`}
                  >
                    <p className="text-xs font-medium truncate text-[#FAFAFA]">{d.trackTitle}</p>
                    <p className="text-[10px] text-zinc-400 truncate">{d.artistName}</p>
                    <div className="flex items-center justify-between pt-1 mt-1 border-t border-[#27272A] text-[9px] font-mono">
                      <span className="text-indigo-400">{d.bpm} BPM</span>
                      {d.score && <span className="text-emerald-400">{d.score}/10</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Demo Deep Inspector & Player */}
      {selectedDemo && (
        <div className="bg-[#121215] border border-[#27272A] rounded-lg p-4 space-y-4">
          {/* Top Bar: Title, Artist & Audio Player */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3.5 border-b border-[#27272A]">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-1.5 py-0.2 text-[10px] font-mono font-medium uppercase bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 rounded">
                  Demo Submission
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  Submitted: {selectedDemo.submissionDate} • {selectedDemo.territory || 'International'}
                </span>
              </div>
              <h2 className="text-base font-semibold text-[#FAFAFA]">
                "{selectedDemo.trackTitle}" <span className="text-indigo-300 font-normal">by {selectedDemo.artistName}</span>
              </h2>
              <p className="text-[11px] text-zinc-400 font-mono">
                {selectedDemo.genre} • {selectedDemo.bpm} BPM • Contact: {selectedDemo.email}
              </p>
            </div>

            {/* Audio Playback Controls */}
            <div className="flex items-center space-x-2.5 bg-[#18181B] border border-[#27272A] p-2 rounded-md">
              <audio ref={audioRef} src={selectedDemo.audioUrl} onEnded={() => setIsPlaying(false)} />
              <button
                id="btn-demo-audio-toggle"
                onClick={togglePlay}
                className="w-8 h-8 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xs transition-all"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div className="space-y-1 min-w-[130px]">
                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
                  <span>{isPlaying ? 'PLAYING MASTER' : 'DEMO PREVIEW'}</span>
                  <Volume2 className="w-3 h-3 text-indigo-400" />
                </div>
                {/* Simulated soundwave bars */}
                <div className="flex items-end space-x-0.5 h-3.5">
                  {[40, 75, 90, 60, 85, 95, 70, 50, 80, 100, 65, 45, 80, 90, 60, 75].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: isPlaying ? `${Math.min(100, h * (0.6 + Math.random() * 0.5))}%` : '30%' }}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isPlaying ? 'bg-indigo-400' : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TEKKIN Signal Analysis & A&R Evaluation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* TEKKIN Signal Engine */}
            <div className="bg-[#18181B] border border-[#27272A] rounded-md p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <h3 className="text-[11px] font-mono font-semibold uppercase text-[#FAFAFA]">
                    TEKKIN Club-Readiness Signal Analysis
                  </h3>
                </div>
                <span className="px-1.5 py-0.2 text-[10px] font-mono font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 rounded">
                  Score: {selectedDemo.tekkScore || 90}/100
                </span>
              </div>

              <div className="space-y-2 text-[11px] font-mono">
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1 text-[10px]">
                    <span>Sub-Bass Energy (30Hz - 80Hz)</span>
                    <span className="text-zinc-100 font-medium">92% (Optimal)</span>
                  </div>
                  <div className="w-full bg-[#27272A] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[92%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1 text-[10px]">
                    <span>Loudness & Dynamic Range</span>
                    <span className="text-zinc-100 font-medium">-7.2 LUFS (7.4 dB dynamic)</span>
                  </div>
                  <div className="w-full bg-[#27272A] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-500 h-full w-[88%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1 text-[10px]">
                    <span>Groove & Percussion Stereo Field</span>
                    <span className="text-zinc-100 font-medium">84% Width</span>
                  </div>
                  <div className="w-full bg-[#27272A] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full w-[84%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* A&R Director Feedback & Pipeline Actions */}
            <div className="bg-[#18181B] border border-[#27272A] rounded-md p-3.5 space-y-3">
              <h3 className="text-[11px] font-mono font-semibold uppercase text-[#FAFAFA]">
                A&R Notes & Stage Progression
              </h3>

              <p className="text-xs text-zinc-300 bg-[#121215] p-2.5 rounded-md border border-[#27272A] leading-relaxed">
                {selectedDemo.notes || 'No internal A&R review notes added yet.'}
              </p>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-mono uppercase text-zinc-400">
                  Update Pipeline Status
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {STAGES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleStageChange(s.id)}
                      className={`px-2 py-1 rounded-md text-[9px] font-mono uppercase transition-colors ${
                        selectedDemo.status === s.id
                          ? 'bg-indigo-600 text-white font-medium shadow-xs'
                          : 'bg-[#121215] text-zinc-400 hover:text-zinc-200 hover:bg-[#27272A] border border-[#27272A]'
                      }`}
                    >
                      {s.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1-Click Convert to Release and Contract */}
              <div className="pt-2 border-t border-[#27272A] flex items-center justify-between">
                <div className="text-[10px] text-zinc-400 font-mono">
                  Ready to sign this track?
                </div>
                <button
                  id="btn-convert-demo-to-release"
                  onClick={() => handleConvertToRelease(selectedDemo)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-medium shadow-xs transition-all"
                >
                  <FileSignature className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Convert to Release & Contract</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
