import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const images = [
  '/images/herosection/hero1.png',
  '/images/herosection/hero2.png',
  '/images/herosection/hero3.png',
  '/images/herosection/hero7.jpg',
  '/images/herosection/hero9.jpg',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 9000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[50vh] md:h-[90vh] overflow-hidden dark:bg-gray-900">
      <div className="relative h-full w-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
              style={{ 
                objectPosition: '50% 30%' // Descend plus l'image pour voir le visage complet
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="h-full flex items-center justify-center bg-gradient-to-b from-black/40 to-black/70 dark:from-black/50 dark:to-black/80">
          <div className="text-center text-white max-w-xs sm:max-w-md md:max-w-2xl px-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              KONTINENTAL
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 drop-shadow">
              Experts en audit et formation
            </p>
            <div className="flex gap-4 justify-center">
              <button className="pointer-events-auto px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
                Nos services
              </button>
              <Link
                to="/contact"
                className="pointer-events-auto px-4 py-2 sm:px-6 sm:py-3 bg-transparent border-2 border-white hover:bg-white/10 rounded-lg font-medium transition-all"
              >
                Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}