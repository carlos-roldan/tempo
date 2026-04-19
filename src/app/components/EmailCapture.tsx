import React, { useState } from 'react';
import { Button } from './Button';

function isValidEmail(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section
      id="email-capture-section"
      className="w-full flex flex-col items-center justify-center pt-16 md:pt-20 pb-24 md:pb-36 px-6"
      style={{
        backgroundColor: 'var(--bg\\/primary)',
        color: 'var(--text\\/primary)',
      }}
    >
      <style>{`
        .tempo-email-submit-btn {
          background-color: #C9973A !important;
          color: #FFFFFF !important;
          border: none !important;
          transition: background-color 0.2s ease !important;
        }
        .tempo-email-submit-btn:hover {
          background-color: #8B6420 !important;
        }
      `}</style>

      <div
        id="email-capture-container"
        className="w-full max-w-4xl mx-auto flex flex-col items-center text-center"
      >
        {submitted ? (
          <p
            id="email-capture-confirmation"
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--text\\/primary)',
            }}
          >
            Your journey is coming.
          </p>
        ) : (
          <>
            <h2
              id="email-capture-headline"
              className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6 md:mb-8 tracking-tight drop-shadow-sm"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: 'var(--text\\/primary)',
              }}
            >
              Your journey is waiting.
            </h2>

            <p
              id="email-capture-subtext"
              className="text-base md:text-lg font-normal mb-10 md:mb-12 max-w-xl"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'var(--text\\/secondary)',
              }}
            >
              Join the waitlist. Be first to know when tempo launches.
            </p>

            <form
              id="email-capture-form"
              onSubmit={handleSubmit}
              className="w-full max-w-[400px] flex flex-col items-center gap-2"
              noValidate
            >
              <div
                id="email-capture-field"
                className="flex w-full max-w-[400px] flex-row items-stretch gap-0 overflow-hidden rounded-full border"
                style={{ borderColor: 'var(--border\\/default)' }}
              >
                <input
                  id="email-capture-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? 'email-capture-error' : undefined}
                  className="min-w-0 flex-1 border-0 bg-transparent py-3 pl-5 pr-2 text-base outline-none transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: 'var(--text\\/primary)',
                  }}
                />
                <Button
                  id="email-capture-submit"
                  type="submit"
                  variant="ghost"
                  size="lg"
                  className="tempo-email-submit-btn !m-0 !h-auto !min-h-0 !shrink-0 !rounded-none !rounded-r-full !border-0 !px-5 !py-0 text-base md:text-lg"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Join
                </Button>
              </div>
              {error && (
                <p
                  id="email-capture-error"
                  role="alert"
                  className="w-full text-center text-sm"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: '#8B6420',
                  }}
                >
                  {error}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </section>
  );
};
