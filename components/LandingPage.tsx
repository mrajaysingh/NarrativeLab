
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
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const index = Math.min(Math.floor(scrollPos / (windowHeight * 0.75)), 2);
      setActiveStage(index);
    };

    window.addEventListener('scroll', handleScroll);

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
    <div className="w-full space-y-32 sm:space-y-64">
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger-1 { transition-delay: 0.15s; }
        .stagger-2 { transition-delay: 0.3s; }
        .stagger-3 { transition-delay: 0.45s; }
        
        .card-hover {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
        }
        .card-hover:hover {
          transform: translateY(-12px);
        }
        .architectural-grid {
          background-image: 
            linear-gradient(rgba(0,122,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,122,255,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          background-position: center top;
        }
        .dark .architectural-grid {
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-visible reveal reveal-active -mt-24 sm:-mt-32">
        <div className="absolute inset-0 architectural-grid pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-square bg-apple-blue/10 rounded-full blur-[180px] pointer-events-none opacity-50 -z-10" />
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-14 pt-12 sm:pt-20">
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full bg-apple-blue/10 dark:bg-white/10 text-apple-blue dark:text-white text-[11px] font-bold uppercase tracking-[0.5em] border border-apple-blue/20 backdrop-blur-xl animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              <span>Elite Narrative Intelligence</span>
            </div>
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter text-apple-gray-900 dark:text-white leading-[0.9] sm:leading-[0.85] uppercase">
              Architect Your <br />
              <span className="serif italic text-apple-blue lowercase font-light">Influence.</span>
            </h1>
          </div>
          
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-apple-gray-500 leading-relaxed font-light tracking-tight px-6 opacity-90">
            Stop drafting bios. Start constructing legacies. We extract your unique truth and transform it into high-impact copy that secures your premium positioning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
            <button
              onClick={onStart}
              className="group relative px-14 py-7 bg-apple-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-xl transition-all hover:scale-[1.04] active:scale-95 shadow-[0_20px_50px_rgba(0,122,255,0.25)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)] overflow-hidden"
            >
              <span className="relative z-10">Begin Synthesis</span>
              <div className="absolute inset-0 bg-apple-blue opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="absolute -inset-1 bg-apple-blue/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
            </button>
            <div className="flex flex-col items-center sm:items-start text-left space-y-1">
              <span className="text-[12px] font-black text-apple-gray-900 dark:text-white uppercase tracking-[0.2em]">Free 7-Day Access</span>
              <span className="text-[10px] font-medium text-apple-gray-400 uppercase tracking-widest">No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Flip Section */}
      <section className="py-24 px-4 reveal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-apple-gray-900 dark:text-white leading-tight">
                The Alchemy of <br />Elite Storytelling
              </h2>
              <div className="w-24 h-2 bg-apple-blue rounded-full shadow-[0_0_20px_rgba(0,122,255,0.3)]" />
            </div>
            <p className="text-2xl sm:text-3xl text-apple-gray-500 leading-relaxed font-light">
              Achievements are data points. Narratives are the logic that connects them. We build the story that explains <span className="text-apple-blue serif italic font-medium">why you matter</span> to the people who need to know.
            </p>
          </div>

          <div className="relative aspect-square bg-white dark:bg-apple-gray-900 p-12 sm:p-20 rounded-[4rem] border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm overflow-hidden flex flex-col justify-center transition-all duration-1000 hover:shadow-[0_40px_100px_rgba(0,122,255,0.08)] group">
            <div className="noise-overlay opacity-[0.03]"></div>
            <div className="absolute top-12 left-14 flex items-center space-x-6">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-1000 ${activeStage === i ? 'bg-apple-blue scale-150 ring-[8px] ring-apple-blue/10' : 'bg-apple-gray-200'}`} />
              ))}
            </div>

            <div key={activeStage} className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10 space-y-8">
              <span className="inline-block text-[12px] font-bold uppercase tracking-[0.4em] text-apple-blue bg-apple-blue/10 px-6 py-2 rounded-full border border-apple-blue/20 backdrop-blur-sm">
                {stages[activeStage].pill}
              </span>
              <h3 className="text-4xl sm:text-5xl font-bold text-apple-gray-900 dark:text-white tracking-tighter leading-tight">
                {stages[activeStage].title}
              </h3>
              <p className="text-apple-gray-500 leading-relaxed italic text-xl sm:text-2xl max-w-lg">
                "{stages[activeStage].desc}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-4 reveal stagger-2">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { 
              title: "Authority Builder", 
              desc: "Move from 'experienced' to 'essential'. We frame your history as a series of strategic decisions that define your future.", 
              icon: (
                <svg className="w-16 h-16 text-apple-blue opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )
            },
            { 
              title: "Emotional Logic", 
              desc: "Human psychology requires both logic and emotion. Our architecture balances both to bypass skepticism.", 
              icon: (
                <svg className="w-16 h-16 text-apple-blue opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )
            },
            { 
              title: "Multi-Surface", 
              desc: "One core narrative, structured for LinkedIn, pitch decks, landing pages, and elite personal websites.", 
              icon: (
                <svg className="w-16 h-16 text-apple-blue opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              )
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className={`p-14 bg-white dark:bg-apple-gray-900 rounded-[5rem] border border-apple-gray-200 dark:border-apple-gray-800 card-hover group overflow-hidden relative border-opacity-50`}
            >
               <div className="noise-overlay opacity-[0.015]"></div>
               <div className="mb-12 block transition-all duration-1000 group-hover:scale-110 group-hover:rotate-3">
                 {feature.icon}
               </div>
               <h4 className="text-3xl font-bold text-apple-gray-900 dark:text-white mb-8 tracking-tight uppercase">{feature.title}</h4>
               <p className="text-apple-gray-500 text-xl leading-relaxed font-light opacity-90">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto reveal">
        <div className="text-center space-y-8 mb-32">
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-apple-gray-900 dark:text-white serif italic">Transparent Investment</h2>
          <p className="text-apple-gray-500 max-w-4xl mx-auto text-2xl leading-relaxed font-light tracking-tight opacity-90">
            Premium narrative architecture, priced for individuals. No hidden fees, just pure strategic clarity for your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {PRICING_PLANS.map((plan, i) => (
            <div 
              key={i} 
              className={`reveal stagger-${i+1} relative p-14 bg-white dark:bg-apple-gray-900 rounded-[5rem] border ${plan.popular ? 'border-apple-blue ring-2 ring-apple-blue/10 shadow-[0_40px_100px_rgba(0,122,255,0.15)] scale-105 z-10' : 'border-apple-gray-200 dark:border-apple-gray-800'} card-hover flex flex-col h-full`}
            >
              {plan.popular && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-apple-blue text-white text-[11px] font-bold uppercase tracking-[0.4em] rounded-full z-20 shadow-xl shadow-apple-blue/30">
                  Most Calibrated
                </span>
              )}
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-apple-gray-900 dark:text-white mb-4 tracking-tight uppercase">{plan.name}</h3>
                <div className="flex items-baseline space-x-3 mb-8">
                  <span className="text-6xl font-bold text-apple-gray-900 dark:text-white tracking-tighter">{plan.price}</span>
                  <span className="text-apple-gray-400 text-[12px] font-black uppercase tracking-[0.2em]">{plan.period}</span>
                </div>
                <p className="text-apple-gray-500 text-lg leading-relaxed min-h-[56px] font-light opacity-90">{plan.desc}</p>
                {plan.note && (
                  <div className="mt-8 inline-flex items-center px-4 py-2 bg-apple-blue/10 rounded-xl text-[11px] font-black text-apple-blue uppercase tracking-[0.2em] border border-apple-blue/20 backdrop-blur-sm">
                    {plan.note}
                  </div>
                )}
              </div>

              <div className="space-y-6 mb-16 flex-grow">
                {Object.entries(plan.features).map(([feature, available], idx) => (
                  <div key={idx} className="flex items-center space-x-5 text-[17px] transition-opacity duration-300">
                    {available ? (
                      <div className="w-7 h-7 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-apple-gray-100 dark:bg-apple-gray-800 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-apple-gray-300 dark:text-apple-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                    <span className={available ? 'text-apple-gray-700 dark:text-apple-gray-300 font-medium' : 'text-apple-gray-400 line-through decoration-apple-gray-200/50 opacity-40 font-light'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onStart}
                className={`w-full py-6 rounded-full font-bold text-lg transition-all hover:scale-[1.03] active:scale-95 shadow-lg ${plan.popular ? 'bg-apple-blue text-white shadow-apple-blue/40' : 'bg-apple-gray-50 dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white border border-apple-gray-200 dark:border-apple-gray-700 hover:bg-apple-gray-100'}`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 sm:py-64 text-center bg-apple-gray-900 dark:bg-apple-gray-100 rounded-[6rem] sm:rounded-[10rem] text-white dark:text-black overflow-hidden relative mx-8 reveal">
        <div className="noise-overlay opacity-[0.1]"></div>
        <div className="max-w-5xl mx-auto space-y-16 relative z-10 px-8">
          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter serif italic leading-[0.95] sm:leading-[0.9]">
            Your story is your <br />most valuable asset.
          </h2>
          <p className="text-apple-gray-400 dark:text-apple-gray-600 text-2xl sm:text-3xl font-light max-w-3xl mx-auto tracking-tight opacity-90 leading-relaxed">
            Elite narratives are not written, they are engineered. Construct your legacy today with a calibrated truth.
          </p>
          <button
            onClick={onStart}
            className="px-20 py-8 bg-apple-blue text-white rounded-full font-bold text-2xl transition-all hover:scale-[1.06] active:scale-95 shadow-[0_30px_80px_rgba(0,122,255,0.4)]"
          >
            Construct Your Narrative
          </button>
        </div>
      </section>
    </div>
  );
}
