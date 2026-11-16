import React, { useEffect, useState } from 'react';

type BadgeStatus = 'AAA' | 'AA' | 'AA Large' | 'AA UI' | 'FAIL';

function ContrastBadge({
  ratio,
  status,
  note,
}: {
  ratio: string;
  status: BadgeStatus;
  note?: string;
}) {
  const styles: Record<BadgeStatus, { bg: string; text: string; border: string }> = {
    AAA: {
      bg: 'rgba(22, 163, 74, 0.14)',
      text: '#15803D',
      border: 'rgba(22, 163, 74, 0.35)',
    },
    AA: {
      bg: 'rgba(37, 99, 235, 0.12)',
      text: '#1D4ED8',
      border: 'rgba(37, 99, 235, 0.32)',
    },
    'AA Large': {
      bg: 'rgba(202, 138, 4, 0.14)',
      text: '#854D0E',
      border: 'rgba(202, 138, 4, 0.38)',
    },
    'AA UI': {
      bg: 'rgba(13, 148, 136, 0.14)',
      text: '#0F766E',
      border: 'rgba(13, 148, 136, 0.35)',
    },
    FAIL: {
      bg: 'rgba(220, 38, 38, 0.14)',
      text: '#B91C1C',
      border: 'rgba(220, 38, 38, 0.38)',
    },
  };

  const s = styles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide"
      style={{
        backgroundColor: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        fontFamily: 'var(--font\\/sans)',
      }}
    >
      <span className="font-semibold">{ratio}</span>
      <span>·</span>
      <span>{status}</span>
      {note ? <span className="opacity-80">({note})</span> : null}
    </span>
  );
}

function DarkContrastBadge({
  ratio,
  status,
  note,
}: {
  ratio: string;
  status: BadgeStatus;
  note?: string;
}) {
  const styles: Record<BadgeStatus, { bg: string; text: string; border: string }> = {
    AAA: {
      bg: 'rgba(34, 197, 94, 0.18)',
      text: '#86EFAC',
      border: 'rgba(34, 197, 94, 0.4)',
    },
    AA: {
      bg: 'rgba(96, 165, 250, 0.18)',
      text: '#93C5FD',
      border: 'rgba(96, 165, 250, 0.4)',
    },
    'AA Large': {
      bg: 'rgba(250, 204, 21, 0.18)',
      text: '#FDE047',
      border: 'rgba(250, 204, 21, 0.4)',
    },
    'AA UI': {
      bg: 'rgba(45, 212, 191, 0.18)',
      text: '#5EEAD4',
      border: 'rgba(45, 212, 191, 0.4)',
    },
    FAIL: {
      bg: 'rgba(248, 113, 113, 0.2)',
      text: '#FCA5A5',
      border: 'rgba(248, 113, 113, 0.45)',
    },
  };

  const s = styles[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide"
      style={{
        backgroundColor: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
        fontFamily: 'var(--font\\/sans)',
      }}
    >
      <span className="font-semibold">{ratio}</span>
      <span>·</span>
      <span>{status}</span>
      {note ? <span className="opacity-80">({note})</span> : null}
    </span>
  );
}

const SAMPLE_CATEGORIES = [
  {
    id: 'restorative',
    label: 'Restorative',
    feelingUrl: '/assets/feelings/restorative.png',
    posterUrl: '/assets/posters/restorative.jpg',
    tags: ['Recharged', 'Reconnected', 'At Peace', 'Renewed'],
  },
  {
    id: 'adventurous',
    label: 'Adventurous',
    feelingUrl: '/assets/feelings/adventurous.png',
    posterUrl: '/assets/posters/adventurous.jpg',
    tags: ['Energized', 'Challenged', 'Alive', 'Bold'],
  },
  {
    id: 'spiritual',
    label: 'Spiritual',
    feelingUrl: '/assets/feelings/spiritual.png',
    posterUrl: '/assets/posters/spiritual.jpg',
    tags: ['Grateful', 'Grounded', 'Transformed', 'Devoted'],
  },
  {
    id: 'romantic',
    label: 'Romantic',
    feelingUrl: '/assets/feelings/romantic.png',
    posterUrl: '/assets/posters/romantic.jpg',
    tags: ['Enchanted', 'Intimate', 'Swept Away', 'Adored'],
  },
  {
    id: 'cultural',
    label: 'Cultural',
    feelingUrl: '/assets/feelings/cultural.png',
    posterUrl: '/assets/posters/cultural.jpg',
    tags: ['Curious', 'Immersed', 'Enlightened', 'Inspired'],
  },
] as const;

const PALETTE_TOKENS = [
  {
    name: '--nuetral/white',
    semantic: '--bg/primary, --text/inverse, --border/inverse',
    v1Hex: '#FFFFFF',
    v2Hex: '#FFFFFF',
    changed: false,
    role: 'Primary light background & inverse text/borders on dark surfaces',
    ratios: [{ vs: 'vs #1C1410 (--bg/inverse)', ratio: '18.15:1', status: 'AAA' as BadgeStatus }],
  },
  {
    name: '--nuetral/50',
    semantic: '--bg/secondary',
    v1Hex: '#FAFAF8',
    v2Hex: '#FAFAF8',
    changed: false,
    role: 'Warm off-white section surface (HowItWorks, FeelingCategories, Testimonial)',
    ratios: [{ vs: 'vs #1C1410 (--text/primary)', ratio: '17.37:1', status: 'AAA' as BadgeStatus }],
  },
  {
    name: '--nuetral/100',
    semantic: '--bg/warm, --text/inverse-warm',
    v1Hex: '#F5F0E8',
    v2Hex: '#F5F0E8',
    changed: false,
    role: 'Warm parchment surface & light body/eyebrow text on dark overlays',
    ratios: [{ vs: 'vs #1C1410 (--bg/inverse)', ratio: '16.00:1', status: 'AAA' as BadgeStatus }],
  },
  {
    name: '--nuetral/200',
    semantic: '--border/subtle, --text/inverse-eyebrow',
    v1Hex: '#E8DDD0',
    v2Hex: '#E8DDD0',
    changed: false,
    role: 'Subtle light-surface dividers & FeaturedJourney eyebrow on dark scrim',
    ratios: [{ vs: 'vs #1C1410 (--bg/inverse)', ratio: '13.56:1', status: 'AAA' as BadgeStatus }],
  },
  {
    name: '--nuetral/300',
    semantic: '--border/default',
    v1Hex: '#E8DDD0',
    v2Hex: '#8F7E6A',
    changed: true,
    role: 'Form input & outline button borders on light surfaces (upgraded from #E8DDD0)',
    ratios: [
      { vs: 'v1.0 #E8DDD0 vs #FFFFFF', ratio: '1.34:1', status: 'FAIL' as BadgeStatus },
      { vs: 'v2.0 #8F7E6A vs #FFFFFF', ratio: '3.92:1', status: 'AA UI' as BadgeStatus },
    ],
  },
  {
    name: '--nuetral/400',
    semantic: '--text/placeholder',
    v1Hex: '#A89880',
    v2Hex: '#756350',
    changed: true,
    role: 'HowItWorks step numbers (1, 2, 3) & form input placeholders on light surfaces',
    ratios: [
      { vs: 'v1.0 #A89880 vs #FAFAF8', ratio: '2.69:1', status: 'FAIL' as BadgeStatus },
      { vs: 'v2.0 #756350 vs #FAFAF8', ratio: '5.49:1', status: 'AA' as BadgeStatus, note: 'AAA Large' },
      { vs: 'v2.0 #756350 vs #FFFFFF', ratio: '5.74:1', status: 'AA' as BadgeStatus },
    ],
  },
  {
    name: '--nuetral/600',
    semantic: '--text/secondary',
    v1Hex: '#6B5744',
    v2Hex: '#594736',
    changed: true,
    role: 'Secondary body copy, section eyebrows, and testimonial attribution on light surfaces',
    ratios: [
      { vs: 'v1.0 #6B5744 vs #FAFAF8', ratio: '6.54:1', status: 'AA' as BadgeStatus, note: '<7:1 AAA' },
      { vs: 'v2.0 #594736 vs #FAFAF8', ratio: '8.45:1', status: 'AAA' as BadgeStatus },
      { vs: 'v2.0 #594736 vs #FFFFFF', ratio: '8.83:1', status: 'AAA' as BadgeStatus },
    ],
  },
  {
    name: '--nuetral/900',
    semantic: '--bg/inverse, --text/primary, --text/on-accent',
    v1Hex: '#1C1410',
    v2Hex: '#1C1410',
    changed: false,
    role: 'Deep warm espresso primary text, dark background, and Option A button/pill text on gold',
    ratios: [
      { vs: 'vs #FFFFFF (--bg/primary)', ratio: '18.15:1', status: 'AAA' as BadgeStatus },
      { vs: 'vs #C9973A (--accent/default)', ratio: '6.89:1', status: 'AA' as BadgeStatus, note: 'Near AAA' },
    ],
  },
  {
    name: '--gold/500',
    semantic: '--accent/default',
    v1Hex: '#C9973A',
    v2Hex: '#C9973A',
    changed: true,
    textColorOverride: '#1C1410',
    role: 'Primary editorial gold accent paired with --text/on-accent (#1C1410) in v2.0',
    ratios: [
      { vs: 'v1.0 #FFFFFF on #C9973A', ratio: '2.63:1', status: 'FAIL' as BadgeStatus },
      { vs: 'v2.0 #1C1410 on #C9973A', ratio: '6.89:1', status: 'AA' as BadgeStatus, note: 'Near AAA' },
    ],
  },
  {
    name: '--gold/400',
    semantic: '--accent/hover, --accent/inverse-eyebrow, --status/error-dark',
    v1Hex: '#8B6420',
    v2Hex: '#DEB04E',
    changed: true,
    textColorOverride: '#1C1410',
    role: 'Luminous gold hover state for gold CTAs & high-contrast gold eyebrow/alert on dark surfaces',
    ratios: [
      { vs: 'v2.0 #1C1410 on #DEB04E', ratio: '9.01:1', status: 'AAA' as BadgeStatus },
      { vs: 'v2.0 #DEB04E on #1C1410', ratio: '9.01:1', status: 'AAA' as BadgeStatus },
    ],
  },
  {
    name: '--gold/600',
    semantic: '--accent/editorial-quote',
    v1Hex: '#C6A87C',
    v2Hex: '#9A7B4F',
    changed: true,
    role: 'Refined editorial gold for large decorative quote mark in Testimonial section',
    ratios: [
      { vs: 'v1.0 #C6A87C vs #FAFAF8', ratio: '2.16:1', status: 'FAIL' as BadgeStatus },
      { vs: 'v2.0 #9A7B4F vs #FAFAF8', ratio: '3.78:1', status: 'AA Large' as BadgeStatus },
    ],
  },
  {
    name: '--gold/700',
    semantic: '--status/error-light',
    v1Hex: '#8B6420',
    v2Hex: '#8B6420',
    changed: false,
    role: 'Deep bronze-gold validation alert text on light surfaces (EmailCapture)',
    ratios: [{ vs: 'vs #FFFFFF (--bg/primary)', ratio: '5.33:1', status: 'AA' as BadgeStatus }],
  },
];

const TYPOGRAPHY_SCALE = [
  {
    role: 'Hero H1 Display',
    token: 'var(--font/serif) · var(--leading/display)',
    component: 'Hero.tsx',
    family: 'Cormorant Garamond',
    weight: '500 (Medium)',
    size: '36px → 48px → 68px (text-4xl md:text-5xl lg:text-[4.25rem])',
    lineHeight: '1.1',
    tracking: '-0.025em (tracking-tight)',
    sample: 'What rhythm are you seeking?',
    previewStyle: {
      fontFamily: 'var(--font\\/serif)',
      fontSize: 'clamp(2.25rem, 4vw, 4.25rem)',
      fontWeight: 500,
      lineHeight: 'var(--leading\\/display)',
      letterSpacing: 'var(--tracking\\/tight)',
    } as React.CSSProperties,
  },
  {
    role: 'Section H2 Headline',
    token: 'var(--font/serif)',
    component: 'FeaturedJourney.tsx, EmailCapture.tsx, FooterCTA.tsx',
    family: 'Cormorant Garamond',
    weight: '500 (Medium)',
    size: '36px → 48px → 60px (text-4xl md:text-5xl lg:text-6xl)',
    lineHeight: '1.25 (leading-tight)',
    tracking: '-0.025em (tracking-tight)',
    sample: 'The Iberian Pilgrimage',
    previewStyle: {
      fontFamily: 'var(--font\\/serif)',
      fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
      fontWeight: 500,
      lineHeight: 1.15,
      letterSpacing: 'var(--tracking\\/tight)',
    } as React.CSSProperties,
  },
  {
    role: 'Testimonial Blockquote',
    token: 'var(--font/serif)',
    component: 'Testimonial.tsx',
    family: 'Cormorant Garamond',
    weight: '300 Italic (font-light italic)',
    size: '30px → 36px → 48px (text-3xl md:text-4xl lg:text-5xl)',
    lineHeight: '1.25–1.375',
    tracking: '0em',
    sample: '“I didn’t search for a destination. I searched for a feeling. tempo found both.”',
    previewStyle: {
      fontFamily: 'var(--font\\/serif)',
      fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
      fontWeight: 300,
      fontStyle: 'italic',
      lineHeight: 1.3,
    } as React.CSSProperties,
  },
  {
    role: 'Step Number Display',
    token: 'var(--font/serif) · var(--text/placeholder)',
    component: 'HowItWorks.tsx',
    family: 'Cormorant Garamond',
    weight: '300 (font-light)',
    size: '36px → 48px (text-4xl md:text-5xl)',
    lineHeight: '1.0',
    tracking: '0em',
    sample: '1   2   3',
    previewStyle: {
      fontFamily: 'var(--font\\/serif)',
      fontSize: '2.75rem',
      fontWeight: 300,
      lineHeight: 1.0,
      color: 'var(--text\\/placeholder)',
    } as React.CSSProperties,
  },
  {
    role: 'Feeling Card Display Label',
    token: 'var(--font/serif)',
    component: 'FeelingCategories.tsx',
    family: 'Cormorant Garamond',
    weight: '300 (font-light)',
    size: '24px → 30px → 36px (text-2xl md:text-3xl lg:text-4xl)',
    lineHeight: '1.2',
    tracking: '0.025em (tracking-wide)',
    sample: 'Restorative · Adventurous · Spiritual',
    previewStyle: {
      fontFamily: 'var(--font\\/serif)',
      fontSize: '2rem',
      fontWeight: 300,
      letterSpacing: 'var(--tracking\\/wide)',
    } as React.CSSProperties,
  },
  {
    role: 'Step Headline (H3)',
    token: 'var(--font/sans)',
    component: 'HowItWorks.tsx',
    family: 'DM Sans',
    weight: '500 (font-medium)',
    size: '20px → 24px (text-xl md:text-2xl)',
    lineHeight: '1.4',
    tracking: '0.025em (tracking-wide)',
    sample: 'Share your rhythm',
    previewStyle: {
      fontFamily: 'var(--font\\/sans)',
      fontSize: '1.375rem',
      fontWeight: 500,
      letterSpacing: 'var(--tracking\\/wide)',
    } as React.CSSProperties,
  },
  {
    role: 'Body Copy (Primary & Secondary)',
    token: 'var(--font/sans) · var(--text/secondary)',
    component: 'HowItWorks.tsx, FeaturedJourney.tsx, EmailCapture.tsx',
    family: 'DM Sans',
    weight: '400 (font-normal)',
    size: '16px → 18px (text-base md:text-lg)',
    lineHeight: '1.625 (leading-relaxed)',
    tracking: '0em',
    sample: 'Not a destination. A feeling you’re ready to move toward.',
    previewStyle: {
      fontFamily: 'var(--font\\/sans)',
      fontSize: '1.0625rem',
      fontWeight: 400,
      lineHeight: 'var(--leading\\/relaxed)',
      color: 'var(--text\\/secondary)',
    } as React.CSSProperties,
  },
  {
    role: 'Hero Italic Eyebrow',
    token: 'var(--font/sans) · var(--tracking/eyebrow-sm)',
    component: 'Hero.tsx',
    family: 'DM Sans',
    weight: '300 Italic (font-light italic)',
    size: '14px → 16px (text-sm md:text-base)',
    lineHeight: '1.5',
    tracking: '0.15em',
    sample: 'Return to your tempo*',
    previewStyle: {
      fontFamily: 'var(--font\\/sans)',
      fontSize: '0.9375rem',
      fontWeight: 300,
      fontStyle: 'italic',
      letterSpacing: 'var(--tracking\\/eyebrow-sm)',
    } as React.CSSProperties,
  },
  {
    role: 'Section Eyebrow / Citation',
    token: 'var(--font/sans) · var(--tracking/eyebrow)',
    component: 'FeaturedJourney.tsx, FeelingCategories.tsx, Testimonial.tsx, FooterCTA.tsx',
    family: 'DM Sans',
    weight: '400 (Regular)',
    size: '12px → 14px (text-xs md:text-sm uppercase)',
    lineHeight: '1.4',
    tracking: '0.2em',
    sample: 'EXPLORE BY FEELING   — ANA R., MIAMI',
    previewStyle: {
      fontFamily: 'var(--font\\/sans)',
      fontSize: '0.8125rem',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking\\/eyebrow)',
      color: 'var(--text\\/secondary)',
    } as React.CSSProperties,
  },
  {
    role: 'Footnote / Legal Caption',
    token: 'var(--font/sans)',
    component: 'Hero.tsx, FooterCTA.tsx',
    family: 'DM Sans',
    weight: '300–400',
    size: '12px → 13px (text-xs md:text-[13px])',
    lineHeight: '1.625',
    tracking: '0.025em',
    sample: '*tempo is a generative ai travel assistant · © 2026 tempo. All rights reserved.',
    previewStyle: {
      fontFamily: 'var(--font\\/sans)',
      fontSize: '0.8125rem',
      fontWeight: 400,
      lineHeight: 'var(--leading\\/relaxed)',
      color: 'var(--text\\/secondary)',
    } as React.CSSProperties,
  },
];

export function DesignSystem() {
  const [selectedHeroCategoryIdx, setSelectedHeroCategoryIdx] = useState(0);
  const [stressTestHighlight, setStressTestHighlight] = useState(false);
  const [selectedTagV1, setSelectedTagV1] = useState(0);
  const [selectedTagV2, setSelectedTagV2] = useState(0);

  useEffect(() => {
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow';
  }, []);

  const activeSample = SAMPLE_CATEGORIES[selectedHeroCategoryIdx];

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: 'var(--bg\\/secondary)',
        color: 'var(--text\\/primary)',
        fontFamily: 'var(--font\\/sans)',
      }}
    >
      <style>{`
        .ds-btn-v1 {
          background-color: #C9973A;
          color: #FFFFFF;
          transition: all 0.2s ease;
        }
        .ds-btn-v1:hover {
          background-color: #8B6420;
        }
        .ds-btn-v2 {
          background-color: var(--accent\\/default);
          color: var(--text\\/on-accent);
          transition: all 0.2s ease;
        }
        .ds-btn-v2:hover {
          background-color: var(--accent\\/hover);
        }
        .ds-input-light::placeholder {
          color: var(--text\\/placeholder);
          opacity: 1;
        }
        .ds-input-dark::placeholder {
          color: var(--text\\/inverse-placeholder);
          opacity: 1;
        }
      `}</style>

      {/* Sticky Top Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(28, 20, 16, 0.95)',
          borderColor: 'var(--border\\/inverse-divider)',
          color: 'var(--text\\/inverse)',
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-2xl tracking-wide lowercase select-none"
              style={{
                color: 'var(--text\\/inverse)',
                fontFamily: 'var(--font\\/serif)',
              }}
            >
              tempo
            </a>
            <span
              className="rounded-full px-3 py-1 text-xs font-medium tracking-wider uppercase"
              style={{
                backgroundColor: 'var(--accent\\/default)',
                color: 'var(--text\\/on-accent)',
              }}
            >
              v2.0 Design System & Case Study
            </span>
            <span
              className="hidden text-sm md:inline"
              style={{ color: 'var(--text\\/inverse-secondary)' }}
            >
              WCAG 2.1 AA/AAA Production Reference
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-xs md:text-sm">
            <a href="#audit-comparison" className="text-white/80 hover:text-white transition-colors">
              1. v1.0 → v2.0 Audit
            </a>
            <a href="#scrim-overlays" className="text-white/80 hover:text-white transition-colors">
              2. Media Scrims
            </a>
            <a href="#component-comparisons" className="text-white/80 hover:text-white transition-colors">
              3. Surface Diffs
            </a>
            <a href="#palette-matrix" className="text-white/80 hover:text-white transition-colors">
              4. Token Matrix
            </a>
            <a href="#typography-scale" className="text-white/80 hover:text-white transition-colors">
              5. Typography
            </a>
            <a
              href="/"
              className="rounded-full border px-3.5 py-1 text-xs text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: 'var(--border\\/inverse-interactive)' }}
            >
              ← Live Tempo Site
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl space-y-20 px-6 py-12 md:py-16">
        {/* Hero Banner */}
        <section
          className="rounded-2xl border p-6 md:p-8"
          style={{
            backgroundColor: 'var(--bg\\/primary)',
            borderColor: 'var(--border\\/default)',
          }}
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: 'var(--text\\/secondary)' }}
              >
                Production Reference · Unlisted Case-Study Showcase (/design-system)
              </p>
              <h1
                className="mt-2 text-3xl font-medium md:text-5xl"
                style={{ fontFamily: 'var(--font\\/serif)' }}
              >
                Tempo v2.0 Production Design System & WCAG Contrast Audit
              </h1>
              <p
                className="mt-2 max-w-3xl text-sm md:text-base"
                style={{ color: 'var(--text\\/secondary)' }}
              >
                All production components are powered by semantic tokens in{' '}
                <code>src/Tempo/styles.css</code>. Below is the interactive{' '}
                <strong>v1.0 → v2.0 Accessibility & Contrast Audit (Before vs. After)</strong>{' '}
                alongside our production token matrix and editorial typography scale.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <ContrastBadge ratio="≥ 7.0:1" status="AAA" note="Enhanced" />
              <ContrastBadge ratio="≥ 4.5:1" status="AA" note="Normal Text" />
              <ContrastBadge ratio="≥ 3.0:1" status="AA Large" note="≥24px / 19px bold" />
              <ContrastBadge ratio="≥ 3.0:1" status="AA UI" note="Borders & Controls" />
              <ContrastBadge ratio="< 3.0:1" status="FAIL" note="v1.0 Baseline" />
            </div>
          </div>
        </section>

        {/* SECTION 1: v1.0 -> v2.0 GOLD ACCENT AUDIT (BEFORE VS. AFTER) */}
        <section id="audit-comparison" className="scroll-mt-24 space-y-8">
          <div className="border-b pb-4" style={{ borderColor: 'var(--border\\/subtle)' }}>
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--text\\/secondary)' }}
            >
              Section 01 · v1.0 → v2.0 Accessibility & Contrast Audit (Before vs. After)
            </span>
            <h2
              className="mt-1 text-3xl font-medium md:text-4xl"
              style={{ fontFamily: 'var(--font\\/serif)' }}
            >
              Gold Accent CTAs & Selected Feeling Pills
            </h2>
            <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--text\\/secondary)' }}>
              By pairing Tempo&apos;s luminous editorial gold (<code>--accent/default: #C9973A</code>)
              with deep espresso typography (<code>--text/on-accent: #1C1410</code>) and a lighter
              gold hover state (<code>--accent/hover: #DEB04E</code>), contrast jumped from{' '}
              <strong>2.63:1 (WCAG Fail)</strong> to <strong>6.89:1 (WCAG AA Pass)</strong> and{' '}
              <strong>9.01:1 (WCAG AAA Pass on hover)</strong> while preserving the warm luxury palette.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Column 1: v1.0 Before */}
            <div
              className="flex flex-col overflow-hidden rounded-2xl border"
              style={{ borderColor: 'var(--border\\/subtle)', backgroundColor: 'var(--bg\\/primary)' }}
            >
              <div
                className="border-b p-5"
                style={{ borderColor: 'var(--border\\/subtle)', backgroundColor: 'var(--bg\\/secondary)' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: 'var(--text\\/placeholder)' }}
                  >
                    v1.0 Baseline (Before)
                  </span>
                  <ContrastBadge ratio="2.63:1" status="FAIL" />
                </div>
                <h3
                  className="mt-1 text-2xl font-medium"
                  style={{ fontFamily: 'var(--font\\/serif)' }}
                >
                  White #FFFFFF on Gold #C9973A
                </h3>
                <p className="mt-1 text-xs" style={{ color: 'var(--text\\/secondary)' }}>
                  Fill: <code>#C9973A</code> · Text: <code>#FFFFFF</code> · Unselected Pill Border:{' '}
                  <code>rgba(255,255,255,0.30)</code> (2.68:1 FAIL)
                </p>
              </div>

              {/* Dark Hero Surface Preview */}
              <div
                className="relative space-y-5 p-6"
                style={{
                  backgroundImage: `linear-gradient(rgba(28, 20, 16, 0.55), rgba(28, 20, 16, 0.55)), url(${activeSample.posterUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-wider uppercase text-white/70">
                    v1.0 Hero Feeling Pills
                  </span>
                  <DarkContrastBadge ratio="2.63:1" status="FAIL" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {activeSample.tags.map((tag, idx) => {
                    const isSelected = selectedTagV1 === idx;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedTagV1(idx)}
                        className="cursor-pointer rounded-full border px-5 py-2 text-sm tracking-wide backdrop-blur-md transition-all"
                        style={{
                          color: '#FFFFFF',
                          borderColor: isSelected ? '#C9973A' : 'rgba(255, 255, 255, 0.3)',
                          backgroundColor: isSelected ? '#C9973A' : 'transparent',
                        }}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs tracking-wider uppercase text-white/70">
                      v1.0 LeadCaptureModal &ldquo;Notify me&rdquo;
                    </span>
                    <DarkContrastBadge ratio="3.12:1" status="FAIL" />
                  </div>
                  <button
                    type="button"
                    className="h-12 w-full cursor-pointer rounded-full text-[15px] font-medium text-white transition-colors"
                    style={{
                      backgroundColor: 'rgba(201, 151, 58, 0.9)',
                    }}
                  >
                    Notify me
                  </button>
                </div>
              </div>

              {/* Light Surface Preview */}
              <div className="flex-1 space-y-4 p-6" style={{ backgroundColor: 'var(--bg\\/primary)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--text\\/secondary)' }}>
                    v1.0 EmailCapture &ldquo;Join&rdquo; & Input Border
                  </span>
                  <div className="flex gap-1.5">
                    <ContrastBadge ratio="1.34:1" status="FAIL" note="Border" />
                    <ContrastBadge ratio="2.63:1" status="FAIL" note="Button" />
                  </div>
                </div>
                <div
                  className="flex w-full items-stretch overflow-hidden rounded-full border"
                  style={{ borderColor: '#E8DDD0' }}
                >
                  <input
                    type="email"
                    readOnly
                    placeholder="Enter your email (2.81:1 FAIL)"
                    className="min-w-0 flex-1 border-0 bg-transparent py-2.5 pl-4 pr-2 text-sm outline-none placeholder:text-[#A89880]"
                    style={{ color: '#1C1410' }}
                  />
                  <button
                    type="button"
                    className="ds-btn-v1 cursor-pointer rounded-r-full px-5 text-sm font-medium"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Column 2: v2.0 Production (After) */}
            <div
              className="flex flex-col overflow-hidden rounded-2xl border-2 shadow-md"
              style={{
                borderColor: 'var(--accent\\/default)',
                backgroundColor: 'var(--bg\\/primary)',
              }}
            >
              <div
                className="border-b p-5"
                style={{
                  borderColor: 'var(--border\\/subtle)',
                  backgroundColor: 'var(--accent\\/subtle)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: 'var(--text\\/primary)' }}
                  >
                    v2.0 Production (After · Option A)
                  </span>
                  <ContrastBadge ratio="6.89:1" status="AA" note="Hover 9.01:1 AAA" />
                </div>
                <h3
                  className="mt-1 text-2xl font-medium"
                  style={{ fontFamily: 'var(--font\\/serif)', color: 'var(--text\\/primary)' }}
                >
                  Espresso #1C1410 on Gold #C9973A
                </h3>
                <p className="mt-1 text-xs" style={{ color: 'var(--text\\/secondary)' }}>
                  Tokens: <code>--accent/default</code> + <code>--text/on-accent</code> · Hover:{' '}
                  <code>--accent/hover (#DEB04E)</code> · Pill Border:{' '}
                  <code>--border/inverse-interactive</code> (4.52:1 AA)
                </p>
              </div>

              {/* Dark Hero Surface Preview */}
              <div
                className="relative space-y-5 p-6"
                style={{
                  backgroundImage: `linear-gradient(var(--scrim\\/hero), var(--scrim\\/hero)), url(${activeSample.posterUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-wider uppercase text-white/80">
                    v2.0 Production Hero Feeling Pills
                  </span>
                  <DarkContrastBadge ratio="6.89:1" status="AA" note="Near AAA" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {activeSample.tags.map((tag, idx) => {
                    const isSelected = selectedTagV2 === idx;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setSelectedTagV2(idx)}
                        className="cursor-pointer rounded-full border px-5 py-2 text-sm tracking-wide backdrop-blur-md transition-all"
                        style={{
                          color: isSelected ? 'var(--text\\/on-accent)' : 'var(--text\\/inverse)',
                          fontWeight: isSelected ? 500 : 400,
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

                <div className="pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs tracking-wider uppercase text-white/80">
                      v2.0 Production LeadCaptureModal &ldquo;Notify me&rdquo;
                    </span>
                    <DarkContrastBadge ratio="6.89:1" status="AA" note="Hover 9.01:1 AAA" />
                  </div>
                  <button
                    type="button"
                    className="ds-btn-v2 h-12 w-full cursor-pointer rounded-full text-[15px] font-medium"
                  >
                    Notify me
                  </button>
                </div>
              </div>

              {/* Light Surface Preview */}
              <div className="flex-1 space-y-4 p-6" style={{ backgroundColor: 'var(--bg\\/primary)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--text\\/secondary)' }}>
                    v2.0 Production EmailCapture &ldquo;Join&rdquo; & Input Border
                  </span>
                  <div className="flex gap-1.5">
                    <ContrastBadge ratio="3.92:1" status="AA UI" note="Border" />
                    <ContrastBadge ratio="6.89:1" status="AA" note="Button" />
                  </div>
                </div>
                <div
                  className="flex w-full items-stretch overflow-hidden rounded-full border"
                  style={{ borderColor: 'var(--border\\/default)' }}
                >
                  <input
                    type="email"
                    readOnly
                    placeholder="Enter your email (5.74:1 AA)"
                    className="ds-input-light min-w-0 flex-1 border-0 bg-transparent py-2.5 pl-4 pr-2 text-sm outline-none"
                    style={{ color: 'var(--text\\/primary)' }}
                  />
                  <button
                    type="button"
                    className="ds-btn-v2 cursor-pointer rounded-r-full px-5 text-sm font-medium"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: MEDIA SCRIM OVERLAYS OVER SAMPLE IMAGERY */}
        <section id="scrim-overlays" className="scroll-mt-24 space-y-8">
          <div
            className="flex flex-col justify-between gap-4 border-b pb-4 md:flex-row md:items-end"
            style={{ borderColor: 'var(--border\\/subtle)' }}
          >
            <div>
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: 'var(--text\\/secondary)' }}
              >
                Section 02 · Media Overlay Audit (Before vs. After)
              </span>
              <h2
                className="mt-1 text-3xl font-medium md:text-4xl"
                style={{ fontFamily: 'var(--font\\/serif)' }}
              >
                Scrim Overlays Over Sample Imagery (0.45 / 0.55 → 0.58 / 0.60)
              </h2>
              <p
                className="mt-2 max-w-3xl text-sm md:text-base"
                style={{ color: 'var(--text\\/secondary)' }}
              >
                Over bright sky, water, or sunlit stone highlights, v1.0&apos;s <code>0.45</code>{' '}
                card scrim dropped to <strong>2.97:1 (FAIL)</strong> and the <code>0.55</code> Hero
                scrim dropped to <strong>4.02:1 (FAIL for small text)</strong>. v2.0 tokens{' '}
                <code>--scrim/category (0.58)</code> and <code>--scrim/hero (0.60)</code> guarantee{' '}
                <strong>≥4.5:1 AA contrast</strong> even over pure white pixels.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setStressTestHighlight((prev) => !prev)}
                className="cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: stressTestHighlight ? 'var(--bg\\/inverse)' : 'var(--bg\\/primary)',
                  color: stressTestHighlight ? 'var(--text\\/inverse)' : 'var(--text\\/primary)',
                  borderColor: 'var(--bg\\/inverse)',
                }}
              >
                {stressTestHighlight
                  ? '✓ Bright Sky Highlight Band: ON'
                  : 'Toggle Bright Sky Highlight Band'}
              </button>
            </div>
          </div>

          {/* 2A: FeelingCategories 5-Card Comparison (0.45 vs 0.58) */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* v1.0 0.45 */}
              <div
                className="space-y-3 rounded-2xl border p-5"
                style={{ backgroundColor: 'var(--bg\\/primary)', borderColor: 'var(--border\\/subtle)' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-medium">
                      v1.0 FeelingCategories Scrim: <code>rgba(28, 20, 16, 0.45)</code>
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--text\\/secondary)' }}>
                      Worst-case contrast over bright image highlights: <strong>2.97:1</strong>
                    </p>
                  </div>
                  <ContrastBadge ratio="2.97:1 min" status="FAIL" note="Over bright pixels" />
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {SAMPLE_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      className="relative aspect-[2/3] flex items-center justify-center overflow-hidden rounded-lg"
                    >
                      <img
                        src={cat.feelingUrl}
                        alt={cat.label}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      />
                      {stressTestHighlight && (
                        <div
                          className="absolute inset-x-0 top-1/2 h-12 -translate-y-1/2"
                          style={{
                            background:
                              'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                          }}
                        />
                      )}
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: 'rgba(28, 20, 16, 0.45)' }}
                      />
                      <span
                        className="relative z-10 text-center text-lg md:text-xl font-light tracking-wide text-white drop-shadow-sm px-1"
                        style={{ fontFamily: 'var(--font\\/serif)' }}
                      >
                        {cat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* v2.0 0.58 */}
              <div
                className="space-y-3 rounded-2xl border-2 p-5"
                style={{ backgroundColor: 'var(--bg\\/primary)', borderColor: 'var(--accent\\/default)' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-medium">
                      v2.0 Production Scrim: <code>--scrim/category (0.58)</code>
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--text\\/secondary)' }}>
                      Worst-case contrast over pure white image highlights: <strong>4.54:1</strong>
                    </p>
                  </div>
                  <ContrastBadge ratio="4.54:1 min" status="AA" note="Guaranteed ≥4.5:1" />
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {SAMPLE_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      className="relative aspect-[2/3] flex items-center justify-center overflow-hidden rounded-lg"
                    >
                      <img
                        src={cat.feelingUrl}
                        alt={cat.label}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      />
                      {stressTestHighlight && (
                        <div
                          className="absolute inset-x-0 top-1/2 h-12 -translate-y-1/2"
                          style={{
                            background:
                              'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                          }}
                        />
                      )}
                      <div
                        className="absolute inset-0"
                        style={{ backgroundColor: 'var(--scrim\\/category)' }}
                      />
                      <span
                        className="relative z-10 text-center text-lg md:text-xl font-light tracking-wide text-white drop-shadow-sm px-1"
                        style={{ fontFamily: 'var(--font\\/serif)' }}
                      >
                        {cat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2B: Hero Scrim Comparison (0.55 vs 0.60) */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium" style={{ color: 'var(--text\\/primary)' }}>
                  Switch Hero Poster Backdrop:
                </span>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_CATEGORIES.map((cat, idx) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedHeroCategoryIdx(idx)}
                      className="cursor-pointer rounded-full border px-3.5 py-1 text-xs font-medium transition-colors"
                      style={{
                        backgroundColor:
                          selectedHeroCategoryIdx === idx
                            ? 'var(--bg\\/inverse)'
                            : 'var(--bg\\/primary)',
                        color:
                          selectedHeroCategoryIdx === idx
                            ? 'var(--text\\/inverse)'
                            : 'var(--text\\/primary)',
                        borderColor: 'var(--border\\/default)',
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* v1.0 Hero 0.55 */}
                <div
                  className="overflow-hidden rounded-2xl border"
                  style={{ borderColor: 'var(--border\\/subtle)', backgroundColor: 'var(--bg\\/primary)' }}
                >
                  <div
                    className="flex items-center justify-between border-b px-5 py-3.5"
                    style={{ borderColor: 'var(--border\\/subtle)' }}
                  >
                    <div>
                      <span className="text-sm font-semibold">
                        v1.0 Hero Scrim: <code>0.55</code>
                      </span>
                      <span className="ml-2 text-xs" style={{ color: 'var(--text\\/secondary)' }}>
                        (Worst-case bright frame: 4.02:1)
                      </span>
                    </div>
                    <ContrastBadge ratio="4.02:1 min" status="AA Large" note="Short of 4.5:1 body" />
                  </div>
                  <div className="relative flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
                    <img
                      src={activeSample.posterUrl}
                      alt={activeSample.label}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    {stressTestHighlight && (
                      <div
                        className="absolute inset-x-0 top-1/4 h-24"
                        style={{ background: 'rgba(255,255,255,0.9)' }}
                      />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: 'rgba(28, 20, 16, 0.55)' }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <span
                        className="italic font-light text-sm mb-2"
                        style={{ color: '#F5F0E8', letterSpacing: '0.15em' }}
                      >
                        Return to your tempo*
                      </span>
                      <h4
                        className="text-3xl md:text-4xl font-medium text-white mb-5"
                        style={{ fontFamily: 'var(--font\\/serif)' }}
                      >
                        What rhythm are you seeking?
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2 mb-5">
                        {activeSample.tags.map((t, i) => (
                          <span
                            key={t}
                            className="rounded-full border px-4 py-1.5 text-xs text-white"
                            style={{
                              borderColor: i === 0 ? '#C9973A' : 'rgba(255,255,255,0.3)',
                              backgroundColor: i === 0 ? '#C9973A' : 'transparent',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        *tempo is a generative ai travel assistant
                      </p>
                    </div>
                  </div>
                </div>

                {/* v2.0 Hero 0.60 */}
                <div
                  className="overflow-hidden rounded-2xl border-2"
                  style={{ borderColor: 'var(--accent\\/default)', backgroundColor: 'var(--bg\\/primary)' }}
                >
                  <div
                    className="flex items-center justify-between border-b px-5 py-3.5"
                    style={{ borderColor: 'var(--border\\/subtle)' }}
                  >
                    <div>
                      <span className="text-sm font-semibold">
                        v2.0 Production Scrim: <code>--scrim/hero (0.60)</code>
                      </span>
                      <span className="ml-2 text-xs" style={{ color: 'var(--text\\/secondary)' }}>
                        (Worst-case bright frame: 4.76:1)
                      </span>
                    </div>
                    <ContrastBadge ratio="4.76:1 min" status="AA" note="Passes all text sizes" />
                  </div>
                  <div className="relative flex min-h-[300px] flex-col items-center justify-center p-8 text-center">
                    <img
                      src={activeSample.posterUrl}
                      alt={activeSample.label}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    {stressTestHighlight && (
                      <div
                        className="absolute inset-x-0 top-1/4 h-24"
                        style={{ background: 'rgba(255,255,255,0.9)' }}
                      />
                    )}
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: 'var(--scrim\\/hero)' }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <span
                        className="italic font-light text-sm mb-2"
                        style={{
                          color: 'var(--text\\/inverse-warm)',
                          letterSpacing: 'var(--tracking\\/eyebrow-sm)',
                        }}
                      >
                        Return to your tempo*
                      </span>
                      <h4
                        className="text-3xl md:text-4xl font-medium text-white mb-5"
                        style={{ fontFamily: 'var(--font\\/serif)' }}
                      >
                        What rhythm are you seeking?
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2 mb-5">
                        {activeSample.tags.map((t, i) => (
                          <span
                            key={t}
                            className="rounded-full border px-4 py-1.5 text-xs"
                            style={{
                              color: i === 0 ? 'var(--text\\/on-accent)' : 'var(--text\\/inverse)',
                              fontWeight: i === 0 ? 500 : 400,
                              borderColor:
                                i === 0
                                  ? 'var(--accent\\/default)'
                                  : 'var(--border\\/inverse-interactive)',
                              backgroundColor: i === 0 ? 'var(--accent\\/default)' : 'transparent',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text\\/inverse-secondary)' }}>
                        *tempo is a generative ai travel assistant
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COMPONENT-LEVEL SURFACE DIFFS (v1.0 BEFORE VS. v2.0 AFTER) */}
        <section id="component-comparisons" className="scroll-mt-24 space-y-10">
          <div className="border-b pb-4" style={{ borderColor: 'var(--border\\/subtle)' }}>
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--text\\/secondary)' }}
            >
              Section 03 · Component-Level Surface Diffs
            </span>
            <h2
              className="mt-1 text-3xl font-medium md:text-4xl"
              style={{ fontFamily: 'var(--font\\/serif)' }}
            >
              Light & Dark Surface Components (v1.0 Before vs. v2.0 Production)
            </h2>
          </div>

          {/* 3A: HowItWorks Step Numbers & Body Copy */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* v1.0 */}
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: 'var(--bg\\/secondary)', borderColor: 'var(--border\\/subtle)' }}
            >
              <div
                className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b pb-3"
                style={{ borderColor: 'var(--border\\/subtle)' }}
              >
                <span className="text-sm font-semibold">v1.0 Baseline · HowItWorks.tsx</span>
                <div className="flex gap-2">
                  <ContrastBadge ratio="2.69:1" status="FAIL" note="Step #A89880" />
                  <ContrastBadge ratio="6.54:1" status="AA" note="Body #6B5744" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    num: '1',
                    title: 'Share your rhythm',
                    body: "Not a destination. A feeling you're ready to move toward.",
                  },
                  {
                    num: '2',
                    title: 'tempo listens',
                    body: 'Every response shapes a journey only you would take.',
                  },
                  {
                    num: '3',
                    title: 'Begin your journey',
                    body: 'A complete journey, ready when you are.',
                  },
                ].map((s) => (
                  <div key={s.num} className="flex flex-col">
                    <span
                      className="text-4xl font-light mb-4"
                      style={{ fontFamily: 'var(--font\\/serif)', color: '#A89880' }}
                    >
                      {s.num}
                    </span>
                    <h4 className="text-lg font-medium mb-2" style={{ color: '#1C1410' }}>
                      {s.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#6B5744' }}>
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* v2.0 */}
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: 'var(--bg\\/secondary)',
                borderColor: 'var(--accent\\/default)',
              }}
            >
              <div
                className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b pb-3"
                style={{ borderColor: 'var(--border\\/subtle)' }}
              >
                <span className="text-sm font-semibold">v2.0 Production · HowItWorks.tsx</span>
                <div className="flex gap-2">
                  <ContrastBadge ratio="5.49:1" status="AA" note="Step #756350" />
                  <ContrastBadge ratio="8.45:1" status="AAA" note="Body #594736" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    num: '1',
                    title: 'Share your rhythm',
                    body: "Not a destination. A feeling you're ready to move toward.",
                  },
                  {
                    num: '2',
                    title: 'tempo listens',
                    body: 'Every response shapes a journey only you would take.',
                  },
                  {
                    num: '3',
                    title: 'Begin your journey',
                    body: 'A complete journey, ready when you are.',
                  },
                ].map((s) => (
                  <div key={s.num} className="flex flex-col">
                    <span
                      className="text-4xl font-light mb-4"
                      style={{
                        fontFamily: 'var(--font\\/serif)',
                        color: 'var(--text\\/placeholder)',
                      }}
                    >
                      {s.num}
                    </span>
                    <h4 className="text-lg font-medium mb-2" style={{ color: 'var(--text\\/primary)' }}>
                      {s.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text\\/secondary)' }}>
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3B: Testimonial Quote Mark & Attribution */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* v1.0 */}
            <div
              className="rounded-2xl border p-6 text-center"
              style={{ backgroundColor: 'var(--bg\\/secondary)', borderColor: 'var(--border\\/subtle)' }}
            >
              <div
                className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b pb-3 text-left"
                style={{ borderColor: 'var(--border\\/subtle)' }}
              >
                <span className="text-sm font-semibold">v1.0 Baseline · Testimonial.tsx</span>
                <ContrastBadge ratio="2.16:1" status="FAIL" note="Quote #C6A87C" />
              </div>
              <span
                className="block text-7xl leading-none h-10 mb-6"
                style={{ fontFamily: 'var(--font\\/serif)', color: '#C6A87C' }}
              >
                “
              </span>
              <blockquote
                className="text-2xl md:text-3xl font-light italic leading-snug mb-6"
                style={{ fontFamily: 'var(--font\\/serif)', color: '#1C1410' }}
              >
                I didn&apos;t search for a destination. I searched for a feeling. tempo found both.
              </blockquote>
              <cite className="not-italic uppercase text-xs tracking-[0.2em]" style={{ color: '#6B5744' }}>
                — Ana R., Miami
              </cite>
            </div>

            {/* v2.0 */}
            <div
              className="rounded-2xl border-2 p-6 text-center"
              style={{
                backgroundColor: 'var(--bg\\/secondary)',
                borderColor: 'var(--accent\\/default)',
              }}
            >
              <div
                className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b pb-3 text-left"
                style={{ borderColor: 'var(--border\\/subtle)' }}
              >
                <span className="text-sm font-semibold">v2.0 Production · Testimonial.tsx</span>
                <div className="flex gap-2">
                  <ContrastBadge ratio="3.78:1" status="AA Large" note="Quote #9A7B4F" />
                  <ContrastBadge ratio="8.45:1" status="AAA" note="Cite #594736" />
                </div>
              </div>
              <span
                className="block text-7xl leading-none h-10 mb-6"
                style={{
                  fontFamily: 'var(--font\\/serif)',
                  color: 'var(--accent\\/editorial-quote)',
                }}
              >
                “
              </span>
              <blockquote
                className="text-2xl md:text-3xl font-light italic leading-snug mb-6"
                style={{ fontFamily: 'var(--font\\/serif)', color: 'var(--text\\/primary)' }}
              >
                I didn&apos;t search for a destination. I searched for a feeling. tempo found both.
              </blockquote>
              <cite
                className="not-italic uppercase text-xs tracking-[0.2em]"
                style={{ color: 'var(--text\\/secondary)' }}
              >
                — Ana R., Miami
              </cite>
            </div>
          </div>

          {/* 3C: LeadCaptureModal & IOSPickerHero on Dark Surface */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* v1.0 */}
            <div
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: 'var(--bg\\/inverse)',
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'var(--text\\/inverse)',
              }}
            >
              <div
                className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b pb-3"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              >
                <span className="text-sm font-semibold">
                  v1.0 Baseline · LeadCaptureModal & IOSPickerHero
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <DarkContrastBadge ratio="2.68:1" status="FAIL" note="Placeholder" />
                  <DarkContrastBadge ratio="2.26:1" status="FAIL" note="Input Border" />
                  <DarkContrastBadge ratio="3.88:1" status="FAIL" note="Picker Row ±1" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div
                  className="relative rounded-xl border p-5"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', backgroundColor: '#1C1410' }}
                >
                  <span className="absolute top-3 right-3 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    ✕ (4.52:1)
                  </span>
                  <p className="text-[11px] tracking-[0.15em]" style={{ color: 'rgba(201,151,58,0.85)' }}>
                    COMING SOON (5.29:1)
                  </p>
                  <h4
                    className="mt-2 text-2xl font-normal text-white"
                    style={{ fontFamily: 'var(--font\\/serif)' }}
                  >
                    Your tempo awaits.
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Enter your email. We&apos;ll notify you the moment tempo launches. (6.12:1)
                  </p>
                  <input
                    type="email"
                    readOnly
                    placeholder="your@email.com (2.68:1 FAIL)"
                    className="mt-4 h-11 w-full rounded-full border px-4 text-xs text-white placeholder:text-[rgba(255,255,255,0.3)]"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      borderColor: 'rgba(255,255,255,0.25)',
                    }}
                  />
                </div>

                <div
                  className="flex flex-col justify-center rounded-xl border p-5"
                  style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                >
                  <p className="mb-3 text-xs text-white/70">v1.0 Mobile iOS Wheel Opacity</p>
                  <div className="relative flex flex-col items-center space-y-2 py-2">
                    <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.9)', opacity: 0.22 }}>
                      Spiritual · Grateful (1.87:1 FAIL)
                    </div>
                    <div className="text-[15px]" style={{ color: 'rgba(255,255,255,0.9)', opacity: 0.45 }}>
                      Adventurous · Energized (3.88:1 FAIL)
                    </div>
                    <div
                      className="w-full rounded-full py-2 text-center text-[17px] font-medium"
                      style={{
                        color: 'rgba(255,255,255,0.9)',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        border: '1px solid rgba(255,255,255,0.30)',
                      }}
                    >
                      Restorative · Recharged (14.8:1)
                    </div>
                    <div className="text-[15px]" style={{ color: 'rgba(255,255,255,0.9)', opacity: 0.45 }}>
                      Romantic · Enchanted (3.88:1 FAIL)
                    </div>
                    <div className="text-[13px]" style={{ color: 'rgba(255,255,255,0.9)', opacity: 0.22 }}>
                      Cultural · Curious (1.87:1 FAIL)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* v2.0 */}
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: 'var(--bg\\/inverse)',
                borderColor: 'var(--accent\\/default)',
                color: 'var(--text\\/inverse)',
              }}
            >
              <div
                className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b pb-3"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              >
                <span className="text-sm font-semibold">
                  v2.0 Production · LeadCaptureModal & IOSPickerHero
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <DarkContrastBadge ratio="5.72:1" status="AA" note="Placeholder" />
                  <DarkContrastBadge ratio="4.52:1" status="AA UI" note="Input Border" />
                  <DarkContrastBadge ratio="6.12:1 / 4.52:1" status="AA" note="Picker Rows" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div
                  className="relative rounded-xl border p-5"
                  style={{
                    borderColor: 'rgba(255,255,255,0.2)',
                    backgroundColor: 'var(--bg\\/inverse)',
                  }}
                >
                  <span
                    className="absolute top-3 right-3 text-xs"
                    style={{ color: 'var(--text\\/inverse-muted)' }}
                  >
                    ✕ (8.13:1 AAA)
                  </span>
                  <p
                    className="text-[11px] tracking-[0.15em]"
                    style={{ color: 'var(--accent\\/inverse-eyebrow)' }}
                  >
                    COMING SOON (9.01:1 AAA)
                  </p>
                  <h4
                    className="mt-2 text-2xl font-normal"
                    style={{ fontFamily: 'var(--font\\/serif)', color: 'var(--text\\/inverse)' }}
                  >
                    Your tempo awaits.
                  </h4>
                  <p
                    className="mt-2 text-xs leading-relaxed"
                    style={{ color: 'var(--text\\/inverse-secondary)' }}
                  >
                    Enter your email. We&apos;ll notify you the moment tempo launches. (10.45:1 AAA)
                  </p>
                  <input
                    type="email"
                    readOnly
                    placeholder="your@email.com (5.72:1 AA)"
                    className="ds-input-dark mt-4 h-11 w-full rounded-full border px-4 text-xs"
                    style={{
                      color: 'var(--text\\/inverse)',
                      backgroundColor: 'var(--surface\\/glass-subtle)',
                      borderColor: 'var(--border\\/inverse-interactive)',
                    }}
                  />
                </div>

                <div
                  className="flex flex-col justify-center rounded-xl border p-5"
                  style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <p className="mb-3 text-xs text-white/80">v2.0 Mobile iOS Wheel Opacity</p>
                  <div className="relative flex flex-col items-center space-y-2 py-2">
                    <div
                      className="text-[13px]"
                      style={{ color: 'var(--text\\/inverse)', opacity: 'var(--opacity\\/picker-far)' }}
                    >
                      Spiritual · Grateful (4.52:1 AA)
                    </div>
                    <div
                      className="text-[15px]"
                      style={{ color: 'var(--text\\/inverse)', opacity: 'var(--opacity\\/picker-near)' }}
                    >
                      Adventurous · Energized (6.12:1 AA)
                    </div>
                    <div
                      className="w-full rounded-full py-2 text-center text-[17px] font-medium"
                      style={{
                        color: 'var(--text\\/inverse)',
                        backgroundColor: 'var(--surface\\/glass-picker)',
                        border: '1px solid var(--border\\/inverse-interactive)',
                      }}
                    >
                      Restorative · Recharged (18.15:1 AAA)
                    </div>
                    <div
                      className="text-[15px]"
                      style={{ color: 'var(--text\\/inverse)', opacity: 'var(--opacity\\/picker-near)' }}
                    >
                      Romantic · Enchanted (6.12:1 AA)
                    </div>
                    <div
                      className="text-[13px]"
                      style={{ color: 'var(--text\\/inverse)', opacity: 'var(--opacity\\/picker-far)' }}
                    >
                      Cultural · Curious (4.52:1 AA)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FULL COLOR PALETTE & WCAG CONTRAST MATRIX */}
        <section id="palette-matrix" className="scroll-mt-24 space-y-8">
          <div className="border-b pb-4" style={{ borderColor: 'var(--border\\/subtle)' }}>
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--text\\/secondary)' }}
            >
              Section 04 · Semantic Token Reference (src/Tempo/styles.css)
            </span>
            <h2
              className="mt-1 text-3xl font-medium md:text-4xl"
              style={{ fontFamily: 'var(--font\\/serif)' }}
            >
              v2.0 Production Color Palette & WCAG 2.1 Contrast Ratios
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PALETTE_TOKENS.map((token) => (
              <div
                key={token.name}
                className="flex flex-col overflow-hidden rounded-2xl border"
                style={{
                  backgroundColor: 'var(--bg\\/primary)',
                  borderColor: token.changed ? 'var(--accent\\/default)' : 'var(--border\\/subtle)',
                }}
              >
                <div className="flex h-24 w-full border-b" style={{ borderColor: 'var(--border\\/subtle)' }}>
                  <div
                    className="flex flex-1 flex-col justify-between p-3"
                    style={{
                      backgroundColor: token.v1Hex,
                      color: ['#FFFFFF', '#FAFAF8', '#F5F0E8', '#E8DDD0', '#FDF3DC', '#F0C96B'].includes(
                        token.v1Hex,
                      )
                        ? '#1C1410'
                        : '#FFFFFF',
                    }}
                  >
                    <span className="text-[10px] font-semibold tracking-wider uppercase opacity-80">
                      {token.changed ? 'v1.0 Before' : 'v2.0 Swatch'}
                    </span>
                    <code className="text-xs font-semibold">{token.v1Hex}</code>
                  </div>

                  {token.changed && (
                    <div
                      className="flex flex-1 flex-col justify-between border-l p-3"
                      style={{
                        borderColor: 'rgba(0,0,0,0.1)',
                        backgroundColor: token.v2Hex,
                        color: token.textColorOverride ?? '#FFFFFF',
                      }}
                    >
                      <span className="text-[10px] font-semibold tracking-wider uppercase opacity-90">
                        v2.0 Production
                      </span>
                      <code className="text-xs font-semibold">{token.v2Hex}</code>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-sm font-semibold" style={{ color: 'var(--text\\/primary)' }}>
                        {token.name}
                      </code>
                      {token.changed && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                          style={{
                            backgroundColor: 'var(--accent\\/subtle)',
                            color: 'var(--status\\/error-light)',
                          }}
                        >
                          v2.0 Upgraded
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs font-medium" style={{ color: 'var(--text\\/placeholder)' }}>
                      {token.semantic}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--text\\/secondary)' }}>
                      {token.role}
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t pt-3" style={{ borderColor: 'var(--bg\\/warm)' }}>
                    {token.ratios.map((r) => (
                      <div key={r.vs} className="flex items-center justify-between gap-2 text-xs">
                        <span style={{ color: 'var(--text\\/secondary)' }}>{r.vs}</span>
                        <ContrastBadge ratio={r.ratio} status={r.status} note={r.note} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: TYPOGRAPHY SCALE */}
        <section id="typography-scale" className="scroll-mt-24 space-y-8">
          <div className="border-b pb-4" style={{ borderColor: 'var(--border\\/subtle)' }}>
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: 'var(--text\\/secondary)' }}
            >
              Section 05 · Editorial Type System
            </span>
            <h2
              className="mt-1 text-3xl font-medium md:text-4xl"
              style={{ fontFamily: 'var(--font\\/serif)' }}
            >
              Typography Scale (Cormorant Garamond & DM Sans)
            </h2>
          </div>

          <div
            className="divide-y overflow-hidden rounded-2xl border"
            style={{ backgroundColor: 'var(--bg\\/primary)', borderColor: 'var(--border\\/subtle)' }}
          >
            {TYPOGRAPHY_SCALE.map((item) => (
              <div
                key={item.role}
                className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-12 lg:items-center"
                style={{ borderColor: 'var(--border\\/subtle)' }}
              >
                <div className="space-y-1 lg:col-span-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: 'var(--text\\/primary)' }}>
                      {item.role}
                    </span>
                    <span
                      className="rounded px-2 py-0.5 text-[11px]"
                      style={{
                        backgroundColor: 'var(--bg\\/warm)',
                        color: 'var(--text\\/secondary)',
                      }}
                    >
                      {item.family}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text\\/secondary)' }}>
                    Weight: {item.weight} · Size: <code>{item.size}</code>
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text\\/placeholder)' }}>
                    Token: <code>{item.token}</code> · Used in: <code>{item.component}</code>
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <div style={item.previewStyle}>{item.sample}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
