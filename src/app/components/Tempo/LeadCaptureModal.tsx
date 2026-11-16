import React, { useEffect, useState } from 'react';

type LeadCaptureModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function isValidEmail(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function LeadCaptureModal({ isOpen, setIsOpen }: LeadCaptureModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      return;
    }
    setEmail('');
    setError(null);
    setIsSuccess(false);
    const frame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }
    setError(null);
    setIsSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998]" onClick={onClose}>
      <style>{`
        @keyframes tempo-email-ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          30% {
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
        .tempo-lead-success-ring {
          position: absolute;
          z-index: 0;
          left: 50%;
          top: 50%;
          width: 8rem;
          aspect-ratio: 1;
          box-sizing: border-box;
          border: 1px solid var(--border\\/accent-ring);
          border-radius: 50%;
          background-color: transparent;
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation-name: tempo-email-ripple;
          animation-duration: 1.2s;
          animation-timing-function: ease-out;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }
      `}</style>

      <div
        aria-hidden
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'var(--scrim\\/modal-backdrop)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Lead capture"
          className={`relative h-full w-full bg-[var(--bg\/inverse)] px-7 pt-16 pb-12 md:h-auto md:max-w-[480px] md:rounded-[20px] md:px-10 md:pt-14 md:pb-12 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          style={{
            transition:
              'transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s cubic-bezier(0.16,1,0.3,1)',
            overflow: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="absolute top-5 right-5 cursor-pointer text-[var(--text\/inverse-muted)] hover:text-[var(--text\/inverse)] transition-colors"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
            >
              <path d="M6 6 L18 18" />
              <path d="M18 6 L6 18" />
            </svg>
          </button>

          {!isSuccess ? (
            <>
              <p
                className="text-[11px] tracking-[0.15em]"
                style={{
                  fontFamily: 'var(--font\\/sans)',
                  color: 'var(--accent\\/inverse-eyebrow)',
                }}
              >
                COMING SOON
              </p>
              <h2
                className="mt-4 text-4xl leading-[1.1] md:text-[42px]"
                style={{
                  fontFamily: 'var(--font\\/serif)',
                  color: 'var(--text\\/inverse)',
                  fontWeight: 400,
                }}
              >
                Your tempo awaits.
              </h2>
              <p
                className="mt-4 text-[15px] leading-[1.6]"
                style={{
                  fontFamily: 'var(--font\\/sans)',
                  color: 'var(--text\\/inverse-secondary)',
                }}
              >
                Enter your email. We&apos;ll notify you the moment tempo launches.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-9">
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="your@email.com"
                  className="h-14 w-full rounded-full border text-[var(--text\/inverse)] placeholder:text-[var(--text\/inverse-placeholder)] focus:outline-none transition-colors"
                  style={{
                    fontFamily: 'var(--font\\/sans)',
                    fontSize: '16px',
                    backgroundColor: 'var(--surface\\/glass-subtle)',
                    borderColor: 'var(--border\\/inverse-interactive)',
                    padding: '0 24px',
                  }}
                  onFocus={(event) => {
                    event.currentTarget.style.borderColor = 'var(--accent\\/default)';
                  }}
                  onBlur={(event) => {
                    event.currentTarget.style.borderColor = 'var(--border\\/inverse-interactive)';
                  }}
                />
                {error && (
                  <p
                    role="alert"
                    className="mt-2 text-[13px]"
                    style={{
                      fontFamily: 'var(--font\\/sans)',
                      color: 'var(--status\\/error-dark)',
                    }}
                  >
                    Please enter a valid email.
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-3 h-14 w-full cursor-pointer rounded-full text-[15px] font-medium text-[var(--text\/on-accent)] bg-[var(--accent\/default)] hover:bg-[var(--accent\/hover)] transition-colors"
                  style={{
                    fontFamily: 'var(--font\\/sans)',
                    fontWeight: 500,
                    border: 'none',
                  }}
                >
                  Notify me
                </button>
              </form>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="relative flex h-[200px] w-full items-center justify-center">
                <div
                  className="tempo-lead-success-ring"
                  style={{ animationDelay: '0s' }}
                  aria-hidden
                />
                <div
                  className="tempo-lead-success-ring"
                  style={{ animationDelay: '0.12s' }}
                  aria-hidden
                />
                <div
                  className="tempo-lead-success-ring"
                  style={{ animationDelay: '0.24s' }}
                  aria-hidden
                />
                <p
                  className="relative z-10 text-center text-[32px] leading-[1.1]"
                  style={{
                    fontFamily: 'var(--font\\/serif)',
                    color: 'var(--text\\/inverse)',
                    fontWeight: 400,
                  }}
                >
                  Your tempo is coming.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
