import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button';

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

export const Hero = () => {
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
  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);
  const loopTimersRef = useRef<number[]>([]);
  const loopFadeStartedRef = useRef<[boolean, boolean]>([false, false]);

  const currentTags = CATEGORY_TAGS[activeCategory];

  useEffect(() => {
    const preloader = document.createElement('video');
    preloader.src = CATEGORY_VIDEOS.Restorative;
    preloader.preload = 'auto';
    preloader.muted = true;
    preloader.playsInline = true;
    preloader.load();
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

  const handleCategorySelect = (category: Category) => {
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

  return (
    <section 
      id="hero-section"
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-start pt-[20vh] md:pt-[25vh] font-['DM_Sans',sans-serif]"
      style={{ 
        backgroundColor: 'rgb(28, 20, 16)',
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

      {/* Background Video Layer */}
      <div 
        id="background-image-container"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <video
          id="background-video-layer-0"
          ref={(el) => {
            videoRefs.current[0] = el;
          }}
          autoPlay
          muted
          preload="auto"
          playsInline
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
            backgroundColor: 'black',
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
            backgroundColor: 'rgba(28, 20, 16, 0.55)' // Deep charcoal/slate at 55% opacity
          }} 
        />
      </div>

      <button
        type="button"
        onClick={handleTogglePlayback}
        aria-label={isPaused ? 'Play hero video' : 'Pause hero video'}
        className="absolute bottom-4 right-4 z-30 w-11 h-11 flex items-center justify-center cursor-pointer text-white/50 hover:text-white/90 transition-colors"
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
                      onClick={() => handleCategorySelect(cat)}
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
