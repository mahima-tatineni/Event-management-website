"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, Building, Shield, CheckCircle, ArrowLeft, Clock, Calendar } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNotifications } from "@/components/providers/notification-provider"
import Link from "next/link"

export default function PaymentPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const eventId = params.id as string
  const registrationId = searchParams.get("registrationId")
  const { addNotification } = useNotifications()

  const [registration, setRegistration] = useState<any>(null)
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [paymentData, setPaymentData] = useState({
    upiId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    bankAccount: "",
    ifscCode: "",
  })
  const [errors, setErrors] = useState<any>({})

  // Sample events data
  const sampleEvents = [
    {
      id: "1",
      title: "Tech Symposium 2024",
      club: "Computer Science Club",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      price: 150,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "Cultural Fest - Rangoli",
      club: "Cultural Club",
      date: "2024-02-20",
      time: "2:00 PM",
      venue: "Open Ground",
      price: 100,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "Entrepreneurship Workshop",
      club: "E-Cell",
      date: "2024-02-25",
      time: "11:00 AM",
      venue: "Seminar Hall",
      price: 200,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  useEffect(() => {
    if (!registrationId) {
      router.push("/student/dashboard")
      return
    }

    // Get registration data
    const registrations = JSON.parse(localStorage.getItem("registrations") || "[]")
    const foundRegistration = registrations.find((r: any) => r.id.toString() === registrationId)

    if (!foundRegistration) {
      router.push("/student/dashboard")
      return
    }

    // Get event data
    const foundEvent = sampleEvents.find((e) => e.id === eventId)
    if (!foundEvent) {
      router.push("/student/dashboard")
      return
    }

    setRegistration(foundRegistration)
    setEvent(foundEvent)
    setLoading(false)
  }, [registrationId, eventId, router])

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }))
    }
  }

  const validatePayment = () => {
    const newErrors: any = {}

    if (paymentMethod === "upi") {
      if (!paymentData.upiId.trim()) {
        newErrors.upiId = "UPI ID is required"
      } else if (!paymentData.upiId.includes("@")) {
        newErrors.upiId = "Please enter a valid UPI ID"
      }
    } else if (paymentMethod === "card") {
      if (!paymentData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
      if (!paymentData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required"
      if (!paymentData.cvv.trim()) newErrors.cvv = "CVV is required"
      if (!paymentData.cardName.trim()) newErrors.cardName = "Cardholder name is required"
    } else if (paymentMethod === "netbanking") {
      if (!paymentData.bankAccount.trim()) newErrors.bankAccount = "Bank account is required"
      if (!paymentData.ifscCode.trim()) newErrors.ifscCode = "IFSC code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const processPayment = async () => {
    if (!validatePayment()) return

    setProcessing(true)

    // Send payment pending notification
    addNotification({
      type: "payment_pending",
      title: "Payment Processing",
      message: `Processing payment of ₹${event.price} for ${event.title}`,
      priority: "medium",
      targetUser: registration.studentId,
      targetRole: "student",
      data: {
        eventId,
        registrationId,
        amount: event.price,
        paymentMethod,
      },
    })

    // Also notify admin
    addNotification({
      type: "payment_pending",
      title: "New Payment Processing",
      message: `${registration.participantName} is processing payment for ${event.title}`,
      priority: "medium",
      targetRole: "admin",
      data: {
        eventId,
        registrationId,
        studentName: registration.participantName,
        amount: event.price,
        paymentMethod,
      },
      actionUrl: "/admin/payments",
    })

    try {
      // Simulate payment processing with random success/failure
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const paymentSuccess = Math.random() > 0.1 // 90% success rate

      if (paymentSuccess) {
        const transactionId = `TXN${Date.now()}`

        // Update registration status
        const registrations = JSON.parse(localStorage.getItem("registrations") || "[]")
        const updatedRegistrations = registrations.map((r: any) =>
          r.id.toString() === registrationId
            ? {
                ...r,
                status: "confirmed",
                paymentMethod,
                paymentDate: new Date().toISOString(),
                transactionId,
              }
            : r,
        )
        localStorage.setItem("registrations", JSON.stringify(updatedRegistrations))

        // Store payment record
        const payments = JSON.parse(localStorage.getItem("payments") || "[]")
        const paymentRecord = {
          id: `PAY${Date.now()}`,
          transactionId,
          studentId: registration.studentId,
          studentName: registration.participantName,
          studentEmail: registration.email,
          studentPhone: registration.phone,
          eventId,
          eventTitle: event.title,
          eventDate: event.date,
          eventVenue: event.venue,
          amount: event.price,
          paymentMethod,
          paymentStatus: "completed",
          paymentDate: new Date().toISOString(),
          registrationDate: registration.registrationDate,
          teamMembers: registration.teamMembers || [],
          specialRequirements: registration.specialRequirements || "None",
          emergencyContact: registration.emergencyContact,
        }
        payments.push(paymentRecord)
        localStorage.setItem("payments", JSON.stringify(payments))

        // Generate ticket
        const ticketData = {
          id: `TICKET${Date.now()}`,
          registrationId,
          eventId,
          participantName: registration.participantName,
          eventTitle: event.title,
          eventDate: event.date,
          eventTime: event.time,
          venue: event.venue,
          amount: event.price,
          paymentMethod,
          transactionId,
          generatedAt: new Date().toISOString(),
        }

        const tickets = JSON.parse(localStorage.getItem("tickets") || "[]")
        tickets.push(ticketData)
        localStorage.setItem("tickets", JSON.stringify(tickets))

        // Send success notifications
        addNotification({
          type: "payment_completed",
          title: "Payment Successful! 🎉",
          message: `Your payment of ₹${event.price} for ${event.title} has been processed successfully. Transaction ID: ${transactionId}`,
          priority: "high",
          targetUser: registration.studentId,
          targetRole: "student",
          data: {
            eventId,
            registrationId,
            transactionId,
            ticketId: ticketData.id,
          },
          actionUrl: `/student/events/${eventId}/confirmation?ticketId=${ticketData.id}`,
        })

        // Notify admin of successful payment
        addNotification({
          type: "payment_completed",
          title: "Payment Received",
          message: `₹${event.price} payment received from ${registration.participantName} for ${event.title}`,
          priority: "medium",
          targetRole: "admin",
          data: {
            eventId,
            registrationId,
            studentName: registration.participantName,
            transactionId,
            amount: event.price,
          },
          actionUrl: "/admin/payments",
        })

        // Notify club of new registration
        addNotification({
          type: "registration_confirmed",
          title: "New Registration Confirmed",
          message: `${registration.participantName} has successfully registered and paid for ${event.title}`,
          priority: "medium",
          targetRole: "club",
          data: {
            eventId,
            registrationId,
            studentName: registration.participantName,
            amount: event.price,
          },
          actionUrl: "/club/dashboard",
        })

        // Redirect to confirmation page
        router.push(`/student/events/${eventId}/confirmation?ticketId=${ticketData.id}`)
      } else {
        // Payment failed
        const failureReason = "Payment gateway error. Please try again."

        // Send failure notifications
        addNotification({
          type: "payment_failed",
          title: "Payment Failed ❌",
          message: `Your payment of ₹${event.price} for ${event.title} could not be processed. ${failureReason}`,
          priority: "high",
          targetUser: registration.studentId,
          targetRole: "student",
          data: {
            eventId,
            registrationId,
            amount: event.price,
            failureReason,
          },
        })

        // Notify admin of failed payment
        addNotification({
          type: "payment_failed",
          title: "Payment Failed",
          message: `Payment failed for ${registration.participantName} - ${event.title} (₹${event.price})`,
          priority: "medium",
          targetRole: "admin",
          data: {
            eventId,
            registrationId,
            studentName: registration.participantName,
            amount: event.price,
            failureReason,
          },
          actionUrl: "/admin/payments",
        })

        throw new Error(failureReason)
      }
    } catch (error) {
      console.error("Payment failed:", error)
      // Error notifications are already sent above
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/student/events/${eventId}/register`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Registration
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Payment</h1>
                <p className="text-sm text-gray-600">Complete your payment for {event?.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Secure Payment</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={event?.image || "/placeholder.svg"}
                    alt={event?.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{event?.title}</h3>
                    <p className="text-xs text-gray-600">{event?.club}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(event?.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Registration Fee</span>
                    <span>₹{event?.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing Fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes</span>
                    <span>₹0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span className="text-purple-600">₹{event?.price}</span>
                  </div>
                </div>

                <Separator />

                <div className="text-xs text-gray-600 space-y-1">
                  <p>
                    <strong>Participant:</strong> {registration?.participantName}
                  </p>
                  <p>
                    <strong>Email:</strong> {registration?.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {registration?.phone}
                  </p>
                </div>

                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Complete your payment within 15 minutes to secure your registration.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Choose your preferred payment method and complete the transaction</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">Select Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                        <Label
                          htmlFor="upi"
                          className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 peer-checked:border-purple-500 peer-checked:bg-purple-50"
                        >
                          <Smartphone className="w-8 h-8 text-purple-500 mb-2" />
                          <span className="font-medium">UPI</span>
                          <span className="text-xs text-gray-500">PhonePe, GPay, Paytm</span>
                        </Label>
                      </div>

                      <div className="relative">
                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                        <Label
                          htmlFor="card"
                          className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 peer-checked:border-purple-500 peer-checked:bg-purple-50"
                        >
                          <CreditCard className="w-8 h-8 text-purple-500 mb-2" />
                          <span className="font-medium">Card</span>
                          <span className="text-xs text-gray-500">Debit/Credit Card</span>
                        </Label>
                      </div>

                      <div className="relative">
                        <RadioGroupItem value="netbanking" id="netbanking" className="peer sr-only" />
                        <Label
                          htmlFor="netbanking"
                          className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-300 peer-checked:border-purple-500 peer-checked:bg-purple-50"
                        >
                          <Building className="w-8 h-8 text-purple-500 mb-2" />
                          <span className="font-medium">Net Banking</span>
                          <span className="text-xs text-gray-500">All Major Banks</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Payment Form Fields */}
                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">UPI Payment</h3>
                    <div>
                      <Label htmlFor="upiId">UPI ID *</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@paytm"
                        value={paymentData.upiId}
                        onChange={(e) => handleInputChange("upiId", e.target.value)}
                        className={errors.upiId ? "border-red-500" : ""}
                      />
                      {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Card Payment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          className={errors.cardNumber ? "border-red-500" : ""}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div>
                        <Label htmlFor="expiryDate">Expiry Date *</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          className={errors.expiryDate ? "border-red-500" : ""}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>

                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          className={errors.cvv ? "border-red-500" : ""}
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={paymentData.cardName}
                          onChange={(e) => handleInputChange("cardName", e.target.value)}
                          className={errors.cardName ? "border-red-500" : ""}
                        />
                        {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Net Banking</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bankAccount">Bank Account Number *</Label>
                        <Input
                          id="bankAccount"
                          placeholder="1234567890"
                          value={paymentData.bankAccount}
                          onChange={(e) => handleInputChange("bankAccount", e.target.value)}
                          className={errors.bankAccount ? "border-red-500" : ""}
                        />
                        {errors.bankAccount && <p className="text-red-500 text-sm mt-1">{errors.bankAccount}</p>}
                      </div>

                      <div>
                        <Label htmlFor="ifscCode">IFSC Code *</Label>
                        <Input
                          id="ifscCode"
                          placeholder="SBIN0001234"
                          value={paymentData.ifscCode}
                          onChange={(e) => handleInputChange("ifscCode", e.target.value)}
                          className={errors.ifscCode ? "border-red-500" : ""}
                        />
                        {errors.ifscCode && <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>}
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Security Notice */}
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Your payment information is encrypted and secure. We do not store your payment details.
                  </AlertDescription>
                </Alert>

                {/* Payment Button */}
                <div className="flex justify-end space-x-4">
                  <Link href={`/student/events/${eventId}/register`}>
                    <Button variant="outline">Back to Registration</Button>
                  </Link>
                  <Button
                    onClick={processPayment}
                    disabled={processing}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      `Pay ₹${event?.price}`
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
