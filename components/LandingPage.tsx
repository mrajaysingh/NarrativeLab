
import React, { useEffect, useRef, useState } from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const PRICING_PLANS = [
  {
    name: "Seed",
    price: "Free",
    period: "7 day trial",
    desc: "Perfect for students and early-career explorers.",
    note: "No credit card required",
    button: "Start Trial",
    features: {
      "Core Discovery Module": true,
      "Truth Extraction Engine": true,
      "Psychological Framework": true,
      "LinkedIn Optimization": true,
      "Website Bio Format": false,
      "Pitch Deck Architecture": false,
      "Tone Refinement Tools": false,
      "Premium Positioning Insights": false,
      "Strategic Architect Notes": false,
    }
  },
  {
    name: "Growth",
    price: "$12",
    period: "per month",
    desc: "The standard for professionals and freelancers.",
    button: "Get Started",
    popular: true,
    features: {
      "Core Discovery Module": true,
      "Truth Extraction Engine": true,
      "Psychological Framework": true,
      "LinkedIn Optimization": true,
      "Website Bio Format": true,
      "Pitch Deck Architecture": true,
      "Tone Refinement Tools": true,
      "Premium Positioning Insights": true,
      "Strategic Architect Notes": false,
    }
  },
  {
    name: "Authority",
    price: "$29",
    period: "per month",
    desc: "For founders and executives building a legacy.",
    button: "Go Elite",
    features: {
      "Core Discovery Module": true,
      "Truth Extraction Engine": true,
      "Psychological Framework": true,
      "LinkedIn Optimization": true,
      "Website Bio Format": true,
      "Pitch Deck Architecture": true,
      "Tone Refinement Tools": true,
      "Premium Positioning Insights": true,
      "Strategic Architect Notes": true,
    }
  }
];

export default function LandingPage({ onStart }: LandingPageProps) {
  const [activeStage, setActiveStage] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Scroll tracking for the Narrative Flip section
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const index = Math.min(Math.floor(scrollPos / (windowHeight * 0.7)), 2);
      setActiveStage(index);
    };

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for scroll-reveal animations
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  const stages = [
    {
      title: "Truth Extraction",
      desc: "We move beyond the surface. We uncover the friction, the failure, and the specific insight that makes your path unique.",
      pill: "Discovery"
    },
    {
      title: "Psychological Structuring",
      desc: "Applying the 'Narrative Framework' to align your story with human decision-making patterns.",
      pill: "Architecture"
    },
    {
      title: "Impact Synthesis",
      desc: "Transforming raw experience into high-authority copy that justifies your premium positioning.",
      pill: "Finalization"
    }
  ];

  return (
    <div className="w-full space-y-32">
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        
        .card-hover {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px);
        }
      `}</style>

      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-10 reveal reveal-active">
        <div className="space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-apple-blue bg-apple-blue/5 px-4 py-2 rounded-full inline-block">
            Elite Narrative Intelligence
          </span>
          <h1 className="text-6xl sm:text-8xl font-bold tracking-tight text-apple-gray-900 dark:text-white serif italic">
            Architect Your <br />
            <span className="not-italic text-apple-blue">Influence.</span>
          </h1>
        </div>
        
        <p className="max-w-2xl text-xl text-apple-gray-500 leading-relaxed font-light px-4">
          Stop writing generic content. Extract your truth and transform it into a high-impact story that creates immediate authority.
        </p>

        <button
          onClick={onStart}
          className="group relative px-10 py-5 bg-apple-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg transition-all hover:scale-[1.05] active:scale-95 shadow-2xl hover:shadow-apple-blue/20"
        >
          Begin Synthesis
          <div className="absolute -inset-1 bg-apple-blue/20 blur opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
        </button>
      </section>

      {/* Narrative Flip Section */}
      <section className="py-24 space-y-16 reveal stagger-1">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-4">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-apple-gray-900 dark:text-white">
              The Alchemy of <br />Elite Storytelling
            </h2>
            <p className="text-apple-gray-500 leading-relaxed">
              Most bios are lists of achievements. We build narratives that explain <span className="text-apple-blue italic">why you matter.</span>
            </p>
          </div>

          <div className="relative bg-white dark:bg-apple-gray-900 p-8 rounded-[2.5rem] border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm overflow-hidden min-h-[280px] flex flex-col justify-center transition-all duration-500 hover:shadow-xl">
            <div className="noise-overlay opacity-[0.02]"></div>
            <div className="absolute top-6 left-8 flex items-center space-x-2">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${activeStage === i ? 'bg-apple-blue scale-125' : 'bg-apple-gray-200'}`} />
              ))}
            </div>

            <div key={activeStage} className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-apple-blue opacity-50 mb-2 block">
                {stages[activeStage].pill}
              </span>
              <h3 className="text-xl font-bold text-apple-gray-900 dark:text-white mb-3">
                {stages[activeStage].title}
              </h3>
              <p className="text-apple-gray-500 leading-relaxed italic text-sm">
                "{stages[activeStage].desc}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 reveal stagger-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { 
              title: "Authority Builder", 
              desc: "Move from 'experienced' to 'essential'. We frame your history as a series of strategic decisions.", 
              icon: "🛡️"
            },
            { 
              title: "Emotional Logic", 
              desc: "Human psychology requires both logic and emotion. Our architecture balances both seamlessly.", 
              icon: "🧠"
            },
            { 
              title: "Multi-Surface", 
              desc: "One core narrative, structured for LinkedIn, pitch decks, landing pages, and personal websites.", 
              icon: "✨"
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className={`p-10 bg-white dark:bg-apple-gray-900 rounded-[3rem] border border-apple-gray-200 dark:border-apple-gray-800 card-hover group overflow-hidden relative`}
            >
               <div className="noise-overlay opacity-[0.01]"></div>
               <span className="text-4xl mb-6 block grayscale group-hover:grayscale-0 transition-all duration-500">{feature.icon}</span>
               <h4 className="text-xl font-bold text-apple-gray-900 dark:text-white mb-4 tracking-tight">{feature.title}</h4>
               <p className="text-apple-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto reveal stagger-1">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-apple-gray-900 dark:text-white serif">Transparent Investment</h2>
          <p className="text-apple-gray-500 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Premium narrative architecture, priced for individuals. No hidden fees, just pure strategic clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRICING_PLANS.map((plan, i) => (
            <div 
              key={i} 
              className={`reveal stagger-${i+1} relative p-10 bg-white dark:bg-apple-gray-900 rounded-[3.5rem] border ${plan.popular ? 'border-apple-blue ring-1 ring-apple-blue/20 shadow-2xl shadow-apple-blue/10' : 'border-apple-gray-200 dark:border-apple-gray-800'} card-hover flex flex-col h-full`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-apple-blue text-white text-[10px] font-bold uppercase tracking-widest rounded-full z-20">
                  Most Calibrated
                </span>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-apple-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline space-x-1 mb-4">
                  <span className="text-4xl font-bold text-apple-gray-900 dark:text-white">{plan.price}</span>
                  <span className="text-apple-gray-400 text-sm italic">{plan.period}</span>
                </div>
                <p className="text-apple-gray-500 text-sm leading-relaxed">{plan.desc}</p>
                {plan.note && (
                  <div className="mt-3 inline-flex items-center px-2 py-1 bg-apple-blue/10 rounded text-[9px] font-bold text-apple-blue uppercase tracking-widest">
                    {plan.note}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {Object.entries(plan.features).map(([feature, available], idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-sm transition-opacity duration-300">
                    {available ? (
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 animate-in zoom-in duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-apple-gray-300 dark:text-apple-gray-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={available ? 'text-apple-gray-700 dark:text-apple-gray-300' : 'text-apple-gray-400 line-through decoration-apple-gray-200 opacity-50'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onStart}
                className={`w-full py-4 rounded-full font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 ${plan.popular ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/20' : 'bg-apple-gray-50 dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white border border-apple-gray-200 dark:border-apple-gray-700 hover:bg-apple-gray-100'}`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center bg-apple-gray-900 dark:bg-apple-gray-100 rounded-[4rem] text-white dark:text-black overflow-hidden relative mx-4 reveal">
        <div className="noise-overlay opacity-[0.05]"></div>
        <div className="max-w-2xl mx-auto space-y-8 relative z-10 px-6">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight serif">
            Your story is your <br />most valuable asset.
          </h2>
          <p className="text-apple-gray-400 dark:text-apple-gray-600">
            It takes 10 minutes to build a narrative that lasts a lifetime.
          </p>
          <button
            onClick={onStart}
            className="px-10 py-5 bg-apple-blue text-white rounded-full font-bold text-lg transition-all hover:scale-[1.05] active:scale-95 shadow-xl shadow-apple-blue/20"
          >
            Construct Your Narrative
          </button>
        </div>
      </section>
    </div>
  );
}
