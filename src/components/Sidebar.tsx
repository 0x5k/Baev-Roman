import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Box, MessageSquare, Database, Settings, HelpCircle, ChevronRight, Send as SendIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

function SidebarItem({ to, icon: Icon, label }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
          isActive 
            ? "bg-zinc-900 text-white" 
            : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
        )
      }
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen border-r border-zinc-200 flex flex-col bg-white sticky top-0 overflow-y-auto">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
            <Box className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">UA Builder</h1>
            <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold font-mono">Agent Lab v1.0</p>
          </div>
        </div>

        <nav className="space-y-1">
          <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem to="/agents" icon={Box} label="Agents" />
          <SidebarItem to="/chat" icon={MessageSquare} label="Playground" />
          <SidebarItem to="/knowledge" icon={Database} label="Knowledge Base" />
          <SidebarItem to="/submit" icon={SendIcon} label="How to Submit" />
        </nav>
      </div>

      <div className="mt-auto p-8 pt-4 border-t border-zinc-100">
        <nav className="space-y-1">
          <SidebarItem to="/settings" icon={Settings} label="Settings" />
          <SidebarItem to="/help" icon={HelpCircle} label="Documentation" />
        </nav>
        
        <div className="mt-8 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Service Status</span>
          </div>
          <p className="text-xs text-zinc-600 font-medium leading-relaxed">
            All systems operational. Gemini 1.5 connection stable.
          </p>
        </div>
      </div>
    </aside>
  );
}
