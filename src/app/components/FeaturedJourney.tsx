import React from 'react';
import { Button } from './Button';

export const FeaturedJourney = () => {
  return (
    <section 
      id="featured-journey-section"
      className="relative w-full h-auto min-h-[80vh] md:min-h-[70vh] flex flex-col justify-center"
    >
      <style>{`
        .tempo-featured-btn {
          background-color: transparent !important;
          color: white !important;
          border: 1px solid white !important;
          transition: all 0.3s ease !important;
        }
        .tempo-featured-btn:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
      
      {/* Background Image Layer */}
      <div 
        id="featured-bg-container"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img 
          id="featured-bg-image"
          src="https://images.unsplash.com/photo-1768091873026-aa52e2517d48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBjb2FzdGFsJTIwY2xpZmZzJTIwYW5jaWVudCUyMHN0b25lfGVufDF8fHx8MTc3NjE3OTEwNXww&ixlib=rb-4.1.0&q=80&w=2000"
          alt="Cinematic ancient stone and coastal cliffs"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark warm overlay to ensure WCAG AA readability */}
        <div 
          id="featured-bg-overlay"
          className="absolute inset-0" 
          style={{ 
            backgroundColor: 'rgba(28, 20, 16, 0.65)' // Deep charcoal/slate at 65% opacity for text legibility
          }} 
        />
      </div>

      {/* Content Container */}
      <div 
        id="featured-content-container"
        className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center md:items-start md:text-left"
      >
        <span 
          id="featured-eyebrow"
          className="uppercase text-xs md:text-sm tracking-[0.2em] mb-4 md:mb-6"
          style={{ 
            color: 'var(--nuetral\\/200)',
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          Featured Journey
        </span>

        <h2 
          id="featured-headline"
          className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6 md:mb-8 tracking-tight drop-shadow-sm"
          style={{ 
            color: 'white',
            fontFamily: "'Cormorant Garamond', serif"
          }}
        >
          The Iberian Pilgrimage
        </h2>

        <p 
          id="featured-body"
          className="text-base md:text-lg font-normal leading-relaxed max-w-2xl mb-6 md:mb-8"
          style={{ 
            color: 'var(--nuetral\\/100)',
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          Stone paths. Candlelit cathedrals. The Atlantic at the edge of the world.
        </p>

        <div 
          id="featured-tags-container"
          className="flex flex-row items-center justify-center md:justify-start flex-wrap gap-2 md:gap-3 mb-10 md:mb-12"
          style={{ 
            color: 'var(--nuetral\\/100)',
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          <span id="featured-tag-1" className="text-sm md:text-base tracking-wide lowercase">spiritual</span>
          <span id="featured-tag-dot-1" className="text-sm md:text-base opacity-60">·</span>
          <span id="featured-tag-2" className="text-sm md:text-base tracking-wide lowercase">romantic</span>
          <span id="featured-tag-dot-2" className="text-sm md:text-base opacity-60">·</span>
          <span id="featured-tag-3" className="text-sm md:text-base tracking-wide lowercase">restorative</span>
        </div>

        <Button 
          id="featured-cta-button"
          variant="ghost" 
          size="lg"
          className="tempo-featured-btn !px-10 !py-3.5 text-base md:text-lg !rounded-full shadow-sm hover:shadow-md transition-all"
          style={{ 
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          Begin this journey
        </Button>
      </div>
    </section>
  );
};
