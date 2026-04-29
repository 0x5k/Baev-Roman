/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AgentList from './pages/AgentList';
import ChatPlayground from './pages/ChatPlayground';
import SubmitPage from './pages/Submit';
import { Database, Settings } from 'lucide-react';

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-zinc-400">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p>This module is coming soon in the next UA Agent Builder Lab update.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white">
        <Sidebar />
        <main className="flex-1 p-12 overflow-y-auto h-screen scroll-smooth">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agents" element={<AgentList />} />
            <Route path="/chat" element={<ChatPlayground />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/knowledge" element={<Placeholder title="Knowledge Base" />} />
            <Route path="/settings" element={<Placeholder title="Settings" />} />
            <Route path="/help" element={<Placeholder title="Documentation" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
