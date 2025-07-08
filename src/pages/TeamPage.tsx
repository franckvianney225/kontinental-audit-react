import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Award, Users, Target } from 'lucide-react';
import Header from '@/components/Header';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "YAO ALPHONSE",
      role: "Associé Gérant",
      image: "/images/associes/associe4.jpeg",
      description: "Fort de plus de 15 ans d'expérience dans le secteur financier, YAO ALPHONSE dirige notre équipe avec une vision stratégique exceptionnelle. Diplômé en Finance et Management de l'Université de Paris, il a occupé des postes de direction dans plusieurs institutions financières de renom avant de co-fonder notre société. Sa passion pour l'innovation et son approche centrée sur le client ont permis à notre entreprise de se positionner comme un leader du marché. Il supervise personnellement les relations avec nos clients stratégiques et développe nos partenariats internationaux.",
      expertise: ["Stratégie d'entreprise", "Finance internationale", "Gestion de portefeuille"],
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      email: "#"
    },
    {
      id: 2,
      name: "SEHR JEAN-LOUIS",
      role: "Associé Gérant",
      image: "/images/associes/associe3.jpeg",
      description: "SEHR JEAN-LOUIS apporte une expertise technique inégalée avec ses 12 années d'expérience dans le développement de solutions innovantes. Ingénieur de formation et titulaire d'un MBA en Gestion des Opérations, il excelle dans l'optimisation des processus et la transformation digitale. Sa capacité à anticiper les tendances du marché et à implémenter des technologies de pointe a considérablement renforcé notre position concurrentielle. Il dirige notre département R&D et supervise la mise en œuvre de nos projets les plus ambitieux.",
      expertise: ["Innovation technologique", "Transformation digitale", "Optimisation des processus"],
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      email: "#"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-400 dark:to-orange-600">
              NOTRE ÉQUIPE DE DIRECTION
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Rencontrez les visionnaires qui dirigent notre entreprise avec passion et expertise
          </p>
        </div>

        {/* Team Cards */}
        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex lg:min-h-[500px]`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Photo Container */}
              <div className="lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-700/20 z-10"></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 lg:h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-orange-500/10 rounded-full backdrop-blur-sm z-20"></div>
                <div className="absolute bottom-6 left-6 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm z-20"></div>
              </div>

              {/* Content Container */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                {/* Member Info */}
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 dark:text-orange-400 text-lg font-semibold mb-4">
                    {member.role}
                  </p>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm rounded-full"
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

                {/* Stats or highlights */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Excellence</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Leadership</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vision</p>
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
                    href={member.email}
                    className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-all duration-200 hover:scale-110"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>

              {/* Decorative border */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;