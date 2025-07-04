
import { FileText, Users, Shield, Calculator, GraduationCap, Building } from 'lucide-react';

const Intro = () => {
  const services = [
    {
      icon: <FileText className="w-12 h-12 text-[#667eea]" />,
      title: "Audit Comptable & Financier",
      description: "Expertise approfondie en audit comptable et financier pour sécuriser vos opérations et optimiser votre performance financière."
    },
    {
      icon: <Building className="w-12 h-12 text-[#667eea]" />,
      title: "Audit Organisationnel", 
      description: "Analyse et optimisation de vos processus organisationnels pour améliorer l'efficacité et la productivité de votre entreprise."
    },
    {
      icon: <Users className="w-12 h-12 text-[#667eea]" />,
      title: "Audit Ressources Humaines",
      description: "Évaluation complète de vos pratiques RH pour optimiser la gestion des talents et améliorer la satisfaction des employés."
    },
    {
      icon: <Shield className="w-12 h-12 text-[#667eea]" />,
      title: "Audit Système d'Information",
      description: "Sécurisation et optimisation de vos systèmes informatiques pour garantir la performance et la sécurité de vos données."
    },
    {
      icon: <Calculator className="w-12 h-12 text-[#667eea]" />,
      title: "Audit Fiscalité & Juridique",
      description: "Conformité fiscale et juridique complète pour protéger votre entreprise et optimiser votre situation légale."
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-[#667eea]" />,
      title: "Formation Professionnelle",
      description: "Programmes de formation sur mesure pour développer les compétences de vos équipes et accompagner votre croissance."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-6 relative">
            Nos Services
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 relative overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="text-center relative z-10">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2c3e50] mb-4 group-hover:text-[#667eea] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              {/* Card hover border gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#667eea] to-[#764ba2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <div className="absolute inset-[2px] rounded-2xl bg-white"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;
