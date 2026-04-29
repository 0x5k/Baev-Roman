import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Maximize2, Minimize2, Sparkles, AlertCircle, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { geminiService } from '../services/geminiService';
import { MOCK_AGENTS } from '../mockData';
import { Message } from '../types';
import { cn } from '../lib/utils';

export default function ChatPlayground() {
  const [selectedAgent, setSelectedAgent] = useState(MOCK_AGENTS[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I am the ${MOCK_AGENTS[0].name}. How can I assist you today?`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.content }]
      }));
      history.push({ role: 'user', parts: [{ text: input }] });

      let assistantResponseContent = '';
      
      // Add a placeholder message for streaming
      const assistantMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString()
      }]);

      await geminiService.streamChat(
        selectedAgent.model,
        selectedAgent.instructions,
        history,
        (chunk) => {
          assistantResponseContent += chunk;
          setMessages(prev => prev.map(m => 
            m.id === assistantMessageId 
              ? { ...m, content: assistantResponseContent } 
              : m
          ));
        }
      );

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: 'error-' + Date.now(),
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please check your API configuration.',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Chat Area */}
      <div className="flex-1 bg-white border border-zinc-200 rounded-3xl overflow-hidden flex flex-col shadow-sm">
        {/* Chat Header */}
        <div className="px-8 py-6 border-bottom border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-900">{selectedAgent.name}</h3>
              <p className="text-xs text-zinc-400 font-medium font-mono uppercase tracking-widest">{selectedAgent.model}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button onClick={() => setMessages([])} className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
               <Trash2 className="w-5 h-5" />
             </button>
             <div className="h-6 w-px bg-zinc-200 mx-2" />
             <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Ready</span>
             </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  message.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  message.role === 'assistant' ? "bg-zinc-100 text-zinc-600" : "bg-zinc-900 text-white"
                )}>
                  {message.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className={cn(
                    "p-5 rounded-2xl text-sm leading-relaxed",
                    message.role === 'assistant' 
                      ? "bg-zinc-50 text-zinc-800 border border-zinc-100" 
                      : "bg-zinc-900 text-white shadow-lg"
                )}>
                  {message.content || (isLoading && message.role === 'assistant' && "thinking...")}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input area */}
        <div className="p-8 pt-0">
          <div className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Ask your agent anything..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all resize-none min-h-[60px]"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-4 bottom-4 p-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-4">
               <button className="text-[10px] uppercase font-bold text-zinc-400 hover:text-zinc-900 transition-colors tracking-widest flex items-center gap-1.5">
                 <Sparkles className="w-3.5 h-3.5" />
                 Prompt Enhancement
               </button>
               <button className="text-[10px] uppercase font-bold text-zinc-400 hover:text-zinc-900 transition-colors tracking-widest flex items-center gap-1.5">
                 <Maximize2 className="w-3.5 h-3.5" />
                 Expand View
               </button>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium">Press Shift + Enter for new line</p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="w-80 space-y-6">
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
           <h4 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
             <Settings className="w-4 h-4" />
             Select Agent
           </h4>
           <div className="space-y-2">
             {MOCK_AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-left transition-all border",
                    selectedAgent.id === agent.id 
                      ? "bg-zinc-900 border-zinc-900 text-white" 
                      : "bg-white border-zinc-100 hover:border-zinc-300 text-zinc-600"
                  )}
                >
                  <p className="font-bold text-sm">{agent.name}</p>
                  <p className={cn(
                    "text-[10px] font-mono",
                    selectedAgent.id === agent.id ? "text-zinc-400" : "text-zinc-400"
                  )}>{agent.model}</p>
                </button>
             ))}
           </div>
        </div>

        <div className="bg-emerald-950 border border-emerald-900 rounded-3xl p-6 text-emerald-100">
           <h4 className="font-bold mb-2 flex items-center gap-2 text-white">
             <AlertCircle className="w-4 h-4 text-emerald-400" />
             Reasoning Log
           </h4>
           <div className="font-mono text-[10px] space-y-2 opacity-80 leading-relaxed">
             <p className="text-emerald-400">Step 1: Analyzing query intent...</p>
             <p>Detected language: English (UK)</p>
             <p>Context fetch: [LegalDB_UA_v2.1]</p>
             <p className="text-emerald-400">Step 2: Synthesizing response...</p>
             <p>Tokens: 24 (input), 142 (output)</p>
             <p>Grounding: 0.98 confidence</p>
           </div>
        </div>

        <div className="p-6">
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            Responses are generated by AI. Always verify critical information.
          </p>
        </div>
      </div>
    </div>
  );
}
