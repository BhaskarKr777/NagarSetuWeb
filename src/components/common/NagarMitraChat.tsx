import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { askNagarMitra } from '../../services/aiService';
import { 
  Sparkles, 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Search, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const NagarMitraChat: React.FC = () => {
  const { issues } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Namaste! 🙏 I am **NagarMitra AI**, your smart civic assistant. You can ask me to track any complaint ID, guide you through filing a grievance with AI photo scanning, or answer municipal queries!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = askNagarMitra(query, issues);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const quickPrompts = [
    'Track NS-2026-00124',
    'How do I report a pothole?',
    'Admin Login Credentials',
    'Municipal Emergency Helplines'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-3 bg-[#4A154B] hover:bg-[#3B113C] text-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 flex items-center gap-2.5 font-bold text-xs sm:text-sm border-2 border-white/20 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm">
            #
          </div>
          <div className="text-left">
            <span className="flex items-center gap-1 font-black">
              <span>NagarMitra AI</span>
              <span className="text-[#ECB22E]">★</span>
            </span>
            <span className="text-[10px] text-purple-200 block font-medium">Smart Civic Assistant</span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl border border-[#EAE8E2] shadow-2xl w-[90vw] sm:w-[380px] h-[520px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header in Slack Aubergine */}
          <div className="bg-[#4A154B] p-4 text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black text-base">
                #
              </div>
              <div>
                <h4 className="text-sm font-black flex items-center gap-1">
                  <span>NagarMitra Civic AI</span>
                  <span className="text-[#ECB22E] text-xs">★</span>
                </h4>
                <p className="text-[10px] text-purple-200 font-medium">NLP Complaint Intelligence Engine</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8F6F2] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-[#4A154B] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    #
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#007A5A] text-white rounded-tr-xs font-medium'
                      : 'bg-white text-[#1D1C1D] border border-[#EAE8E2] rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 ${
                      msg.sender === 'user' ? 'text-emerald-100 text-right' : 'text-[#616061]'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-[#616061] text-[11px] font-medium italic">
                <span className="w-2 h-2 rounded-full bg-[#4A154B] animate-bounce" />
                <span>NagarMitra AI is analyzing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-white border-t border-[#EAE8E2] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 bg-[#F8F6F2] hover:bg-[#EAE8E2] text-[#4A484A] text-[10px] font-bold rounded-lg border border-[#EAE8E2] whitespace-nowrap transition cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#EAE8E2] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask NagarMitra or enter complaint ID..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#F8F6F2] border border-[#D4CEBF] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4A154B] text-[#1D1C1D]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-[#007A5A] hover:bg-[#006046] disabled:bg-slate-300 text-white rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
