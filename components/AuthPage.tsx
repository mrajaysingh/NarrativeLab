
import React, { useState } from 'react';
import { authService } from '../services/authService';
import { User } from '../types';

export default function AuthPage({ onSuccess }: { onSuccess: (u: User) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { user } = isLogin 
        ? await authService.login(email, password)
        : await authService.register(email, password);
      onSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center py-8">
      <div className="w-full max-w-3xl grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-apple-gray-900 rounded-[3rem] border border-apple-gray-200 dark:border-apple-gray-800 shadow-2xl overflow-hidden relative">
        <div className="noise-overlay opacity-[0.03]"></div>
        
        {/* Visual Half */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-apple-gray-900 dark:bg-apple-gray-800 text-white relative">
          <div className="architectural-grid absolute inset-0 opacity-20" />
          <div className="relative z-10 space-y-4">
            <div className="w-10 h-10 bg-apple-blue rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold serif italic leading-tight">
              The story begins <br />with the blueprint.
            </h2>
            <p className="text-apple-gray-400 text-sm font-light max-w-[200px]">
              "Authority isn't found, it's constructed through the calibration of truth."
            </p>
          </div>
          <div className="relative z-10 text-[9px] uppercase tracking-[0.4em] font-black text-apple-gray-500">
            System Protocol 2.5.0
          </div>
        </div>

        {/* Form Half */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter text-apple-gray-900 dark:text-white uppercase">
              {isLogin ? 'Initialize' : 'Register'}
            </h1>
            <p className="text-apple-gray-500 text-sm font-light leading-snug">
              {isLogin ? 'Enter credentials for core access.' : 'Join the elite network of narrative architects.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-apple-gray-400">Architect ID</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-apple-gray-50 dark:bg-apple-gray-800 border border-apple-gray-200 dark:border-apple-gray-700 text-apple-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue transition-all text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-apple-gray-400">Secure Key</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-apple-gray-50 dark:bg-apple-gray-800 border border-apple-gray-200 dark:border-apple-gray-700 text-apple-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue transition-all text-sm"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-apple-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-base shadow-lg hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all"
            >
              {isLoading ? 'Calibrating...' : (isLogin ? 'Access Core' : 'Establish Protocol')}
            </button>
          </form>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[10px] font-bold text-apple-gray-400 hover:text-apple-blue uppercase tracking-widest transition-colors text-center"
          >
            {isLogin ? "No identity? Register" : "Already established? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
