export type Mission = {
  id?: number
  name: string
  client: string
  mission_date: string
  lieu: string
  etiquette: string
  category_id: number | null
  created_at?: string
  updated_at?: string
}