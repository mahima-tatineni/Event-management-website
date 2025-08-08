import { supabase } from './supabase'
import { User, Student, Club } from './supabase'

export const validateMLRITEmail = (email: string): boolean => {
  return email.endsWith('@mlrit.ac.in')
}

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: 'student' | 'club'
): Promise<{ user: User | null; error: string | null }> => {
  try {
    // Validate email domain
    if (!validateMLRITEmail(email)) {
      return { user: null, error: 'Only MLRIT email addresses (@mlrit.ac.in) are allowed' }
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return { user: null, error: 'User with this email already exists' }
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return { user: null, error: authError.message }
    }

    if (!authData.user) {
      return { user: null, error: 'Failed to create user' }
    }

    // Create user record in database
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        name,
        role,
      })
      .select()
      .single()

    if (userError) {
      return { user: null, error: userError.message }
    }

    return { user: userData, error: null }
  } catch (error) {
    return { user: null, error: 'Registration failed. Please try again.' }
  }
}

export const registerStudent = async (
  userData: User,
  studentData: {
    roll_no: string
    department: string
    year: string
    phone: string
  }
): Promise<{ student: Student | null; error: string | null }> => {
  try {
    // Check if roll number already exists
    const { data: existingStudent, error: checkError } = await supabase
      .from('students')
      .select('id')
      .eq('roll_no', studentData.roll_no)
      .single()

    if (existingStudent) {
      return { student: null, error: 'Student with this roll number already exists' }
    }

    // Create student record
    const { data: student, error } = await supabase
      .from('students')
      .insert({
        user_id: userData.id,
        ...studentData,
      })
      .select()
      .single()

    if (error) {
      return { student: null, error: error.message }
    }

    return { student, error: null }
  } catch (error) {
    return { student: null, error: 'Failed to create student profile' }
  }
}

export const registerClub = async (
  userData: User,
  clubData: {
    club_name: string
    full_name: string
    contact_person: string
    phone: string
    description: string
  }
): Promise<{ club: Club | null; error: string | null }> => {
  try {
    // Create club record
    const { data: club, error } = await supabase
      .from('clubs')
      .insert({
        user_id: userData.id,
        ...clubData,
      })
      .select()
      .single()

    if (error) {
      return { club: null, error: error.message }
    }

    return { club, error: null }
  } catch (error) {
    return { club: null, error: 'Failed to create club profile' }
  }
}

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: User | null; error: string | null }> => {
  try {
    // Validate email domain
    if (!validateMLRITEmail(email)) {
      return { user: null, error: 'Only MLRIT email addresses (@mlrit.ac.in) are allowed' }
    }

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      return { user: null, error: authError.message }
    }

    if (!authData.user) {
      return { user: null, error: 'Invalid email or password' }
    }

    // Get user data from database
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (userError) {
      return { user: null, error: userError.message }
    }

    return { user, error: null }
  } catch (error) {
    return { user: null, error: 'Login failed. Please try again.' }
  }
}

export const getCurrentUser = async (): Promise<{ user: User | null; error: string | null }> => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return { user: null, error: 'Not authenticated' }
    }

    // Get user data from database
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (userError) {
      return { user: null, error: userError.message }
    }

    return { user: userData, error: null }
  } catch (error) {
    return { user: null, error: 'Failed to get current user' }
  }
}

export const logoutUser = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut()
    return { error: error?.message || null }
  } catch (error) {
    return { error: 'Logout failed' }
  }
}

export const getStudentProfile = async (userId: string): Promise<{ student: Student | null; error: string | null }> => {
  try {
    const { data: student, error } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      return { student: null, error: error.message }
    }

    return { student, error: null }
  } catch (error) {
    return { student: null, error: 'Failed to get student profile' }
  }
}

export const getClubProfile = async (userId: string): Promise<{ club: Club | null; error: string | null }> => {
  try {
    const { data: club, error } = await supabase
      .from('clubs')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      return { club: null, error: error.message }
    }

    return { club, error: null }
  } catch (error) {
    return { club: null, error: 'Failed to get club profile' }
  }
} 