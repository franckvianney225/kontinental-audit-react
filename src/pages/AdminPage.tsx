import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import MissionForm from '../components/MissionForm'
import UserForm from '../components/UserForm'
import { 
  Users, 
  Calendar, 
  MapPin, 
  Tag, 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
  Filter,
  BarChart3,
  Shield,
  Mail,
  Phone,
  Building
} from 'lucide-react'

export type Mission = {
  id: string
  nom: string
  client: string
  date: string
  lieu: string
  etiquette: string
}

export type User = {
  id: string
  name: string
  email: string
  role: string
  phone?: string
  company?: string
  status: 'Actif' | 'Inactif'
  joinDate: string
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      nom: 'Audit sécurité',
      client: 'Tech Corp',
      date: '2024-12-15',
      lieu: 'Paris',
      etiquette: 'Sécurité'
    },
    {
      id: '2',
      nom: 'Formation équipe',
      client: 'StartUp Inc',
      date: '2024-12-20',
      lieu: 'Lyon',
      etiquette: 'Formation'
    }
  ])
  
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean.dupont@example.com',
      role: 'Administrateur',
      phone: '0123456789',
      company: 'Tech Corp',
      status: 'Actif',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@example.com',
      role: 'Utilisateur',
      phone: '0987654321',
      company: 'StartUp Inc',
      status: 'Actif',
      joinDate: '2024-02-20'
    }
  ])

  const [showMissionForm, setShowMissionForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [editingMission, setEditingMission] = useState<Mission | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [newMission, setNewMission] = useState<Omit<Mission, 'id'>>({
    nom: '',
    client: '',
    date: new Date().toISOString().split('T')[0],
    lieu: '',
    etiquette: ''
  })
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    role: 'Utilisateur',
    phone: '',
    company: '',
    status: 'Actif',
    joinDate: new Date().toISOString().split('T')[0]
  })

  // Statistiques du tableau de bord
  const stats = {
    totalMissions: missions.length,
    totalUsers: users.length,
    usersActifs: users.filter(u => u.status === 'Actif').length
  }

  // Fonction pour obtenir la couleur du statut (utilisée uniquement pour les utilisateurs)
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Actif': return 'bg-green-100 text-green-800'
      case 'Inactif': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Tableau de bord
  const Dashboard = () => (
    <div className="p-6 max-w-none w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de vos missions et utilisateurs</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Missions totales</p>
              <p className="text-3xl font-bold">{stats.totalMissions}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Utilisateurs actifs</p>
              <p className="text-3xl font-bold">{stats.usersActifs}</p>
            </div>
            <Users className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Graphiques et activité récente */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
        <div className="space-y-3">
          {missions.slice(0, 5).map((mission) => (
            <div key={mission.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{mission.nom}</p>
                <p className="text-xs text-gray-500">{mission.client}</p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(mission.date).toLocaleDateString('fr-FR')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section supplémentaire pour utiliser l'espace */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Utilisateurs</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Administrateurs</span>
              <span className="text-sm font-bold text-blue-600">{users.filter(u => u.role === 'Administrateur').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Utilisateurs</span>
              <span className="text-sm font-bold text-green-600">{users.filter(u => u.role === 'Utilisateur').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total actifs</span>
              <span className="text-sm font-bold text-purple-600">{stats.usersActifs}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Aperçu mensuel</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ce mois</span>
              <span className="text-sm font-bold text-blue-600">{missions.length} missions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Gestion des missions
  const MissionsManager = () => (
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

      {/* Barre de recherche */}
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

      {/* Tableau des missions */}
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
                  mission.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                        <div className="text-sm font-medium text-gray-900">{mission.nom}</div>
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
                    {new Date(mission.date).toLocaleDateString('fr-FR')}
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
                      onClick={() => {
                        setMissions(missions.filter(m => m.id !== mission.id))
                      }}
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

  // Gestion des utilisateurs
  const UsersManager = () => (
    <div className="p-6 max-w-none w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des utilisateurs</h1>
          <p className="text-gray-600">Gérez les comptes utilisateurs et leurs permissions</p>
        </div>
        <button 
          onClick={() => setShowUserForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvel utilisateur</span>
        </button>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entreprise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">Inscrit le {new Date(user.joinDate).toLocaleDateString('fr-FR')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{user.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{user.company || 'Non spécifié'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => {
                        setEditingUser(user)
                        setShowUserForm(true)
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setUsers(users.filter(u => u.id !== user.id))
                      }}
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


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {showMissionForm && (
          <MissionForm
            editingMission={editingMission}
            newMission={newMission}
            missions={missions}
            setEditingMission={setEditingMission}
            setNewMission={setNewMission}
            setMissions={setMissions}
            setShowMissionForm={setShowMissionForm}
          />
        )}
        {showUserForm && (
          <UserForm
            editingUser={editingUser}
            newUser={newUser}
            users={users}
            setEditingUser={setEditingUser}
            setNewUser={setNewUser}
            setUsers={setUsers}
            setShowUserForm={setShowUserForm}
          />
        )}
        {/* Sidebar moderne */}
        <div className="w-64 bg-white shadow-lg flex-shrink-0 flex flex-col">
          <div className="p-6 flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Administration</h2>
            
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span className="font-medium">Tableau de bord</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('missions')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'missions' 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Missions</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'users' 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="font-medium">Utilisateurs</span>
              </button>
            </nav>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = '/login';
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'missions' && <MissionsManager />}
          {activeTab === 'users' && <UsersManager />}
        </div>
      </div>
    </div>
  )
}