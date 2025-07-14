import { MapPin, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Enterprise } from '@/types/enterprise';

const Footer = () => {
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);

  useEffect(() => {
    const fetchEnterprise = async () => {
      const { data, error } = await supabase
        .from('enterprise')
        .select('*')
        .single();

      if (!error && data) {
        setEnterprise(data);
      }
    };

    fetchEnterprise();
  }, []);
  return (
    <footer className="bg-[#0B1C39] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          {/* Company Info */}
          <div>
            <div className="text-3xl font-bold text-[#D4AF37] mb-4">
              KONTINENTAL
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Votre partenaire de confiance pour les services d'audit, de fiscalité et de formation. Nous aidons les entreprises à atteindre l'excellence grâce à des solutions de conseil complètes.
            </p>
            {enterprise && (
              <>
                <div className="flex items-center text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  <a
                    href={`https://www.google.com/maps/place/${encodeURIComponent(enterprise.lieu)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    {enterprise.lieu}
                  </a>
                </div>
                <div className="flex items-center text-gray-300 mb-2">
                  <Mail className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  <a
                    href={`mailto:${enterprise.email}`}
                    className="text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    {enterprise.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  <a
                    href={`tel:${enterprise.numero_telephone}`}
                    className="text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    {enterprise.numero_telephone}
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  ACCEUIL
                </a>
              </li>
              <li>
                <a href="/a-propos" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  À PROPOS
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  SERVICES
                </a>
              </li>
              <li>
                <a href="/nos-atouts" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  NOS ATOUTS
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  CONTACT
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
              © 2025 Site édité par SELECT-SI
            </div>
            {/* <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Politique de confidentialité
              </a>
              <a href="/terms" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Conditions d'utilisation
              </a>
              <a href="/legal" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                Mentions légales
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
