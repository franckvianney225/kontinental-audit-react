
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B1C39] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold text-[#D4AF37] mb-4">
              KL KONTINENTAL
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner in audit, tax, and training services. We help businesses achieve excellence through comprehensive consulting solutions.
            </p>
            <div className="flex items-center text-gray-300 mb-2">
              <MapPin className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <span className="text-sm">Abidjan Marcory, 25 BP 381 Abidjan 25</span>
            </div>
            <div className="flex items-center text-gray-300 mb-2">
              <Mail className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <span className="text-sm">info@kontinental.ci</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Phone className="w-4 h-4 mr-2 text-[#D4AF37]" />
              <span className="text-sm">+225 27 21 75 84 56</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  About
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
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Financial & Accounting Audit</li>
              <li className="text-gray-300">HR & IT System Audit</li>
              <li className="text-gray-300">Organizational Audit</li>
              <li className="text-gray-300">Tax & Legal Consulting</li>
              <li className="text-gray-300">Professional Training</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 KL KONTINENTAL. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Legal Notice
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
