import React from 'react';

const CATEGORIES = [
  {
    id: 'restorative',
    label: 'Restorative',
    imageUrl: '/assets/feelings/restorative.png',
    alt: 'Restorative peaceful calm water'
  },
  {
    id: 'adventurous',
    label: 'Adventurous',
    imageUrl: '/assets/feelings/adventurous.png',
    alt: 'Adventurous majestic mountain peak'
  },
  {
    id: 'spiritual',
    label: 'Spiritual',
    imageUrl: '/assets/feelings/spiritual.png',
    alt: 'Spiritual serene quiet nature'
  },
  {
    id: 'romantic',
    label: 'Romantic',
    imageUrl: '/assets/feelings/romantic.png',
    alt: 'Romantic intimate sunset'
  },
  {
    id: 'cultural',
    label: 'Cultural',
    imageUrl: '/assets/feelings/cultural.png',
    alt: 'Cultural historic street'
  }
];

export const FeelingCategories = () => {
  return (
    <section 
      id="feeling-categories-section"
      className="w-full flex flex-col items-center justify-center py-24 md:py-36 px-4 md:px-6"
      style={{ 
        backgroundColor: 'var(--bg\\/secondary)'
      }}
    >
      <div 
        id="feeling-categories-container"
        className="w-full max-w-7xl mx-auto flex flex-col items-center"
      >
        <span 
          id="feeling-categories-eyebrow"
          className="uppercase text-xs md:text-sm tracking-[0.2em] mb-12 md:mb-16 text-center"
          style={{ 
            color: 'var(--text\\/secondary)',
            fontFamily: "'DM Sans', sans-serif"
          }}
        >
          Explore by Feeling
        </span>

        {/* Categories Grid */}
        <div 
          id="feeling-categories-grid"
          className="flex flex-wrap md:flex-nowrap justify-center gap-3 md:gap-4 lg:gap-5 w-full"
        >
          {CATEGORIES.map((category) => (
            <div 
              key={category.id}
              id={`category-card-${category.id}`}
              className="relative w-[calc(50%-0.375rem)] md:w-auto md:flex-1 aspect-[3/4] md:aspect-[2/3] lg:aspect-[1/2] flex items-center justify-center overflow-hidden group cursor-pointer"
            >
              {/* Image Layer */}
              <img 
                id={`category-img-${category.id}`}
                src={category.imageUrl}
                alt={category.alt}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Dark Warm Overlay */}
              <div 
                id={`category-overlay-${category.id}`}
                className="absolute inset-0 transition-colors duration-500 group-hover:bg-opacity-40"
                style={{ 
                  backgroundColor: 'rgba(28, 20, 16, 0.45)' // Warm charcoal slate overlay
                }}
              />

              {/* Label Layer */}
              <span 
                id={`category-label-${category.id}`}
                className="relative z-10 text-white text-2xl md:text-3xl lg:text-4xl font-light tracking-wide drop-shadow-sm"
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif"
                }}
              >
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
