import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  role: 'admin' | 'student' | 'club'
  name: string
  created_at: string
  updated_at: string
}

export interface Student {
  id: string
  user_id: string
  roll_no: string
  department: string
  year: string
  phone: string
  created_at: string
}

export interface Club {
  id: string
  user_id: string
  club_name: string
  full_name: string
  contact_person: string
  phone: string
  description: string
  logo_url?: string
  workspace_location?: string
  social_media_handles?: any
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  venue: string
  date: string
  time: string
  price: number
  capacity: number
  registered: number
  category: string
  club_id: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  team_allowed: boolean
  team_size?: number
  proof_url?: string
  image_url?: string
  created_at: string
}

export interface Registration {
  id: string
  event_id: string
  student_id: string
  payment_id: string
  amount: number
  team_name?: string
  team_members?: string[]
  created_at: string
}

export interface Feedback {
  id: string
  event_id: string
  student_id: string
  rating: number
  comments: string
  created_at: string
}

export interface Report {
  id: string
  event_id: string
  budget_doc_url: string
  summary: string
  uploaded_on: string
}

export interface Query {
  id: string
  event_id: string
  student_id: string
  question: string
  answer?: string
  answered_by?: string
  created_at: string
} 