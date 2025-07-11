import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '../components/Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { Enterprise } from '../types/enterprise';

const ContactPage = () => {
  const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnterprise = async () => {
      try {
        const { data, error } = await supabase
          .from('enterprise')
          .select('*')
          .maybeSingle();

        if (error) throw error;
        setEnterprise(data);
      } catch (error) {
        console.error('Error fetching enterprise data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnterprise();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-50 dark:bg-gray-900"></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
            NOUS CONTACTER
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-600/80 dark:backdrop-blur-md p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-[#0B1C39] dark:text-white mb-6">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#0B1C39] dark:text-white mb-1">Email</h4>
                    <a
                      href={`mailto:${enterprise?.email || 'infos@kontinental.ci'}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] transition-colors"
                    >
                      {enterprise?.email || 'infos@kontinental.ci'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#0B1C39] dark:text-white mb-1">Téléphone</h4>
                    <a
                      href={`tel:${enterprise?.numero_telephone || '+2252521001295'}`}
                      className="text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] transition-colors"
                    >
                      {enterprise?.numero_telephone || '+225 25 21 00 12 95'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[#D4AF37] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#0B1C39] dark:text-white mb-1">Adresse</h4>
                    <a
                      href={`https://www.google.com/maps/place/${encodeURIComponent(enterprise?.lieu || 'Abidjan Marcory 25 BP 381 Abidjan 25 Avenue AMADOU Hampaté Ba Côte d\'Ivoire')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-[#D4AF37] transition-colors"
                    >
                      {enterprise?.lieu || (
                        <>
                          Abidjan Marcory<br />
                          25 BP 381 Abidjan 25<br />
                          Avenue AMADOU Hampaté Ba<br />
                          Côte d'Ivoire
                        </>
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0B1C39] to-[#1a2f4a] dark:from-gray-800 dark:to-gray-700/90 p-8 rounded-xl text-white">
              <h3 className="text-2xl font-semibold mb-4">Heures d'ouverture</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="text-[#D4AF37]">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-[#D4AF37]">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-gray-400">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">15+</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Années d'expérience</h3>
              <p className="text-gray-600 dark:text-gray-400">Expertise accumulée depuis 2008</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">200+</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Clients satisfaits</h3>
              <p className="text-gray-600 dark:text-gray-400">Entreprises de tous secteurs</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">500+</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Missions réalisées</h3>
              <p className="text-gray-600 dark:text-gray-400">Audits et consultations</p>
            </div>
            
            <div className="p-6">
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">1000+</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Heures de formation</h3>
              <p className="text-gray-600 dark:text-gray-400">Professionnels formés</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;