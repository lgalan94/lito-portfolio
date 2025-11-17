import React, { useState, useEffect, useRef, useCallback } from 'react';
import { startChat } from '../services/geminiService';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const chatService = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages]);

  const initializeChat = useCallback(async () => {
    const service = await startChat();
    chatService.current = service;
    setIsAvailable(service.isAvailable);

    setMessages([
      {
        sender: "bot",
        text: service.isAvailable
          ? "Hello! I'm PortfoBot, Lito's AI assistant. Ask me anything about his skills, projects, or experience."
          : "Sorry, the AI assistant is currently unavailable."
      }
    ]);
  }, []);

  useEffect(() => { initializeChat(); }, [initializeChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatService.current) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      setMessages(prev => [...prev, { sender: 'bot', text: "" }]);
      const stream = chatService.current.sendMessageStream({ message: userMessage.text });

      for await (const chunk of stream) {
        const chunkText = chunk.text ?? "";
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last.sender === 'bot') return [...prev.slice(0, -1), { sender: 'bot', text: last.text + chunkText }];
          return prev;
        });
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAvailable && !isOpen) return null;

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-18 lg:bottom-6 right-6 w-12 lg:w-16 h-12 lg:h-16 bg-cyan-500 rounded-full shadow-xl hover:scale-110 flex items-center justify-center z-50"
        aria-label="Open Chatbot"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </button>

      {/* Chatbox */}
      <div className={`fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl flex flex-col transition-transform duration-300 z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            PortfoBot Assistant
          </h3>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end`}>
              {msg.sender === 'bot' && <div className="w-6 h-6 bg-cyan-400 rounded-full mr-2 flex-shrink-0" />}
              <div className={`max-w-xs md:max-w-sm rounded-xl px-4 py-2 ${msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-200'} animate-fade-in`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.sender === 'user' && <div className="w-6 h-6 bg-white rounded-full ml-2 flex-shrink-0" />}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start items-center gap-2">
              <div className="w-3 h-3 bg-slate-300 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-slate-300 rounded-full animate-bounce delay-200"></div>
              <div className="w-3 h-3 bg-slate-300 rounded-full animate-bounce delay-300"></div>
              <span className="text-slate-300">Typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 flex gap-2">
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder={isAvailable ? "Ask Lito anything..." : "Chat unavailable"}
    className="flex-1 min-w-0 bg-slate-800 border border-slate-600 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
    disabled={isLoading || !isAvailable}
  />
  <button
    type="submit"
    disabled={isLoading || !isAvailable}
    className="bg-cyan-500 text-white px-5 py-2 rounded-full hover:bg-cyan-600 disabled:bg-slate-600 transition-colors flex-shrink-0"
  >
    Send
  </button>
</form>

      </div>
    </>
  );
};

export default Chatbot;
