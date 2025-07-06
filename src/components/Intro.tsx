import { FileText, Users, Shield, Calculator, GraduationCap, Building, ArrowRight } from 'lucide-react';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    icon: <FileText className="w-12 h-12 text-blue-600" />,
    title: "Audit Comptable & Financier",
    description: "Expertise approfondie en audit comptable et financier pour sécuriser vos opérations et optimiser votre performance financière.",
    borderColor: "border-l-blue-500"
  },
  {
    icon: <Building className="w-12 h-12 text-green-600" />,
    title: "Audit Organisationnel",
    description: "Analyse et optimisation de vos processus organisationnels pour améliorer l'efficacité et la productivité de votre entreprise.",
    borderColor: "border-l-green-500"
  },
  {
    icon: <Users className="w-12 h-12 text-purple-600" />,
    title: "Audit Ressources Humaines",
    description: "Évaluation complète de vos pratiques RH pour optimiser la gestion des talents et améliorer la satisfaction des employés.",
    borderColor: "border-l-purple-500"
  },
  {
    icon: <Shield className="w-12 h-12 text-red-600" />,
    title: "Audit Système d'Information",
    description: "Sécurisation et optimisation de vos systèmes informatiques pour garantir la performance et la sécurité de vos données.",
    borderColor: "border-l-red-500"
  },
  {
    icon: <Calculator className="w-12 h-12 text-orange-600" />,
    title: "Audit Fiscalité & Juridique",
    description: "Conformité fiscale et juridique complète pour protéger votre entreprise et optimiser votre situation légale.",
    borderColor: "border-l-orange-500"
  },
  {
    icon: <GraduationCap className="w-12 h-12 text-indigo-600" />,
    title: "Formation Professionnelle",
    description: "Programmes de formation sur mesure pour développer les compétences de vos équipes et accompagner votre croissance.",
    borderColor: "border-l-indigo-500"
  }
];

const Intro = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
<div id="services" className="relative bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 py-16">
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMEg0MFY0MEgweiIvPjwvc3ZnPg==')] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
              NOS EXPERTISES EN AUDIT
            </span>
          </h2>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mt-4">
            Des solutions sur mesure adaptées à vos besoins spécifiques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={`service-${index}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`group bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-sm dark:shadow-gray-700/30 border-l-4 ${service.borderColor} hover:shadow-2xl hover:-translate-y-2 hover:scale-105 hover:z-10 transition-all duration-300 cursor-pointer h-full flex flex-col`}
            >
              <div className="flex flex-col items-start">
                <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-full transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
                {/* <a href="#contact" className="text-blue-600 hover:underline text-sm font-medium flex items-center">
                  En savoir plus <ArrowRight className="ml-1 w-4 h-4" />
                </a> */}
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-800 hover:scale-[1.02] transition-all duration-300 shadow-md dark:shadow-blue-900/50 hover:shadow-lg">
            Demander un audit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;