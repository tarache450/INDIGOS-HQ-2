import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Zap,
  CheckCircle2,
  HelpCircle,
  Headphones,
  DollarSign,
  Disc3,
  Calendar,
  Layers
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  toolCalls?: any[];
  timestamp: string;
}

export const IndigoAiModule: React.FC = () => {
  const { artists, releases, tasks, revenues } = useData();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_0',
      sender: 'ai',
      text: `Welcome to **INDIGO AI**, the intelligent Operating System brain for **INDIGO RECORDS** ("For Those Who Listen Within").\n\nI have real-time live access to your roster (Maniky, Naveci, Stephan Embee, Tarache), catalog releases (IR001 through IR004), A&R demo pipeline, and 50/50 master royalty ledgers.\n\nHow can I assist label operations today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputQuery;
    if (!promptToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: promptToSend })
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.text || 'Action executed.',
        toolCalls: data.toolCallsExecuted,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai_err_${Date.now()}`,
          sender: 'ai',
          text: `Error contacting Indigo AI: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Analyze catalog release strategy for IR004 "Vortex Rhythm"',
    'Check A&R criteria and TEKK score for pending demo "Sub Terraneo"',
    'Calculate Q2 2026 50/50 royalty split projections across Beatport & Spotify',
    'Create an urgent operational task for IR004 Inflyte DJ promo blast'
  ];

  return (
    <div id="ai-module-view" className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h1 className="text-lg font-bold text-white font-mono tracking-tight uppercase">
              Indigo AI Brain & Label Intelligence
            </h1>
          </div>
          <p className="text-xs text-gray-400">
            Powered by Gemini 3.7 Flash with real-time tool calling and live Indigo HQ database grounding.
          </p>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-[#0C1220] border border-[#1E283D] rounded-2xl flex flex-col h-[650px] overflow-hidden shadow-2xl">
        {/* Messages feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3.5 max-w-3xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gradient-to-br from-indigo-500 to-violet-800 text-white shadow-md shadow-indigo-900/50'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-2 flex-1">
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-[#12192B] border border-[#232F4A] text-gray-200 rounded-tl-none font-sans'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Tool call indicators */}
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {msg.toolCalls.map((tc, idx) => (
                      <div
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-[#090D16] border border-indigo-500/30 text-[10px] font-mono text-indigo-300 flex items-center space-x-2"
                      >
                        <Zap className="w-3 h-3 text-indigo-400" />
                        <span>Executed tool action: <strong>{tc.name}</strong></span>
                      </div>
                    ))}
                  </div>
                )}

                <span className="text-[9px] font-mono text-gray-500 block px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-3 text-indigo-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
              <span>Indigo AI is reasoning with Gemini 3.7 Flash...</span>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="p-3 bg-[#090D16] border-t border-[#1C253D] flex items-center space-x-2 overflow-x-auto">
          <span className="text-[10px] font-mono text-gray-500 shrink-0 uppercase">Suggestions:</span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-3 py-1 bg-[#12192B] hover:bg-[#1A243B] border border-[#232F4A] rounded-lg text-[11px] text-gray-300 hover:text-white font-mono whitespace-nowrap transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-4 bg-[#0B0F19] border-t border-[#1C253D] flex items-center space-x-3">
          <input
            id="input-ai-chat"
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask Indigo AI about releases, A&R criteria, TEKK scores, royalty math, tasks..."
            className="flex-1 bg-[#12192B] border border-[#232F4A] rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-mono"
          />
          <button
            id="btn-send-ai-chat"
            onClick={() => handleSend()}
            disabled={isLoading || !inputQuery.trim()}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center space-x-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
