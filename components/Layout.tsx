
import React, { PropsWithChildren } from 'react';

interface LayoutProps {
  onReset: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Layout({ children, onReset, isDarkMode, onToggleTheme }: PropsWithChildren<LayoutProps>) {
  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 z-[100] glass bg-white/70 dark:bg-black/70 border-b border-apple-gray-200 dark:border-apple-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 cursor-pointer group" onClick={onReset}>
          <div className="w-8 h-8 bg-apple-blue dark:bg-white rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm shadow-apple-blue/20">
            <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold tracking-tight text-apple-gray-900 dark:text-white">Narrative Architect</h1>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors text-apple-gray-600 dark:text-apple-gray-400"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          <button 
            onClick={onReset}
            className="text-sm font-medium text-apple-gray-500 hover:text-apple-blue dark:text-apple-gray-400 dark:hover:text-white transition-colors"
          >
            Restart
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center pt-24 sm:pt-32 pb-16 px-4">
        <div className="w-full max-w-7xl">
          {children}
        </div>
      </main>

      <footer className="py-12 text-center text-apple-gray-400 dark:text-apple-gray-600 text-[13px] tracking-tight">
        Elite Narrative Strategist • Built for Clarity and Impact
      </footer>
    </div>
  );
}
