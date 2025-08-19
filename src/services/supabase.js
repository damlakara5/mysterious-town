
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://jykvmtulfvxrhsckioql.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5a3ZtdHVsZnZ4cmhzY2tpb3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MTk2MDUsImV4cCI6MjA3MTE5NTYwNX0.SYUDeDkpsKLshq9hDlME89uRjSPBhpRMCUG5bK2JyvQ"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase
