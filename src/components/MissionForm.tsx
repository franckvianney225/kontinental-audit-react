import { useState } from 'react'
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
    Client: '',
    mission_date: new Date().toISOString().split('T')[0],
    Lieu: '',
    Étiquette: ''
  })

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
                <p className="text-xl text-gray-900 mt-1">{mission?.Client}</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-500">Date</p>
                <p className="text-xl text-gray-900 mt-1">{mission?.mission_date}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-medium text-gray-500">Lieu</p>
                <p className="text-xl text-gray-900 mt-1">{mission?.Lieu}</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-500">Étiquette</p>
                <p className="text-xl text-gray-900 mt-1">{mission?.Étiquette}</p>
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
                value={formData.Client}
                onChange={(e) =>
                  setFormData({...formData, Client: e.target.value})
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
                  value={formData.Lieu}
                  onChange={(e) =>
                    setFormData({...formData, Lieu: e.target.value})
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Étiquette</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                value={formData.Étiquette}
                onChange={(e) =>
                  setFormData({...formData, Étiquette: e.target.value})
                }
              />
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
              
                    if (mission) {
                      // Utilisation de supabaseAdmin pour les opérations admin
                      const { data, error } = await supabaseAdmin
                        .from('missions')
                        .update(formData)
                        .eq('id', mission.id)
                        .select()
                        .single()
                     
                      if (error) throw error
                      onMissionSaved(data)
                    } else {
                      const { data, error } = await supabaseAdmin
                        .from('missions')
                        .insert(formData)
                        .select()
                        .single()
                     
                      if (error) throw error
                      onMissionSaved(data)
                    }
                    onClose()
                  } catch (err) {
                    console.error('Erreur Supabase:', err)
                    alert(`Erreur lors de la sauvegarde: ${err instanceof Error ? err.message : 'Erreur inconnue'}`)
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