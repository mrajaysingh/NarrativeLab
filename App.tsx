
import React, { useState, useEffect } from 'react';
import { DiscoveryAnswers, OutputFormat, RefinementTone, StoryResult } from './types';
import { generateNarrative } from './services/geminiService';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import DiscoveryWizard from './components/DiscoveryWizard';
import OutputSelector from './components/OutputSelector';
import NarrativeResult from './components/NarrativeResult';

export default function App() {
  const [step, setStep] = useState<'landing' | 'discovery' | 'format' | 'result'>('landing');
  const [answers, setAnswers] = useState<DiscoveryAnswers | null>(null);
  const [format, setFormat] = useState<OutputFormat | null>(null);
  const [result, setResult] = useState<StoryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleStartDiscovery = () => {
    setStep('discovery');
  };

  const handleDiscoveryComplete = (data: DiscoveryAnswers) => {
    setAnswers(data);
    setStep('format');
  };

  const handleFormatSelect = async (selectedFormat: OutputFormat) => {
    setFormat(selectedFormat);
    if (!answers) return;

    setStep('result');
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateNarrative(answers, selectedFormat);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate narrative.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (tone: RefinementTone) => {
    if (!answers || !format) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await generateNarrative(answers, format, tone);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to refine narrative.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setStep('landing');
    setAnswers(null);
    setFormat(null);
    setResult(null);
    setError(null);
  };

  const toggleTheme = (): void => setIsDarkMode(!isDarkMode);

  return (
    <Layout onReset={reset} isDarkMode={isDarkMode} onToggleTheme={toggleTheme}>
      {step === 'landing' && (
        <LandingPage onStart={handleStartDiscovery} />
      )}
      {step === 'discovery' && (
        <DiscoveryWizard onComplete={handleDiscoveryComplete} />
      )}
      {step === 'format' && (
        <OutputSelector onSelect={handleFormatSelect} />
      )}
      {step === 'result' && (
        <NarrativeResult
          result={result}
          isLoading={isLoading}
          error={error}
          onRefine={handleRefine}
          onBack={() => setStep('format')}
        />
      )}
    </Layout>
  );
}
