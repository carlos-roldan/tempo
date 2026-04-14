import React, { useState } from 'react';
import { Button } from './Button';

const CATEGORY_TAGS = {
  Restorative: ['Recharged', 'Reconnected', 'At Peace', 'Renewed'],
  Adventurous: ['Energized', 'Challenged', 'Alive', 'Bold'],
  Spiritual: ['Grateful', 'Grounded', 'Transformed', 'Devoted'],
  Romantic: ['Enchanted', 'Intimate', 'Swept Away', 'Adored'],
  Cultural: ['Curious', 'Immersed', 'Enlightened', 'Inspired']
};

type Category = keyof typeof CATEGORY_TAGS;

export const Hero = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('Restorative');

  const currentTags = CATEGORY_TAGS[activeCategory];

  return (
    <section 
      id="hero-section"
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start pt-[20vh] md:pt-[25vh] font-['DM_Sans',sans-serif]"
      style={{ 
        backgroundColor: 'var(--bg\\/primary)',
        fontFamily: "'DM Sans', sans-serif"
      }}
    >
      <style>{`
        .tempo-hero-btn {
          background-color: transparent !important;
          color: white !important;
          border: 1px solid white !important;
          transition: all 0.3s ease !important;
        }
        .tempo-hero-btn:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
      
        .tempo-feeling-tag {
          transition: all 0.3s ease;
        }
        .tempo-feeling-tag:hover, .tempo-feeling-tag.active {
          border-color: white !important;
          background-color: rgba(255, 255, 255, 0.2) !important;
        }
      
        .tempo-category-tag {
          transition: all 0.3s ease;
        }
        .tempo-category-tag:hover, .tempo-category-tag.active {
          border-color: white !important;
          background-color: rgba(255, 255, 255, 0.2) !important;
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Nav Layer */}
      <nav className="absolute top-0 left-0 w-full px-6 md:px-10 py-8 flex justify-between items-center z-50">
        <div 
          className="text-2xl tracking-wide text-white lowercase select-none"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          tempo
        </div>
        <button className="text-white hover:opacity-80 transition-opacity cursor-pointer flex flex-col justify-between items-end w-7 h-[14px]">
          <span className="w-full h-px bg-white rounded-none"></span>
          <span className="w-[55%] h-px bg-white rounded-none"></span>
          <span className="w-full h-px bg-white rounded-none"></span>
        </button>
      </nav>

      {/* Background Image Layer */}
      <div 
        id="background-image-container"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img 
          id="background-image"
          src="https://images.unsplash.com/photo-1754221716114-422cef2e8571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwZ29sZGVuJTIwaG91ciUyMGFtYmVyJTIwY29hc3RhbCUyMHBvcnR1Z2FsfGVufDF8fHx8MTc3NjEyMTkwMXww&ixlib=rb-4.1.0&q=80&w=2000"
          alt="Deep golden hour coastal path"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark warm overlay to ensure WCAG AA readability */}
        <div 
          id="background-overlay"
          className="absolute inset-0" 
          style={{ 
            backgroundColor: 'rgba(28, 20, 16, 0.55)' // Deep charcoal/slate at 55% opacity
          }} 
        />
      </div>

      {/* Content Container Layer */}
      <div 
        id="content-container"
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-20 flex flex-col items-center text-center"
      >
        <span 
          className="italic font-light text-sm md:text-base mb-1 md:mb-2 drop-shadow-sm"
          style={{ 
            color: 'var(--nuetral\\/100)',
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '0.15em'
          }}
        >
          Return to your tempo
        </span>

        <h1 
          id="headline"
          className="text-4xl md:text-5xl lg:text-[4.25rem] font-medium leading-tight mt-0 mb-8 md:mb-10 tracking-tight drop-shadow-sm"
          style={{ 
            color: 'white',
            fontFamily: "'Cormorant Garamond', serif",
            lineHeight: '1.1'
          }}
        >
          What rhythm are you seeking?
        </h1>

        {/* Interactive Area */}
        <div className="w-full max-w-3xl flex flex-col items-center">
          
          {/* Tag Container - Using relative/absolute to prevent layout shift */}
          <div className="w-full flex flex-col items-center justify-start mb-2 md:mb-4">
            
            {/* Primary Row: Feelings */}
            <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 w-full z-10 mb-4 md:mb-5">
              {currentTags.map((tag) => (
                <button
                  key={tag}
                  className="tempo-feeling-tag px-6 py-2.5 rounded-full text-sm md:text-base tracking-wide border bg-white/10 hover:bg-white/20 backdrop-blur-md cursor-pointer"
                  style={{ 
                    color: 'white', 
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Secondary Row / Link Area - Reserved height area */}
            <div className="w-full flex justify-center items-start min-h-[36px] md:min-h-[48px]">
              {!isExpanded && (
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="text-sm md:text-base font-light tracking-wide cursor-pointer hover:opacity-80 transition-opacity border-b border-white/60 hover:border-white pb-0.5 fade-in z-20"
                  style={{ 
                    color: 'white',
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  More tempos
                </button>
              )}
              {isExpanded && (
                <div className="flex flex-wrap justify-center items-center gap-y-5 gap-x-4 md:gap-6 w-full fade-in z-20">
                  {(Object.keys(CATEGORY_TAGS) as Category[]).map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm md:text-base font-light tracking-wide cursor-pointer transition-all pb-0.5 border-b ${
                        activeCategory === cat 
                          ? 'border-white/100 text-white' 
                          : 'border-transparent text-white/60 hover:text-white hover:border-white/60'
                      }`}
                      style={{ 
                        fontFamily: "'DM Sans', sans-serif"
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTA Button Layer */}
          <div id="cta-button-wrapper" className={`z-10 relative ${isExpanded ? 'mt-12' : 'mt-6'} md:mt-4`}>
            <Button 
              id="cta-button"
              variant="ghost" 
              size="lg"
              className="tempo-hero-btn !px-12 !py-3.5 text-lg md:text-xl !rounded-full shadow-sm hover:shadow-md transition-all"
              style={{ 
                minWidth: '220px',
                fontFamily: "'DM Sans', sans-serif"
              }}
            >
              Let's Begin
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
