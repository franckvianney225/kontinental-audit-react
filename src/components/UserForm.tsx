import { User } from '../pages/AdminPage'

type UserFormProps = {
  editingUser: User | null
  newUser: Omit<User, 'id'>
  users: User[]
  setEditingUser: (user: User | null) => void
  setNewUser: (user: Omit<User, 'id'>) => void
  setUsers: (users: User[]) => void
  setShowUserForm: (show: boolean) => void
}

export default function UserForm({
  editingUser,
  newUser,
  users,
  setEditingUser,
  setNewUser,
  setUsers,
  setShowUserForm
}: UserFormProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">
          {editingUser ? 'Modifier utilisateur' : 'Nouvel utilisateur'}
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Nom</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
              value={editingUser ? editingUser.name : newUser.name}
              onChange={(e) => editingUser
                ? setEditingUser({...editingUser, name: e.target.value})
                : setNewUser({...newUser, name: e.target.value})
              }
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
              value={editingUser ? editingUser.email : newUser.email}
              onChange={(e) => editingUser
                ? setEditingUser({...editingUser, email: e.target.value})
                : setNewUser({...newUser, email: e.target.value})
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Rôle</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                value={editingUser ? editingUser.role : newUser.role}
                onChange={(e) => editingUser
                  ? setEditingUser({...editingUser, role: e.target.value})
                  : setNewUser({...newUser, role: e.target.value})
                }
              >
                <option value="Administrateur">Administrateur</option>
                <option value="Utilisateur">Utilisateur</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Statut</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg"
                value={editingUser ? editingUser.status : newUser.status}
                onChange={(e) => editingUser
                  ? setEditingUser({...editingUser, status: e.target.value as User['status']})
                  : setNewUser({...newUser, status: e.target.value as User['status']})
                }
              >
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <button
              onClick={() => {
                setShowUserForm(false)
                setEditingUser(null)
              }}
              className="px-6 py-3 border border-gray-300 rounded-lg text-lg"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                if (editingUser) {
                  setUsers(users.map(u =>
                    u.id === editingUser.id ? editingUser : u
                  ))
                } else {
                  setUsers([...users, {
                    ...newUser,
                    id: Date.now().toString()
                  }])
                  setNewUser({
                    name: '',
                    email: '',
                    role: 'Utilisateur',
                    phone: '',
                    company: '',
                    status: 'Actif',
                    joinDate: new Date().toISOString().split('T')[0]
                  })
                }
                setShowUserForm(false)
                setEditingUser(null)
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg"
            >
              {editingUser ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}