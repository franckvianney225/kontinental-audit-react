import React, { useEffect, useState } from 'react';
import { Award, MapPin, TrendingUp, Users, Target, Clock, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    // Animation des statistiques
    const timer = setTimeout(() => {
      setAnimatedStats([15, 200, 500, 1000]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      number: "15+",
      label: "Années d'expérience",
      icon: <Clock className="w-6 h-6 text-white" />,
      description: "Expertise accumulée depuis 2008",
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "200+",
      label: "Clients satisfaits",
      icon: <Users className="w-6 h-6 text-white" />,
      description: "Entreprises de tous secteurs",
      color: "from-green-500 to-green-600"
    },
    {
      number: "500+",
      label: "Missions réalisées",
      icon: <Target className="w-6 h-6 text-white" />,
      description: "Audits et consultations",
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "1000+",
      label: "Heures de formation",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      description: "Professionnels formés",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const advantages = [
    "Expertise reconnue depuis plus de 15 ans",
    "Équipe de professionnels certifiés",
    "Approche personnalisée pour chaque client",
    "Solutions adaptées aux enjeux actuels",
    "Accompagnement complet et suivi régulier",
    "Présence locale avec vision internationale"
  ];

  const values = [
    {
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque mission",
      icon: <Award className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Intégrité",
      description: "Transparence et éthique dans nos relations",
      icon: <CheckCircle className="w-8 h-8 text-green-600" />
    },
    {
      title: "Innovation",
      description: "Solutions modernes et méthodes avant-gardistes",
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h1 className={`text-5xl md:text-6xl font-extrabold mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-400 dark:to-orange-600">
                À PROPOS DE KL
              </span>
            </h1>
            <p className={`text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 mt-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Votre partenaire de confiance pour l'audit et la formation en Côte d'Ivoire depuis plus de 15 ans
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-6 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-500 hover:transform hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color} mb-4 w-fit`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-gray-700 dark:text-gray-300 font-medium mb-2">{stat.label}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Notre Histoire
                </h2>
                <div className="space-y-6 text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    Depuis plus de 15 ans, KONTINENTAL (KL) s'impose comme un acteur incontournable dans le domaine de l'audit et de la formation en Côte d'Ivoire. Notre expertise multidisciplinaire nous permet d'accompagner les entreprises dans leur développement et leur mise en conformité.
                  </p>
                  <p>
                    Basée à Abidjan, notre équipe d'experts qualifiés met son savoir-faire au service de votre réussite. Nous combinons rigueur méthodologique et approche personnalisée pour répondre aux besoins spécifiques de chaque client.
                  </p>
                  <p>
                    Notre mission est de créer de la valeur ajoutée pour nos clients en leur fournissant des solutions d'audit et de formation adaptées aux enjeux actuels du monde des affaires.
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-slate-50 dark:bg-gray-700 p-6 rounded-2xl border border-slate-200 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Nous Contacter</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-600 dark:text-gray-300">
                    <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                    <span>ABIDJAN MARCORY, Avenue TSF, en face de l'Église Sainte Thérèse</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-gray-300">
                    <Phone className="w-5 h-5 mr-3 text-green-600" />
                    <span>+225 XX XX XX XX XX</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-gray-300">
                    <Mail className="w-5 h-5 mr-3 text-purple-600" />
                    <span>contact@kontinental.ci</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              {/* Values */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Nos Valeurs</h3>
                <div className="grid gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex-shrink-0 mt-1">
                        {value.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{value.title}</h4>
                        <p className="text-slate-600 dark:text-gray-300">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advantages */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Pourquoi Nous Choisir ?</h3>
                <div className="grid gap-3">
                  {advantages.map((advantage, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-gray-300">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-3xl text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700/30 to-purple-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 className="text-3xl font-bold mb-4">Prêt à Commencer ?</h3>
            <p className="text-xl mb-8 text-white/90">
              Contactez-nous dès aujourd'hui pour discuter de vos besoins en audit et formation
            </p>
            <a href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center space-x-2 hover:transform hover:scale-105 hover:shadow-lg relative z-10">
              <span>Nous Contacter</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
