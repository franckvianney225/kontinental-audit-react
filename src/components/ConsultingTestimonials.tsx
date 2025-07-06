import { useLanguage } from '../context/LanguageContext';
import fr from '../locales/fr';
import en from '../locales/en';

export const ConsultingTestimonials = () => {
  const { language } = useLanguage();
  const t = language === 'fr' ? fr : en;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{t.consulting.testimonials.title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {t.consulting.testimonials.quotes.map((quote, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <blockquote className="text-lg italic text-gray-600">"{quote}"</blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};