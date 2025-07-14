import { useState, useEffect } from 'react'
import { supabase, supabaseAdmin } from '../lib/supabaseClient'
import MissionForm from '../components/MissionForm'
import UserForm from '../components/UserForm'
import { SMTPManager } from '../components/SMTPManager'
import EnterpriseManager from '../components/admin/EnterpriseManager'
import { Dashboard } from '../components/admin/Dashboard'
import MissionsManager from '../components/admin/MissionsManager'
import { UsersManager } from '../components/admin/UsersManager'
import { Sidebar } from '../components/admin/Sidebar'
import { CategoriesManager } from '../components/admin/CategoriesManager'
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
  Building,
  MailCheck,
  Server,
  Briefcase
} from 'lucide-react'

import type { Mission } from '../types/mission'

import { User, UserMetadata } from '../types/user'

export default function AdminPage() {
  // Récupérer l'onglet actif depuis l'URL ou utiliser 'dashboard' par défaut
  const [activeTab, setActiveTab] = useState(
    window.location.hash.slice(1) || 'dashboard'
  )
  
  // Mettre à jour l'URL quand l'onglet change
  useEffect(() => {
    window.location.hash = activeTab
  }, [activeTab])

  // Écouter les changements de hash manuels (navigation arrière/clics)
  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(window.location.hash.slice(1) || 'dashboard')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])
  const [missions, setMissions] = useState<Mission[]>([])
  
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({
        page: 1,
        perPage: 1000
      })
      if (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error)
        return
      }
      setUsers(users.map(u => ({
        id: u.id,
        email: u.email || '',
        user_metadata: {
          name: u.user_metadata?.name || '',
          role: u.user_metadata?.role || 'Utilisateur',
          phone: u.user_metadata?.phone,
          company: u.user_metadata?.company
        },
        created_at: u.created_at || new Date().toISOString()
      })))
    }

    const fetchMissions = async () => {
      setIsLoading(true)
      try {
        console.log('Tentative de chargement des missions depuis Supabase...')
        const { data, error } = await supabase
          .from('missions')
          .select('*')
          .order('mission_date', { ascending: false })
        
        if (error) {
          console.error('Erreur lors du chargement des missions:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
          })
          return
        }
        console.log('Missions chargées avec succès:', data?.length)
        setMissions(data || [])
      } catch (err) {
        console.error('Erreur inattendue:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
    fetchMissions()
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const [showMissionForm, setShowMissionForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [editingMission, setEditingMission] = useState<Mission | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [newMission, setNewMission] = useState<Omit<Mission, 'id'>>({
    name: '',
    client: '',
    mission_date: new Date().toISOString().split('T')[0],
    lieu: '',
    etiquette: '',
    category_id: null
  })
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    email: '',
    user_metadata: {
      name: '',
      role: 'Utilisateur',
      phone: '',
      company: ''
    },
    created_at: new Date().toISOString()
  })

  // Statistiques du tableau de bord
  const stats = {
    totalMissions: missions.length,
    totalUsers: users.length,
    usersActifs: users.length // Tous les utilisateurs sont actifs dans Supabase
  }

  // Fonction pour obtenir la couleur du statut (utilisée uniquement pour les utilisateurs)
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Actif': return 'bg-green-100 text-green-800'
      case 'Inactif': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }




  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {showMissionForm && (
          <MissionForm
            onClose={() => {
              setShowMissionForm(false)
              setEditingMission(null)
            }}
            mission={editingMission}
            onMissionSaved={async (missionData) => {
              try {
                const operation = editingMission
                  ? supabase
                      .from('missions')
                      .update(missionData)
                      .eq('id', editingMission.id)
                      .select()
                      .single()
                  : supabase
                      .from('missions')
                      .insert({...missionData})
                      .select()
                      .single();

                const { data, error } = await operation;

                if (error) {
                  console.error('Erreur opération mission:', {
                    message: error.message,
                    code: error.code,
                    details: error.details,
                    data: missionData
                  });
                  throw error;
                }

                // Mise à jour de l'état
                setMissions(editingMission
                  ? missions.map(m => m.id === data.id ? data : m)
                  : [data, ...missions]
                );

                setShowMissionForm(false);
                setEditingMission(null);
                return data;
              } catch (error) {
                console.error('Erreur globale dans onMissionSaved:', error);
                throw error;
              }
            }}
          />
        )}
        {showUserForm && (
          <UserForm
            onSuccess={() => {
              setShowUserForm(false)
              setEditingUser(null)
              // Rafraîchir la liste des utilisateurs
              supabaseAdmin.auth.admin.listUsers()
                .then(({ data: { users } }) => {
                  setUsers(users.map(u => ({
                    id: u.id,
                    email: u.email || '',
                    user_metadata: {
                      name: u.user_metadata?.name || '',
                      role: u.user_metadata?.role || 'Utilisateur',
                      phone: u.user_metadata?.phone,
                      company: u.user_metadata?.company
                    },
                    created_at: u.created_at || new Date().toISOString()
                  })))
                })
            }}
            onCancel={() => {
              setShowUserForm(false)
              setEditingUser(null)
            }}
          />
        )}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={async () => {
            await supabase.auth.signOut();
            window.location.href = '/login';
          }}
        />

        {/* Contenu principal */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'dashboard' && <Dashboard missions={missions} users={users} />}
          {activeTab === 'missions' && (
            <MissionsManager
              missions={missions}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setShowMissionForm={setShowMissionForm}
              setEditingMission={setEditingMission}
              onDeleteMission={async (missionId) => {
                const { error } = await supabase
                  .from('missions')
                  .delete()
                  .eq('id', missionId)
                
                if (error) {
                  console.error('Erreur lors de la suppression:', error)
                  return
                }
                setMissions(missions.filter(m => m.id !== Number(missionId)))
              }}
            />
          )}
          {activeTab === 'users' && (
            <UsersManager
              users={users}
              setShowUserForm={setShowUserForm}
              setEditingUser={setEditingUser}
              onDeleteUser={(userId) => {
                supabaseAdmin.auth.admin.deleteUser(userId)
                setUsers(users.filter(u => u.id !== userId))
              }}
            />
          )}
          {activeTab === 'enterprises' && <EnterpriseManager />}
          {activeTab === 'smtp' && <SMTPManager />}
          {activeTab === 'categories' && <CategoriesManager />}
        </div>
      </div>
    </div>
  );
}
