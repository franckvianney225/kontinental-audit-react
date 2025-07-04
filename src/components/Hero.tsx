
const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-[#0B1C39] to-[#1a2f4a] text-white py-20 lg:py-32 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your trusted partner in
            <span className="text-[#D4AF37]"> Audit and Consulting</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            KL KONTINENTAL is your expert in audit, tax, and training services in Abidjan.
          </p>
          <button className="bg-[#D4AF37] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8941F] transition-all transform hover:scale-105 shadow-lg">
            Request a free diagnostic
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] rounded-full opacity-5 translate-y-1/2 -translate-x-1/2"></div>
    </section>
  );
};

export default Hero;
