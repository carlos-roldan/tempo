# Tempo Design System & Governance Guidelines

This project uses the **Tempo v2.0 Design System**. Please read these rules in full before modifying or creating any UI components or styles.

**MUST READ IN FULL**

- [Tempo Guidelines](../src/Tempo/guidelines/Guidelines.md) — Core Tempo design system & governance rules
- [Token Guidelines](./tokens.md) — Semantic token reference (`src/Tempo/styles.css`)

---

## Mandatory Governance Rules

1. **Use Semantic Tokens Exclusively (`src/Tempo/styles.css`)**:
   - **Never hardcode hex (`#...`), `rgb(...)`, `rgba(...)`, or font-family strings** inside production application components (`src/app/components/**`).
   - All colors, surfaces, media scrims, borders, opacities, and font families **must** reference CSS custom properties defined in [`src/Tempo/styles.css`](../src/Tempo/styles.css) (e.g. `var(--bg\/primary)`, `var(--text\/on-accent)`, `var(--accent\/default)`, `var(--scrim\/hero)`, `var(--font\/serif)`).
2. **WCAG 2.1 AA/AAA Contrast Compliance**:
   - Normal text must maintain **≥ 4.5:1** contrast (`AAA` ≥ 7.0:1 preferred).
   - Large display text (≥ 24px or ≥ 18.66px medium/bold) and interactive UI borders/controls must maintain **≥ 3.0:1** contrast.
   - Gold accent fills (`var(--accent\/default): #C9973A`) must always pair with dark espresso text (`var(--text\/on-accent): #1C1410`, **6.89:1 AA**) and luminous gold hover (`var(--accent\/hover): #DEB04E`, **9.01:1 AAA**).
   - Media scrim overlays (`--scrim/category: 0.58`, `--scrim/hero: 0.60`, `--scrim/featured: 0.65`) must guarantee ≥ 4.5:1 contrast even over bright photo/video highlights.
3. **Keep `/design-system` Synced**:
   - Any addition or modification to tokens in [`src/Tempo/styles.css`](../src/Tempo/styles.css), typography scale, or component surface treatments **must** be updated in [`src/app/components/DesignSystem.tsx`](../src/app/components/DesignSystem.tsx) so the live unlisted `/design-system` showcase route remains 100% in sync with production.
   - `/design-system` must remain accessible in production builds as an unlisted showcase URL (`<meta name="robots" content="noindex, nofollow" />`).
