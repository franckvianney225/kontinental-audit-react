import React, { useState } from 'react';
import { Building2, FileText, Award, MapPin, Calendar, ChevronRight } from 'lucide-react';

const ReferencesSection = () => {
  const referencesByCategory = {
    audits: [
      { client: "Menzies Aviation", mission: "Inventaire et étiquetage des immobilisations", location: "Abidjan", period: "Mai 2025", status: "completed" },
      { client: "EMUCI", mission: "Audit organisationnel", location: "Abidjan", period: "Août 2024", status: "completed" },
      { client: "CCI-CI", mission: "Business plan pour construction pôle de formation", location: "Abidjan", period: "Mars 2023", status: "completed" },
      { client: "SODISTRA", mission: "Rédaction manuel de procédures", location: "Abidjan", period: "Juin 2021", status: "completed" },
      { client: "SONAL/SASCI", mission: "Rédaction manuel procédures administratives", location: "Abidjan", period: "Octobre 2020", status: "completed" }
    ],
    agrements: [
      { client: "DCH-CP", mission: "Dossier d'agrément", sector: "Agro-industrie", period: "En cours", status: "ongoing" },
      { client: "MINYUAN WOOD", mission: "Dossier d'agrément", sector: "Agro-industrie", period: "En cours", status: "ongoing" },
      { client: "SARA PETROLEUM", mission: "Dossier d'agrément", sector: "Hydrocarbure", period: "Juin 2022", status: "completed" }
    ],
    sousTraitance: [
      { client: "CNPS", mission: "Évaluation charge de travail", location: "Abidjan", period: "Février 2023", status: "completed" },
      { client: "LONACI", mission: "Benchmark DSI sociétés de loteries", location: "Abidjan", period: "Mars 2022", status: "completed" },
      { client: "CEDEAO", mission: "Audit administratif OOAS", location: "Burkina Faso", period: "2007", status: "completed" }
    ]
  };

  const [activeTab, setActiveTab] = useState('audits');
  const [hoveredCard, setHoveredCard] = useState(null);

  const categoryInfo = {
    audits: {
      title: "Audits & Évaluations",
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      description: "Audits organisationnels et évaluations"
    },
    agrements: {
      title: "Agréments CEPICI",
      icon: <Award className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-600",
      description: "Dossiers d'agrément sectoriels"
    },
    sousTraitance: {
      title: "Sous-traitance",
      icon: <Building2 className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      description: "Missions en sous-traitance"
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'ongoing') {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
          <div className="w-2 h-2 bg-amber-400 rounded-full mr-1.5 animate-pulse"></div>
          En cours
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
        <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
        Terminé
      </span>
    );
  };

  return (
    <section id="references" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Références</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Découvrez notre expertise à travers nos collaborations avec des entreprises de renom
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categoryInfo).map(([key, info]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === key
                  ? `bg-gradient-to-r ${info.color} text-white shadow-lg shadow-blue-500/25`
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${activeTab === key ? 'bg-white/20' : 'bg-slate-100'}`}>
                {info.icon}
              </div>
              <div className="text-left">
                <div className="font-bold">{info.title}</div>
                <div className={`text-sm ${activeTab === key ? 'text-white/80' : 'text-slate-500'}`}>
                  {info.description}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="relative">
          {Object.entries(referencesByCategory).map(([category, refs]) => (
            <div
              key={category}
              className={`transition-all duration-500 ${
                activeTab === category ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 absolute pointer-events-none'
              }`}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {refs.map((ref, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredCard(`${category}-${index}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 overflow-hidden ${
                      hoveredCard === `${category}-${index}` ? 'ring-2 ring-blue-500/20' : ''
                    }`}
                  >
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full transform translate-x-16 -translate-y-16 opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
                    
                    {/* Status Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${categoryInfo[category].color} flex items-center justify-center text-white shadow-md`}>
                          {categoryInfo[category].icon}
                        </div>
                      </div>
                      {getStatusBadge(ref.status)}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {ref.client}
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-slate-700">Mission :</span>
                            <p className="text-slate-600 text-sm mt-1">{ref.mission}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-slate-700">Lieu :</span>
                            <span className="text-slate-600 ml-2">{ref.location || ref.sector}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <div>
                            <span className="font-semibold text-slate-700">Période :</span>
                            <span className="text-slate-600 ml-2">{ref.period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-slate-600">Projets réalisés</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-emerald-600 mb-2">98%</div>
            <div className="text-slate-600">Satisfaction client</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
            <div className="text-slate-600">Années d'expérience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferencesSection;