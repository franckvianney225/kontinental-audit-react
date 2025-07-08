import { useState } from 'react'
import { Mission } from '../pages/AdminPage'

type MissionFormProps = {
  editingMission: Mission | null
  newMission: Omit<Mission, 'id'>
  missions: Mission[]
  setEditingMission: (mission: Mission | null) => void
  setNewMission: (mission: Omit<Mission, 'id'>) => void
  setMissions: (missions: Mission[]) => void
  setShowMissionForm: (show: boolean) => void
}

export default function MissionForm({
  editingMission,
  newMission,
  missions,
  setEditingMission,
  setNewMission,
  setMissions,
  setShowMissionForm
}: MissionFormProps) {
  const [viewMode, setViewMode] = useState(!!editingMission)

  if (viewMode && !editingMission) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {viewMode ? 'Détails mission' : editingMission ? 'Modifier mission' : 'Nouvelle mission'}
        </h2>

        {viewMode ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-medium text-gray-500">ID</p>
                <p className="text-xl text-gray-900 mt-1">{editingMission?.id}</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-500">Mission</p>
                <p className="text-xl text-gray-900 mt-1">{editingMission?.nom}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-medium text-gray-500">Client</p>
                <p className="text-xl text-gray-900 mt-1">{editingMission?.client}</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-500">Date</p>
                <p className="text-xl text-gray-900 mt-1">{editingMission?.date}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-lg font-medium text-gray-500">Lieu</p>
                <p className="text-xl text-gray-900 mt-1">{editingMission?.lieu}</p>
              </div>
              <div>
                <p className="text-lg font-medium text-gray-500">Étiquette</p>
                <p className="text-xl text-gray-900 mt-1">{editingMission?.etiquette}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4 pt-6">
              <button
                onClick={() => {
                  setShowMissionForm(false)
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
                value={editingMission ? editingMission.nom : newMission.nom}
                onChange={(e) => editingMission
                  ? setEditingMission({...editingMission, nom: e.target.value})
                  : setNewMission({...newMission, nom: e.target.value})
                }
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Client</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                value={editingMission ? editingMission.client : newMission.client}
                onChange={(e) => editingMission
                  ? setEditingMission({...editingMission, client: e.target.value})
                  : setNewMission({...newMission, client: e.target.value})
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  value={editingMission ? editingMission.date : newMission.date}
                  onChange={(e) => editingMission
                    ? setEditingMission({...editingMission, date: e.target.value})
                    : setNewMission({...newMission, date: e.target.value})
                  }
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Lieu</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  value={editingMission ? editingMission.lieu : newMission.lieu}
                  onChange={(e) => editingMission
                    ? setEditingMission({...editingMission, lieu: e.target.value})
                    : setNewMission({...newMission, lieu: e.target.value})
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Étiquette</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                value={editingMission ? editingMission.etiquette : newMission.etiquette}
                onChange={(e) => editingMission
                  ? setEditingMission({...editingMission, etiquette: e.target.value})
                  : setNewMission({...newMission, etiquette: e.target.value})
                }
              />
            </div>
            <div className="flex justify-end space-x-4 pt-6">
              <button
                onClick={() => {
                  setShowMissionForm(false)
                  setEditingMission(null)
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg text-lg"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (editingMission) {
                    setMissions(missions.map(m =>
                      m.id === editingMission.id ? editingMission : m
                    ))
                  } else {
                    setMissions([...missions, {
                      ...newMission,
                      id: Date.now().toString()
                    }])
                    setNewMission({
                      nom: '',
                      client: '',
                      date: new Date().toISOString().split('T')[0],
                      lieu: '',
                      etiquette: ''
                    })
                  }
                  setShowMissionForm(false)
                  setEditingMission(null)
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg"
              >
                {editingMission ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}