import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img
                src="/images/logo/logo.jpeg"
                alt="Logo Kontinental"
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium text-lg">
              ACCEUIL
            </a>
            <a href="#about" className="text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium text-lg">
              À PROPOS
            </a>
            <a href="#services" className="text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium text-lg">
              SERVICES
            </a>
            <a href="#contact" className="text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium text-lg">
              CONTACT
            </a>
          </nav>

          {/* CTA Button and Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/contact" className="bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
              Contacter-Nous
            </a>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#0B1C39] hover:text-[#D4AF37] hover:bg-gray-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#0B1C39] hover:text-[#D4AF37] hover:bg-gray-100 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <LanguageSwitcher />
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
              <a href="/" className="block px-3 py-2 text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium text-lg">
                Accueil
              </a>
              <a href="#about" className="block px-3 py-2 text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium text-lg">
                À propos
              </a>
              <a href="#services" className="block px-3 py-2 text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium text-lg">
                Services
              </a>
              <a href="#contact" className="block px-3 py-2 text-[#0B1C39] hover:text-[#D4AF37] transition-colors font-medium text-lg">
                Contact
              </a>
              <div className="px-3 py-2">
                <a href="/contact" className="w-full bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#B8941F] transition-colors">
                  Contacter-Nous
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;