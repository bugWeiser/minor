'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend, FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; action: string; path?: string }[];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hi! I am Chitragupt AI Assistant. How can I help you today?',
      options: [
        { label: 'View Dashboard', action: 'navigate', path: '/' },
        { label: 'Check Results', action: 'navigate', path: '/results' },
        { label: 'Need Help?', action: 'navigate', path: '/help' },
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const newMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text: 'I am your virtual assistant! Currently, I am in demo mode. Please use the navigation options to explore the platform.',
      }]);
    }, 1000);
  };

  const handleOptionClick = (option: { label: string; action: string; path?: string }) => {
    // Add user message for the option clicked
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: option.label }]);
    
    if (option.action === 'navigate' && option.path) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'bot',
          text: `Navigating you to ${option.label}...`
        }]);
        router.push(option.path!);
      }, 500);
    }
  };

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-[999] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-fadeUp">
          {/* Header */}
          <div className="bg-charcoal text-accent px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent text-charcoal flex items-center justify-center font-bold">
                C
              </div>
              <div>
                <h3 className="font-bold text-sm">Chitragupt AI Assistant</h3>
                <p className="text-xs text-accent/80">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-accent hover:text-white transition-colors">
              <FiX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 max-h-[60vh] sm:max-h-96 min-h-64 p-4 overflow-y-auto bg-neutral-50 flex flex-col gap-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-charcoal text-white rounded-br-sm' : 'bg-white text-charcoal border border-neutral-200 rounded-bl-sm shadow-sm'}`}>
                  {msg.text}
                </div>
                {msg.options && (
                  <div className="flex flex-col gap-2 mt-2 w-full max-w-[85%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(opt)}
                        className="text-left text-xs bg-white border border-charcoal/20 hover:bg-neutral-100 transition-colors text-charcoal py-2 px-3 rounded-xl flex items-center justify-between"
                      >
                        {opt.label}
                        <FiChevronRight size={14} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-neutral-200 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Chitragupt..."
              className="flex-1 bg-neutral-100 border-transparent rounded-full px-4 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 shrink-0 rounded-full bg-charcoal text-accent flex items-center justify-center hover:bg-black transition-colors"
            >
              <FiSend size={16} className="mr-0.5 mt-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-charcoal text-accent shadow-xl hover:scale-105 transition-transform flex items-center justify-center group relative"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-charcoal"></span>
          </span>
          <FiMessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
