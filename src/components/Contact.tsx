import { useState } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface ContactProps {
  className?: string;
}

const Contact = ({ className = '' }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Enregistrer l'email dans Supabase d'abord
      const { data: emailRecord, error: insertError } = await supabase
        .from('emails')
        .insert([{
          sender_name: formData.name,
          sender_email: formData.email,
          recipient: import.meta.env.VITE_CONTACT_EMAIL,
          subject: `Nouveau message de ${formData.name}`,
          content: formData.message,
          status: 'pending'
        }])
        .select()
        .single();

      if (insertError || !emailRecord) {
        throw new Error("Erreur lors de l'enregistrement du message");
      }

      // Utiliser Supabase pour envoyer l'email
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (!accessToken) {
        throw new Error("Session non authentifiée");
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          email_id: emailRecord.id,
          to: import.meta.env.VITE_CONTACT_EMAIL,
          subject: `Nouveau message de ${formData.name}`,
          html: `
            <h2>Nouveau message de contact</h2>
            <p><strong>Nom:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message}</p>
          `
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'envoi du message");
      }

      setShowConfirmation(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setShowConfirmation(false), 5000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Erreur lors de l'envoi du message";
      alert(errorMessage);
      console.error('Erreur Contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm dark:bg-gray-700/80 dark:backdrop-blur-md p-8 rounded-xl shadow-lg ${className}`}>
      <h3 className="text-2xl font-semibold text-[#0B1C39] dark:text-white mb-6">Discutons de votre projet</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-colors dark:bg-gray-800 dark:text-white"
            placeholder="Votre nom complet"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-colors dark:bg-gray-800 dark:text-white"
            placeholder="votre.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-colors resize-none dark:bg-gray-800 dark:text-white"
            placeholder="Dites-nous en plus sur votre projet..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}</span>
        </button>
      </form>

      {showConfirmation && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
          ✅ Merci pour votre message ! Nous vous contacterons bientôt.
        </div>
      )}
    </div>
  );
};

export default Contact;
