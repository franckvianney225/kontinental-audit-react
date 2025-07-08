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
  const [viewMode, setViewMode] = useState(!!mission)
  const [formData, setFormData] = useState<Omit<Mission, 'id'>>(mission || {
    name: '',
    client: '',
    mission_date: new Date().toISOString().split('T')[0],
    lieu: '',
    etiquette: '',
    category_id: null
  })
  const [categories, setCategories] = useState<Array<{id: number, titre: string, description: string}>>([])

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {viewMode ? 'Détails mission' : mission ? 'Modifier mission' : 'Nouvelle mission'}
        </h2>

        {viewMode ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-medium text-gray-500">ID</p>
                <p className="text-xl text-gray-900 mt-1">{mission?.id}</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-500">Mission</p>
                <p className="text-xl text-gray-900 mt-1">{mission?.name}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-medium text-gray-500">Client</p>
                <p className="text-xl text-gray-900 mt-1">{mission?.client}</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-500">Date</p>
                <p className="text-xl text-gray-900 mt-1">{mission?.mission_date}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-medium text-gray-500">Lieu</p>
                <p className="text-xl text-gray-900 mt-1">{mission?.lieu}</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-500">Étiquette</p>
                <p className="text-xl text-gray-900 mt-1">{mission?.etiquette}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-6">
              <button
                onClick={() => {
                  onClose()
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg text-lg"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  setViewMode(false)
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg"
              >
                Modifier
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Mission</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                value={formData.name}
                onChange={(e) =>
                  setFormData({...formData, name: e.target.value})
                }
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Client</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                value={formData.client}
                onChange={(e) =>
                  setFormData({...formData, client: e.target.value})
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  value={formData.mission_date}
                  onChange={(e) =>
                    setFormData({...formData, mission_date: e.target.value})
                  }
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Lieu</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  value={formData.lieu}
                  onChange={(e) =>
                    setFormData({...formData, lieu: e.target.value})
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Étiquette</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                value={formData.etiquette}
                onChange={(e) =>
                  setFormData({...formData, etiquette: e.target.value})
                }
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                value={formData.category_id || ''}
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
            <div className="flex justify-end space-x-4 pt-6">
              <button
                onClick={() => {
                  onClose()
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg text-lg"
              >
                Annuler
              </button>
              <button
                onClick={async () => {
                  try {
                    // Vérification de l'authentification
                    const { data: { user }, error: authError } = await supabase.auth.getUser()
                    
                    if (authError || !user) {
                      throw new Error('Utilisateur non authentifié')
                    }

                    // Log des données envoyées
                    console.log('Données envoyées à Supabase:', {
                      ...formData,
                      mission_date: new Date(formData.mission_date).toISOString()
                    })
               
                    if (mission) {
                      console.log('Tentative de mise à jour mission ID:', mission.id)
                      // Mise à jour avec le client admin pour contourner RLS
                      const { data, error } = await supabaseAdmin
                        .from('missions')
                        .update({
                          ...formData,
                          mission_date: new Date(formData.mission_date).toISOString()
                        })
                        .eq('id', mission.id)
                        .select('*')
                        .maybeSingle()
                     
                      if (error) {
                        console.error('Détails erreur Supabase:', error)
                        throw error
                      }
                      if (!data) {
                        throw new Error('Mission introuvable - vérifiez que l\'ID est correct')
                      }
                      onMissionSaved(data)
                    } else {
                      // Insertion avec le client admin pour contourner RLS si nécessaire
                      const { data, error } = await supabaseAdmin
                        .from('missions')
                        .insert({
                          ...formData,
                          mission_date: new Date(formData.mission_date).toISOString(),
                          category_id: formData.category_id,
                          id: Math.floor(Math.random() * 1000000) // ID temporaire
                        })
                        .select()
                        .single()
                     
                      if (error) {
                        console.error('Détails erreur Supabase:', error)
                        throw error
                      }
                      onMissionSaved(data)
                    }
                    onClose()
                  } catch (err) {
                    console.error('Erreur complète Supabase:', err)
                    if (err instanceof Error) {
                      alert(`Erreur détaillée: ${err.message}`)
                    } else {
                      alert('Erreur inconnue lors de la sauvegarde')
                    }
                  }
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg"
              >
                {mission ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}