
import React, { useState } from 'react';
import { DiscoveryAnswers } from '../types';

interface DiscoveryWizardProps {
  onComplete: (answers: DiscoveryAnswers) => void;
}

const QUESTIONS = [
  { id: 'audience', label: 'Who is this story for?', placeholder: 'Potential clients, recruiters, investors...' },
  { id: 'goal', label: 'What is the primary goal?', placeholder: 'Attract clients, raise trust, justify premium pricing...' },
  { id: 'character', label: 'Who is the main character?', placeholder: 'Individual, founder, freelancer, brand...' },
  { id: 'stage', label: 'What stage are they in?', placeholder: 'Pivoting, growing, established...' },
  { id: 'struggle', label: 'What problem or struggle did they face?', placeholder: 'Be specific about the friction or limitations...' },
  { id: 'turningPoint', label: 'What was the specific turning point?', placeholder: 'A failure, realization, decision, event...' },
  { id: 'strengths', label: 'What core strengths define them today?', placeholder: 'Avoid clichés. Think about concrete values.' },
  { id: 'outcome', label: 'What is the desired reader outcome?', placeholder: 'Book a call, feel inspired, trust the expertise...' },
];

export default function DiscoveryWizard({ onComplete }: DiscoveryWizardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<DiscoveryAnswers>>({});
  const [currentValue, setCurrentValue] = useState('');

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleNext = () => {
    if (!currentValue.trim()) return;
    const newAnswers = { ...answers, [currentQuestion.id]: currentValue };
    setAnswers(newAnswers);
    setCurrentValue('');
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newAnswers as DiscoveryAnswers);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="space-y-3">
        <div className="h-[2px] bg-apple-gray-200 dark:bg-apple-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-apple-blue transition-all duration-700 ease-in-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.1em] text-apple-gray-400">
          <span>Module {currentIndex + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% calibrated</span>
        </div>
      </div>

      <div className="space-y-10">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-gray-900 dark:text-white leading-tight">
            {currentQuestion.label}
          </h2>
          <p className="text-apple-gray-500 text-sm leading-relaxed">
            Provide specific, authentic details to help the engine extract your unique narrative truth.
          </p>
        </div>
        
        <textarea
          autoFocus
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={currentQuestion.placeholder}
          className="w-full bg-transparent border-b-2 border-apple-gray-200 dark:border-apple-gray-800 py-4 text-xl sm:text-2xl text-apple-gray-900 dark:text-white placeholder:text-apple-gray-300 dark:placeholder:text-apple-gray-700 focus:outline-none focus:border-apple-blue transition-all min-h-[120px] resize-none"
        />

        <div className="flex items-center space-x-4">
          <button
            onClick={handleNext}
            disabled={!currentValue.trim()}
            className="px-8 py-3 bg-apple-blue dark:bg-white text-white dark:text-black rounded-full font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {currentIndex === QUESTIONS.length - 1 ? 'Construct Narrative' : 'Next Question'}
          </button>
          <button
            onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className={`text-sm font-semibold transition-colors px-4 py-2 rounded-full ${currentIndex === 0 ? 'text-apple-gray-300 dark:text-apple-gray-800 cursor-not-allowed' : 'text-apple-gray-500 dark:text-apple-gray-400 hover:text-apple-blue dark:hover:text-white hover:bg-apple-gray-100 dark:hover:bg-apple-gray-900'}`}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
