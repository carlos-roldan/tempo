import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { IOSPickerHero } from './IOSPickerHero';
import { LeadCaptureModal } from './Tempo/LeadCaptureModal';

const CATEGORY_TAGS = {
  Restorative: ['Recharged', 'Reconnected', 'At Peace', 'Renewed'],
  Adventurous: ['Energized', 'Challenged', 'Alive', 'Bold'],
  Spiritual: ['Grateful', 'Grounded', 'Transformed', 'Devoted'],
  Romantic: ['Enchanted', 'Intimate', 'Swept Away', 'Adored'],
  Cultural: ['Curious', 'Immersed', 'Enlightened', 'Inspired']
};

type Category = keyof typeof CATEGORY_TAGS;

const CATEGORY_VIDEOS: Record<Category, string> = {
  Restorative: '/assets/hero/restorative.mp4',
  Adventurous: '/assets/hero/adventurous.mp4',
  Spiritual: '/assets/hero/spiritual.mp4',
  Romantic: '/assets/hero/romantic.mp4',
  Cultural: '/assets/hero/cultural.mp4',
};

const CATEGORY_POSTERS: Record<Category, string> = {
  Restorative: '/assets/posters/restorative.jpg',
  Adventurous: '/assets/posters/adventurous.jpg',
  Spiritual: '/assets/posters/spiritual.jpg',
  Romantic: '/assets/posters/romantic.jpg',
  Cultural: '/assets/posters/cultural.jpg',
};

type HeroProps = {
  onBeginJourney?: () => void;
};

export const Hero = ({ onBeginJourney }: HeroProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('Restorative');
  const [videoSources, setVideoSources] = useState<[string, string]>([
    CATEGORY_VIDEOS.Restorative,
    CATEGORY_VIDEOS.Restorative,
  ]);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoopTransitioning, setIsLoopTransitioning] = useState(false);
  const [isPosterVisible, setIsPosterVisible] = useState(true);
  const [activeFeelingIndex, setActiveFeelingIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);
  const loopTimersRef = useRef<number[]>([]);
  const loopFadeStartedRef = useRef<[boolean, boolean]>([false, false]);

  const currentTags = CATEGORY_TAGS[activeCategory];

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    const preloaders = (Object.values(CATEGORY_VIDEOS) as string[]).map((src) => {
      const preloader = document.createElement('video');
      preloader.src = src;
      preloader.preload = 'auto';
      preloader.muted = true;
      preloader.playsInline = true;
      preloader.load();
      return preloader;
    });

    return () => {
      preloaders.forEach((preloader) => {
        preloader.removeAttribute('src');
        preloader.load();
      });
    };
  }, []);

  useEffect(() => {
    const activeVideo = videoRefs.current[activeLayer];
    if (!activeVideo) return;
    if (isPaused) {
      videoRefs.current[0]?.pause();
      videoRefs.current[1]?.pause();
      return;
    }
    void activeVideo.play();
  }, [activeLayer, isPaused, videoSources]);

  useEffect(() => {
    if (!isCrossfading) return undefined;
    const timer = window.setTimeout(() => {
      const inactiveLayer = activeLayer === 0 ? 1 : 0;
      videoRefs.current[inactiveLayer]?.pause();
      setIsCrossfading(false);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [activeLayer, isCrossfading]);

  useEffect(() => {
    return () => {
      loopTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const handleCategorySelect = (category: Category, nextFeelingIndex?: number | null) => {
    if (category === activeCategory) return;

    const nextVideo = CATEGORY_VIDEOS[category];
    if (nextVideo === videoSources[activeLayer]) return;
    const inactiveLayer = activeLayer === 0 ? 1 : 0;

    if (videoSources[inactiveLayer] !== nextVideo) {
      setVideoSources((prev) => {
        const next: [string, string] = [...prev] as [string, string];
        next[inactiveLayer] = nextVideo;
        return next;
      });
    }

    setActiveCategory(category);
    setActiveFeelingIndex(nextFeelingIndex === undefined ? null : nextFeelingIndex);
    setIsCrossfading(true);
    setActiveLayer(inactiveLayer);
  };

  const handleVideoTimeUpdate = (layer: 0 | 1) => {
    if (layer !== activeLayer || isPaused) return;
    const video = videoRefs.current[layer];
    if (!video || !video.duration || loopFadeStartedRef.current[layer]) return;

    if (video.currentTime >= Math.max(video.duration - 2, 0)) {
      loopFadeStartedRef.current[layer] = true;
      setIsLoopTransitioning(true);
    }
  };

  const handleVideoEnded = (layer: 0 | 1) => {
    if (layer !== activeLayer || isPaused) return;
    const video = videoRefs.current[layer];
    if (!video) return;

    video.currentTime = 0;
    loopFadeStartedRef.current[layer] = false;
    setIsLoopTransitioning(false);
    if (!isPaused) {
      void video.play();
    }
  };

  const handleTogglePlayback = () => {
    setIsPaused((prev) => !prev);
  };

  const getPosterForVideo = (videoSrc: string) => {
    const matchedCategory = (Object.keys(CATEGORY_VIDEOS) as Category[]).find(
      (category) => CATEGORY_VIDEOS[category] === videoSrc,
    );
    return matchedCategory ? CATEGORY_POSTERS[matchedCategory] : CATEGORY_POSTERS.Restorative;
  };

  const handleVideoCanPlayThrough = (layer: 0 | 1) => {
    if (layer === activeLayer) {
      setIsPosterVisible(false);
    }
  };

  return (
    <section 
      id="hero-section"
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start pt-[18vh] md:pt-[20vh]"
      style={{ 
        backgroundColor: 'var(--bg\\/inverse)',
        fontFamily: 'var(--font\\/sans)'
      }}
    >
      <style>{`
        .tempo-hero-btn {
          background-color: transparent !important;
          color: var(--text\\/inverse) !important;
          border: 1px solid var(--border\\/inverse) !important;
          transition: all 0.3s ease !important;
        }
        .tempo-hero-btn:hover {
          background-color: var(--surface\\/glass-hover) !important;
        }
      
        .tempo-feeling-tag {
          transition: all 0.3s ease;
        }
        .tempo-feeling-tag:hover:not(.tempo-feeling-tag--selected) {
          border-color: var(--border\\/inverse) !important;
          background-color: var(--surface\\/glass-tag-hover) !important;
        }
        .tempo-feeling-tag--selected:hover {
          background-color: var(--accent\\/hover) !important;
          border-color: var(--accent\\/hover) !important;
        }
      
        .tempo-category-tag {
          transition: all 0.3s ease;
        }
        .tempo-category-tag:hover, .tempo-category-tag.active {
          border-color: var(--border\\/inverse) !important;
          background-color: var(--surface\\/glass-tag-hover) !important;
        }

        .tempo-more-tempos-trigger {
          color: var(--text\\/inverse) !important;
          border-bottom: 1px solid var(--border\\/inverse-subtle);
          transition: opacity 0.2s ease, border-color 0.2s ease;
        }
        .tempo-more-tempos-trigger:hover {
          border-bottom-color: var(--border\\/inverse);
        }

        .tempo-drawer-row {
          transition: all 0.2s ease;
        }
        .tempo-drawer-row:hover:not(.tempo-drawer-row--active) {
          background-color: var(--surface\\/glass-hover);
        }

        .tempo-collapse-grid {
          display: grid;
          width: 100%;
          transition:
            grid-template-rows 220ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 220ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: top center;
          will-change: grid-template-rows, opacity, transform;
        }
        .tempo-collapse-grid--open {
          grid-template-rows: 1fr;
          opacity: 1;
          transform: translateY(0) scaleY(1);
          pointer-events: auto;
        }
        .tempo-collapse-grid--closed {
          grid-template-rows: 0fr;
          opacity: 0;
          transform: translateY(-6px) scaleY(0.96);
          pointer-events: none;
        }
        .tempo-collapse-inner {
          overflow: hidden;
          min-height: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tempo-hero-pause-btn {
          color: var(--text\\/inverse-muted);
          transition: color 0.2s ease;
        }
        .tempo-hero-pause-btn:hover {
          color: var(--text\\/inverse);
        }

        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes tempo-eq-pulse {
          0%, 100% { transform: scaleX(0.38); }
          50% { transform: scaleX(1); }
        }
        .tempo-eq-bar {
          display: block;
          height: 1px;
          background-color: var(--text\\/inverse);
          transform-origin: right center;
          animation: tempo-eq-pulse 2.8s ease-in-out infinite;
        }
        .tempo-eq-bar--1 {
          width: 100%;
          animation-duration: 2.6s;
          animation-delay: 0s;
        }
        .tempo-eq-bar--2 {
          width: 55%;
          animation-duration: 3.2s;
          animation-delay: 0.45s;
        }
        .tempo-eq-bar--3 {
          width: 100%;
          animation-duration: 2.9s;
          animation-delay: 0.85s;
        }
      `}</style>

      {/* Nav Layer */}
      <nav className="absolute top-0 left-0 w-full px-6 md:px-10 py-8 flex justify-between items-center z-50">
        <div 
          className="text-2xl tracking-wide lowercase select-none"
          style={{ 
            color: 'var(--text\\/inverse)',
            fontFamily: 'var(--font\\/serif)'
          }}
        >
          tempo
        </div>
        <button
          type="button"
          aria-label="Menu"
          className="hover:opacity-80 transition-opacity cursor-pointer flex flex-col justify-between items-end w-7 h-[14px]"
          style={{ color: 'var(--text\\/inverse)' }}
        >
          <span className="tempo-eq-bar tempo-eq-bar--1" />
          <span className="tempo-eq-bar tempo-eq-bar--2" />
          <span className="tempo-eq-bar tempo-eq-bar--3" />
        </button>
      </nav>

      {/* Background Video Layer */}
      <div 
        id="background-image-container"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img
          id="background-poster-image"
          src={CATEGORY_POSTERS.Restorative}
          alt="Restorative poster background"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1500ms] ${
            isPosterVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <video
          id="background-video-layer-0"
          ref={(el) => {
            videoRefs.current[0] = el;
          }}
          autoPlay
          muted
          preload="auto"
          playsInline
          poster={getPosterForVideo(videoSources[0])}
          onCanPlayThrough={() => handleVideoCanPlayThrough(0)}
          onTimeUpdate={() => handleVideoTimeUpdate(0)}
          onEnded={() => handleVideoEnded(0)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[800ms] ${
            activeLayer === 0 ? 'opacity-100' : 'opacity-0'
          }`}
          src={videoSources[0]}
        />
        <video
          id="background-video-layer-1"
          ref={(el) => {
            videoRefs.current[1] = el;
          }}
          autoPlay
          muted
          preload="auto"
          playsInline
          poster={getPosterForVideo(videoSources[1])}
          onCanPlayThrough={() => handleVideoCanPlayThrough(1)}
          onTimeUpdate={() => handleVideoTimeUpdate(1)}
          onEnded={() => handleVideoEnded(1)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[800ms] ${
            activeLayer === 1 ? 'opacity-100' : 'opacity-0'
          }`}
          src={videoSources[1]}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--bg\\/black)',
            opacity: isLoopTransitioning ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
            pointerEvents: 'none',
          }}
        />
        {/* Dark warm overlay to ensure WCAG AA readability */}
        <div 
          id="background-overlay"
          className="absolute inset-0" 
          style={{ 
            backgroundColor: 'var(--scrim\\/hero)'
          }} 
        />
      </div>

      <button
        type="button"
        onClick={handleTogglePlayback}
        aria-label={isPaused ? 'Play hero video' : 'Pause hero video'}
        className="tempo-hero-pause-btn absolute bottom-8 right-4 z-30 w-11 h-11 flex items-center justify-center cursor-pointer md:bottom-8"
      >
        {isPaused ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 6 L18 12 L8 18 Z" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="7" y="5.5" width="3" height="13" rx="0.5" />
            <rect x="14" y="5.5" width="3" height="13" rx="0.5" />
          </svg>
        )}
      </button>

      {/* Content Container Layer */}
      <div 
        id="content-container"
        className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-20 flex flex-col items-center text-center"
      >
        <span 
          className="italic font-light text-sm md:text-base mb-1 md:mb-2 drop-shadow-sm"
          style={{ 
            color: 'var(--text\\/inverse-warm)',
            fontFamily: 'var(--font\\/sans)',
            letterSpacing: 'var(--tracking\\/eyebrow-sm)'
          }}
        >
          Return to your tempo*
        </span>

        <h1 
          id="headline"
          className="text-4xl md:text-5xl lg:text-[4.25rem] font-medium leading-tight mt-0 mb-8 md:mb-10 tracking-tight drop-shadow-sm"
          style={{ 
            color: 'var(--text\\/inverse)',
            fontFamily: 'var(--font\\/serif)',
            lineHeight: 'var(--leading\\/display)'
          }}
        >
          What rhythm are you seeking?
        </h1>

        {/* Interactive Area */}
        <div className="w-full max-w-3xl flex flex-col items-center">
          
          {/* Tag Container - Using relative/absolute to prevent layout shift */}
          <div className="w-full flex flex-col items-center justify-start mb-2 md:mb-4">
            {isMobile && (
              <div className="relative z-20 mb-4 w-full">
                <IOSPickerHero
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategorySelect}
                  activeFeelingIndex={activeFeelingIndex}
                  onFeelingIndexChange={setActiveFeelingIndex}
                />
              </div>
            )}

            {!isMobile && (
              <div className="relative z-20 flex w-full flex-col items-center">
                {/* Collapsed State: Primary 4 Feeling Pills + More tempos */}
                <div
                  aria-hidden={isExpanded}
                  className={`tempo-collapse-grid ${
                    !isExpanded ? 'tempo-collapse-grid--open' : 'tempo-collapse-grid--closed'
                  }`}
                >
                  <div className="tempo-collapse-inner">
                    <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 w-full z-10 mb-4 md:mb-5">
                      {currentTags.map((tag, idx) => {
                        const isSelected = activeFeelingIndex === idx;
                        return (
                          <button
                            key={tag}
                            type="button"
                            tabIndex={isExpanded ? -1 : 0}
                            onClick={() => setActiveFeelingIndex(idx)}
                            className={`tempo-feeling-tag px-6 py-2.5 rounded-full text-sm md:text-base tracking-wide border backdrop-blur-md cursor-pointer ${
                              isSelected ? 'tempo-feeling-tag--selected font-medium' : 'bg-transparent'
                            }`}
                            style={{
                              color: isSelected ? 'var(--text\\/on-accent)' : 'var(--text\\/inverse)',
                              borderColor: isSelected
                                ? 'var(--accent\\/default)'
                                : 'var(--border\\/inverse-interactive)',
                              backgroundColor: isSelected ? 'var(--accent\\/default)' : 'transparent',
                              fontFamily: 'var(--font\\/sans)',
                            }}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>

                    <div className="w-full flex justify-center items-start min-h-[36px] md:min-h-[40px]">
                      <button
                        type="button"
                        tabIndex={isExpanded ? -1 : 0}
                        onClick={() => {
                          if (activeFeelingIndex === null) {
                            setActiveFeelingIndex(0);
                          }
                          setIsExpanded(true);
                        }}
                        className="tempo-more-tempos-trigger text-sm md:text-base font-light tracking-wide cursor-pointer hover:opacity-80 pb-0.5 z-20"
                        style={{
                          color: 'var(--text\\/inverse)',
                          fontFamily: 'var(--font\\/sans)',
                        }}
                      >
                        More tempos
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded State: Frosted Glass Dual-Column Rhythm Picker */}
                <div
                  aria-hidden={!isExpanded}
                  className={`tempo-collapse-grid ${
                    isExpanded ? 'tempo-collapse-grid--open' : 'tempo-collapse-grid--closed'
                  }`}
                >
                  <div className="tempo-collapse-inner">
                    <div
                      className="w-full max-w-2xl overflow-hidden rounded-2xl border p-5 text-left backdrop-blur-xl md:p-6"
                      style={{
                        backgroundColor: 'var(--scrim\\/featured)',
                        borderColor: 'var(--border\\/inverse-interactive)',
                        fontFamily: 'var(--font\\/sans)',
                      }}
                    >
                      <div
                        className="mb-4 flex items-center justify-between border-b pb-3"
                        style={{ borderColor: 'var(--border\\/inverse-divider)' }}
                      >
                        <div className="flex items-center gap-2 text-xs tracking-wider uppercase">
                          <span style={{ color: 'var(--accent\\/inverse-eyebrow)' }}>
                            Selected Rhythm:
                          </span>
                          <span className="font-medium" style={{ color: 'var(--text\\/inverse)' }}>
                            {activeCategory} · {currentTags[activeFeelingIndex ?? 0]}
                          </span>
                        </div>
                        <button
                          type="button"
                          tabIndex={isExpanded ? 0 : -1}
                          onClick={() => setIsExpanded(false)}
                          className="cursor-pointer text-xs tracking-wide transition-colors hover:opacity-100"
                          style={{ color: 'var(--text\\/inverse-secondary)' }}
                        >
                          Collapse ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                        {/* Left Column: 5 Tempo Categories */}
                        <div
                          className="flex flex-col space-y-1.5 md:col-span-5 md:border-r md:pr-5"
                          style={{ borderColor: 'var(--border\\/inverse-divider)' }}
                        >
                          <span
                            className="mb-1 px-3 text-[11px] tracking-[0.18em] uppercase"
                            style={{ color: 'var(--text\\/inverse-muted)' }}
                          >
                            1. Choose Tempo
                          </span>
                          {(Object.keys(CATEGORY_TAGS) as Category[]).map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                              <button
                                key={cat}
                                type="button"
                                tabIndex={isExpanded ? 0 : -1}
                                onClick={() => {
                                  if (cat !== activeCategory) {
                                    handleCategorySelect(cat, 0);
                                  } else if (activeFeelingIndex === null) {
                                    setActiveFeelingIndex(0);
                                  }
                                }}
                                className={`tempo-drawer-row flex w-full cursor-pointer items-center justify-between rounded-full px-4 py-2 text-left text-sm ${
                                  isActive ? 'tempo-drawer-row--active font-medium' : 'font-normal'
                                }`}
                                style={{
                                  color: 'var(--text\\/inverse)',
                                  backgroundColor: isActive
                                    ? 'var(--surface\\/glass-picker)'
                                    : 'transparent',
                                  border: isActive
                                    ? '1px solid var(--border\\/inverse-interactive)'
                                    : '1px solid transparent',
                                }}
                              >
                                <span>{cat}</span>
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{
                                    backgroundColor: isActive
                                      ? 'var(--accent\\/default)'
                                      : 'transparent',
                                  }}
                                />
                              </button>
                            );
                          })}
                        </div>

                        {/* Right Column: 4 Feelings for Active Tempo */}
                        <div className="flex flex-col md:col-span-7">
                          <span
                            className="mb-2.5 block text-[11px] tracking-[0.18em] uppercase"
                            style={{ color: 'var(--text\\/inverse-muted)' }}
                          >
                            2. Select Feeling
                          </span>
                          <div className="grid grid-cols-2 gap-2.5">
                            {currentTags.map((tag, idx) => {
                              const selectedIdx = activeFeelingIndex ?? 0;
                              const isSelected = selectedIdx === idx;
                              return (
                                <button
                                  key={tag}
                                  type="button"
                                  tabIndex={isExpanded ? 0 : -1}
                                  onClick={() => setActiveFeelingIndex(idx)}
                                  className={`tempo-feeling-tag cursor-pointer rounded-full border px-4 py-2.5 text-center text-sm tracking-wide ${
                                    isSelected ? 'tempo-feeling-tag--selected font-medium' : ''
                                  }`}
                                  style={{
                                    color: isSelected
                                      ? 'var(--text\\/on-accent)'
                                      : 'var(--text\\/inverse)',
                                    borderColor: isSelected
                                      ? 'var(--accent\\/default)'
                                      : 'var(--border\\/inverse-interactive)',
                                    backgroundColor: isSelected
                                      ? 'var(--accent\\/default)'
                                      : 'var(--surface\\/glass-subtle)',
                                  }}
                                >
                                  {tag}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTA Button Layer */}
          <div id="cta-button-wrapper" className="z-10 relative mt-6 md:mt-5">
            <Button 
              id="cta-button"
              variant="ghost" 
              size="lg"
              onClick={() => setIsLeadModalOpen(true)}
              className="tempo-hero-btn !px-12 !py-3.5 text-lg md:text-xl !rounded-full shadow-sm hover:shadow-md transition-all"
              style={{ 
                minWidth: '220px',
                fontFamily: 'var(--font\\/sans)'
              }}
            >
              Begin journey
            </Button>
          </div>
          <p
            className="mt-16 max-w-[480px] text-xs md:text-[13px] leading-relaxed text-center"
            style={{
              color: 'var(--text\\/inverse-secondary)',
              fontFamily: 'var(--font\\/sans)',
              fontWeight: 400,
            }}
          >
            *tempo is a generative ai travel assistant
          </p>
        </div>
      </div>
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        setIsOpen={setIsLeadModalOpen}
      />
    </section>
  );
};
