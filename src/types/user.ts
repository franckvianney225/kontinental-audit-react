export interface UserMetadata {
  name: string
  role: string
  phone?: string
  company?: string
}

export type User = {
  id: string
  email: string
  user_metadata: UserMetadata
  created_at: string
  status?: 'Actif' | 'Inactif'
}