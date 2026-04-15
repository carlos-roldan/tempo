import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedJourney } from './components/FeaturedJourney';
import { FeelingCategories } from './components/FeelingCategories';
import { Testimonial } from './components/Testimonial';
import { FooterCTA } from './components/FooterCTA';

export default function App() {
  const [isBrandFilmOpen, setIsBrandFilmOpen] = useState(false);

  useEffect(() => {
    if (!isBrandFilmOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsBrandFilmOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBrandFilmOpen]);

  return (
    <>
      <main className="w-full min-h-screen">
        <Hero />
        <HowItWorks />
        <FeaturedJourney />
        <FeelingCategories />
        <Testimonial />
        <FooterCTA onExploreFeelings={() => setIsBrandFilmOpen(true)} />
      </main>

      {isBrandFilmOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center px-4"
          onClick={() => setIsBrandFilmOpen(false)}
        >
          <button
            type="button"
            aria-label="Close video modal"
            onClick={() => setIsBrandFilmOpen(false)}
            className="absolute top-6 right-6 text-white text-[40px] leading-none cursor-pointer"
          >
            ×
          </button>
          <div
            className="w-full max-w-[1920px]"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              autoPlay
              className="w-full h-auto"
              src="/assets/tempo-brand-film.mp4"
            />
          </div>
        </div>
      )}
    </>
  );
}
