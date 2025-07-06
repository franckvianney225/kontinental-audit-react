import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium hover:bg-gray-100 transition-colors"
      aria-label="Changer de langue"
    >
      {language === 'fr' ? 'FR' : 'EN'}
    </button>
  );
};