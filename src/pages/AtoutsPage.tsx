import React from 'react';

const AtoutsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            NOS ATOUTS
          </h1>
          <div className="w-32 h-1 bg-orange-500 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed">
            Une expertise reconnue dans le pilotage de projets complexes
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-lg leading-relaxed">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>KONTINENTAL</strong> offre une pluralité de compétences dans les services d'audit financier et de conseil en gestion.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Notre cabinet regroupe plusieurs consultants confirmés, avec des expertises spécifiques et complémentaires. 
                Ils ont réalisé d'importantes missions auprès d'entreprises publiques et privées ainsi que des collectivités en 
                Côte d'Ivoire et dans la sous-région.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
              <p className="text-gray-700 dark:text-gray-300">
                Nous proposons des solutions sur mesure combinant l'ensemble de nos expertises requises dans le cadre de 
                chaque mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise and Domaines Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Expertise Circle */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8 text-orange-600 dark:text-orange-400">
                Expertise
              </h2>
              <div className="relative w-80 h-80 mx-auto">
                {/* Circular diagram for Expertise */}
                <svg viewBox="0 0 320 320" className="w-full h-full">
                  {/* Center circle */}
                  <circle cx="160" cy="160" r="50" fill="#1e3a8a" />
                  <text x="160" y="155" textAnchor="middle" className="fill-white text-xs font-bold">
                    <tspan x="160" dy="0">Domaines de</tspan>
                    <tspan x="160" dy="12">compétence</tspan>
                  </text>
                  
                  {/* Outer ring segments - Perfect circle */}
                  <g>
                    {/* Segment 1: Evaluation & Gestion de projet */}
                    <path d="M 160 20 A 140 140 0 0 1 250 67 L 200 103 A 90 90 0 0 0 160 70 Z" fill="#8b5cf6" />
                    <text x="205" y="45" textAnchor="middle" className="fill-white text-xs font-semibold">
                      <tspan x="205" dy="0">Evaluation &</tspan>
                      <tspan x="205" dy="10">Gestion de projet</tspan>
                    </text>
                    
                    {/* Segment 2: Audit Organisationnel */}
                    <path d="M 250 67 A 140 140 0 0 1 300 160 L 250 160 A 90 90 0 0 0 200 103 Z" fill="#10b981" />
                    <text x="275" y="110" textAnchor="middle" className="fill-white text-xs font-semibold">
                      <tspan x="275" dy="0">Audit</tspan>
                      <tspan x="275" dy="10">Organisationnel</tspan>
                      <tspan x="275" dy="20">& Opérationnels</tspan>
                    </text>
                    
                    {/* Segment 3: Assistance systèmes */}
                    <path d="M 300 160 A 140 140 0 0 1 250 253 L 200 217 A 90 90 0 0 0 250 160 Z" fill="#06b6d4" />
                    <text x="275" y="205" textAnchor="middle" className="fill-white text-xs font-semibold">
                      <tspan x="275" dy="0">Assistance</tspan>
                      <tspan x="275" dy="10">à la mise en place</tspan>
                      <tspan x="275" dy="20">de systèmes</tspan>
                      <tspan x="275" dy="30">informatiques</tspan>
                    </text>
                    
                    {/* Segment 4: Elaboration Manuel */}
                    <path d="M 250 253 A 140 140 0 0 1 160 300 L 160 250 A 90 90 0 0 0 200 217 Z" fill="#f59e0b" />
                    <text x="205" y="275" textAnchor="middle" className="fill-white text-xs font-semibold">
                      <tspan x="205" dy="0">Elaboration</tspan>
                      <tspan x="205" dy="10">de Manuel de</tspan>
                      <tspan x="205" dy="20">Procédures</tspan>
                    </text>
                    
                    {/* Segment 5: Renforcement Capacités */}
                    <path d="M 160 300 A 140 140 0 0 1 70 253 L 120 217 A 90 90 0 0 0 160 250 Z" fill="#ef4444" />
                    <text x="115" y="275" textAnchor="middle" className="fill-white text-xs font-semibold">
                      <tspan x="115" dy="0">Renforcement de</tspan>
                      <tspan x="115" dy="10">Capacités de</tspan>
                      <tspan x="115" dy="20">Gestion</tspan>
                    </text>
                    
                    {/* Segment 6: Assistance Plan Stratégique */}
                    <path d="M 70 253 A 140 140 0 0 1 20 160 L 70 160 A 90 90 0 0 0 120 217 Z" fill="#f97316" />
                    <text x="45" y="205" textAnchor="middle" className="fill-white text-xs font-semibold">
                      <tspan x="45" dy="0">Assistance</tspan>
                      <tspan x="45" dy="10">À l'élaboration</tspan>
                      <tspan x="45" dy="20">De Plan</tspan>
                      <tspan x="45" dy="30">Stratégique</tspan>
                    </text>
                    
                    {/* Segment 7: Assistance Business Plan */}
                    <path d="M 20 160 A 140 140 0 0 1 70 67 L 120 103 A 90 90 0 0 0 70 160 Z" fill="#dc2626" />
                    <text x="45" y="110" textAnchor="middle" className="fill-white text-xs font-semibold">
                      <tspan x="45" dy="0">Assistance à la</tspan>
                      <tspan x="45" dy="10">Confection de</tspan>
                      <tspan x="45" dy="20">Business Plan</tspan>
                    </text>
                    
                    {/* Segment 8: Audit Ressources Humaines */}
                    <path d="M 70 67 A 140 140 0 0 1 160 20 L 160 70 A 90 90 0 0 0 120 103 Z" fill="#7c3aed" />
                    <text x="115" y="45" textAnchor="middle" className="fill-white text-xs font-semibold">
                      <tspan x="115" dy="0">Audit des</tspan>
                      <tspan x="115" dy="10">Ressources</tspan>
                      <tspan x="115" dy="20">Humaines</tspan>
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Domaines de compétences Circle */}
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8 text-orange-600 dark:text-orange-400">
                Domaines de compétences
              </h2>
              <div className="relative w-96 h-96 mx-auto">
                {/* Circular diagram for Domaines */}
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Center circle - now perfect circle */}
                  <circle cx="200" cy="200" r="60" fill="white" stroke="#1e3a8a" strokeWidth="2" />
                  <text x="200" y="195" textAnchor="middle" className="fill-blue-900 text-sm font-bold">
                    <tspan x="200" dy="0">Expériences</tspan>
                    <tspan x="200" dy="16">sectorielles</tspan>
                  </text>
                  
                  {/* Outer segments - now perfect circle */}
                  <g>
                    {/* Sécurité */}
                    <path d="M 200 40 A 160 160 0 0 1 300 80 L 240 120 A 100 100 0 0 0 200 120 Z" fill="#6b7280" />
                    <text x="250" y="80" textAnchor="middle" className="fill-white text-sm font-bold">
                      Sécurité
                    </text>
                    
                    {/* Assurances */}
                    <path d="M 300 80 A 160 160 0 0 1 360 140 L 280 180 A 100 100 0 0 0 240 120 Z" fill="#84cc16" />
                    <text x="320" y="110" textAnchor="middle" className="fill-white text-sm font-bold">
                      Assurances
                    </text>
                    
                    {/* Banque */}
                    <path d="M 360 140 A 160 160 0 0 1 380 200 L 300 200 A 100 100 0 0 0 280 180 Z" fill="#a3e635" />
                    <text x="340" y="170" textAnchor="middle" className="fill-white text-sm font-bold">
                      Banque
                    </text>
                    
                    {/* Micro finance */}
                    <path d="M 380 200 A 160 160 0 0 1 360 260 L 280 220 A 100 100 0 0 0 300 200 Z" fill="#bef264" />
                    <text x="320" y="230" textAnchor="middle" className="fill-white text-sm font-bold">
                      <tspan x="320" dy="0">Micro</tspan>
                      <tspan x="320" dy="16">finance</tspan>
                    </text>
                    
                    {/* Textile */}
                    <path d="M 360 260 A 160 160 0 0 1 300 320 L 240 280 A 100 100 0 0 0 280 220 Z" fill="#facc15" />
                    <text x="330" y="290" textAnchor="middle" className="fill-white text-sm font-bold">
                      Textile
                    </text>
                    
                    {/* Télécom */}
                    <path d="M 300 320 A 160 160 0 0 1 200 360 L 200 280 A 100 100 0 0 0 240 280 Z" fill="#f59e0b" />
                    <text x="250" y="320" textAnchor="middle" className="fill-white text-sm font-bold">
                      Télécom
                    </text>
                    
                    {/* Transport */}
                    <path d="M 200 360 A 160 160 0 0 1 100 320 L 160 280 A 100 100 0 0 0 200 280 Z" fill="#06b6d4" />
                    <text x="150" y="320" textAnchor="middle" className="fill-white text-sm font-bold">
                      Transport
                    </text>
                    
                    {/* Hôtelleries et Tourisme */}
                    <path d="M 100 320 A 160 160 0 0 1 40 260 L 120 220 A 100 100 0 0 0 160 280 Z" fill="#8b5cf6" />
                    <text x="80" y="270" textAnchor="middle" className="fill-white text-xs font-bold">
                      <tspan x="80" dy="0">Hôtelleries et</tspan>
                      <tspan x="80" dy="12">Tourisme</tspan>
                    </text>
                    
                    {/* Filière Café */}
                    <path d="M 40 260 A 160 160 0 0 1 20 200 L 100 200 A 100 100 0 0 0 120 220 Z" fill="#7c2d12" />
                    <text x="80" y="230" textAnchor="middle" className="fill-white text-sm font-bold">
                      <tspan x="80" dy="0">Filière</tspan>
                      <tspan x="80" dy="16">Café</tspan>
                    </text>
                    
                    {/* Santé */}
                    <path d="M 20 200 A 160 160 0 0 1 40 140 L 120 180 A 100 100 0 0 0 100 200 Z" fill="#059669" />
                    <text x="80" y="170" textAnchor="middle" className="fill-white text-sm font-bold">
                      Santé
                    </text>
                    
                    {/* Back to start */}
                    <path d="M 40 140 A 160 160 0 0 1 100 80 L 160 120 A 100 100 0 0 0 120 180 Z" fill="#6b7280" />
                    <path d="M 100 80 A 160 160 0 0 1 200 40 L 200 120 A 100 100 0 0 0 160 120 Z" fill="#6b7280" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à découvrir notre expertise ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contactez-nous pour discuter de vos besoins spécifiques
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Nous contacter
          </button>
        </div>
      </section>

    </div>
  );
};

export default AtoutsPage;