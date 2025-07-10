import { Users, Calendar, Building } from 'lucide-react'
import type { Mission } from '../../types/mission'
import type { User } from '../../types/user'

interface DashboardProps {
  missions: Mission[]
  users: User[]
}

export function Dashboard({ missions, users }: DashboardProps) {
  const stats = {
    totalMissions: missions.length,
    totalUsers: users.length,
    usersActifs: users.length
  }

  return (
    <div className="p-6 max-w-none w-full text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-gray-600 dark:text-gray-300">Vue d'ensemble de vos missions et utilisateurs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-colors"
          onClick={() => window.location.hash = 'missions'}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Missions totales</p>
              <p className="text-3xl font-bold">{stats.totalMissions}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div
          className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg cursor-pointer hover:from-purple-600 hover:to-purple-700 transition-colors"
          onClick={() => window.location.hash = 'users'}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Utilisateurs actifs</p>
              <p className="text-3xl font-bold">{stats.usersActifs}</p>
            </div>
            <Users className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700/80 p-6 rounded-xl shadow-lg backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
        <div className="space-y-3">
          {missions.slice(0, 5).map((mission) => (
            <div key={mission.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{mission.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-300">{mission.client}</p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {new Date(mission.mission_date).toLocaleDateString('fr-FR')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-700/80 p-6 rounded-xl shadow-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Utilisateurs</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Administrateurs</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{users.filter(u => u.user_metadata?.role === 'Administrateur').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Utilisateurs</span>
              <span className="text-sm font-bold text-green-600 dark:text-green-400">{users.filter(u => u.user_metadata?.role === 'Utilisateur').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Total actifs</span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{stats.usersActifs}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700/80 p-6 rounded-xl shadow-lg backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Aperçu mensuel</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Ce mois</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{missions.length} missions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}