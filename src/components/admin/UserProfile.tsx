import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import type { User } from '../../types/user'

interface UserProfileProps {
  user: User | null
}

export function UserProfile({ user }: UserProfileProps) {
  if (!user) return null

  const initials = user.user_metadata?.name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')

  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {user.user_metadata?.name || 'Utilisateur'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {user.email}
        </p>
      </div>
    </div>
  )
}