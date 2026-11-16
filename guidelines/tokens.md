# Tempo v2.0 Semantic Token Reference (`src/Tempo/styles.css`)

All UI components in `src/app/components/` must use the semantic tokens defined in [`src/Tempo/styles.css`](../src/Tempo/styles.css) rather than hardcoded hex/RGB/RGBA values or raw font strings. Any token updates must also be reflected on the `/design-system` showcase route ([`src/app/components/DesignSystem.tsx`](../src/app/components/DesignSystem.tsx)).

---

## 1. Backgrounds, Surfaces & Media Scrims

| Semantic Token | Value / Reference | Purpose & WCAG Notes |
| :--- | :--- | :--- |
| `--bg/primary` | `var(--nuetral/white)` (`#FFFFFF`) | Primary light section background (`EmailCapture`) |
| `--bg/secondary` | `var(--nuetral/50)` (`#FAFAF8`) | Warm off-white section background (`HowItWorks`, `FeelingCategories`, `Testimonial`) |
| `--bg/warm` | `var(--nuetral/100)` (`#F5F0E8`) | Warm parchment surface |
| `--bg/inverse` | `var(--nuetral/900)` (`#1C1410`) | Deep espresso background (`Hero`, `FooterCTA`, `LeadCaptureModal`) |
| `--scrim/category` | `rgba(28, 20, 16, 0.58)` | `FeelingCategories` card overlay (≥ 4.54:1 min over white highlights) |
| `--scrim/hero` | `rgba(28, 20, 16, 0.60)` | `Hero` video/poster overlay (≥ 4.76:1 min over white highlights) |
| `--scrim/featured` | `rgba(28, 20, 16, 0.65)` | `FeaturedJourney` image overlay (≥ 5.66:1 min) |
| `--scrim/modal-backdrop` | Radial dark backdrop | `LeadCaptureModal` blurred backdrop |
| `--surface/glass-subtle` | `rgba(255, 255, 255, 0.06)` | Dark modal input field fill |
| `--surface/glass-hover` | `rgba(255, 255, 255, 0.10)` | Ghost button hover fill on dark surfaces |
| `--surface/glass-picker` | `rgba(255, 255, 255, 0.15)` | `IOSPickerHero` center selection pill fill |
| `--surface/glass-tag-hover` | `rgba(255, 255, 255, 0.20)` | Unselected Hero feeling pill hover fill |

---

## 2. Text & Opacity Hierarchy Tokens

| Semantic Token | Value / Reference | Contrast Ratio | Usage |
| :--- | :--- | :--- | :--- |
| `--text/primary` | `var(--nuetral/900)` (`#1C1410`) | **17.37:1 – 18.15:1 (AAA)** | Primary headlines & body on light surfaces |
| `--text/secondary` | `var(--nuetral/600)` (`#594736`) | **8.45:1 – 8.83:1 (AAA)** | Secondary body copy, eyebrows, citations on light surfaces |
| `--text/placeholder` | `var(--nuetral/400)` (`#756350`) | **5.49:1 – 5.74:1 (AA / AAA Large)** | `HowItWorks` step numbers & light-surface input placeholders |
| `--text/inverse` | `var(--nuetral/white)` (`#FFFFFF`) | **18.15:1 (AAA)** | Primary headlines & labels on dark surfaces |
| `--text/on-accent` | `var(--nuetral/900)` (`#1C1410`) | **6.89:1 (AA) / 9.01:1 hover (AAA)** | Button & selected pill text on `--accent/default` gold (Option A) |
| `--text/inverse-warm` | `var(--nuetral/100)` (`#F5F0E8`) | **16.00:1 (AAA)** | Hero italic eyebrow & FeaturedJourney body/tags |
| `--text/inverse-eyebrow` | `var(--nuetral/200)` (`#E8DDD0`) | **13.56:1 (AAA)** | FeaturedJourney uppercase eyebrow |
| `--text/inverse-secondary` | `rgba(255, 255, 255, 0.75)` | **10.45:1 (AAA)** | Hero footnote & `LeadCaptureModal` body copy |
| `--text/inverse-muted` | `rgba(255, 255, 255, 0.65)` | **8.13:1 (AAA)** | Footer copyright, Hero video pause button, modal close icon |
| `--text/inverse-subtle` | `rgba(255, 255, 255, 0.60)` | **7.07:1 (AAA)** | Footer eyebrow & inactive Hero category tabs |
| `--text/inverse-placeholder` | `rgba(255, 255, 255, 0.55)` | **5.72:1 (AA)** | `LeadCaptureModal` email input placeholder |
| `--opacity/picker-selected` | `1` | **18.15:1 (AAA)** | `IOSPickerHero` center active row (`distance === 0`) |
| `--opacity/picker-near` | `0.55` | **6.12:1 (AA)** | `IOSPickerHero` adjacent row (`distance === 1`) |
| `--opacity/picker-far` | `0.45` | **4.52:1 (AA)** | `IOSPickerHero` outer visible row (`distance === 2`) |

---

## 3. Accents, Status & Borders

| Semantic Token | Value / Reference | Contrast Ratio | Usage |
| :--- | :--- | :--- | :--- |
| `--accent/default` | `var(--gold/500)` (`#C9973A`) | **6.89:1 w/ `--text/on-accent`** | Primary gold CTA buttons & selected feeling pills |
| `--accent/hover` | `var(--gold/400)` (`#DEB04E`) | **9.01:1 w/ `--text/on-accent`** | Hover state for gold CTA buttons & selected pills |
| `--accent/editorial-quote` | `var(--gold/600)` (`#9A7B4F`) | **3.78:1 (AA Large)** | `Testimonial` decorative quote mark |
| `--accent/inverse-eyebrow` | `var(--gold/400)` (`#DEB04E`) | **9.01:1 (AAA)** | `LeadCaptureModal` "COMING SOON" eyebrow |
| `--status/error-light` | `var(--gold/700)` (`#8B6420`) | **5.33:1 (AA)** | Validation error text on light surfaces (`EmailCapture`) |
| `--status/error-dark` | `var(--gold/400)` (`#DEB04E`) | **9.01:1 (AAA)** | Validation error text on dark surfaces (`LeadCaptureModal`) |
| `--border/default` | `var(--nuetral/300)` (`#8F7E6A`) | **3.92:1 (AA UI)** | Form input & outline button borders on light surfaces |
| `--border/subtle` | `var(--nuetral/200)` (`#E8DDD0`) | Decorative | Subtle section/card dividers on light surfaces |
| `--border/inverse-interactive` | `rgba(255, 255, 255, 0.45)` | **4.52:1 (AA UI)** | Unselected Hero feeling pills, modal input border, iOS picker bar |

---

## 4. Typography Tokens

- `--font/serif`: `'Cormorant Garamond', serif` — Display headlines (`H1`, `H2`), blockquotes, step numbers, feeling card labels, and brand wordmark.
- `--font/sans`: `'DM Sans', sans-serif` — UI controls, body copy, step headlines (`H3`), eyebrows, form inputs, and footnotes.
