
import React from 'react';
import { OutputFormat } from '../types';

interface OutputSelectorProps {
  onSelect: (format: OutputFormat) => void;
}

const FORMAT_DETAILS = [
  { id: OutputFormat.LINKEDIN_ABOUT, label: 'LinkedIn Bio', icon: '👤' },
  { id: OutputFormat.PERSONAL_BIO, label: 'Website Story', icon: '🌐' },
  { id: OutputFormat.PITCH_DECK, label: 'Pitch Deck', icon: '📈' },
  { id: OutputFormat.LANDING_PAGE, label: 'Landing Page', icon: '🎯' },
  { id: OutputFormat.MULTI_VERSION, label: 'Suite (S/M/L)', icon: '📦' }
];

export default function OutputSelector({ onSelect }: OutputSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-bold tracking-tight text-apple-gray-900 dark:text-white">Choose Your Format</h2>
        <p className="text-apple-gray-500 max-w-lg mx-auto text-lg leading-relaxed">
          How would you like to present your calibrated narrative truth?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FORMAT_DETAILS.map((format) => (
          <button
            key={format.id}
            onClick={() => onSelect(format.id)}
            className="group flex flex-col items-center justify-center p-8 bg-white dark:bg-apple-gray-900 rounded-[2rem] border border-apple-gray-200 dark:border-apple-gray-800 hover:border-apple-blue transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-xl hover:shadow-apple-blue/5"
          >
            <span className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{format.icon}</span>
            <h3 className="text-lg font-semibold text-apple-gray-900 dark:text-white">{format.label}</h3>
            <p className="mt-2 text-[13px] text-apple-gray-400 text-center leading-relaxed">
              Optimized architectural structure
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
