import React, { useCallback, useEffect, useRef } from 'react';

const ITEM_H = 48;
const PADDING_Y = ITEM_H * 2; // 2 items top/bottom for scroll snap centering
const VIEWPORT_HEIGHT = ITEM_H * 5; // 5 visible rows
const CATEGORIES = ['Restorative', 'Adventurous', 'Spiritual', 'Romantic', 'Cultural'] as const;

const SUBCATEGORIES: Record<(typeof CATEGORIES)[number], readonly string[]> = {
  Restorative: ['Recharged', 'Reconnected', 'At Peace', 'Renewed'],
  Adventurous: ['Energized', 'Challenged', 'Alive', 'Bold'],
  Spiritual: ['Grateful', 'Grounded', 'Transformed', 'Devoted'],
  Romantic: ['Enchanted', 'Intimate', 'Swept Away', 'Adored'],
  Cultural: ['Curious', 'Immersed', 'Enlightened', 'Inspired'],
};

export type IOSPickerHeroCategory = (typeof CATEGORIES)[number];

type IOSPickerHeroProps = {
  activeCategory: IOSPickerHeroCategory;
  onCategoryChange: (category: IOSPickerHeroCategory, nextFeelingIndex?: number | null) => void;
  activeFeelingIndex: number | null;
  onFeelingIndexChange: (index: number | null) => void;
};

type PickerColumnProps = {
  items: readonly string[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  scrollKey: string | number;
};

/** iOS-style drum: items above center use +rotateX, below use −rotateX. */
function getItemCylinderTransform(index: number, selectedIndex: number) {
  const distance = Math.abs(index - selectedIndex);
  if (distance === 0) {
    return { rotateXDeg: 0, opacity: 1, scale: 1 };
  }
  const sign = index < selectedIndex ? 1 : -1;
  if (distance === 1) {
    return { rotateXDeg: 18 * sign, opacity: 0.45, scale: 0.95 };
  }
  if (distance === 2) {
    return { rotateXDeg: 32 * sign, opacity: 0.22, scale: 0.88 };
  }
  return { rotateXDeg: 45 * sign, opacity: 0.1, scale: 0.8 };
}

function getItemTypography(distance: number) {
  if (distance === 0) {
    return { fontSize: 15, fontWeight: 500 as const };
  }
  if (distance === 1) {
    return { fontSize: 14, fontWeight: 400 as const };
  }
  return { fontSize: 13, fontWeight: 400 as const };
}

function PickerColumn({ items, selectedIndex, onSelectIndex, scrollKey }: PickerColumnProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<number>(0);
  const isProgrammaticScrollRef = useRef(false);

  const snapToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'auto') => {
      const el = scrollRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      isProgrammaticScrollRef.current = true;
      el.scrollTo({ top: clamped * ITEM_H, behavior });
      window.requestAnimationFrame(() => {
        isProgrammaticScrollRef.current = false;
      });
    },
    [items.length],
  );

  // Sync scroll when parent-driven index changes (e.g. category switch resets subcolumn)
  useEffect(() => {
    snapToIndex(selectedIndex);
  }, [scrollKey, selectedIndex, snapToIndex]);

  const flushScrollSelection = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(items.length - 1, idx));
    if (clamped !== selectedIndex) {
      onSelectIndex(clamped);
    }
    el.scrollTo({ top: clamped * ITEM_H, behavior: 'auto' });
  }, [items.length, onSelectIndex, selectedIndex]);

  const handleScroll = () => {
    if (isProgrammaticScrollRef.current) return;
    window.clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = window.setTimeout(() => {
      flushScrollSelection();
    }, 120);
  };

  useEffect(() => {
    return () => window.clearTimeout(scrollEndTimerRef.current);
  }, []);

  return (
    <div
      className="relative min-w-0 flex-1"
      style={{ height: VIEWPORT_HEIGHT, fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Selection highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 z-[2]"
        style={{
          top: '50%',
          height: ITEM_H,
          transform: 'translateY(-50%)',
          borderRadius: 100,
          backgroundColor: 'rgba(255,255,255,0.08)',
          border: '0.5px solid rgba(255,255,255,0.12)',
        }}
        aria-hidden
      />
      {/* Fade mask */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0) 100%)',
        }}
        aria-hidden
      />
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="relative z-[1] h-full w-full overflow-y-auto overscroll-y-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          scrollSnapType: 'y mandatory',
          perspective: '200px',
          transformStyle: 'preserve-3d',
          touchAction: 'none',
        }}
      >
        <div
          style={{
            paddingTop: PADDING_Y,
            paddingBottom: PADDING_Y,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((label, i) => {
            const distance = Math.abs(i - selectedIndex);
            const { rotateXDeg, opacity: rowOpacity, scale } = getItemCylinderTransform(
              i,
              selectedIndex,
            );
            const { fontSize, fontWeight } = getItemTypography(distance);
            return (
              <div
                key={`${label}-${i}`}
                className="flex items-center justify-center text-center"
                style={{
                  height: ITEM_H,
                  scrollSnapAlign: 'center',
                  transform: `rotateX(${rotateXDeg}deg) scale(${scale})`,
                  transformOrigin: 'center center',
                  opacity: rowOpacity,
                  transition: 'all 0.2s ease',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize,
                  fontWeight,
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function IOSPickerHero({
  activeCategory,
  onCategoryChange,
  activeFeelingIndex,
  onFeelingIndexChange,
}: IOSPickerHeroProps) {
  const categoryIndex = CATEGORIES.indexOf(activeCategory);
  const safeCategoryIndex = categoryIndex >= 0 ? categoryIndex : 0;
  const subs = SUBCATEGORIES[CATEGORIES[safeCategoryIndex]];
  const subCount = subs.length;

  const subSelected =
    activeFeelingIndex !== null && activeFeelingIndex >= 0 && activeFeelingIndex < subCount
      ? activeFeelingIndex
      : 0;

  const handleCategoryIndex = (idx: number) => {
    const cat = CATEGORIES[idx];
    if (!cat) return;
    if (cat === activeCategory) return;
    onCategoryChange(cat, 0);
  };

  const handleSubIndex = (idx: number) => {
    onFeelingIndexChange(idx);
  };

  return (
    <div
      className="mx-auto w-full max-w-[360px] px-1"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="flex w-full flex-row items-stretch justify-center">
        <PickerColumn
          items={CATEGORIES}
          selectedIndex={safeCategoryIndex}
          onSelectIndex={handleCategoryIndex}
          scrollKey={activeCategory}
        />
        <PickerColumn
          items={subs}
          selectedIndex={subSelected}
          onSelectIndex={handleSubIndex}
          scrollKey={activeCategory}
        />
      </div>
    </div>
  );
}
