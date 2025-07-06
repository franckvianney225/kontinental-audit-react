import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B1C39] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          {/* Company Info */}
          <div>
            <div className="text-3xl font-bold text-[#D4AF37] mb-4">
              KL KONTINENTAL
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Votre partenaire de confiance pour les services d'audit, de fiscalité et de formation. Nous aidons les entreprises à atteindre l'excellence grâce à des solutions de conseil complètes.
            </p>
            <div className="flex items-center text-gray-300 mb-2">
              <MapPin className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <a
                href="https://www.google.com/maps/place/Abidjan+Marcory,+25+BP+381+Abidjan+25"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-[#D4AF37] transition-colors"
              >
                Abidjan Marcory, 25 BP 381 Abidjan 25
              </a>
            </div>
            <div className="flex items-center text-gray-300 mb-2">
              <Mail className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <a
                href="mailto:info@kontinental.ci"
                className="text-sm hover:text-[#D4AF37] transition-colors"
              >
                info@kontinental.ci
              </a>
            </div>
            <div className="flex items-center text-gray-300">
              <Phone className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <a
                href="tel:+2252721758456"
                className="text-sm hover:text-[#D4AF37] transition-colors"
              >
                +225 27 21 75 84 56
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Audit Financier & Comptable</li>
              <li className="text-gray-300">Audit RH & Systèmes d'Information</li>
              <li className="text-gray-300">Audit Organisationnel</li>
              <li className="text-gray-300">Conseil Fiscal & Juridique</li>
              <li className="text-gray-300">Formation Professionnelle</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 KL KONTINENTAL. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
