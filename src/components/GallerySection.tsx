import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const images = [
  // {
  //   url: '/images/herosection/hero1.png',
  //   shape: 'rectangle',
  //   legend: 'Audit comptable'
  // },
  {
    url: '/images/herosection/hero2.png',
    shape: 'triangle',
    legend: 'Analyse financière'
  },
  {
    url: '/images/herosection/hero3.png',
    shape: 'rectangle',
    legend: 'Audit organisationnel'
  },
  {
    url: '/images/herosection/hero5.jpg',
    shape: 'triangle',
    legend: 'Ressources humaines'
  },
  {
    url: '/images/herosection/hero6.jpg',
    shape: 'rectangle',
    legend: 'Système d\'information'
  },
  {
    url: '/images/herosection/hero7.jpg',
    shape: 'triangle',
    legend: 'Formation professionnelle'
  },
  {
    url: '/images/herosection/hero8.jpg',
    shape: 'rectangle',
    legend: 'Conseil juridique'
  },
  {
    url: '/images/herosection/hero9.jpg',
    shape: 'triangle',
    legend: 'Gestion de projet'
  },
  {
    url: '/images/herosection/hero10.jpg',
    shape: 'rectangle',
    legend: 'Stratégie d\'entreprise'
  },
  {
    url: '/images/herosection/hero11.jpg',
    shape: 'triangle',
    legend: 'Optimisation fiscale'
  },
  {
    url: '/images/herosection/hero12.jpg',
    shape: 'rectangle',
    legend: 'Contrôle interne'
  },
  // {
  //   url: '/images/herosection/hero13.jpg',
  //   shape: 'triangle',
  //   legend: 'Due diligence'
  // }
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
    <section className="gallery-section py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Nos Domaines d'Expertise</h2>
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
                          <p className="text-white text-center dark:text-opacity-90">
                            {img.legend} - {getRandomLegend()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex dark:text-white dark:border-white" />
            <CarouselNext className="hidden md:flex dark:text-white dark:border-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;