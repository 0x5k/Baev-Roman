import React from 'react';
import { 
  Search, Filter, MoreVertical, 
  ExternalLink, Edit, Trash, 
  CheckCircle2, Clock, FileText 
} from 'lucide-react';
import { MOCK_AGENTS } from '../mockData';
import { AgentStatus } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function AgentList() {
  return (
    <div className="space-y-8">
       <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Your Agents</h2>
          <p className="text-zinc-500 mt-1">Manage personalities, toolsets, and deployment endpoints.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search agents..." 
              className="pl-10 pr-4 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:border-zinc-900 transition-colors w-64"
            />
          </div>
          <button className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors">
            <Filter className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
      </header>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-200">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Agent Name</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Model</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Invocations</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {MOCK_AGENTS.map((agent, i) => (
              <motion.tr 
                key={agent.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900 text-sm group-hover:text-zinc-900">{agent.name}</p>
                      <p className="text-xs text-zinc-500 truncate max-w-[200px]">{agent.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    agent.status === AgentStatus.ACTIVE ? "text-emerald-700 bg-emerald-50" :
                    agent.status === AgentStatus.DRAFT ? "text-amber-700 bg-amber-50" : "text-zinc-500 bg-zinc-100"
                  )}>
                    {agent.status === AgentStatus.ACTIVE ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {agent.status}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-mono font-medium text-zinc-600 bg-zinc-100 px-2 py-1 rounded uppercase tracking-tighter border border-zinc-200">
                     {agent.model === 'gemini-3.1-pro-preview' ? 'v1.5 Pro' : 'v1.5 Flash'}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-zinc-600 font-mono italic">
                   {Math.floor(Math.random() * 10000).toLocaleString()}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
