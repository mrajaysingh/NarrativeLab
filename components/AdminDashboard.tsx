
import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { SystemAnalytics } from '../types';

export default function AdminDashboard() {
  const [data, setData] = useState<SystemAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getAdminAnalytics().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="w-full h-[50vh] flex flex-col items-center justify-center space-y-6">
        <div className="w-12 h-12 border-4 border-apple-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-black text-apple-gray-400 uppercase tracking-widest">Querying System Pulse...</p>
      </div>
    );
  }

  const kpis = [
    { label: 'Total Architects', value: data.totalUsers, icon: '👥' },
    { label: 'Active Sessions', value: data.activeToday, icon: '⚡' },
    { label: 'Narrative Output', value: data.synthesisCount, icon: '✍️' },
    { label: 'Total Revenue', value: `$${data.revenue.toLocaleString()}`, icon: '💰' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      <header className="flex items-end justify-between border-b border-apple-gray-200 dark:border-apple-gray-800 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>Superadmin Command</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tighter text-apple-gray-900 dark:text-white uppercase">Network Analytics</h1>
        </div>
        <div className="text-right">
          <p className="text-xs font-black text-apple-gray-400 uppercase tracking-widest">System Time</p>
          <p className="text-lg font-bold text-apple-gray-900 dark:text-white tabular-nums">{new Date().toLocaleTimeString()}</p>
        </div>
      </header>

      {/* KPI Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((kpi, i) => (
          <div key={i} className="p-8 bg-white dark:bg-apple-gray-900 rounded-[2.5rem] border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm space-y-4">
            <div className="text-2xl">{kpi.icon}</div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-apple-gray-400 uppercase tracking-widest">{kpi.label}</p>
              <p className="text-3xl font-bold text-apple-gray-900 dark:text-white tabular-nums">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* System Health Module */}
        <div className="p-12 bg-apple-gray-900 dark:bg-apple-gray-800 rounded-[4rem] text-white space-y-10 relative overflow-hidden">
          <div className="architectural-grid absolute inset-0 opacity-10" />
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-apple-gray-400 relative z-10">Engine Core Integrity</h3>
          
          <div className="space-y-8 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-lg font-light">Prisma / PostgreSQL</span>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${data.dbStatus === 'Healthy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                {data.dbStatus}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-light">Redis Query Cache</span>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${data.redisStatus === 'Connected' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                {data.redisStatus}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-light">Gemini 3 Pro API</span>
              <span className="px-4 py-1.5 rounded-full text-[10px] font-black bg-white/10 text-white uppercase tracking-widest border border-white/20">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Volume Graph (Simulated) */}
        <div className="p-12 bg-white dark:bg-apple-gray-900 rounded-[4rem] border border-apple-gray-200 dark:border-apple-gray-800 space-y-10">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-apple-gray-400">Synthesis Traffic</h3>
          <div className="h-48 flex items-end gap-2 px-2">
            {[40, 65, 30, 85, 90, 55, 75, 45, 95, 80].map((h, i) => (
              <div 
                key={i} 
                className="flex-grow bg-apple-blue/20 dark:bg-apple-blue/10 border-t-2 border-apple-blue rounded-t-lg transition-all duration-1000"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-black text-apple-gray-400 uppercase tracking-widest">
            <span>00:00</span>
            <span>Syntheses per hour (24h)</span>
            <span>Current</span>
          </div>
        </div>
      </div>
    </div>
  );
}
