import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Zap } from 'lucide-react';

interface IndigoAiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IndigoAiDrawer: React.FC<IndigoAiDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: 'Indigo AI active. I can inspect catalog metadata, check A&R demos, verify 50/50 splits, or schedule tasks.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;
    const prompt = query;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: prompt, time: now }]);
    setQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.text || 'Action completed.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `Error connecting to Indigo AI: ${err.message}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-[#121215] border-l border-[#27272A] h-full flex flex-col shadow-2xl animate-in slide-in-from-right">
        {/* Header */}
        <div className="p-3 border-b border-[#27272A] flex items-center justify-between bg-[#09090B]">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[#FAFAFA] font-mono uppercase">Indigo AI Copilot</h3>
              <p className="text-[9px] text-zinc-400 font-mono">Gemini 2.5 Flash</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-[#18181B] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-3.5 overflow-y-auto space-y-3 font-mono text-xs">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`p-2.5 rounded-lg max-w-[88%] text-[11px] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-[#18181B] border border-[#27272A] text-zinc-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[8px] text-zinc-500 mt-0.5 px-1">{m.time}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
              <span className="text-[11px]">Thinking...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-2.5 bg-[#09090B] border-t border-[#27272A] flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask anything..."
            className="flex-1 bg-[#18181B] border border-[#27272A] rounded-md px-2.5 py-1.5 text-xs text-[#FAFAFA] placeholder-zinc-500 focus:outline-none font-mono"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !query.trim()}
            className="p-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-md transition-all"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
