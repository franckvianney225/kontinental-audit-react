const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://ceillfyjxmsedxrosqux.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlaWxsZnlqeG1zZWR4cm9zcXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTcyMzQsImV4cCI6MjA2NzQ5MzIzNH0.BVQdQLo6tnTRlRATooygOPkkVMc3dz6x2XgMS_lyNwA',
  serviceKey: import.meta.env.VITE_SUPABASE_SERVICE_KEY || ''
}

export default supabaseConfig