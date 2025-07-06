import React from 'react';

const ModernServices = () => {
  const services = [
    {
      title: "Audit Comptable & Financier",
      description: "Expertise approfondie en audit comptable et financier pour sécuriser vos opérations et optimiser votre performance financière.",
      stats: [
        { value: "500+", label: "Audits réalisés" },
        { value: "15+", label: "Années d'expérience" }
      ],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      themeColor: "bg-[#1e3a8a]"
    },
    {
      title: "Audit Organisationnel",
      description: "Analyse et optimisation de vos processus organisationnels pour améliorer l'efficacité et la productivité.",
      stats: [
        { value: "200+", label: "Organisations auditées" },
        { value: "85%", label: "Amélioration moyenne" }
      ],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      themeColor: "bg-[#166534]"
    },
    {
      title: "Audit Ressources Humaines",
      description: "Évaluation complète de vos pratiques RH pour optimiser la gestion des talents.",
      stats: [
        { value: "10K+", label: "Employés évalués" },
        { value: "95%", label: "Satisfaction client" }
      ],
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      themeColor: "bg-[#5b21b6]"
    },
    {
      title: "Audit Système d'Information",
      description: "Sécurisation et optimisation de vos systèmes informatiques pour garantir la performance.",
      stats: [
        { value: "150+", label: "Systèmes audités" },
        { value: "99%", label: "Sécurité garantie" }
      ],
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      themeColor: "bg-[#9d174d]"
    },
    {
      title: "Audit Fiscalité & Juridique",
      description: "Conformité fiscale et juridique complète pour protéger votre entreprise.",
      stats: [
        { value: "300+", label: "Audits fiscaux" },
        { value: "100%", label: "Conformité" }
      ],
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      themeColor: "bg-[#854d0e]"
    },
    {
      title: "Formation Professionnelle",
      description: "Programmes de formation sur mesure pour développer les compétences de vos équipes.",
      stats: [
        { value: "5K+", label: "Professionnels formés" },
        { value: "50+", label: "Programmes disponibles" }
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      themeColor: "bg-[#065f46]"
    },
    {
      title: "Audit Organisationnel",
      description: "Analyse et optimisation de vos processus organisationnels pour améliorer l'efficacité et la productivité.",
      stats: [
        { value: "200+", label: "Organisations auditées" },
        { value: "85%", label: "Amélioration moyenne" }
      ],
      icon: "🏢",
      themeColor: "bg-gradient-to-r from-green-500 to-green-700"
    },
    {
      title: "Audit Ressources Humaines",
      description: "Évaluation complète de vos pratiques RH pour optimiser la gestion des talents.",
      stats: [
        { value: "10K+", label: "Employés évalués" },
        { value: "95%", label: "Satisfaction client" }
      ],
      icon: "👥",
      themeColor: "bg-gradient-to-r from-purple-500 to-purple-700"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* En-tête */}
      <div className="relative py-20 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4">
        <h1 className="text-4xl font-bold mb-4">Nos Expertises en Audit</h1>
        <p className="text-xl">Des solutions sur mesure adaptées à vos besoins</p>
      </div>

      {/* Sections de services */}
      {services.map((service, index) => (
        <section key={index} className={`relative min-h-[80vh] flex items-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className={`container mx-auto flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            
            {/* Contenu texte */}
            <div className="md:w-1/2 p-8 md:p-12 z-10">
              <div className="text-5xl mb-6">{service.icon}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{service.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{service.description}</p>
              
              <div className="flex gap-8 mb-8">
                {service.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <span className={`block text-3xl font-bold ${service.themeColor.replace('bg-', 'text-')}`}>
                      {stat.value}
                    </span>
                    <span className="text-sm uppercase tracking-wider text-gray-500">{stat.label}</span>
                  </div>
                ))}
              </div>
              
              <button
                className={`px-8 py-3 rounded-full text-white font-semibold ${service.themeColor} transition-colors duration-300 hover:opacity-90`}
                aria-label={`En savoir plus sur ${service.title}`}
              >
                En savoir plus
              </button>
            </div>

            {/* Séparateur diagonal */}
            <div className={`hidden md:block absolute top-0 bottom-0 w-1/2 ${index % 2 === 0 ? 'left-0' : 'right-0'}`}>
              <div
                className={`absolute top-0 bottom-0 w-full ${service.themeColor} opacity-30`}
                style={{
                  transform: index % 2 === 0 ? 'skewX(10deg)' : 'skewX(-10deg)',
                  transformOrigin: index % 2 === 0 ? 'top left' : 'top right',
                  clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)'
                }}
              />
            </div>

            {/* Zone image */}
            <div className="md:w-1/2 h-64 md:h-[60vh] relative flex items-center justify-center">
              <div className="absolute w-[25rem] h-[35rem] overflow-hidden shadow-lg transition-all duration-200 hover:scale-[1.02]"
                   style={{
                     transform: index % 2 === 0 ? 'rotate(4deg)' : 'rotate(-4deg)',
                     margin: index % 2 === 0 ? '0 auto 0 3rem' : '0 3rem 0 auto',
                     zIndex: 10
                   }}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={384}
                  height={512}
                />
                <div className={`absolute inset-0 ${service.themeColor} opacity-20`}></div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA final */}
      <div className="py-20 text-center bg-gray-800 text-white px-4">
        <h2 className="text-3xl font-bold mb-6">Prêt à optimiser votre entreprise ?</h2>
        <button
          className="px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full text-lg font-semibold transition-colors duration-300 hover:from-blue-600 hover:to-blue-800"
          aria-label="Demander un audit gratuit"
        >
          Demander un audit
        </button>
      </div>
    </div>
  );
};

export default ModernServices;