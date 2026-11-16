import React, { useState } from 'react';
import { Button } from './Button';

const LAB_CATEGORIES = {
  Restorative: {
    tags: ['Recharged', 'Reconnected', 'At Peace', 'Renewed'],
    poster: '/assets/posters/restorative.jpg',
  },
  Adventurous: {
    tags: ['Energized', 'Challenged', 'Alive', 'Bold'],
    poster: '/assets/posters/adventurous.jpg',
  },
  Spiritual: {
    tags: ['Grateful', 'Grounded', 'Transformed', 'Devoted'],
    poster: '/assets/posters/spiritual.jpg',
  },
  Romantic: {
    tags: ['Enchanted', 'Intimate', 'Swept Away', 'Adored'],
    poster: '/assets/posters/romantic.jpg',
  },
  Cultural: {
    tags: ['Curious', 'Immersed', 'Enlightened', 'Inspired'],
    poster: '/assets/posters/cultural.jpg',
  },
} as const;

type LabCategory = keyof typeof LAB_CATEGORIES;
const CATEGORY_KEYS = Object.keys(LAB_CATEGORIES) as LabCategory[];

export function Task1BInteractionLab() {
  const [expanded, setExpanded] = useState(true);
  const [category, setCategory] = useState<LabCategory>('Restorative');
  const [feelingIdx, setFeelingIdx] = useState<number>(0);

  return (
    <section id="navigation" className="scroll-mt-24 space-y-8">
      <style>{`
        .lab-hero-cta {
          background-color: transparent !important;
          color: var(--text\\/inverse) !important;
          border: 1px solid var(--border\\/inverse) !important;
          transition: all 0.25s ease !important;
        }
        .lab-hero-cta:hover {
          background-color: var(--surface\\/glass-hover) !important;
        }

        .lab-pill-primary {
          transition: all 0.25s ease;
        }
        .lab-pill-primary:hover:not(.lab-pill-primary--selected) {
          border-color: var(--border\\/inverse) !important;
          background-color: var(--surface\\/glass-tag-hover) !important;
        }
        .lab-pill-primary--selected:hover {
          background-color: var(--accent\\/hover) !important;
          border-color: var(--accent\\/hover) !important;
        }

        .lab-drawer-row {
          transition: all 0.2s ease;
        }
        .lab-drawer-row:hover:not(.lab-drawer-row--active) {
          background-color: var(--surface\\/glass-hover);
        }

        .lab-collapse-grid {
          display: grid;
          width: 100%;
          transition:
            grid-template-rows 220ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 220ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: top center;
          will-change: grid-template-rows, opacity, transform;
        }
        .lab-collapse-grid--open {
          grid-template-rows: 1fr;
          opacity: 1;
          transform: translateY(0) scaleY(1);
          pointer-events: auto;
        }
        .lab-collapse-grid--closed {
          grid-template-rows: 0fr;
          opacity: 0;
          transform: translateY(-6px) scaleY(0.96);
          pointer-events: none;
        }
        .lab-collapse-inner {
          overflow: hidden;
          min-height: 0;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>

      {/* Section Header */}
      <div className="border-b pb-4" style={{ borderColor: 'var(--border\\/subtle)' }}>
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: 'var(--text\\/secondary)' }}
        >
          Section 06 · Desktop Rhythm Navigation
        </span>
        <h2
          className="mt-1 text-3xl font-medium md:text-4xl"
          style={{ fontFamily: 'var(--font\\/serif)', color: 'var(--text\\/primary)' }}
        >
          Desktop Dual-Column Glassmorphic Rhythm Picker
        </h2>
        <p
          className="mt-2 max-w-3xl text-sm md:text-base"
          style={{ color: 'var(--text\\/secondary)' }}
        >
          Expanding &ldquo;More tempos&rdquo; on desktop opens a frosted-glass dual-column selector
          panel pairing the 5 Tempo categories on the left with the 4 Feeling pills on the
          right—creating visual and conceptual parity with our mobile iOS dual-wheel picker.
        </p>
      </div>

      {/* Desktop Dual-Column Glassmorphic Selector Showcase Card */}
      <div
        className="overflow-hidden rounded-2xl border-2"
        style={{
          borderColor: 'var(--accent\\/default)',
          backgroundColor: 'var(--bg\\/secondary)',
        }}
      >
        <div
          className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4"
          style={{
            backgroundColor: 'var(--bg\\/primary)',
            borderColor: 'var(--border\\/subtle)',
          }}
        >
          <div>
            <span
              className="text-xs font-semibold tracking-wider uppercase"
              style={{ color: 'var(--status\\/error-light)' }}
            >
              v2.0 Production · Desktop &ldquo;More tempos&rdquo; Expanded State
            </span>
            <h3
              className="text-2xl font-medium"
              style={{ fontFamily: 'var(--font\\/serif)', color: 'var(--text\\/primary)' }}
            >
              Frosted Glass Dual-Column Rhythm Picker
            </h3>
            <p className="text-xs md:text-sm" style={{ color: 'var(--text\\/secondary)' }}>
              Built exclusively with semantic tokens from <code>src/Tempo/styles.css</code> (
              <code>--scrim/featured</code>, <code>--surface/glass-picker</code>,{' '}
              <code>--accent/default</code>, <code>--text/on-accent</code>).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors"
            style={{
              backgroundColor: expanded ? 'var(--bg\\/inverse)' : 'var(--bg\\/primary)',
              color: expanded ? 'var(--text\\/inverse)' : 'var(--text\\/primary)',
              borderColor: 'var(--border\\/default)',
            }}
          >
            {expanded ? 'State: Expanded (Click to Collapse)' : 'State: Collapsed (Click to Expand)'}
          </button>
        </div>

        {/* Simulated Hero Stage — Top-anchored so headline never shifts */}
        <div
          className="relative flex min-h-[540px] flex-col items-center justify-start overflow-hidden px-6 pt-12 pb-12 text-center"
          style={{ backgroundColor: 'var(--bg\\/inverse)' }}
        >
          <img
            src={LAB_CATEGORIES[category].poster}
            alt={category}
            className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-700"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--scrim\\/hero)' }}
          />

          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
            <span
              className="mb-1.5 text-sm italic font-light md:text-base"
              style={{
                color: 'var(--text\\/inverse-warm)',
                letterSpacing: 'var(--tracking\\/eyebrow-sm)',
              }}
            >
              Return to your tempo*
            </span>
            <h4
              className="mb-8 text-4xl font-medium tracking-tight md:text-5xl"
              style={{
                color: 'var(--text\\/inverse)',
                fontFamily: 'var(--font\\/serif)',
                lineHeight: 'var(--leading\\/display)',
              }}
            >
              What rhythm are you seeking?
            </h4>

            {/* Collapsed State */}
            <div
              aria-hidden={expanded}
              className={`lab-collapse-grid ${
                !expanded ? 'lab-collapse-grid--open' : 'lab-collapse-grid--closed'
              }`}
            >
              <div className="lab-collapse-inner">
                <div className="mb-4 flex w-full flex-wrap items-center justify-center gap-3 md:gap-3.5">
                  {LAB_CATEGORIES[category].tags.map((tag, idx) => {
                    const isSelected = feelingIdx === idx;
                    return (
                      <button
                        key={tag}
                        type="button"
                        tabIndex={expanded ? -1 : 0}
                        onClick={() => setFeelingIdx(idx)}
                        className={`lab-pill-primary cursor-pointer rounded-full border px-6 py-2.5 text-sm tracking-wide backdrop-blur-md md:text-base ${
                          isSelected ? 'lab-pill-primary--selected font-medium' : ''
                        }`}
                        style={{
                          color: isSelected ? 'var(--text\\/on-accent)' : 'var(--text\\/inverse)',
                          borderColor: isSelected
                            ? 'var(--accent\\/default)'
                            : 'var(--border\\/inverse-interactive)',
                          backgroundColor: isSelected ? 'var(--accent\\/default)' : 'transparent',
                        }}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
                <div className="flex min-h-[36px] w-full items-start justify-center">
                  <button
                    type="button"
                    tabIndex={expanded ? -1 : 0}
                    onClick={() => setExpanded(true)}
                    className="cursor-pointer border-b pb-0.5 text-sm font-light tracking-wide transition-opacity hover:opacity-85 md:text-base"
                    style={{
                      color: 'var(--text\\/inverse)',
                      borderColor: 'var(--border\\/inverse-subtle)',
                    }}
                  >
                    More tempos
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded State: Glassmorphic Dual-Column Selector Panel */}
            <div
              aria-hidden={!expanded}
              className={`lab-collapse-grid ${
                expanded ? 'lab-collapse-grid--open' : 'lab-collapse-grid--closed'
              }`}
            >
              <div className="lab-collapse-inner">
                <div
                  className="w-full max-w-2xl overflow-hidden rounded-2xl border p-5 text-left backdrop-blur-xl md:p-6"
                  style={{
                    backgroundColor: 'var(--scrim\\/featured)',
                    borderColor: 'var(--border\\/inverse-interactive)',
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
                        {category} · {LAB_CATEGORIES[category].tags[feelingIdx]}
                      </span>
                    </div>
                    <button
                      type="button"
                      tabIndex={expanded ? 0 : -1}
                      onClick={() => setExpanded(false)}
                      className="cursor-pointer text-xs tracking-wide transition-colors"
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
                      {CATEGORY_KEYS.map((cat) => {
                        const isActive = category === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            tabIndex={expanded ? 0 : -1}
                            onClick={() => {
                              setCategory(cat);
                              setFeelingIdx(0);
                            }}
                            className={`lab-drawer-row flex w-full cursor-pointer items-center justify-between rounded-full px-4 py-2 text-left text-sm ${
                              isActive ? 'lab-drawer-row--active font-medium' : 'font-normal'
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
                    <div className="flex flex-col justify-between md:col-span-7">
                      <div>
                        <span
                          className="mb-2.5 block text-[11px] tracking-[0.18em] uppercase"
                          style={{ color: 'var(--text\\/inverse-muted)' }}
                        >
                          2. Select Feeling
                        </span>
                        <div className="grid grid-cols-2 gap-2.5">
                          {LAB_CATEGORIES[category].tags.map((tag, idx) => {
                            const isSelected = feelingIdx === idx;
                            return (
                              <button
                                key={tag}
                                type="button"
                                tabIndex={expanded ? 0 : -1}
                                onClick={() => setFeelingIdx(idx)}
                                className={`lab-pill-primary cursor-pointer rounded-full border px-4 py-2.5 text-center text-sm tracking-wide ${
                                  isSelected ? 'lab-pill-primary--selected font-medium' : ''
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

                      <p
                        className="mt-4 text-xs"
                        style={{ color: 'var(--text\\/inverse-secondary)' }}
                      >
                        Mirrors the mobile dual-wheel hierarchy while keeping all options visible at
                        a glance on desktop.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="ghost"
                size="lg"
                className="lab-hero-cta !rounded-full !px-12 !py-3.5 text-lg"
                style={{ minWidth: '220px' }}
              >
                Begin journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
