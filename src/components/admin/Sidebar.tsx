import { BarChart3, Calendar, Users, Server } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onLogout: () => void
}

export function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  return (
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
          
          <button
            onClick={() => setActiveTab('smtp')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'smtp'
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Server className="h-5 w-5" />
            <span className="font-medium">Configuration SMTP</span>
          </button>
        </nav>
      </div>
      
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  )
}