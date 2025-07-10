import { useState, useEffect } from 'react'
import { supabase, supabaseAdmin } from '../lib/supabaseClient'
import type { Mission } from '../types/mission'

type MissionFormProps = {
  mission?: Mission
  onClose: () => void
  onMissionSaved: (mission: Mission) => void
}

export default function MissionForm({
  mission,
  onClose,
  onMissionSaved
}: MissionFormProps) {
  // Gestion simplifiée via URL hash
  useEffect(() => {
    // S'assurer qu'il y a un hash valide au chargement
    if (!window.location.hash) {
      window.location.hash = '#missions'
    }
  }, [])

  const [viewMode, setViewMode] = useState(!!mission)
  const [formData, setFormData] = useState<Omit<Mission, 'id'>>(
    mission || {
      name: '',
      client: '',
      mission_date: new Date().toISOString().split('T')[0],
      lieu: '',
      etiquette: '',
      category_id: undefined
    }
  )
  const [categories, setCategories] = useState<Array<{id: number, titre: string, description: string}>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [reloadTrigger, setReloadTrigger] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('category')
        .select('id, titre, description')
        .order('titre', { ascending: true })

      if (error) {
        console.error('Erreur chargement catégories :', error)
      } else {
        setCategories(data)
      }
    }

    fetchCategories()
  }, [])

  if (viewMode && !mission) {
    return null
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation du champ category_id
    if (!formData.category_id) {
      alert('Veuillez sélectionner une catégorie')
      return
    }
    
    // Verrou strict contre les soumissions multiples
    if (isSubmitting || submissionId) {
      console.log('Blocage soumission - Déjà en cours avec ID:', submissionId)
      alert('Une soumission est déjà en cours')
      return
    }
    
    // Début de la soumission avec verrouillage
    setIsSubmitting(true)
    const currentSubmissionId = crypto.randomUUID()
    setSubmissionId(currentSubmissionId)
    console.log('Début soumission - Nouvel ID:', currentSubmissionId)
    
    try {
      // Délai minimum avant insertion (500ms)
      await new Promise(resolve => setTimeout(resolve, 500))

      // Vérification de l'authentification
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        throw new Error('Utilisateur non authentifié')
      }

      // Vérification des doublons avant insertion
      if (!mission) {
        const { data: existing, error: selectDupError } = await supabaseAdmin
          .from('missions')
          .select('id')
          .eq('name', formData.name)
          .eq('client', formData.client)
          .eq('mission_date', new Date(formData.mission_date).toISOString())
          .maybeSingle()

        if (selectDupError) throw selectDupError
        if (existing) {
          alert('Une mission identique existe déjà.')
          setIsSubmitting(false)
          setSubmissionId(null)
          return
        }
      }

      // Log des données envoyées
      console.log('Données envoyées à Supabase:', {
        ...formData,
        mission_date: new Date(formData.mission_date).toISOString()
      })
     
      if (mission) {
        console.log('Tentative de mise à jour mission ID:', mission.id)
        const { data: updatedMission, error } = await supabaseAdmin
          .from('missions')
          .update({
            ...formData,
            mission_date: new Date(formData.mission_date).toISOString()
          })
          .eq('id', mission.id)
          .select()
          .single()

        if (error) throw error
        if (!updatedMission) throw new Error('Aucune donnée retournée après mise à jour')

        showSuccess('Mission modifiée avec succès !')
        
        // Réinitialiser l'état pour permettre une nouvelle soumission
        setIsSubmitting(false)
        setSubmissionId(null)
        
        onMissionSaved(updatedMission)
      } else {
        const { data: newMission, error } = await supabaseAdmin
          .from('missions')
          .insert({
            ...formData,
            mission_date: new Date(formData.mission_date).toISOString(),
            category_id: formData.category_id
          })
          .select()
          .single()

        if (error) {
          if (error.code === '23505') {
            alert('Cette mission existe déjà (doublon bloqué par la base de données).')
          } else {
            alert(`Erreur lors de l'insertion: ${error.message}`)
          }
          throw error
        }
        if (!newMission) throw new Error('Aucune donnée retournée après insertion')

        console.log('Insertion réussie - ID:', currentSubmissionId)
        showSuccess('Mission enregistrée avec succès !')
        
        // Réinitialiser l'état pour permettre une nouvelle soumission
        setIsSubmitting(false)
        setSubmissionId(null)
        
        onMissionSaved(newMission)
      }
      
      // Ne fermer la modal qu'après un délai plus court pour permettre la mise à jour
      setTimeout(() => {
        onClose()
        setReloadTrigger(true)
        window.location.reload()
      }, 800)
    } catch (err) {
      console.error('Erreur complète Supabase:', err)
      
      // Réinitialisation complète après erreur
      setIsSubmitting(false)
      setSubmissionId(null)
      
      if (err instanceof Error) {
        if (err.message.includes('23505')) {
          alert('Cette mission existe déjà. Veuillez vérifier les données.')
        } else {
          alert(`Erreur technique: ${err.message}`)
        }
      } else {
        alert('Erreur inconnue lors de la sauvegarde')
      }
    }
  }

  const handleDelete = async () => {
    if (!mission) return
    
    console.log('Suppression confirmée, mission:', mission.id)
    
    try {
      const { error } = await supabaseAdmin
        .from('missions')
        .delete()
        .eq('id', mission.id)

      if (error) throw error
      
      showSuccess('Mission supprimée avec succès !')
      
      // Notifier le parent que la mission a été supprimée
      onMissionSaved(mission) // Le parent devra gérer la suppression de la liste
      
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
      alert('Erreur lors de la suppression de la mission')
    }
    
    setShowDeleteModal(false)
  }

  return (
    <>
      {/* Message de succès */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-[60] animate-bounce">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Modal principal amélioré */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800/95 rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
          {/* Header avec gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 text-white p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>
                  {viewMode ? 'Détails mission' : mission ? 'Modifier mission' : 'Nouvelle mission'}
                </span>
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6">
            {viewMode ? (
              <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</p>
                    <p className="text-base text-gray-900 dark:text-white mt-1 font-medium">{mission?.id}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mission</p>
                    <p className="text-base text-gray-900 dark:text-white mt-1 font-medium">{mission?.name}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</p>
                    <p className="text-base text-gray-900 dark:text-white mt-1 font-medium">{mission?.client}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</p>
                    <p className="text-base text-gray-900 dark:text-white mt-1 font-medium">
                      {mission?.mission_date ? new Date(mission.mission_date).toLocaleDateString('fr-FR') : ''}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lieu</p>
                    <p className="text-base text-gray-900 dark:text-white mt-1 font-medium">{mission?.lieu}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Étiquette</p>
                    <p className="text-base text-gray-900 dark:text-white mt-1 font-medium">{mission?.etiquette}</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
                        setShowDeleteModal(true)
                      }
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Supprimer</span>
                  </button>
                  <button
                    onClick={() => setViewMode(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Modifier</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mission <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Nom de la mission"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({...formData, name: e.target.value})
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Client <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Nom du client"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData({...formData, client: e.target.value})
                      }
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={formData.mission_date}
                      onChange={(e) =>
                        setFormData({...formData, mission_date: e.target.value})
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Lieu</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Lieu de la mission (ville, pays...)"
                      value={formData.lieu || ''}
                      onChange={(e) =>
                        setFormData({...formData, lieu: e.target.value})
                      }
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Étiquette</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Étiquette de la mission"
                      value={formData.etiquette}
                      onChange={(e) =>
                        setFormData({...formData, etiquette: e.target.value})
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Catégorie <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={formData.category_id ?? ''}
                      onChange={(e) =>
                        setFormData({...formData, category_id: e.target.value ? Number(e.target.value) : null})
                      }
                    >
                      <option value="">Sélectionnez une catégorie</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.titre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium text-gray-700 dark:text-gray-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded-lg text-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 transition-colors flex items-center justify-center gap-2 font-medium shadow-md ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isSubmitting}
                    onMouseDown={(e) => isSubmitting && e.preventDefault()}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Traitement...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{mission ? 'Modifier la mission' : 'Créer la mission'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmation de suppression améliorée */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white dark:bg-gray-800/95 rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-5">
                <svg className="w-8 h-8 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">
                Confirmer la suppression
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-7">
                Êtes-vous sûr de vouloir supprimer définitivement la mission <span className="font-semibold text-gray-900 dark:text-white">"{mission?.name}"</span> ? Cette action ne peut pas être annulée.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-5 py-3 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Supprimer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}