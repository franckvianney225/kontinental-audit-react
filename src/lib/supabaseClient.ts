import { createClient } from '@supabase/supabase-js'
import supabaseConfig from '../config/supabase'

export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey)
export const supabaseAdmin = createClient(
  supabaseConfig.url,
  supabaseConfig.serviceKey || supabaseConfig.anonKey
)