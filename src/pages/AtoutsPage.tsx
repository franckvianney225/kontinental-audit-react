import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';



const AtoutsPage = () => {
  const [hoveredExpertise, setHoveredExpertise] = useState(null);
  const [hoveredDomaine, setHoveredDomaine] = useState(null);

  const expertiseItems = [
    {
      id: 1,
      title: "Évaluation & Gestion de projet",
      description: "Pilotage et suivi de projets complexes avec méthodologies éprouvées",
      icon: "📊",
      color: "bg-gradient-to-br from-purple-500 to-purple-700"
    },
    {
      id: 2,
      title: "Audit Organisationnel & Opérationnel",
      description: "Analyse approfondie des processus et structures organisationnelles",
      icon: "🔍",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-700"
    },
    {
      id: 3,
      title: "Assistance Systèmes Informatiques",
      description: "Mise en place et optimisation de solutions technologiques",
      icon: "💻",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-700"
    },
    {
      id: 4,
      title: "Élaboration Manuel de Procédures",
      description: "Création de guides opérationnels et documentation technique",
      icon: "📋",
      color: "bg-gradient-to-br from-amber-500 to-amber-700"
    },
    {
      id: 5,
      title: "Renforcement Capacités de Gestion",
      description: "Formation et accompagnement des équipes managériales",
      icon: "🎯",
      color: "bg-gradient-to-br from-red-500 to-red-700"
    },
    {
      id: 6,
      title: "Assistance Plan Stratégique",
      description: "Élaboration de stratégies à long terme et planification",
      icon: "🚀",
      color: "bg-gradient-to-br from-orange-500 to-orange-700"
    },
    {
      id: 7,
      title: "Assistance Business Plan",
      description: "Confection de plans d'affaires et études de faisabilité",
      icon: "💼",
      color: "bg-gradient-to-br from-rose-500 to-rose-700"
    },
    {
      id: 8,
      title: "Audit Ressources Humaines",
      description: "Évaluation et optimisation de la gestion du capital humain",
      icon: "👥",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-700"
    }
  ];

  const domaineItems = [
    {
      id: 1,
      title: "Sécurité",
      description: "Solutions de sécurité et gestion des risques",
      icon: "🛡️",
      color: "bg-gradient-to-br from-gray-600 to-gray-800"
    },
    {
      id: 2,
      title: "Assurances",
      description: "Conseil en assurance et gestion des sinistres",
      icon: "🏛️",
      color: "bg-gradient-to-br from-lime-500 to-lime-700"
    },
    {
      id: 3,
      title: "Banque",
      description: "Services bancaires et financiers",
      icon: "🏦",
      color: "bg-gradient-to-br from-green-500 to-green-700"
    },
    {
      id: 4,
      title: "Micro Finance",
      description: "Solutions de microfinancement et inclusion financière",
      icon: "💰",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600"
    },
    {
      id: 5,
      title: "Textile",
      description: "Industrie textile et confection",
      icon: "🧵",
      color: "bg-gradient-to-br from-yellow-500 to-yellow-700"
    },
    {
      id: 6,
      title: "Télécom",
      description: "Télécommunications et technologies de l'information",
      icon: "📱",
      color: "bg-gradient-to-br from-amber-500 to-amber-700"
    },
    {
      id: 7,
      title: "Transport",
      description: "Logistique et solutions de transport",
      icon: "🚛",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-700"
    },
    {
      id: 8,
      title: "Hôtellerie & Tourisme",
      description: "Secteur hôtelier et développement touristique",
      icon: "🏨",
      color: "bg-gradient-to-br from-purple-500 to-purple-700"
    },
    {
      id: 9,
      title: "Filière Café",
      description: "Production et transformation du café",
      icon: "☕",
      color: "bg-gradient-to-br from-amber-800 to-amber-900"
    },
    {
      id: 10,
      title: "Santé",
      description: "Services de santé et bien-être",
      icon: "🏥",
      color: "bg-gradient-to-br from-emerald-600 to-emerald-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            NOS ATOUTS
          </h1>
          <div className="w-32 h-1 bg-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed">
            Une expertise reconnue dans le pilotage de projets complexes
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-800 via-blue-600 to-orange-600 bg-clip-text text-transparent">
              Notre Excellence
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-orange-200/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  Pluralité d'Expertises
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  <span className="font-bold text-orange-600 dark:text-orange-400">KONTINENTAL</span> offre une pluralité de compétences dans les services d'audit financier et de conseil en gestion.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-blue-200/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Consultants Confirmés
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Notre cabinet regroupe plusieurs consultants confirmés, avec des expertises spécifiques et complémentaires. Ils ont réalisé d'importantes missions auprès d'entreprises publiques et privées ainsi que des collectivités en Côte d'Ivoire et dans la sous-région.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-purple-200/50 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1a2 2 0 104 0V4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  Solutions Sur Mesure
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  Nous proposons des solutions sur mesure combinant l'ensemble de nos expertises requises dans le cadre de chaque mission.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom decorative line */}
          <div className="mt-20 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-orange-600 dark:text-orange-400">
              Notre Expertise
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez nos domaines d'expertise qui font notre force
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseItems.map((item) => (
              <div
                key={item.id}
                className={`${item.color} rounded-2xl p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 group`}
                onMouseEnter={() => setHoveredExpertise(item.id)}
                onMouseLeave={() => setHoveredExpertise(null)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 group-hover:text-yellow-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className={`text-sm opacity-90 transition-all duration-300 ${
                    hoveredExpertise === item.id ? 'opacity-100' : 'opacity-75'
                  }`}>
                    {item.description}
                  </p>
                </div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domaines de compétences Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-orange-600 dark:text-orange-400">
              Domaines de Compétences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Nos expériences sectorielles couvrent un large éventail d'industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {domaineItems.map((item) => (
              <div
                key={item.id}
                className={`${item.color} rounded-xl p-6 text-white cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:-translate-y-3 group relative overflow-hidden`}
                onMouseEnter={() => setHoveredDomaine(item.id)}
                onMouseLeave={() => setHoveredDomaine(null)}
              >
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative text-center">
                  <div className="text-3xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className={`text-xs transition-all duration-300 ${
                    hoveredDomaine === item.id ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
                  } overflow-hidden`}>
                    {item.description}
                  </p>
                </div>
                
                {/* Pulse effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à découvrir notre expertise ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contactez-nous pour discuter de vos besoins spécifiques
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
            Nous contacter
          </button>
        </div>
      </section>
        <Footer />
    </div>
  );
};

export default AtoutsPage;