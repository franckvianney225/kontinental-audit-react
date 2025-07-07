import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "YAO ALPHONSE",
      role: "Associé Gérant",
      image: "/images/associes/associe4.jpeg",
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
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
      email: "#"
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-400 dark:to-orange-600">
              NOTRE ÉQUIPE DE DIRECTION
            </span>
          </h2>
        
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="group text-center"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Photo */}
              <div className="relative mb-6 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Member Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {member.role}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-2">
                <a
                  href={member.facebook}
                  className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href={member.twitter}
                  className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition-colors duration-200"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href={member.linkedin}
                  className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-colors duration-200"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={member.instagram}
                  className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-200"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href={member.email}
                  className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors duration-200"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;