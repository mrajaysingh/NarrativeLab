
export interface DiscoveryAnswers {
  audience: string;
  goal: string;
  character: string;
  stage: string;
  struggle: string;
  turningPoint: string;
  strengths: string;
  outcome: string;
}

export enum OutputFormat {
  LINKEDIN_ABOUT = 'LinkedIn "About" section',
  PERSONAL_BIO = 'Personal website bio',
  PITCH_DECK = 'Founder story for pitch deck',
  LANDING_PAGE = 'Short narrative for landing page',
  MULTI_VERSION = 'Multi-version (short, medium, long)'
}

export enum RefinementTone {
  CONFIDENT = 'More confident',
  EMOTIONAL = 'More emotional',
  CONCISE = 'More concise',
  AUTHORITATIVE = 'More authoritative',
  CONVERSATIONAL = 'More conversational'
}

export interface PremiumInsights {
  positioning: string;
  hooks: string[];
  themes: string[];
  suggestion: string;
}

export interface StoryResult {
  content: string;
  insights?: PremiumInsights;
}
