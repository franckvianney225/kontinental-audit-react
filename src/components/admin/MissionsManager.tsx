import { useState } from 'react'
import { Plus, Edit2, Trash2, Search, Calendar, Building, MapPin } from 'lucide-react'
import type { Mission } from '../../types/mission'
import MissionForm from '../MissionForm'

interface MissionsManagerProps {
  missions: Mission[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  setShowMissionForm: (show: boolean) => void
  setEditingMission: (mission: Mission | null) => void
  onDeleteMission: (id: number) => void
}

export default function MissionsManager({
  missions,
  searchTerm,
  setSearchTerm,
  setShowMissionForm,
  setEditingMission,
  onDeleteMission
}: MissionsManagerProps) {
  return (
    <div className="p-6 max-w-none w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des missions</h1>
          <p className="text-gray-600">Gérez vos missions et leur statut</p>
        </div>
        <button 
          onClick={() => setShowMissionForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle mission</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une mission..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lieu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {missions
                .filter(mission => 
                  mission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  mission.client.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((mission) => (
                <tr key={mission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{mission.name}</div>
                        <div className="text-sm text-gray-500">{mission.etiquette}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{mission.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(mission.mission_date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{mission.lieu}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => {
                        setEditingMission(mission)
                        setShowMissionForm(true)
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteMission(mission.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}