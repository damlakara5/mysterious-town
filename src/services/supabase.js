
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://omknzceuqrbsfivxfulo.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ta256Y2V1cXJic2ZpdnhmdWxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzNTg0ODYsImV4cCI6MjAwNzkzNDQ4Nn0.5gPDl0tV1cvK4XL_agEOK5ESNIJ5eQR9XX2vi0UlSgM"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase