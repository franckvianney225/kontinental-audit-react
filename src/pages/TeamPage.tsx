import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Award, Users, Target, Building, GraduationCap, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "YAO ALPHONSE",
      role: "Associé Gérant",
      image: "/images/associes/associe4.jpeg",
      description: "Expert en Organisation avec plus de 15 ans d'expérience professionnelle, YAO ALPHONSE a bâti sa carrière dans des environnements prestigieux. Diplômé en Business Administration de l'Adelphi University aux USA et titulaire d'un Master en Comptabilité, il a occupé des postes clés chez Deloitte & Touche en tant que Manager, puis chez Carver Bancorp comme Assistant Controller. Son expertise couvre l'audit organisationnel, la gestion des ressources humaines, et les études de faisabilité. Il supervise aujourd'hui des missions stratégiques dans les secteurs public, agro-industriel et bancaire.",
      expertise: ["Audit organisationnel", "Gestion des ressources humaines", "Études de faisabilité", "Plans stratégiques", "Gestion de projets"],
      experience: "15+ ans",
      education: "Business Administration & Master en Comptabilité",
      sectors: ["Secteur public", "Agro-industrie", "Banques & Assurances"],
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      email: "ayao@kontinental.ci"
    },
    {
      id: 2,
      name: "JEAN LOUIS SEHR",
      role: "Associé Gérant",
      image: "/images/associes/associe3.jpeg",
      description: "Auditeur comptable et financier chevronné avec 30 ans d'expérience dans des environnements très exigeants, JEAN LOUIS SEHR excelle dans la gestion et le contrôle. Diplômé en Économie de l'Université de Côte d'Ivoire, il a développé une expertise pointue dans l'audit interne, financier et opérationnel. Actuellement Directeur Associé au Cabinet Kontinental, il a précédemment occupé des postes stratégiques au Ministère de l'Économie Numérique et au MCLU. Sa maîtrise du contrôle interne et de la gestion des risques fait de lui un pilier de notre organisation.",
      expertise: ["Audit interne & financier", "Contrôle interne", "Gestion des risques", "Management des organisations", "Commissariat aux comptes"],
      experience: "20+ ans",
      education: "Maîtrise en Économie - Université de Côte d'Ivoire",
      sectors: ["Secteur public", "Secteur privé", "Audit financier"],
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      email: "jls@kontinental.ci"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
              NOTRE ÉQUIPE DE DIRECTION
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Des professionnels expérimentés au service de votre réussite
          </p>
        </div>

        {/* Team Cards */}
        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-500 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex lg:min-h-[600px]`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Photo Container */}
              <div className="lg:w-2/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-800/20 z-10"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 lg:h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-blue-500/10 rounded-full backdrop-blur-sm z-20"></div>
                <div className="absolute bottom-6 left-6 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm z-20"></div>
                
                {/* Experience Badge */}
                <div className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold z-20">
                  {member.experience} d'expérience
                </div>
              </div>

              {/* Content Container */}
              <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                {/* Member Info */}
                <div className="mb-6">
                  <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-xl font-semibold mb-4">
                    {member.role}
                  </p>
                  
                  {/* Education & Experience */}
                  <div className="flex flex-col space-y-2 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm">{member.education}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      <span className="text-sm">{member.experience} d'expérience</span>
                    </div>
                  </div>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  {member.description}
                </p>

                {/* Sectors */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-blue-600" />
                    Secteurs d'intervention
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.sectors.map((sector, sectorIndex) => (
                      <span
                        key={sectorIndex}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats or highlights */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Excellence</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Leadership</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Expertise</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-3">
                  <a
                    href={member.facebook}
                    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-all duration-200 hover:scale-110"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href={member.twitter}
                    className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition-all duration-200 hover:scale-110"
                  >
                    <Twitter size={18} />
                  </a>
                  <a
                    href={member.linkedin}
                    className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-all duration-200 hover:scale-110"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={member.instagram}
                    className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-all duration-200 hover:scale-110"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-200 hover:scale-110"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>

              {/* Decorative border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;