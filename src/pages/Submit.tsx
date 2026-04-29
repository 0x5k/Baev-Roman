import React from 'react';
import { 
  Rocket, Github, ExternalLink, 
  Copy, CheckCircle, Gift, 
  ShieldCheck, Info 
} from 'lucide-react';
import { motion } from 'motion/react';

export default function SubmissionPage() {
  const [copied, setCopied] = React.useState(false);
  
  const projectLink = window.location.origin;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(projectLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-zinc-900 rounded-2xl mb-4">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-zinc-900">Submission Checklist</h2>
        <p className="text-zinc-500 text-lg max-w-xl mx-auto">
          You're one step away from finishing the Dev Track. Follow these steps to submit your work and claim your swag.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step 1: Export Code */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
            <Github className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold mb-3">1. Export Source Code</h3>
          <p className="text-zinc-600 text-sm leading-relaxed mb-6">
            Go to the <b>Settings</b> menu in the top right of the AI Studio editor. 
            Choose <b>Export to GitHub</b> or <b>Download ZIP</b>. The competition requires visibility into your prompt engineering and architecture.
          </p>
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center gap-3">
            <Info className="w-4 h-4 text-zinc-400 shrink-0" />
            <p className="text-[11px] text-zinc-500 leading-tight">
              Ensure your README includes setup instructions and a brief overview of your Gemini implementation.
            </p>
          </div>
        </motion.div>

        {/* Step 2: Live Demo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
            <ExternalLink className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold mb-3">2. Get Your App URL</h3>
          <p className="text-zinc-600 text-sm leading-relaxed mb-6">
            Your application is live! Copy the link below to include it as your "Live Demo" in the submission form.
          </p>
          <div className="relative">
            <div className="w-full bg-zinc-900 text-zinc-400 p-4 rounded-xl font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap pr-12">
              {projectLink}
            </div>
            <button 
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

        {/* Step 3: Kaggle Submission */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all md:col-span-2"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">3. Submit to Kaggle</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Visit the <a href="https://www.kaggle.com/competitions/ua-agent-builder-lab-dev-track" className="text-zinc-900 font-bold underline">Kaggle Competition Page</a> and navigate to the <b>Submissions</b> or <b>Submit Predictions</b> tab.
              </p>
              <div className="space-y-3">
                 <div className="flex items-center gap-3 text-sm text-zinc-700">
                   <CheckCircle className="w-4 h-4 text-emerald-500" />
                   <span>Upload your project summary (PDF/Markdown) if requested in the rules.</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-zinc-700">
                   <CheckCircle className="w-4 h-4 text-emerald-500" />
                   <span>Ensure your Kaggle profile name matches your registration info.</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-zinc-700">
                   <CheckCircle className="w-4 h-4 text-emerald-500" />
                   <span>Include the Gemini models used in your technical report.</span>
                 </div>
              </div>
              <a 
                href="https://www.kaggle.com/competitions/ua-agent-builder-lab-dev-track" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
              >
                Go to Kaggle
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="hidden lg:block">
               <div className="w-48 h-48 bg-zinc-50 rounded-full border border-dashed border-zinc-200 flex flex-col items-center justify-center p-8 text-center animate-pulse">
                  <Gift className="w-12 h-12 text-zinc-300 mb-2" />
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Swag eligibility check</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="p-8 bg-zinc-900 rounded-[32px] text-white overflow-hidden relative">
        <div className="relative z-10">
          <h4 className="text-2xl font-bold mb-2">Final Step: Innovation Recap</h4>
          <p className="text-zinc-400 text-sm mb-6 max-w-lg">
            The judges are looking for efficiency and creative use of Gemini. Ensure your agent's instructions (system prompt) are optimized.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {['Context Caching', 'Controlled Generation', 'Function Calling', 'RAG Integration'].map(tag => (
               <div key={tag} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-center font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                 {tag}
               </div>
             ))}
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
      </div>
    </div>
  );
}
