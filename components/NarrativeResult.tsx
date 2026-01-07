
import React, { useState, useEffect } from 'react';
import { StoryResult, RefinementTone } from '../types';

interface NarrativeResultProps {
  result: StoryResult | null;
  isLoading: boolean;
  error: string | null;
  onRefine: (tone: RefinementTone) => void;
  onBack: () => void;
}

const LoadingGraphic = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phases = ["Extracting Truth", "Calibrating Conflict", "Structuring Impact", "Drafting Narrative"];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % phases.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-12">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 border border-apple-blue/10 dark:border-apple-blue/5 grid grid-cols-4 grid-rows-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="border-[0.5px] border-apple-blue/5 dark:border-white/5" />
          ))}
        </div>
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-apple-blue/20 animate-[height_2s_infinite] origin-top" />
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-apple-blue/20 animate-[width_2s_infinite] origin-left delay-500" />
        <div className="absolute bottom-4 left-4 w-12 h-0 bg-apple-blue/40 animate-[grow_3s_infinite] rounded-sm" />
        <div className="absolute bottom-4 left-20 w-8 h-0 bg-apple-blue/30 animate-[grow_3s_infinite_0.5s] rounded-sm" />
        <div className="absolute bottom-4 left-32 w-10 h-0 bg-apple-blue/50 animate-[grow_3s_infinite_1s] rounded-sm" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 p-4 bg-white dark:bg-black rounded-2xl shadow-2xl border border-apple-gray-100 dark:border-apple-gray-800 animate-bounce">
          <svg className="w-8 h-8 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight text-apple-gray-900 dark:text-white transition-all duration-500">
          {phases[phaseIndex]}
        </h2>
        <p className="text-apple-gray-400 text-sm font-medium tracking-widest uppercase animate-pulse">
          Synthesis in progress...
        </p>
      </div>
      <style>{`
        @keyframes height { 0%, 100% { height: 0; opacity: 0; } 50% { height: 100%; opacity: 1; } }
        @keyframes width { 0%, 100% { width: 0; opacity: 0; } 50% { width: 100%; opacity: 1; } }
        @keyframes grow { 0% { height: 0; opacity: 0; } 40% { height: var(--h, 60px); opacity: 1; } 100% { height: 0; opacity: 0; } }
        .animate-\\[grow_3s_infinite\\] { --h: 80px; }
        .animate-\\[grow_3s_infinite_0\\.5s\\] { --h: 50px; }
        .animate-\\[grow_3s_infinite_1s\\] { --h: 100px; }
      `}</style>
    </div>
  );
};

export default function NarrativeResult({ result, isLoading, error, onRefine, onBack }: NarrativeResultProps) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopy = (text: string, id: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  if (isLoading) {
    return <LoadingGraphic />;
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-apple-gray-900 p-12 rounded-[2rem] border border-apple-gray-200 dark:border-apple-gray-800 text-center space-y-6">
        <h2 className="text-2xl font-bold text-apple-gray-900 dark:text-white">Failed to Construct</h2>
        <p className="text-apple-gray-500 max-w-sm mx-auto text-sm">{error}</p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-apple-gray-900 dark:bg-white text-white dark:text-black rounded-full font-semibold text-sm transition-all"
        >
          Return to Blueprints
        </button>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Narrative Area */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-apple-gray-900 rounded-[2.5rem] p-10 sm:p-14 border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm relative group overflow-hidden">
            <div className="noise-overlay"></div>
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-apple-blue bg-apple-blue/5 px-3 py-1 rounded-full">
                Narrative Construct
              </span>
              <button 
                onClick={() => handleCopy(result.content, 'main')}
                className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all flex items-center space-x-2 shadow-sm ${
                  copiedStates['main'] 
                    ? 'bg-green-50 text-green-600 border border-green-200' 
                    : 'bg-apple-gray-50 text-apple-gray-500 hover:text-apple-blue border border-apple-gray-200 hover:border-apple-blue'
                }`}
              >
                <span>{copiedStates['main'] ? 'Copied to Clipboard' : 'Copy Narrative'}</span>
                {copiedStates['main'] ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
              </button>
            </div>

            <div className="space-y-8 text-apple-gray-900 dark:text-apple-gray-100 font-normal leading-[1.7] text-xl sm:text-2xl tracking-tight relative z-10">
              {result.content.split('\n').map((para, i) => (
                para.trim() ? <p key={i}>{para}</p> : <div key={i} className="h-4" />
              ))}
            </div>
          </div>

          <div className="bg-apple-gray-100/50 dark:bg-apple-gray-900/50 rounded-[2rem] p-8 space-y-6 border border-transparent dark:border-apple-gray-800 relative overflow-hidden">
            <div className="noise-overlay opacity-[0.015]"></div>
            <h3 className="text-xs font-bold text-apple-gray-400 uppercase tracking-widest relative z-10">Refine Resonance</h3>
            <div className="flex flex-wrap gap-2 relative z-10">
              {Object.values(RefinementTone).map((tone) => (
                <button
                  key={tone}
                  onClick={() => onRefine(tone)}
                  className="px-5 py-2.5 bg-white dark:bg-apple-gray-800 hover:bg-apple-blue dark:hover:bg-apple-blue border border-apple-gray-200 dark:border-apple-gray-700 hover:border-apple-blue text-apple-gray-600 dark:text-apple-gray-300 hover:text-white dark:hover:text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {result.insights && (
            <>
              <div className="bg-white dark:bg-apple-gray-900 p-8 rounded-[2rem] border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm space-y-4 relative overflow-hidden group">
                <div className="noise-overlay opacity-[0.02]"></div>
                <div className="flex justify-between items-start relative z-10">
                  <h4 className="text-[11px] font-bold text-apple-gray-400 uppercase tracking-widest">Positioning</h4>
                  <button 
                    onClick={() => handleCopy(result.insights!.positioning, 'pos')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-apple-gray-50 rounded-lg text-apple-gray-400 hover:text-apple-blue"
                    title="Copy Positioning"
                  >
                    {copiedStates['pos'] ? (
                      <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    )}
                  </button>
                </div>
                <p className="text-lg font-semibold tracking-tight leading-snug text-apple-gray-900 dark:text-white serif italic relative z-10">
                  "{result.insights.positioning}"
                </p>
              </div>

              <div className="bg-white dark:bg-apple-gray-900 p-8 rounded-[2rem] border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm space-y-6 relative overflow-hidden">
                <div className="noise-overlay opacity-[0.02]"></div>
                <h4 className="text-[11px] font-bold text-apple-gray-400 uppercase tracking-widest relative z-10">Opening Hooks</h4>
                <div className="space-y-4 relative z-10">
                  {result.insights.hooks.map((hook, i) => (
                    <div key={i} className="group/hook relative">
                      <p className="text-[13px] text-apple-gray-600 dark:text-apple-gray-400 leading-relaxed pl-4 border-l-2 border-apple-blue/20">
                        {hook}
                      </p>
                      <button 
                        onClick={() => handleCopy(hook, `hook-${i}`)}
                        className="absolute -right-2 top-0 opacity-0 group-hover/hook:opacity-100 transition-opacity p-1.5 hover:bg-apple-gray-50 rounded-lg text-apple-gray-300 hover:text-apple-blue"
                      >
                        {copiedStates[`hook-${i}`] ? (
                          <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-apple-gray-900 p-8 rounded-[2rem] border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm space-y-4 relative overflow-hidden">
                <div className="noise-overlay opacity-[0.015]"></div>
                <h4 className="text-[11px] font-bold text-apple-gray-400 uppercase tracking-widest relative z-10">Strategic Pillars</h4>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {result.insights.themes.map((theme, i) => (
                    <span key={i} className="px-3 py-1.5 bg-apple-gray-50 dark:bg-apple-gray-800 border border-apple-gray-200 dark:border-apple-gray-700 rounded-lg text-[10px] text-apple-gray-500 dark:text-apple-gray-400 font-bold uppercase tracking-wider">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-apple-blue/5 dark:bg-apple-blue/10 p-8 rounded-[2rem] border border-apple-blue/10 space-y-3 relative overflow-hidden">
                <div className="noise-overlay opacity-[0.02]"></div>
                <h4 className="text-[11px] font-bold text-apple-blue uppercase tracking-widest relative z-10">Architect's Note</h4>
                <p className="text-[13px] text-apple-gray-600 dark:text-apple-gray-400 leading-relaxed italic relative z-10">
                  {result.insights.suggestion}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
