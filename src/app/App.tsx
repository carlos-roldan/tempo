import React, { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { FeaturedJourney } from './components/FeaturedJourney';
import { FeelingCategories } from './components/FeelingCategories';
import { Testimonial } from './components/Testimonial';
import { FooterCTA } from './components/FooterCTA';
import { EmailCapture } from './components/EmailCapture';
import { FullScreenVideoModal } from './components/FullScreenVideoModal';

const BRAND_FILM_SRC = '/assets/tempo-brand-film.mp4';
const IBERIAN_JOURNEY_SRC = '/assets/iberian-journey.mp4';

export default function App() {
  const [modalVideoSrc, setModalVideoSrc] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const isModalOpen = modalVideoSrc !== null;

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setModalVideoSrc(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted, isModalOpen, modalVideoSrc]);

  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;
    video.volume = volume;
    if (volume === 0) {
      setIsMuted(true);
    }
  }, [volume, isModalOpen, modalVideoSrc]);

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };

  const handleCloseModal = (event?: SyntheticEvent) => {
    event?.stopPropagation();
    setModalVideoSrc(null);
  };

  return (
    <>
      <main className="w-full min-h-screen">
        <Hero onBeginJourney={() => setModalVideoSrc(BRAND_FILM_SRC)} />
        <HowItWorks />
        <FeaturedJourney onBeginThisJourney={() => setModalVideoSrc(IBERIAN_JOURNEY_SRC)} />
        <FeelingCategories />
        <Testimonial />
        <EmailCapture />
        <FooterCTA onExploreFeelings={() => setModalVideoSrc(BRAND_FILM_SRC)} />
      </main>

      {modalVideoSrc && (
        <FullScreenVideoModal
          src={modalVideoSrc}
          onClose={handleCloseModal}
          videoRef={modalVideoRef}
          isMuted={isMuted}
          volume={volume}
          onMuteToggle={handleMuteToggle}
          onVolumeChange={setVolume}
        />
      )}
    </>
  );
}
