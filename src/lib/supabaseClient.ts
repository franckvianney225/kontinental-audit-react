import { createClient } from '@supabase/supabase-js'
import supabaseConfig from '../config/supabase'

export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey)
export const supabaseAdmin = createClient(
  supabaseConfig.url,
  supabaseConfig.serviceKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'Authorization': `Bearer ${supabaseConfig.serviceKey}`
      }
    }
  }
)