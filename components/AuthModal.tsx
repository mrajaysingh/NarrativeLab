
import React, { useState } from 'react';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthModalProps {
  onSuccess: (user: User) => void;
  onClose: () => void;
}

export default function AuthModal({ onSuccess, onClose }: AuthModalProps) {
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white dark:bg-apple-gray-900 rounded-[3rem] p-10 sm:p-14 border border-apple-gray-200 dark:border-apple-gray-800 shadow-2xl relative overflow-hidden">
        <div className="noise-overlay opacity-[0.03]"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-apple-gray-400 hover:text-apple-blue transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-8 relative z-10 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-apple-gray-900 dark:text-white serif italic">
              {isLogin ? 'Welcome Back' : 'Architect Registration'}
            </h2>
            <p className="text-apple-gray-500 text-sm font-light">
              Access the Narrative Intelligence Core.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-apple-gray-50 dark:bg-apple-gray-800 border border-apple-gray-200 dark:border-apple-gray-700 text-apple-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue transition-all"
              />
              <input
                type="password"
                required
                placeholder="Secure Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-apple-gray-50 dark:bg-apple-gray-800 border border-apple-gray-200 dark:border-apple-gray-700 text-apple-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue transition-all"
              />
            </div>

            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-apple-blue text-white rounded-full font-bold text-lg shadow-xl shadow-apple-blue/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Enter Vault' : 'Initialize Identity')}
            </button>
          </form>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-xs font-bold text-apple-gray-400 hover:text-apple-blue uppercase tracking-widest transition-colors"
          >
            {isLogin ? "Don't have an architecture ID? Register" : "Already registered? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
