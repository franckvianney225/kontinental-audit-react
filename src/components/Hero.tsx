
const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#0B1C39] text-white py-20 lg:py-32 mt-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-white/5 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-[#D4AF37]/20 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-down">
            KONTINENTAL
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Votre Partenaire de Confiance en Audit et Formation
          </p>
          <button className="bg-[#ff6b6b] text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-[#ff5252] transition-all transform hover:scale-105 hover:-translate-y-1 shadow-lg animate-pulse-glow opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Contactez-nous
          </button>
        </div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50/20 to-transparent"></div>
    </section>
  );
};

export default Hero;
