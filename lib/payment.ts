import { supabase } from './supabase'

// Payment gateway configuration
export interface PaymentConfig {
  gateway: 'razorpay' | 'stripe'
  keyId: string
  keySecret: string
}

export interface PaymentRequest {
  amount: number
  currency: string
  orderId: string
  description: string
  customerEmail: string
  customerName: string
  eventId: string
  studentId: string
}

export interface PaymentResponse {
  success: boolean
  paymentId?: string
  error?: string
  redirectUrl?: string
}

// Get platform fee percentage
export const getPlatformFeePercentage = async (): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('platform_settings')
      .select('setting_value')
      .eq('setting_key', 'platform_fee_percentage')
      .single()

    if (error) {
      console.error('Error fetching platform fee:', error)
      return 5 // Default 5%
    }

    return parseInt(data.setting_value) || 5
  } catch (error) {
    console.error('Error getting platform fee:', error)
    return 5
  }
}

// Calculate payment amount with platform fee
export const calculatePaymentAmount = async (
  baseAmount: number
): Promise<{ totalAmount: number; platformFee: number }> => {
  const feePercentage = await getPlatformFeePercentage()
  const platformFee = (baseAmount * feePercentage) / 100
  const totalAmount = baseAmount + platformFee

  return {
    totalAmount: Math.round(totalAmount * 100) / 100, // Round to 2 decimal places
    platformFee: Math.round(platformFee * 100) / 100,
  }
}

// Create payment order (Razorpay)
export const createRazorpayOrder = async (
  paymentRequest: PaymentRequest
): Promise<PaymentResponse> => {
  try {
    const { totalAmount } = await calculatePaymentAmount(paymentRequest.amount)

    // In a real implementation, you would call Razorpay API here
    // For now, we'll simulate the payment flow
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      paymentId,
      redirectUrl: `/payment/confirm?order_id=${orderId}&payment_id=${paymentId}`,
    }
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return {
      success: false,
      error: 'Failed to create payment order',
    }
  }
}

// Create payment intent (Stripe)
export const createStripePaymentIntent = async (
  paymentRequest: PaymentRequest
): Promise<PaymentResponse> => {
  try {
    const { totalAmount } = await calculatePaymentAmount(paymentRequest.amount)

    // In a real implementation, you would call Stripe API here
    // For now, we'll simulate the payment flow
    const paymentIntentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      paymentId: paymentIntentId,
      redirectUrl: `/payment/confirm?payment_intent=${paymentIntentId}`,
    }
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error)
    return {
      success: false,
      error: 'Failed to create payment intent',
    }
  }
}

// Verify payment
export const verifyPayment = async (
  paymentId: string,
  signature?: string
): Promise<PaymentResponse> => {
  try {
    // In a real implementation, you would verify the payment with the gateway
    // For now, we'll simulate successful verification
    await new Promise(resolve => setTimeout(resolve, 500))

    return {
      success: true,
      paymentId,
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    return {
      success: false,
      error: 'Payment verification failed',
    }
  }
}

// Process payment confirmation
export const processPaymentConfirmation = async (
  paymentId: string,
  eventId: string,
  studentId: string,
  amount: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Verify the payment
    const verification = await verifyPayment(paymentId)
    if (!verification.success) {
      return { success: false, error: verification.error }
    }

    // Create registration record
    const { data: registration, error: regError } = await supabase
      .from('registrations')
      .insert({
        event_id: eventId,
        student_id: studentId,
        payment_id: paymentId,
        amount,
      })
      .select()
      .single()

    if (regError) {
      console.error('Error creating registration:', regError)
      return { success: false, error: 'Failed to create registration' }
    }

    // Update event registration count
    const { error: updateError } = await supabase.rpc('increment_event_registration', {
      event_id: eventId,
    })

    if (updateError) {
      console.error('Error updating event registration count:', updateError)
    }

    return { success: true }
  } catch (error) {
    console.error('Error processing payment confirmation:', error)
    return { success: false, error: 'Payment processing failed' }
  }
}

// Get payment history for a student
export const getStudentPaymentHistory = async (
  studentId: string
): Promise<{ payments: any[]; error: string | null }> => {
  try {
    const { data: payments, error } = await supabase
      .from('registrations')
      .select(`
        *,
        events (
          title,
          date,
          time,
          venue
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false })

    if (error) {
      return { payments: [], error: error.message }
    }

    return { payments: payments || [], error: null }
  } catch (error) {
    return { payments: [], error: 'Failed to fetch payment history' }
  }
}

// Get payment analytics for a club
export const getClubPaymentAnalytics = async (
  clubId: string
): Promise<{ analytics: any; error: string | null }> {
  try {
    // Get all events for the club
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('id, title')
      .eq('club_id', clubId)

    if (eventsError) {
      return { analytics: null, error: eventsError.message }
    }

    const eventIds = events?.map(event => event.id) || []

    // Get all registrations for these events
    const { data: registrations, error: regError } = await supabase
      .from('registrations')
      .select('*')
      .in('event_id', eventIds)

    if (regError) {
      return { analytics: null, error: regError.message }
    }

    // Calculate analytics
    const totalRevenue = registrations?.reduce((sum, reg) => sum + parseFloat(reg.amount), 0) || 0
    const totalRegistrations = registrations?.length || 0
    const averageTicketPrice = totalRegistrations > 0 ? totalRevenue / totalRegistrations : 0

    const analytics = {
      totalRevenue,
      totalRegistrations,
      averageTicketPrice,
      events: events?.length || 0,
      recentPayments: registrations?.slice(0, 10) || [],
    }

    return { analytics, error: null }
  } catch (error) {
    return { analytics: null, error: 'Failed to fetch payment analytics' }
  }
}

// Update platform fee
export const updatePlatformFee = async (
  feePercentage: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('platform_settings')
      .update({ setting_value: feePercentage.toString() })
      .eq('setting_key', 'platform_fee_percentage')

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to update platform fee' }
  }
} 