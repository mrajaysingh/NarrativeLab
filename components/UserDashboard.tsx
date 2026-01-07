
import React from 'react';
import { User } from '../types';

interface UserDashboardProps {
  user: User;
  onStartDiscovery: () => void;
  onPurchase: (plan: string) => void;
  onCancel: () => void;
}

export default function UserDashboard({ user, onStartDiscovery, onPurchase, onCancel }: UserDashboardProps) {
  const tokenPercentage = (user.tokensUsed / user.tokensLimit) * 100;
  const tokensRemaining = Math.max(0, user.tokensLimit - user.tokensUsed);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-apple-gray-200 dark:border-apple-gray-800">
        <div className="space-y-3">
          <div className="inline-flex items-center px-3 py-1 bg-apple-blue/10 rounded-full border border-apple-blue/20">
            <span className="w-1.5 h-1.5 rounded-full bg-apple-blue mr-2 animate-pulse" />
            <span className="text-[10px] font-black text-apple-blue uppercase tracking-widest">Architect Studio active</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-apple-gray-900 dark:text-white serif italic">Welcome, Architect.</h1>
          <p className="text-apple-gray-500 font-light text-lg">Managing protocols for: <span className="font-medium text-apple-gray-900 dark:text-apple-gray-300">{user.email}</span></p>
        </div>
        <button 
          onClick={onStartDiscovery}
          className="px-12 py-5 bg-apple-blue text-white rounded-full font-bold text-lg shadow-xl shadow-apple-blue/30 hover:scale-[1.04] active:scale-95 transition-all"
        >
          Begin New Synthesis
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Active Plan Card */}
        <div className="lg:col-span-2 p-12 bg-white dark:bg-apple-gray-900 rounded-[4rem] border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm space-y-10 relative overflow-hidden group">
          <div className="noise-overlay opacity-[0.03]" />
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-apple-gray-400 uppercase tracking-[0.4em]">Current Architecture</span>
              <h2 className="text-4xl font-bold text-apple-gray-900 dark:text-white uppercase tracking-tighter">
                {user.plan || 'Guest Tier'}
              </h2>
            </div>
            {user.hasPaid ? (
              <div className="px-5 py-2.5 bg-green-500/10 text-green-500 text-[11px] font-black uppercase tracking-widest rounded-full border border-green-500/20 shadow-sm">
                Active License
              </div>
            ) : (
              <div className="px-5 py-2.5 bg-yellow-500/10 text-yellow-600 text-[11px] font-black uppercase tracking-widest rounded-full border border-yellow-500/20 shadow-sm">
                Action Required
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10">
            <div className="p-8 bg-apple-gray-50 dark:bg-apple-gray-800/50 rounded-3xl border border-apple-gray-200 dark:border-apple-gray-800">
              <h4 className="text-[11px] font-black text-apple-gray-400 uppercase tracking-widest mb-6">Tier Features</h4>
              <ul className="space-y-4">
                {[
                  { label: "Truth Extraction Core", ok: true },
                  { label: "LinkedIn Calibration", ok: user.hasPaid },
                  { label: "Authority Strategy Notes", ok: user.plan === 'Authority' }
                ].map((feat, i) => (
                  <li key={i} className={`flex items-center space-x-3 text-sm ${feat.ok ? 'text-apple-gray-800 dark:text-apple-gray-200' : 'text-apple-gray-400 line-through opacity-40'}`}>
                    <svg className={`w-4 h-4 ${feat.ok ? 'text-apple-blue' : 'text-apple-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    <span className="font-medium">{feat.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-col justify-center space-y-6">
              {user.plan !== 'Authority' ? (
                <div className="space-y-3">
                  <button 
                    onClick={() => onPurchase('Authority')}
                    className="w-full py-5 bg-apple-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-base hover:scale-[1.02] transition-all shadow-lg"
                  >
                    Upgrade to Authority
                  </button>
                  <p className="text-[10px] text-center text-apple-gray-400 uppercase tracking-widest font-black">Unlock 100 Syntheses / Day</p>
                </div>
              ) : (
                <div className="text-center p-8 border-2 border-apple-blue/20 rounded-3xl bg-apple-blue/5">
                  <div className="text-apple-blue font-black text-xs uppercase tracking-[0.3em] mb-2">Elite Access</div>
                  <p className="text-apple-gray-500 text-sm italic">You have reached peak narrative positioning.</p>
                </div>
              )}
              {user.hasPaid && (
                <button 
                  onClick={onCancel}
                  className="w-full py-3 text-apple-gray-400 hover:text-red-500 font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  Terminate Architecture Plan
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Usage Card */}
        <div className="p-12 bg-white dark:bg-apple-gray-900 rounded-[4rem] border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="noise-overlay opacity-[0.02]" />
          <div className="space-y-8 relative z-10">
            <span className="text-[10px] font-black text-apple-gray-400 uppercase tracking-[0.4em]">Capacity Pulse</span>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-7xl font-bold text-apple-gray-900 dark:text-white tracking-tighter tabular-nums">{tokensRemaining}</span>
                <div className="text-right pb-2">
                  <span className="block text-apple-gray-400 text-[10px] font-black uppercase tracking-widest">Syntheses</span>
                  <span className="block text-apple-blue font-bold text-xs">Remaining Today</span>
                </div>
              </div>
              <div className="h-2.5 bg-apple-gray-100 dark:bg-apple-gray-800 rounded-full overflow-hidden border border-apple-gray-200 dark:border-apple-gray-700">
                <div 
                  className={`h-full transition-all duration-1000 ease-in-out ${tokensRemaining < 2 ? 'bg-red-500' : 'bg-apple-blue'}`} 
                  style={{ width: `${100 - tokenPercentage}%` }}
                />
              </div>
            </div>
          </div>
          <div className="pt-10 relative z-10">
            <div className="p-4 bg-apple-gray-50 dark:bg-apple-gray-800 rounded-2xl border border-apple-gray-200 dark:border-apple-gray-700">
              <p className="text-[11px] text-apple-gray-500 leading-relaxed italic">
                Daily limits refresh at <span className="font-bold text-apple-gray-900 dark:text-white">00:00 UTC</span>. Strategic caching is active to preserve your synthesis quota.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Narrative History Placeholder */}
      <section className="space-y-8 pt-10">
        <h3 className="text-[10px] font-black text-apple-gray-400 uppercase tracking-[0.5em]">Construct Repository</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-12 border-2 border-dashed border-apple-gray-200 dark:border-apple-gray-800 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
            <div className="w-16 h-16 bg-apple-gray-50 dark:bg-apple-gray-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <svg className="w-8 h-8 text-apple-gray-300 dark:text-apple-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-apple-gray-500 dark:text-apple-gray-400 uppercase tracking-tight">Repository Empty</p>
              <p className="text-sm text-apple-gray-400 font-light">Synthesize your first narrative to begin <br />your brand architecture history.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
