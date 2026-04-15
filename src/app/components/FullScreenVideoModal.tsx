import React, { useEffect, type RefObject, type SyntheticEvent } from 'react';

export type FullScreenVideoModalProps = {
  src: string;
  onClose: (event?: SyntheticEvent) => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  isMuted: boolean;
  volume: number;
  onMuteToggle: () => void;
  onVolumeChange: (value: number) => void;
};

export function FullScreenVideoModal({
  src,
  onClose,
  videoRef,
  isMuted,
  volume,
  onMuteToggle,
  onVolumeChange,
}: FullScreenVideoModalProps) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.setAttribute('webkit-playsinline', 'true');
  }, [src, videoRef]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close video modal"
        onClick={onClose}
        onTouchEnd={onClose}
        className="absolute top-6 right-6 z-[140] text-white leading-none cursor-pointer pointer-events-auto"
      >
        <svg viewBox="0 0 24 24" className="w-[30px] h-[30px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M7 7L17 17" />
          <path d="M17 7L7 17" />
        </svg>
      </button>
      <div
        className="w-full h-full"
        onClick={(event) => event.stopPropagation()}
      >
        <video
          key={src}
          ref={videoRef}
          autoPlay
          className="w-full h-full object-contain lg:object-cover"
          muted={isMuted}
          playsInline
          src={src}
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
          onClick={onMuteToggle}
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
          onChange={(event) => onVolumeChange(Number(event.target.value))}
          aria-label="Video volume"
          className="w-28 accent-white cursor-pointer"
        />
      </div>
    </div>
  );
}
