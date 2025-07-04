
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-[#0B1C39]">
              KL
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium">
              Home
            </a>
            <a href="#about" className="text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium">
              About
            </a>
            <a href="#services" className="text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium">
              Services
            </a>
            <a href="#contact" className="text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
              Request a free diagnostic
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#0B1C39] hover:text-[#D4AF37] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium">
                Home
              </a>
              <a href="#about" className="block px-3 py-2 text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium">
                About
              </a>
              <a href="#services" className="block px-3 py-2 text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium">
                Services
              </a>
              <a href="#contact" className="block px-3 py-2 text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium">
                Contact
              </a>
              <div className="px-3 py-2">
                <button className="w-full bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
                  Request a free diagnostic
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
