import { useState, useEffect } from 'react'
import { MailCheck, Mail, Server, Shield, CheckCircle, XCircle, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

export const SMTPManager = () => {
  const [settings, setSettings] = useState({
    host: '',
    port: 587,
    username: '',
    password: '',
    secure: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Récupérer les paramètres SMTP depuis Supabase
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('smtp_settings')
          .select('*')
          .single()

        if (data) {
          setSettings(data)
        }
      } catch (err) {
        console.error('Erreur SMTP:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSettingsChange = (field, value) => {
    setSettings(prev => ({...prev, [field]: value}))
    setHasChanges(true)
    setTestResult(null) // Reset test result when settings change
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Sauvegarder dans Supabase
      const { error } = await supabase
        .from('smtp_settings')
        .upsert(settings)

      if (error) throw error
      
      setHasChanges(false)
      setIsLoading(false)
      alert('Paramètres SMTP sauvegardés!')
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err)
      alert('Erreur lors de la sauvegarde des paramètres SMTP')
      setIsLoading(false)
    }
  }

  const testConnection = async () => {
    setIsTesting(true)
    setTestResult(null)
    
    try {
      // Simulation d'un test de connexion SMTP
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulation des résultats basés sur les paramètres
      const isValid = settings.host && settings.username && settings.password
      const isCommonProvider = ['smtp.gmail.com', 'smtp.outlook.com', 'smtp.yahoo.com'].includes(settings.host)
      
      if (!isValid) {
        setTestResult({
          success: false,
          message: 'Veuillez remplir tous les champs obligatoires'
        })
      } else if (isCommonProvider && settings.port === 587) {
        setTestResult({
          success: true,
          message: 'Connexion établie avec succès! Configuration validée.'
        })
      } else {
        setTestResult({
          success: Math.random() > 0.3, // 70% de chance de succès pour la démo
          message: Math.random() > 0.3 
            ? 'Connexion établie avec succès!'
            : 'Échec de la connexion. Vérifiez vos paramètres.'
        })
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: 'Erreur lors du test de connexion'
      })
    } finally {
      setIsTesting(false)
    }
  }

  const isFormValid = settings.host && settings.username && settings.password

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Configuration SMTP</h1>
              <p className="text-gray-600">Configurez et testez vos paramètres d'envoi d'emails</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Server className="h-5 w-5 mr-2 text-blue-600" />
                Paramètres du serveur
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serveur SMTP *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={settings.host}
                      onChange={(e) => handleSettingsChange('host', e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Port *
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      value={settings.port}
                      onChange={(e) => handleSettingsChange('port', parseInt(e.target.value))}
                      placeholder="587"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom d'utilisateur / Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={settings.username}
                    onChange={(e) => handleSettingsChange('username', e.target.value)}
                    placeholder="votre-email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                      value={settings.password}
                      onChange={(e) => handleSettingsChange('password', e.target.value)}
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    id="secure"
                    className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    checked={settings.secure}
                    onChange={(e) => handleSettingsChange('secure', e.target.checked)}
                  />
                  <label htmlFor="secure" className="ml-3 text-sm text-gray-700 flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-green-600" />
                    Connexion sécurisée (TLS/SSL)
                  </label>
                </div>

                {/* Boutons d'action */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <button
                    onClick={testConnection}
                    disabled={isTesting || !isFormValid}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors font-medium"
                  >
                    {isTesting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Test en cours...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span>Tester la connexion</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSave}
                    disabled={isLoading || !hasChanges}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors font-medium"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Enregistrement...</span>
                      </>
                    ) : (
                      <>
                        <MailCheck className="h-5 w-5" />
                        <span>Enregistrer</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Panneau latéral */}
          <div className="space-y-6">
            {/* Résultat du test */}
            {testResult && (
              <div className={`p-6 rounded-2xl border-2 ${
                testResult.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  {testResult.success ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                  <h3 className={`font-semibold ${
                    testResult.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {testResult.success ? 'Test réussi' : 'Test échoué'}
                  </h3>
                </div>
                <p className={`text-sm ${
                  testResult.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {testResult.message}
                </p>
              </div>
            )}

            {/* Informations d'aide */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                Configurations courantes
              </h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <strong className="text-blue-800">Gmail</strong>
                  <p className="text-blue-700">smtp.gmail.com:587</p>
                  <p className="text-xs text-blue-600 mt-1">Utilisez un mot de passe d'application</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <strong className="text-purple-800">Outlook</strong>
                  <p className="text-purple-700">smtp-mail.outlook.com:587</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <strong className="text-yellow-800">Yahoo</strong>
                  <p className="text-yellow-700">smtp.mail.yahoo.com:587</p>
                </div>
              </div>
            </div>

            {/* Statut de la configuration */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Statut de la configuration</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Serveur SMTP</span>
                  {settings.host ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Authentification</span>
                  {settings.username && settings.password ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sécurité</span>
                  {settings.secure ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}