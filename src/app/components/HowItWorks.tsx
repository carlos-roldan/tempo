import React from 'react';

export const HowItWorks = () => {
  return (
    <section 
      id="how-it-works-section"
      className="w-full flex flex-col items-center justify-center py-24 md:py-36 px-6"
      style={{ 
        backgroundColor: 'var(--bg\\/secondary)',
        color: 'var(--text\\/primary)'
      }}
    >
      <div 
        id="how-it-works-container"
        className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20 md:gap-12 lg:gap-16"
      >
        {/* Step 1 */}
        <div 
          id="step-1-container"
          className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <span 
            id="step-1-number"
            className="text-4xl md:text-5xl font-light mb-6 md:mb-8"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--nuetral\\/400)'
            }}
          >
            1
          </span>
          <h3 
            id="step-1-headline"
            className="text-xl md:text-2xl font-medium mb-4 tracking-wide"
            style={{ 
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            Share your rhythm
          </h3>
          <p 
            id="step-1-body"
            className="text-base md:text-lg font-normal leading-relaxed max-w-[280px]"
            style={{ 
              fontFamily: "'DM Sans', sans-serif",
              color: 'var(--text\\/secondary)'
            }}
          >
            Not a destination. A feeling you&apos;re ready to move toward.
          </p>
        </div>

        {/* Step 2 */}
        <div 
          id="step-2-container"
          className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <span 
            id="step-2-number"
            className="text-4xl md:text-5xl font-light mb-6 md:mb-8"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--nuetral\\/400)'
            }}
          >
            2
          </span>
          <h3 
            id="step-2-headline"
            className="text-xl md:text-2xl font-medium mb-4 tracking-wide"
            style={{ 
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            tempo listens
          </h3>
          <p 
            id="step-2-body"
            className="text-base md:text-lg font-normal leading-relaxed max-w-[280px]"
            style={{ 
              fontFamily: "'DM Sans', sans-serif",
              color: 'var(--text\\/secondary)'
            }}
          >
            Every response shapes a journey only you would take.
          </p>
        </div>

        {/* Step 3 */}
        <div 
          id="step-3-container"
          className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <span 
            id="step-3-number"
            className="text-4xl md:text-5xl font-light mb-6 md:mb-8"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--nuetral\\/400)'
            }}
          >
            3
          </span>
          <h3 
            id="step-3-headline"
            className="text-xl md:text-2xl font-medium mb-4 tracking-wide"
            style={{ 
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            Begin your journey
          </h3>
          <p 
            id="step-3-body"
            className="text-base md:text-lg font-normal leading-relaxed max-w-[280px]"
            style={{ 
              fontFamily: "'DM Sans', sans-serif",
              color: 'var(--text\\/secondary)'
            }}
          >
            A complete journey, ready when you are.
          </p>
        </div>
      </div>
    </section>
  );
};
