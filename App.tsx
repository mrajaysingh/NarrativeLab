
import React, { useState, useEffect } from 'react';
import { DiscoveryAnswers, OutputFormat, RefinementTone, StoryResult, User } from './types';
import { generateNarrative } from './services/geminiService';
import { authService } from './services/authService';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import DiscoveryWizard from './components/DiscoveryWizard';
import OutputSelector from './components/OutputSelector';
import NarrativeResult from './components/NarrativeResult';

type Step = 'landing' | 'auth' | 'dashboard' | 'admin' | 'discovery' | 'format' | 'result';

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [user, setUser] = useState<User | null>(null);
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

  useEffect(() => {
    authService.getMe().then(u => {
      if (u) {
        setUser(u);
        setStep(u.role === 'ADMIN' ? 'admin' : 'dashboard');
      }
    });
  }, []);

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    setStep(u.role === 'ADMIN' ? 'admin' : 'dashboard');
  };

  const handlePurchase = async (plan: string) => {
    if (!user) {
      setStep('auth');
      return;
    }
    try {
      const updatedUser = await authService.purchasePlan(plan);
      setUser(updatedUser);
      setStep('dashboard');
    } catch (err) {
      alert("Investment failed. Connection error.");
    }
  };

  const handleStartDiscovery = () => {
    if (!user) {
      setStep('auth');
      return;
    }
    if (!user.hasPaid) {
      alert("A paid license is required to access the Narrative Discovery core. Please upgrade via your dashboard.");
      setStep('dashboard');
      return;
    }
    if (user.tokensUsed >= user.tokensLimit) {
      alert("Daily synthesis limit reached. Please wait for reset or upgrade your architecture.");
      setStep('dashboard');
      return;
    }
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
      // Synchronize usage with backend
      const updatedUser = await authService.recordUsage();
      setUser(updatedUser);
    } catch (err: any) {
      setError(err.message || 'Failed to synthesize narrative.');
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
      setError(err.message || 'Refinement failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    if (user) {
      setStep(user.role === 'ADMIN' ? 'admin' : 'dashboard');
    } else {
      setStep('landing');
    }
    setAnswers(null);
    setFormat(null);
    setResult(null);
    setError(null);
  };

  return (
    <Layout 
      onReset={reset} 
      isDarkMode={isDarkMode} 
      onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      user={user}
      onLogout={() => { authService.logout(); setUser(null); setStep('landing'); }}
      onSignIn={() => setStep('auth')}
    >
      {step === 'landing' && (
        <LandingPage onStart={handleStartDiscovery} onPurchase={handlePurchase} />
      )}
      
      {step === 'auth' && (
        <AuthPage onSuccess={handleAuthSuccess} />
      )}

      {step === 'dashboard' && user && (
        <UserDashboard 
          user={user} 
          onStartDiscovery={handleStartDiscovery}
          onPurchase={handlePurchase}
          onCancel={async () => setUser(await authService.cancelPlan())}
        />
      )}

      {step === 'admin' && user?.role === 'ADMIN' && (
        <AdminDashboard />
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
