import { useLanguage } from '../context/LanguageContext';
import fr from '../locales/fr';
import en from '../locales/en';

export const ConsultingServices = () => {
  const { language } = useLanguage();
  const t = language === 'fr' ? fr : en;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">{t.consulting.services.title}</h2>
        <ul className="grid md:grid-cols-3 gap-6">
          {t.consulting.services.items.map((item, index) => (
            <li key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{item}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};