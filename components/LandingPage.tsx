
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
    <div className="w-full space-y-32 sm:space-y-48">
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
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
        .architectural-grid {
          background-image: 
            linear-gradient(rgba(0,122,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,122,255,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }
        .dark .architectural-grid {
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden reveal reveal-active pt-20">
        <div className="absolute inset-0 architectural-grid pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-apple-blue/10 rounded-full blur-[160px] pointer-events-none opacity-40" />
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-apple-blue/10 dark:bg-white/10 text-apple-blue dark:text-white text-[10px] font-bold uppercase tracking-[0.5em] border border-apple-blue/20 backdrop-blur-md animate-pulse">
              <span>●</span>
              <span>Elite Narrative Intelligence</span>
            </div>
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-apple-gray-900 dark:text-white leading-[0.9] sm:leading-[0.85]">
              Architect Your <br />
              <span className="serif italic text-apple-blue">Influence.</span>
            </h1>
          </div>
          
          <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-apple-gray-500 leading-relaxed font-light tracking-tight px-6">
            Stop drafting bios. Start constructing narratives. We extract your unique truth and transform it into high-impact copy that secures your premium positioning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button
              onClick={onStart}
              className="group relative px-12 py-6 bg-apple-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-xl transition-all hover:scale-[1.03] active:scale-95 shadow-[0_20px_50px_rgba(0,122,255,0.2)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            >
              Begin Synthesis
              <div className="absolute -inset-1 bg-apple-blue/30 blur opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
            </button>
            <div className="flex flex-col items-center sm:items-start text-left">
              <span className="text-[11px] font-black text-apple-gray-900 dark:text-white uppercase tracking-widest">Free 7-Day Access</span>
              <span className="text-[10px] font-medium text-apple-gray-400 uppercase tracking-widest">No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Flip Section */}
      <section className="py-32 px-4 reveal">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-apple-gray-900 dark:text-white leading-tight">
                The Alchemy of <br />Elite Storytelling
              </h2>
              <div className="w-20 h-1.5 bg-apple-blue rounded-full" />
            </div>
            <p className="text-xl sm:text-2xl text-apple-gray-500 leading-relaxed font-light">
              Achievements are data points. Narratives are the logic that connects them. We build the story that explains <span className="text-apple-blue serif italic font-medium">why you matter</span> to the people who need to know.
            </p>
          </div>

          <div className="relative aspect-square sm:aspect-video lg:aspect-square bg-white dark:bg-apple-gray-900 p-10 sm:p-16 rounded-[3rem] border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm overflow-hidden flex flex-col justify-center transition-all duration-700 hover:shadow-2xl hover:shadow-apple-blue/10 group">
            <div className="noise-overlay opacity-[0.02]"></div>
            <div className="absolute top-10 left-12 flex items-center space-x-4">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all duration-700 ${activeStage === i ? 'bg-apple-blue scale-150 ring-[6px] ring-apple-blue/20' : 'bg-apple-gray-200'}`} />
              ))}
            </div>

            <div key={activeStage} className="mt-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 relative z-10 space-y-6">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-apple-blue bg-apple-blue/10 px-4 py-1.5 rounded-full border border-apple-blue/20">
                {stages[activeStage].pill}
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold text-apple-gray-900 dark:text-white tracking-tighter">
                {stages[activeStage].title}
              </h3>
              <p className="text-apple-gray-500 leading-relaxed italic text-lg sm:text-xl max-w-md">
                "{stages[activeStage].desc}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-4 reveal stagger-2">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              title: "Authority Builder", 
              desc: "Move from 'experienced' to 'essential'. We frame your history as a series of strategic decisions that define your future.", 
              icon: "🛡️"
            },
            { 
              title: "Emotional Logic", 
              desc: "Human psychology requires both logic and emotion. Our architecture balances both to bypass skepticism.", 
              icon: "🧠"
            },
            { 
              title: "Multi-Surface", 
              desc: "One core narrative, structured for LinkedIn, pitch decks, landing pages, and elite personal websites.", 
              icon: "✨"
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className={`p-12 bg-white dark:bg-apple-gray-900 rounded-[4rem] border border-apple-gray-200 dark:border-apple-gray-800 card-hover group overflow-hidden relative border-opacity-50`}
            >
               <div className="noise-overlay opacity-[0.01]"></div>
               <span className="text-5xl mb-8 block transition-transform group-hover:scale-125 duration-700">{feature.icon}</span>
               <h4 className="text-2xl font-bold text-apple-gray-900 dark:text-white mb-6 tracking-tight">{feature.title}</h4>
               <p className="text-apple-gray-500 text-lg leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-4 max-w-7xl mx-auto reveal">
        <div className="text-center space-y-6 mb-24">
          <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-apple-gray-900 dark:text-white serif italic">Transparent Investment</h2>
          <p className="text-apple-gray-500 max-w-3xl mx-auto text-xl leading-relaxed font-light tracking-tight">
            Premium narrative architecture, priced for individuals. No hidden fees, just pure strategic clarity for your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {PRICING_PLANS.map((plan, i) => (
            <div 
              key={i} 
              className={`reveal stagger-${i+1} relative p-12 bg-white dark:bg-apple-gray-900 rounded-[4rem] border ${plan.popular ? 'border-apple-blue ring-1 ring-apple-blue/20 shadow-2xl shadow-apple-blue/10' : 'border-apple-gray-200 dark:border-apple-gray-800'} card-hover flex flex-col h-full`}
            >
              {plan.popular && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-apple-blue text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full z-20 shadow-lg shadow-apple-blue/20">
                  Most Calibrated
                </span>
              )}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-apple-gray-900 dark:text-white mb-2 tracking-tight">{plan.name}</h3>
                <div className="flex items-baseline space-x-2 mb-6">
                  <span className="text-5xl font-bold text-apple-gray-900 dark:text-white tracking-tighter">{plan.price}</span>
                  <span className="text-apple-gray-400 text-[11px] font-black uppercase tracking-widest">{plan.period}</span>
                </div>
                <p className="text-apple-gray-500 text-base leading-relaxed min-h-[48px] font-light">{plan.desc}</p>
                {plan.note && (
                  <div className="mt-6 inline-flex items-center px-3 py-1.5 bg-apple-blue/10 rounded-lg text-[10px] font-black text-apple-blue uppercase tracking-[0.2em] border border-apple-blue/20">
                    {plan.note}
                  </div>
                )}
              </div>

              <div className="space-y-5 mb-12 flex-grow">
                {Object.entries(plan.features).map(([feature, available], idx) => (
                  <div key={idx} className="flex items-center space-x-4 text-[15px] transition-opacity duration-300">
                    {available ? (
                      <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-apple-gray-100 dark:bg-apple-gray-800 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-apple-gray-300 dark:text-apple-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                    <span className={available ? 'text-apple-gray-700 dark:text-apple-gray-300 font-medium' : 'text-apple-gray-400 line-through decoration-apple-gray-200/50 opacity-40'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onStart}
                className={`w-full py-5 rounded-full font-bold text-base transition-all hover:scale-[1.03] active:scale-95 ${plan.popular ? 'bg-apple-blue text-white shadow-[0_15px_30px_rgba(0,122,255,0.25)]' : 'bg-apple-gray-50 dark:bg-apple-gray-800 text-apple-gray-900 dark:text-white border border-apple-gray-200 dark:border-apple-gray-700 hover:bg-apple-gray-100'}`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 sm:py-48 text-center bg-apple-gray-900 dark:bg-apple-gray-100 rounded-[4rem] sm:rounded-[6rem] text-white dark:text-black overflow-hidden relative mx-6 reveal">
        <div className="noise-overlay opacity-[0.08]"></div>
        <div className="max-w-4xl mx-auto space-y-12 relative z-10 px-6">
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter serif italic leading-[1] sm:leading-[0.95]">
            Your story is your <br />most valuable asset.
          </h2>
          <p className="text-apple-gray-400 dark:text-apple-gray-600 text-xl sm:text-2xl font-light max-w-2xl mx-auto tracking-tight">
            Elite narratives are not written, they are engineered. Construct your legacy today with a calibrated truth.
          </p>
          <button
            onClick={onStart}
            className="px-16 py-7 bg-apple-blue text-white rounded-full font-bold text-xl transition-all hover:scale-[1.05] active:scale-95 shadow-[0_20px_60px_rgba(0,122,255,0.3)]"
          >
            Construct Your Narrative
          </button>
        </div>
      </section>
    </div>
  );
}
