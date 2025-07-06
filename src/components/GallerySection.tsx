import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const images = [
  { 
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format',
    shape: 'rectangle',
    legend: 'Audit comptable'
  },
  {
    url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format', 
    shape: 'triangle',
    legend: 'Analyse financière'
  },
  {
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format',
    shape: 'rectangle', 
    legend: 'Audit organisationnel'
  },
  {
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format',
    shape: 'triangle',
    legend: 'Ressources humaines' 
  },
  {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format',
    shape: 'rectangle',
    legend: 'Système d\'information'
  },
  {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format',
    shape: 'triangle',
    legend: 'Formation professionnelle'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format',
    shape: 'rectangle',
    legend: 'Conseil juridique'
  }
];

const autoplayOptions = {
  delay: 3000,
  stopOnInteraction: false
};

const GallerySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const randomLegends = [
    "Expertise certifiée",
    "Solutions sur mesure", 
    "Approche personnalisée",
    "Méthodologie éprouvée"
  ];

  const getRandomLegend = () => {
    return randomLegends[Math.floor(Math.random() * randomLegends.length)];
  };

  return (
    <section className="gallery-section py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos Domaines d'Expertise</h2>
        <div className="relative w-full max-w-4xl mx-auto">
          <Carousel 
            plugins={[Autoplay(autoplayOptions)]}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index} className="relative">
                  <div 
                    className={`p-1 ${img.shape === 'triangle' ? 'clip-triangle' : ''}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="flex aspect-video items-center justify-center relative">
                      <img
                        src={img.url}
                        alt={img.legend}
                        className={`h-full w-full object-cover rounded-lg transition-all duration-300 ${hoveredIndex === index ? 'scale-105' : ''}`}
                        loading="lazy"
                      />
                      {hoveredIndex === index && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 rounded-lg">
                          <p className="text-white text-center">
                            {img.legend} - {getRandomLegend()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;