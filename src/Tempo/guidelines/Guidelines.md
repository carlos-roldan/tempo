# Tempo v2.0 Design System Guidelines

All components in the Tempo repository must adhere to the following rules:

1. **Single Source of Truth (`src/Tempo/styles.css`)**:
   - Never introduce hardcoded hex (`#...`), `rgb(...)`, `rgba(...)`, or font-family strings inside application components (`src/app/components/**`).
   - Always consume semantic CSS custom properties from `src/Tempo/styles.css`.
2. **Synchronized `/design-system` Showcase**:
   - Whenever a token in `src/Tempo/styles.css`, a typography style, or a component surface/contrast treatment changes, update `src/app/components/DesignSystem.tsx` in the same commit so `/design-system` remains an accurate, live production reference.
   - Keep `/design-system` accessible in production builds with `<meta name="robots" content="noindex, nofollow" />`.
3. **Accessibility & Contrast Standards**:
   - Gold buttons and selected pills use **Option A**: `--accent/default` (`#C9973A`) background with `--text/on-accent` (`#1C1410`) text (**6.89:1 AA**) and `--accent/hover` (`#DEB04E`) hover (**9.01:1 AAA**).
   - Media scrims must use `--scrim/category` (`0.58`), `--scrim/hero` (`0.60`), or `--scrim/featured` (`0.65`) to guarantee ≥ 4.5:1 text contrast over bright media highlights.
