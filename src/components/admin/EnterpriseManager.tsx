import { useState, useEffect } from 'react';
import { Building2, Mail, MapPin, Phone, CheckCircle, Save, AlertCircle, XCircle } from 'lucide-react';

import { supabase } from '../../lib/supabaseClient';

export default function EnterpriseManager() {
  const [enterprise, setEnterprise] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    lieu: '',
    numero_telephone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    fetchEnterprise();
  }, []);

  const fetchEnterprise = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('enterprise')
        .select()
        .limit(1)
        .maybeSingle();
        
      if (data) {
        setEnterprise(data);
        setFormData({
          email: data.email,
          lieu: data.lieu,
          numero_telephone: data.numero_telephone
        });
      }
    } catch (err) {
      console.error('Erreur lors de la récupération:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      if (enterprise) {
        const { error } = await supabase
          .from('enterprise')
          .update(formData)
          .eq('id', enterprise.id)
          .select()
          .single();
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('enterprise')
          .insert(formData)
          .select()
          .single();
        
        if (error) throw error;
      }
      
      await fetchEnterprise();
      setHasChanges(false);
      setSaveStatus({
        success: true,
        message: enterprise ? 'Informations mises à jour avec succès!' : 'Entreprise enregistrée avec succès!'
      });
    } catch (err) {
      setSaveStatus({
        success: false,
        message: 'Erreur lors de l\'enregistrement des informations'
      });
      console.error('Erreur:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setHasChanges(true);
    setSaveStatus(null);
  };

  const isFormValid = formData.email && formData.lieu && formData.numero_telephone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestion de l'Entreprise</h1>
              <p className="text-gray-600 dark:text-gray-400">Configurez les informations de votre entreprise</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Formulaire principal */}
          <div className="xl:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                Informations de l'entreprise
              </h2>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">Chargement...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Mail className="h-4 w-4 inline mr-2 text-blue-600" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="contact@entreprise.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MapPin className="h-4 w-4 inline mr-2 text-blue-600" />
                        Lieu *
                      </label>
                      <input
                        type="text"
                        name="lieu"
                        value={formData.lieu}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="Ville, Pays"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Phone className="h-4 w-4 inline mr-2 text-blue-600" />
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="numero_telephone"
                        value={formData.numero_telephone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="+33 1 23 45 67 89"
                        required
                      />
                    </div>
                  </div>

                  {/* Bouton de sauvegarde */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={handleSubmit}
                      disabled={isSaving || !hasChanges || !isFormValid}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors font-medium"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Enregistrement...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-5 w-5" />
                          <span>{enterprise ? 'Mettre à jour' : 'Enregistrer'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panneau latéral */}
          <div className="xl:col-span-1 space-y-6">
            {/* Résultat de la sauvegarde */}
            {saveStatus && (
              <div className={`p-4 rounded-2xl border-2 ${
                saveStatus.success 
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                  : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  {saveStatus.success ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                  <h3 className={`font-semibold ${
                    saveStatus.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                  }`}>
                    {saveStatus.success ? 'Succès' : 'Erreur'}
                  </h3>
                </div>
                <p className={`text-sm ${
                  saveStatus.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                }`}>
                  {saveStatus.message}
                </p>
              </div>
            )}

            {/* Informations d'aide */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                Conseils
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <strong className="text-blue-800 dark:text-blue-200">Email</strong>
                  <p className="text-blue-700 dark:text-blue-300">Utilisez l'email principal de contact</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <strong className="text-purple-800 dark:text-purple-200">Lieu</strong>
                  <p className="text-purple-700 dark:text-purple-300">Indiquez la ville et le pays</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <strong className="text-green-800 dark:text-green-200">Téléphone</strong>
                  <p className="text-green-700 dark:text-green-300">Format international recommandé</p>
                </div>
              </div>
            </div>

            {/* Statut de la configuration */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Statut de la configuration</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Email</span>
                  {formData.email ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Lieu</span>
                  {formData.lieu ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Téléphone</span>
                  {formData.numero_telephone ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Statut de l'entreprise */}
            {enterprise && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Informations</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Statut</span>
                    <span className="text-green-600 font-medium">Configurée</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Dernière mise à jour</span>
                    <span className="text-gray-800 dark:text-gray-200">Aujourd'hui</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}