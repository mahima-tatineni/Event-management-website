import { supabase } from './supabase'
import { Event, Registration, Feedback, Query } from './supabase'

export const createEvent = async (eventData: {
  title: string
  description: string
  venue: string
  date: string
  time: string
  price: number
  capacity: number
  category: string
  club_id: string
  team_allowed: boolean
  team_size?: number
  proof_url?: string
  image_url?: string
}): Promise<{ event: Event | null; error: string | null }> => {
  try {
    const { data: event, error } = await supabase
      .from('events')
      .insert({
        ...eventData,
        registered: 0,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      return { event: null, error: error.message }
    }

    return { event, error: null }
  } catch (error) {
    return { event: null, error: 'Failed to create event' }
  }
}

export const getEvents = async (status?: string): Promise<{ events: Event[]; error: string | null }> => {
  try {
    let query = supabase.from('events').select('*')
    
    if (status) {
      query = query.eq('status', status)
    }

    const { data: events, error } = await query.order('created_at', { ascending: false })

    if (error) {
      return { events: [], error: error.message }
    }

    return { events: events || [], error: null }
  } catch (error) {
    return { events: [], error: 'Failed to fetch events' }
  }
}

export const getEventById = async (eventId: string): Promise<{ event: Event | null; error: string | null }> => {
  try {
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (error) {
      return { event: null, error: error.message }
    }

    return { event, error: null }
  } catch (error) {
    return { event: null, error: 'Failed to fetch event' }
  }
}

export const getEventsByClub = async (clubId: string): Promise<{ events: Event[]; error: string | null }> => {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('club_id', clubId)
      .order('created_at', { ascending: false })

    if (error) {
      return { events: [], error: error.message }
    }

    return { events: events || [], error: null }
  } catch (error) {
    return { events: [], error: 'Failed to fetch club events' }
  }
}

export const updateEventStatus = async (
  eventId: string,
  status: 'pending' | 'approved' | 'rejected' | 'completed'
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('events')
      .update({ status })
      .eq('id', eventId)

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (error) {
    return { error: 'Failed to update event status' }
  }
}

export const registerForEvent = async (
  eventId: string,
  studentId: string,
  paymentId: string,
  amount: number,
  teamName?: string,
  teamMembers?: string[]
): Promise<{ registration: Registration | null; error: string | null }> => {
  try {
    // Check if student is already registered
    const { data: existingRegistration, error: checkError } = await supabase
      .from('registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('student_id', studentId)
      .single()

    if (existingRegistration) {
      return { registration: null, error: 'Already registered for this event' }
    }

    // Create registration
    const { data: registration, error } = await supabase
      .from('registrations')
      .insert({
        event_id: eventId,
        student_id: studentId,
        payment_id: paymentId,
        amount,
        team_name: teamName,
        team_members: teamMembers,
      })
      .select()
      .single()

    if (error) {
      return { registration: null, error: error.message }
    }

    // Update event registration count
    const { error: updateError } = await supabase.rpc('increment_event_registration', { event_id: eventId })

    if (updateError) {
      console.error('Failed to update event registration count:', updateError)
    }

    return { registration, error: null }
  } catch (error) {
    return { registration: null, error: 'Failed to register for event' }
  }
}

export const getEventRegistrations = async (eventId: string): Promise<{ registrations: Registration[]; error: string | null }> => {
  try {
    const { data: registrations, error } = await supabase
      .from('registrations')
      .select(`
        *,
        students (
          roll_no,
          department,
          year,
          phone,
          users (name, email)
        )
      `)
      .eq('event_id', eventId)
      .order('created_at', { ascending: false })

    if (error) {
      return { registrations: [], error: error.message }
    }

    return { registrations: registrations || [], error: null }
  } catch (error) {
    return { registrations: [], error: 'Failed to fetch registrations' }
  }
}

export const submitFeedback = async (
  eventId: string,
  studentId: string,
  rating: number,
  comments: string
): Promise<{ feedback: Feedback | null; error: string | null }> => {
  try {
    // Check if feedback already exists
    const { data: existingFeedback, error: checkError } = await supabase
      .from('feedback')
      .select('id')
      .eq('event_id', eventId)
      .eq('student_id', studentId)
      .single()

    if (existingFeedback) {
      return { feedback: null, error: 'Feedback already submitted for this event' }
    }

    // Create feedback
    const { data: feedback, error } = await supabase
      .from('feedback')
      .insert({
        event_id: eventId,
        student_id: studentId,
        rating,
        comments,
      })
      .select()
      .single()

    if (error) {
      return { feedback: null, error: error.message }
    }

    return { feedback, error: null }
  } catch (error) {
    return { feedback: null, error: 'Failed to submit feedback' }
  }
}

export const getEventFeedback = async (eventId: string): Promise<{ feedback: Feedback[]; error: string | null }> => {
  try {
    const { data: feedback, error } = await supabase
      .from('feedback')
      .select(`
        *,
        students (
          roll_no,
          department,
          year,
          users (name, email)
        )
      `)
      .eq('event_id', eventId)
      .order('created_at', { ascending: false })

    if (error) {
      return { feedback: [], error: error.message }
    }

    return { feedback: feedback || [], error: null }
  } catch (error) {
    return { feedback: [], error: 'Failed to fetch feedback' }
  }
}

export const submitQuery = async (
  eventId: string,
  studentId: string,
  question: string
): Promise<{ query: Query | null; error: string | null }> => {
  try {
    const { data: query, error } = await supabase
      .from('queries')
      .insert({
        event_id: eventId,
        student_id: studentId,
        question,
      })
      .select()
      .single()

    if (error) {
      return { query: null, error: error.message }
    }

    return { query, error: null }
  } catch (error) {
    return { query: null, error: 'Failed to submit query' }
  }
}

export const answerQuery = async (
  queryId: string,
  answer: string,
  answeredBy: string
): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase
      .from('queries')
      .update({
        answer,
        answered_by: answeredBy,
      })
      .eq('id', queryId)

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  } catch (error) {
    return { error: 'Failed to answer query' }
  }
}

export const getEventQueries = async (eventId: string): Promise<{ queries: Query[]; error: string | null }> => {
  try {
    const { data: queries, error } = await supabase
      .from('queries')
      .select(`
        *,
        students (
          roll_no,
          department,
          year,
          users (name, email)
        )
      `)
      .eq('event_id', eventId)
      .order('created_at', { ascending: false })

    if (error) {
      return { queries: [], error: error.message }
    }

    return { queries: queries || [], error: null }
  } catch (error) {
    return { queries: [], error: 'Failed to fetch queries' }
  }
}

export const searchEvents = async (
  searchTerm: string,
  category?: string
): Promise<{ events: Event[]; error: string | null }> => {
  try {
    let query = supabase
      .from('events')
      .select('*')
      .eq('status', 'approved')

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    }

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    const { data: events, error } = await query.order('created_at', { ascending: false })

    if (error) {
      return { events: [], error: error.message }
    }

    return { events: events || [], error: null }
  } catch (error) {
    return { events: [], error: 'Failed to search events' }
  }
} 