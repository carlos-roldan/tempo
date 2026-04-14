import React from 'react';

export const Testimonial = () => {
  return (
    <section 
      id="testimonial-section"
      className="w-full flex flex-col items-center justify-center pt-16 pb-32 md:pt-20 md:pb-48 px-6 md:px-12"
      style={{ 
        backgroundColor: 'var(--bg\\/secondary)'
      }}
    >
      <div 
        id="testimonial-container"
        className="w-full max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        <span 
          id="testimonial-quote-mark"
          className="text-7xl md:text-8xl lg:text-9xl leading-none h-12 md:h-16 mb-8 md:mb-12 block"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            color: '#C6A87C' // Refined editorial gold
          }}
        >
          “
        </span>
        
        <blockquote 
          id="testimonial-quote-text"
          className="text-3xl md:text-4xl lg:text-5xl font-light italic leading-tight md:leading-snug mb-10 md:mb-12 text-balance"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            color: 'var(--text\\/primary)'
          }}
        >
          I didn't search for a destination. I searched for a feeling. tempo found both.
        </blockquote>
        
        <cite 
          id="testimonial-attribution"
          className="not-italic uppercase text-xs md:text-sm tracking-[0.2em]"
          style={{ 
            fontFamily: "'DM Sans', sans-serif",
            color: 'var(--text\\/secondary)'
          }}
        >
          — Ana R., Miami
        </cite>
      </div>
    </section>
  );
};
