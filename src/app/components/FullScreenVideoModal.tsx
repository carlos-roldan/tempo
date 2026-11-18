import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
  type SyntheticEvent,
} from 'react';

export type FullScreenVideoModalProps = {
  src: string;
  audioSrc?: string;
  variant?: 'standard' | 'iberian-choreography';
  onClose: (event?: SyntheticEvent) => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  isMuted: boolean;
  volume: number;
  onMuteToggle: () => void;
  onVolumeChange: (value: number) => void;
};

const IBERIAN_PLAYBACK_RATE = 1.0;
const IBERIAN_TOTAL_DURATION = 14.0;
const IBERIAN_AUDIO_OFFSET_TRIMMED = 6.0;
const IBERIAN_AUDIO_OFFSET_UNTRIMMED = 76.0;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function easeOutExpo(t: number): number {
  const x = clamp01(t);
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInOutCubic(t: number): number {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function FullScreenVideoModal({
  src,
  audioSrc,
  variant = 'standard',
  onClose,
  videoRef,
  isMuted,
  volume,
  onMuteToggle,
  onVolumeChange,
}: FullScreenVideoModalProps) {
  const isIberian = variant === 'iberian-choreography';
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 640
  );

  const isPausedRef = useRef(false);
  const elapsedRef = useRef(0);
  const lastFramePerfRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const hasClosedRef = useRef(false);

  const phrase2ContainerRef = useRef<HTMLHeadingElement | null>(null);
  const tempoSpanRef = useRef<HTMLSpanElement | null>(null);
  const prefixMeasureRef = useRef<HTMLSpanElement | null>(null);
  const [tempoCenterShiftPx, setTempoCenterShiftPx] = useState(0);

  const measureTempoCenterShift = useCallback(() => {
    const mobile = typeof window !== 'undefined' && window.innerWidth < 640;
    setIsMobileViewport(mobile);
    if (mobile) {
      setTempoCenterShiftPx(0);
      return;
    }

    const container = phrase2ContainerRef.current;
    const tempoEl = tempoSpanRef.current;
    if (container && tempoEl) {
      const containerRect = container.getBoundingClientRect();
      const tempoRect = tempoEl.getBoundingClientRect();
      if (containerRect.width > 0 && tempoRect.width > 0) {
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const styleTransform = tempoEl.style.transform;
        const match = styleTransform.match(/translate3d\(([-\d.]+)px/);
        const currentShift = match ? Number(match[1]) : 0;
        const naturalTempoCenterX =
          tempoRect.left - currentShift + tempoRect.width / 2;
        setTempoCenterShiftPx(containerCenterX - naturalTempoCenterX);
        return;
      }
    }
    if (prefixMeasureRef.current) {
      const prefixWidth = prefixMeasureRef.current.getBoundingClientRect().width;
      setTempoCenterShiftPx(-prefixWidth / 2);
    }
  }, []);

  useLayoutEffect(() => {
    if (!isIberian) return undefined;
    measureTempoCenterShift();
    window.addEventListener('resize', measureTempoCenterShift);
    window.addEventListener('orientationchange', measureTempoCenterShift);
    if (document.fonts?.ready) {
      void document.fonts.ready.then(measureTempoCenterShift);
    }
    return () => {
      window.removeEventListener('resize', measureTempoCenterShift);
      window.removeEventListener('orientationchange', measureTempoCenterShift);
    };
  }, [isIberian, measureTempoCenterShift]);

  // Dynamic volume & envelope computation for Iberian audio track (14.0s timeline)
  const computeIberianAudioVolume = useCallback(
    (t: number, baseVolume: number, muted: boolean): number => {
      if (muted || baseVolume <= 0) return 0;
      let envelope = 1;
      if (t < 0.8) {
        // Smooth 0.8s fade-in at start (starting from currentTime = 6.0 / 01:16 guitar scale)
        envelope = clamp01(t / 0.8);
      } else if (t >= 11.8) {
        // Smooth volume fade-out from 11.8s – 14.0s
        const progress = clamp01((t - 11.8) / (14.0 - 11.8));
        envelope = Math.pow(1 - progress, 2.2);
      }
      return clamp01(baseVolume * envelope);
    },
    []
  );

  // Sync audio mute/volume immediately when user changes slider or mute button
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isIberian) return;
    audio.muted = isMuted;
    audio.volume = computeIberianAudioVolume(elapsedRef.current, volume, isMuted);
  }, [computeIberianAudioVolume, isIberian, isMuted, volume]);

  // Initialize video & audio playback and master RAF clock
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    hasClosedRef.current = false;
    elapsedRef.current = 0;
    setElapsedTime(0);
    setIsPaused(false);
    isPausedRef.current = false;
    lastFramePerfRef.current = null;

    if (video) {
      video.setAttribute('webkit-playsinline', 'true');
      video.currentTime = 0;
      if (isIberian) {
        video.playbackRate = IBERIAN_PLAYBACK_RATE;
        video.muted = true;
      } else {
        video.playbackRate = 1;
        video.muted = isMuted;
        video.volume = volume;
      }
      void video.play().catch(() => {});
    }

    if (audio && isIberian) {
      const startAudio = () => {
        // Pre-trimmed track starts at original 01:10 -> seek to 6.0s (original 01:16 guitar scale)
        const startOffset =
          Number.isFinite(audio.duration) && audio.duration > 90
            ? IBERIAN_AUDIO_OFFSET_UNTRIMMED
            : IBERIAN_AUDIO_OFFSET_TRIMMED;
        audio.currentTime = startOffset;
        audio.muted = isMuted;
        audio.volume = computeIberianAudioVolume(0, volume, isMuted);
        if (!isPausedRef.current) {
          void audio.play().catch(() => {});
        }
      };

      if (audio.readyState >= 1) {
        startAudio();
      } else {
        audio.addEventListener('loadedmetadata', startAudio, { once: true });
      }
    }

    if (!isIberian) {
      return () => {
        if (video) {
          video.pause();
        }
      };
    }

    const tick = (now: number) => {
      if (hasClosedRef.current) return;

      if (!isPausedRef.current) {
        if (lastFramePerfRef.current !== null) {
          const deltaSec = (now - lastFramePerfRef.current) / 1000;
          elapsedRef.current = Math.min(
            IBERIAN_TOTAL_DURATION,
            elapsedRef.current + deltaSec
          );
        }
        lastFramePerfRef.current = now;

        const t = elapsedRef.current;
        setElapsedTime(t);

        const activeVideo = videoRef.current;
        if (activeVideo && activeVideo.playbackRate !== IBERIAN_PLAYBACK_RATE) {
          activeVideo.playbackRate = IBERIAN_PLAYBACK_RATE;
        }

        const activeAudio = audioRef.current;
        if (activeAudio) {
          activeAudio.volume = computeIberianAudioVolume(
            t,
            volumeRef.current,
            isMutedRef.current
          );
        }

        if (t >= IBERIAN_TOTAL_DURATION && !hasClosedRef.current) {
          hasClosedRef.current = true;
          activeVideo?.pause();
          activeAudio?.pause();
          onClose();
          return;
        }
      } else {
        lastFramePerfRef.current = null;
      }

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      hasClosedRef.current = true;
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, audioSrc, isIberian]);

  // Keep refs to volume/isMuted for the RAF loop
  const volumeRef = useRef(volume);
  const isMutedRef = useRef(isMuted);
  useEffect(() => {
    volumeRef.current = volume;
    isMutedRef.current = isMuted;
  }, [volume, isMuted]);

  const handleTogglePlayPause = useCallback(
    (event?: SyntheticEvent) => {
      event?.stopPropagation();
      const video = videoRef.current;
      const audio = audioRef.current;

      setIsPaused((prevPaused) => {
        const nextPaused = !prevPaused;
        isPausedRef.current = nextPaused;
        lastFramePerfRef.current = null;

        if (nextPaused) {
          video?.pause();
          audio?.pause();
        } else {
          if (video) {
            if (isIberian) {
              video.playbackRate = IBERIAN_PLAYBACK_RATE;
              // Resume video only while within its 4.0s 1.0x playback window
              if (elapsedRef.current < 3.95 && !video.ended) {
                void video.play().catch(() => {});
              }
            } else {
              void video.play().catch(() => {});
            }
          }
          if (audio && isIberian) {
            void audio.play().catch(() => {});
          }
        }
        return nextPaused;
      });
    },
    [isIberian, videoRef]
  );

  // Keyboard shortcuts: Spacebar to toggle play/pause, Escape to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.code === 'Space' || event.key === ' ') {
        event.preventDefault();
        handleTogglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleTogglePlayPause, onClose]);

  // Choreography timeline calculations for Iberian Pilgrimage (0.0s -> 14.0s)
  const t = elapsedTime;

  // 1) Pure black (#000000) overlay over the 4.0s 1.0x video:
  //    0.0s - 2.6s: 0
  //    2.6s - 3.9s: smoothly deepens to 1.0 (#000000) right before the 4.0s clip ends
  //    3.9s - 14.0s: holds at 1.0
  const blackScrimOpacity =
    t <= 2.6 ? 0 : t >= 3.9 ? 1 : easeInOutCubic((t - 2.6) / (3.9 - 2.6));

  // 2) First phrase: "What rhythm are you seeking?"
  //    0.8s - 3.6s: masked vertical rise (translateY(100%) to 0, cubic-bezier(0.16, 1, 0.3, 1))
  //                 with subtle letter-spacing settle
  //    3.4s - 4.2s: dissolves out smoothly into pure #000000
  const phrase1Visible = t >= 0.8 && t <= 4.3;
  const phrase1RiseProgress = t < 0.8 ? 0 : easeOutExpo(clamp01((t - 0.8) / 1.05));
  const phrase1SettleProgress = t < 0.8 ? 0 : easeOutExpo(clamp01((t - 0.8) / 2.0));
  const phrase1DissolveOpacity =
    t < 0.8
      ? 0
      : t <= 3.4
        ? clamp01((t - 0.8) / 0.4)
        : 1 - easeInOutCubic(clamp01((t - 3.4) / (4.2 - 3.4)));
  const phrase1TranslateY = (1 - phrase1RiseProgress) * 100;
  const phrase1LetterSpacingEm = 0.035 - phrase1SettleProgress * 0.025; // settles from 0.035em -> 0.010em

  // 3) Second phrase: "Return to your tempo."
  //    4.6s - 8.8s: on pure #000000, reveal "Return to your tempo." with editorial vertical rise
  //    9.0s - 12.8s: dissolve "Return to your " while smoothly centering "tempo." with a subtle warm glow
  //    12.8s - 14.0s: fade "tempo." out and auto-close modal at 14.0s
  const phrase2Visible = t >= 4.6;
  const phrase2RiseProgress = t < 4.6 ? 0 : easeOutExpo(clamp01((t - 4.6) / 1.15));
  const phrase2SettleProgress = t < 4.6 ? 0 : easeOutExpo(clamp01((t - 4.6) / 2.1));
  const phrase2TranslateY = (1 - phrase2RiseProgress) * 100;
  const phrase2LetterSpacingEm = 0.035 - phrase2SettleProgress * 0.025;

  // Re-measure natural alignment right when phrase 2 enters before glide begins
  useLayoutEffect(() => {
    if (isIberian && phrase2Visible && t < 9.0) {
      measureTempoCenterShift();
    }
  }, [isIberian, phrase2Visible, t < 9.0, measureTempoCenterShift]);

  // Prefix ("Return to your ") opacity: dissolves between 9.0s and 10.3s
  const prefixOpacity =
    t < 4.6
      ? 0
      : t < 9.0
        ? clamp01((t - 4.6) / 0.45)
        : 1 - easeInOutCubic(clamp01((t - 9.0) / 1.3));

  // "tempo." glide progress into dead center: 9.0s -> 10.8s
  const tempoGlideProgress =
    t < 9.0 ? 0 : easeInOutCubic(clamp01((t - 9.0) / 1.8));
  const tempoTranslateX = isMobileViewport
    ? 0
    : tempoGlideProgress * tempoCenterShiftPx;
  const tempoTranslateYEm = isMobileViewport ? -0.55 * tempoGlideProgress : 0;

  // "tempo." subtle warm glow: rises as it glides to center (9.0s -> 10.6s), holds until 12.8s
  const tempoGlowStrength =
    t < 9.0
      ? 0
      : t <= 12.8
        ? easeInOutCubic(clamp01((t - 9.0) / 1.6))
        : 1 - easeInOutCubic(clamp01((t - 12.8) / (14.0 - 12.8)));

  // Final fade to black of "tempo." between 12.8s and 14.0s
  const tempoOpacity =
    t < 4.6
      ? 0
      : t < 12.8
        ? clamp01((t - 4.6) / 0.45)
        : 1 - easeInOutCubic(clamp01((t - 12.8) / (14.0 - 12.8)));

  const heroDisplayTypographyStyle = {
    fontFamily: 'var(--font-display, var(--font\\/serif))',
    fontSize: 'clamp(2.15rem, 8.5vw, 4.5rem)',
    lineHeight: 1.15,
    color: 'var(--text\\/inverse)',
  } as const;

  return (
    <div
      id="fullscreen-video-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center select-none"
      style={{ backgroundColor: 'var(--bg\\/black)' }}
      onClick={onClose}
    >
      {/* Close (×) Button with Safe-Area Inset Top */}
      <button
        id="video-modal-close-btn"
        type="button"
        aria-label="Close video modal"
        onClick={onClose}
        onTouchEnd={onClose}
        className="absolute right-6 z-[150] leading-none cursor-pointer pointer-events-auto transition-opacity hover:opacity-80 p-2"
        style={{
          color: 'var(--text\\/inverse)',
          top: 'calc(1.5rem + env(safe-area-inset-top, 0px))',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[30px] h-[30px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M7 7L17 17" />
          <path d="M17 7L7 17" />
        </svg>
      </button>

      {/* Main Visual Stage */}
      <div
        className="relative w-full h-full overflow-hidden flex items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <video
          key={src}
          ref={videoRef}
          autoPlay
          className={
            isIberian
              ? 'w-full h-full object-cover object-center'
              : 'w-full h-full object-contain lg:object-cover'
          }
          muted={isIberian ? true : isMuted}
          playsInline
          src={src}
          onPlay={() => setIsPaused(false)}
          onPause={() => {
            if (!isIberian) {
              setIsPaused(true);
            }
          }}
        />

        {isIberian && audioSrc && (
          <audio ref={audioRef} src={audioSrc} preload="auto" />
        )}

        {isIberian && (
          <>
            {/* 0.0s - 3.9s: Subtle Radial Vignette Scrim over Full-Bleed Walking-Path Video */}
            <div
              id="iberian-radial-vignette"
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-[105]"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(28, 20, 16, 0.16) 0%, rgba(12, 9, 7, 0.50) 65%, rgba(0, 0, 0, 0.80) 100%)',
              }}
            />

            {/* 2.6s - 14.0s: Pure Black (#000000) Deepening Scrim Overlay */}
            <div
              id="iberian-black-scrim"
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-[110]"
              style={{
                backgroundColor: '#000000',
                opacity: blackScrimOpacity,
              }}
            />

            {/* Editorial Typography Choreography Layer */}
            <div
              id="iberian-typography-stage"
              className="absolute inset-0 z-[120] flex items-center justify-center pointer-events-none"
            >
              {/* Phrase 1 (0.8s – 4.2s): "What rhythm are you seeking?" */}
              {phrase1Visible && (
                <div className="overflow-hidden py-6 text-center mx-auto w-full max-w-[90vw] px-6">
                  <h1
                    id="iberian-phrase-1"
                    className="font-medium text-center mx-auto will-change-transform"
                    style={{
                      ...heroDisplayTypographyStyle,
                      opacity: phrase1DissolveOpacity,
                      transform: `translate3d(0, ${phrase1TranslateY.toFixed(2)}%, 0)`,
                      letterSpacing: `${phrase1LetterSpacingEm.toFixed(4)}em`,
                      textShadow:
                        '0 2px 14px rgba(0, 0, 0, 0.55), 0 8px 36px rgba(12, 9, 7, 0.65)',
                    }}
                  >
                    <span className="block sm:inline">What rhythm</span>
                    <span className="hidden sm:inline">{' '}</span>
                    <span className="block sm:inline">are you seeking?</span>
                  </h1>
                </div>
              )}

              {/* Phrase 2 (4.6s – 14.0s): "Return to your tempo." -> "tempo." */}
              <div
                className="overflow-hidden py-8 text-center mx-auto w-full max-w-[90vw] px-6"
                style={{
                  display: phrase1Visible ? 'none' : 'block',
                  visibility: phrase2Visible ? 'visible' : 'hidden',
                  pointerEvents: 'none',
                }}
              >
                <h1
                  ref={phrase2ContainerRef}
                  id="iberian-phrase-2"
                  className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center sm:whitespace-nowrap font-medium text-center mx-auto will-change-transform"
                  style={{
                    ...heroDisplayTypographyStyle,
                    transform: `translate3d(0, ${phrase2TranslateY.toFixed(2)}%, 0)`,
                    letterSpacing: `${phrase2LetterSpacingEm.toFixed(4)}em`,
                  }}
                >
                  <span
                    ref={prefixMeasureRef}
                    id="iberian-phrase-2-prefix"
                    className="block sm:inline-block sm:whitespace-pre will-change-opacity"
                    style={{
                      opacity: prefixOpacity,
                      filter:
                        t > 9.0
                          ? `blur(${(clamp01((t - 9.0) / 1.3) * 4).toFixed(2)}px)`
                          : 'none',
                    }}
                  >
                    <span>Return to your</span>
                    <span className="hidden sm:inline">{' '}</span>
                  </span>
                  <span
                    ref={tempoSpanRef}
                    id="iberian-phrase-2-tempo"
                    className="block sm:inline-block will-change-transform"
                    style={{
                      opacity: tempoOpacity,
                      transform: isMobileViewport
                        ? `translate3d(0, ${tempoTranslateYEm.toFixed(4)}em, 0)`
                        : `translate3d(${tempoTranslateX.toFixed(2)}px, 0, 0)`,
                      textShadow:
                        tempoGlowStrength > 0
                          ? `0 0 ${(24 * tempoGlowStrength).toFixed(1)}px rgba(240, 201, 107, ${(0.45 * tempoGlowStrength).toFixed(3)}), 0 0 ${(52 * tempoGlowStrength).toFixed(1)}px rgba(201, 151, 58, ${(0.26 * tempoGlowStrength).toFixed(3)})`
                          : 'none',
                    }}
                  >
                    tempo.
                  </span>
                </h1>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Control Pill: Play/Pause + Mute + Volume Slider with Safe-Area Inset Bottom */}
      <div
        id="video-modal-controls-pill"
        className="absolute left-1/2 -translate-x-1/2 z-[140] flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md"
        style={{
          backgroundColor: 'var(--surface\\/video-controls)',
          bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          id="video-modal-play-pause-btn"
          type="button"
          aria-label={isPaused ? 'Play video' : 'Pause video'}
          onClick={handleTogglePlayPause}
          className="cursor-pointer flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ color: 'var(--text\\/inverse)' }}
        >
          {isPaused ? (
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 6L18 12L8 18Z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="7" y="5.5" width="3" height="13" rx="0.5" />
              <rect x="14" y="5.5" width="3" height="13" rx="0.5" />
            </svg>
          )}
        </button>

        <div
          aria-hidden="true"
          className="w-px h-3.5 opacity-25"
          style={{ backgroundColor: 'var(--border\\/inverse)' }}
        />

        <button
          id="video-modal-mute-btn"
          type="button"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          onClick={onMuteToggle}
          className="cursor-pointer flex items-center justify-center transition-opacity hover:opacity-80"
          style={{ color: 'var(--text\\/inverse)' }}
        >
          {isMuted ? (
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h4l5-4v12l-5-4H4z" />
              <path d="M17 9l4 6" />
              <path d="M21 9l-4 6" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h4l5-4v12l-5-4H4z" />
              <path d="M17 9a4 4 0 010 6" />
              <path d="M19.5 7a7 7 0 010 10" />
            </svg>
          )}
        </button>

        <input
          id="video-modal-volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => onVolumeChange(Number(event.target.value))}
          aria-label="Video volume"
          className="w-24 sm:w-28 accent-white cursor-pointer"
        />
      </div>
    </div>
  );
}
