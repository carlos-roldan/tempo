import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedJourney } from './components/FeaturedJourney';
import { FeelingCategories } from './components/FeelingCategories';
import { Testimonial } from './components/Testimonial';
import { FooterCTA } from './components/FooterCTA';

export default function App() {
  const [isBrandFilmOpen, setIsBrandFilmOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted, isBrandFilmOpen]);

  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;
    video.volume = volume;
    if (volume === 0 && !isMuted) {
      setIsMuted(true);
    } else if (volume > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [volume, isMuted, isBrandFilmOpen]);

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };

  const handleCloseBrandFilm = (event?: SyntheticEvent) => {
    event?.stopPropagation();
    setIsBrandFilmOpen(false);
  };

  useEffect(() => {
    if (!isBrandFilmOpen) return;
    const video = modalVideoRef.current;
    if (!video) return;
    video.setAttribute('webkit-playsinline', 'true');
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
          onClick={handleCloseBrandFilm}
        >
          <button
            type="button"
            aria-label="Close video modal"
            onClick={handleCloseBrandFilm}
            onTouchEnd={handleCloseBrandFilm}
            className="absolute top-6 right-6 z-[140] text-white text-[40px] leading-none cursor-pointer pointer-events-auto"
          >
            ×
          </button>
          <div
            className="w-full max-w-[1920px]"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              autoPlay
              className="w-full h-auto"
              muted={isMuted}
              playsInline
              src="/assets/tempo-brand-film.mp4"
            />
          </div>
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] hidden lg:flex items-center gap-3 px-4 py-2 rounded-full"
            style={{ backgroundColor: 'rgba(20, 20, 20, 0.55)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              onClick={handleMuteToggle}
              className="text-white cursor-pointer"
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h4l5-4v12l-5-4H4z" />
                  <path d="M17 9l4 6" />
                  <path d="M21 9l-4 6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h4l5-4v12l-5-4H4z" />
                  <path d="M17 9a4 4 0 010 6" />
                  <path d="M19.5 7a7 7 0 010 10" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              aria-label="Video volume"
              className="w-28 accent-white cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
}
