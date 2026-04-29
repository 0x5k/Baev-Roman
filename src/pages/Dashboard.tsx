import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  Users, MessageSquare, Zap, Activity, ArrowUpRight, 
  MoreHorizontal, PlusCircle 
} from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { label: 'Active Agents', value: '12', change: '+2', icon: Users, color: 'bg-blue-500' },
  { label: 'Total Invocations', value: '45.2k', change: '+12.5%', icon: Zap, color: 'bg-amber-500' },
  { label: 'Success Rate', value: '99.2%', change: '+0.4%', icon: Activity, color: 'bg-emerald-500' },
  { label: 'Avg Latency', value: '420ms', change: '-12ms', icon: MessageSquare, color: 'bg-indigo-500' },
];

const data = [
  { name: 'Mon', queries: 4000, latency: 450 },
  { name: 'Tue', queries: 3000, latency: 410 },
  { name: 'Wed', queries: 2000, latency: 480 },
  { name: 'Thu', queries: 2780, latency: 420 },
  { name: 'Fri', queries: 1890, latency: 390 },
  { name: 'Sat', queries: 2390, latency: 380 },
  { name: 'Sun', queries: 3490, latency: 430 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 font-sans">Lab Overview</h2>
          <p className="text-zinc-500 mt-1">Real-time performance metrics for your UA Agents.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors shadow-sm">
          <PlusCircle className="w-4 h-4" />
          <span className="font-medium text-sm">Deploy New Agent</span>
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={stat.color + " p-2 rounded-lg"}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-zinc-900 tabular-nums">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Invocations Over Time</h3>
            <button className="text-zinc-400 hover:text-zinc-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717a' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#71717a' }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="queries" 
                  stroke="#18181b" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorQueries)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-8 text-white">
          <h3 className="font-bold text-lg mb-2">Token Usage</h3>
          <p className="text-zinc-400 text-sm mb-8">Monthly quota distribution</p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-zinc-400 font-medium">Input Tokens</span>
                <span>8.2M / 10M</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[82%]" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-zinc-400 font-medium">Output Tokens</span>
                <span>4.5M / 10M</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[45%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-zinc-400 font-medium">Cached Content</span>
                <span>1.2M / 5M</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-[24%]" />
              </div>
            </div>
          </div>

          <div className="mt-12 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 font-mono">Cost optimization tip</p>
            <p className="text-xs text-zinc-300 leading-relaxed font-medium">
              34% of your input tokens could be shifted to Context Caching to save up to $1,200/mo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
