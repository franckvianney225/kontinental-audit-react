
import { Award, MapPin, TrendingUp, Users, Target, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "15+", label: "Années d'expérience", icon: <Clock className="w-6 h-6" /> },
    { number: "200+", label: "Clients satisfaits", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Missions réalisées", icon: <Target className="w-6 h-6" /> },
    { number: "1000+", label: "Heures de formation", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-6 relative">
            À Propos de KONTINENTAL
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              Depuis plus de 15 ans, KONTINENTAL (KL) s'impose comme un acteur incontournable dans le domaine de l'audit et de la formation en Côte d'Ivoire. Notre expertise multidisciplinaire nous permet d'accompagner les entreprises dans leur développement et leur mise en conformité.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Basée à Abidjan, notre équipe d'experts qualifiés met son savoir-faire au service de votre réussite. Nous combinons rigueur méthodologique et approche personnalisée pour répondre aux besoins spécifiques de chaque client.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Notre mission est de créer de la valeur ajoutée pour nos clients en leur fournissant des solutions d'audit et de formation adaptées aux enjeux actuels du monde des affaires.
            </p>
            
            <div className="flex items-center text-gray-600 pt-4">
              <MapPin className="w-5 h-5 mr-2 text-[#D4AF37]" />
              <span>ABIDJAN MARCORY, Avenue TSF, en face de l'Église Sainte Thérèse</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group bg-gradient-to-br from-[#667eea] to-[#764ba2] p-6 rounded-2xl text-white text-center hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex justify-center mb-3 text-white/80 group-hover:text-white transition-colors">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-sm opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-center text-[#2c3e50] mb-12">Notre Équipe Dirigeante</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  YA
                </div>
                <h4 className="text-xl font-bold text-[#2c3e50] mb-2">YAO ALPHONSE</h4>
                <p className="text-[#667eea] font-semibold mb-4">Associé Gérant</p>
                <p className="text-gray-600 leading-relaxed">
                  Expert en audit financier et comptable avec plus de 20 ans d'expérience dans l'accompagnement des entreprises.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold">
                  SJL
                </div>
                <h4 className="text-xl font-bold text-[#2c3e50] mb-2">SEHR JEAN-LOUIS</h4>
                <p className="text-[#667eea] font-semibold mb-4">Associé Gérant</p>
                <p className="text-gray-600 leading-relaxed">
                  Spécialiste en audit organisationnel et formation, reconnu pour son approche innovante et pragmatique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
