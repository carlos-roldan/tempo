import React from 'react';
import { Button } from './Button';

type FooterCTAProps = {
  onExploreFeelings?: () => void;
};

export const FooterCTA = ({ onExploreFeelings }: FooterCTAProps) => {
  return (
    <footer 
      id="footer-cta-section"
      className="w-full flex flex-col items-center justify-center pt-24 pb-8 md:pt-36 md:pb-12"
      style={{ 
        backgroundColor: 'var(--bg\\/inverse, #1C1410)' // Warm dark background fallback
      }}
    >
      <style>{`
        .tempo-footer-btn {
          background-color: transparent !important;
          color: white !important;
          border: 1px solid white !important;
          transition: all 0.3s ease !important;
        }
        .tempo-footer-btn:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>

      {/* Main CTA Area */}
      <div 
        id="footer-cta-container"
        className="w-full max-w-4xl mx-auto flex flex-col items-center text-center px-6 mb-24 md:mb-36"
      >
        <span 
          id="footer-cta-eyebrow"
          className="uppercase text-xs md:text-sm tracking-[0.2em] mb-6 md:mb-8"
          style={{ 
            color: 'rgba(255, 255, 255, 0.6)', // Muted light color
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          What rhythm are you seeking?
        </span>

        <h2 
          id="footer-cta-headline"
          className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-10 md:mb-12 tracking-tight drop-shadow-sm"
          style={{ 
            color: 'white',
            fontFamily: "'Cormorant Garamond', serif"
          }}
        >
          Return to your tempo.
        </h2>

        <Button 
          id="footer-cta-button"
          variant="ghost" 
          size="lg"
          onClick={onExploreFeelings}
          className="tempo-footer-btn !px-12 !py-3.5 text-lg md:text-xl !rounded-full shadow-sm hover:shadow-md transition-all"
          style={{ 
            minWidth: '220px',
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          Explore feelings
        </Button>
      </div>

      {/* Divider */}
      <div 
        id="footer-divider-container"
        className="w-full px-6 md:px-12 mb-8 md:mb-10"
      >
        <hr 
          id="footer-divider"
          className="w-full border-t" 
          style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }} 
        />
      </div>

      {/* Footer Bar */}
      <div 
        id="footer-bottom-bar"
        className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0"
      >
        <div 
          id="footer-wordmark"
          className="text-2xl tracking-wide text-white lowercase select-none"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          tempo
        </div>
        
        <div 
          id="footer-copyright"
          className="text-xs md:text-sm font-light tracking-wide"
          style={{ 
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          © 2026 tempo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
