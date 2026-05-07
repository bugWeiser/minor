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
        { label: 'Navigate me to...', action: 'show_navigation' },
        { label: 'Frequently Asked Questions', action: 'show_faqs' },
        { label: 'Tell me about recent alerts', action: 'ask_question' },
        { label: 'What is Chitragupt?', action: 'ask_question' },
        { label: 'Who built this?', action: 'ask_question' },
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

  const generateBotResponse = (lowerInput: string) => {
    let botText = 'I am your virtual assistant! Currently, I am in demo mode. Please use the navigation options above to explore the platform.';
      
    if (lowerInput.includes('what is') || lowerInput.includes('who are you') || lowerInput.includes('chitragupt')) {
      botText = 'I am Chitragupt, an AI assistant designed to help students navigate the campus digital ecosystem effortlessly. I bring order to information chaos!';
    } else if (lowerInput.includes('who built') || lowerInput.includes('creator')) {
      botText = 'I was built as a presentation demo for this platform! My purpose is to showcase how AI can assist students in finding what they need instantly.';
    } else if (lowerInput.includes('how do i use') || lowerInput.includes('help')) {
      botText = 'You can use the "Navigate me to..." option to jump to different parts of the platform, or type your questions here. I can help you find exam results, notices, and settings.';
    } else if (lowerInput.includes('secure') || lowerInput.includes('data') || lowerInput.includes('privacy')) {
      botText = 'Yes! Your data is strictly isolated using our multi-tenant architecture. We comply with DPDP guidelines, ensuring your academic information is protected.';
    } else if (lowerInput.includes('alert') || lowerInput.includes('recent')) {
      botText = 'You have 2 unread alerts: (1) Your Computer Networks assignment is due tomorrow. (2) There is a rescheduled seminar in Room 402 at 3:00 PM today. Please check your Dashboard for details.';
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      botText = 'Hello there! How can I assist your campus experience today?';
    }
    return botText;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const newMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate bot response based on user input
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text: generateBotResponse(inputText.toLowerCase()),
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
    } else if (option.action === 'show_navigation') {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'bot',
          text: 'Where would you like to go?',
          options: [
            { label: 'Student Dashboard', action: 'navigate', path: '/' },
            { label: 'Academic Results', action: 'navigate', path: '/results' },
            { label: 'Help & Support', action: 'navigate', path: '/help' },
            { label: 'Admin Setup Guide', action: 'navigate', path: '/admin/guide' },
            { label: 'About Chitragupt', action: 'navigate', path: '/about' },
            { label: 'Privacy Policy', action: 'navigate', path: '/privacy' },
          ]
        }]);
      }, 500);
    } else if (option.action === 'show_faqs') {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'bot',
          text: 'Here are some frequently asked questions:',
          options: [
            { label: 'What is Chitragupt?', action: 'ask_question' },
            { label: 'Who built this platform?', action: 'ask_question' },
            { label: 'How do I use this?', action: 'ask_question' },
            { label: 'Is my data secure?', action: 'ask_question' },
          ]
        }]);
      }, 500);
    } else if (option.action === 'ask_question') {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: 'bot',
          text: generateBotResponse(option.label.toLowerCase()),
        }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-[999] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] sm:w-[420px] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-fadeUp">
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
          <div className="flex-1 max-h-[65vh] sm:max-h-[500px] min-h-[400px] p-4 overflow-y-auto bg-neutral-50 flex flex-col gap-3">
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
          className="w-16 h-16 rounded-full bg-charcoal text-accent shadow-xl hover:scale-105 transition-transform flex items-center justify-center group relative"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-charcoal"></span>
          </span>
          <FiMessageSquare size={32} />
        </button>
      )}
    </div>
  );
}
