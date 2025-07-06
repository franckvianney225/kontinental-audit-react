import { useLanguage } from '../context/LanguageContext';
import fr from '../locales/fr';
import en from '../locales/en';

export const ConsultingIntro = () => {
  const { language } = useLanguage();
  const t = language === 'fr' ? fr : en;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">{t.consulting.intro.title}</h2>
        <p className="text-lg text-gray-600">{t.consulting.intro.description}</p>
      </div>
    </section>
  );
};