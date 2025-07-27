"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, Calendar, MapPin, Clock, User, Mail, Phone, Share2, Home, Printer } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function ConfirmationPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const eventId = params.id as string
  const ticketId = searchParams.get("ticketId")

  const [ticket, setTicket] = useState<any>(null)
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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
      contactEmail: "csc@mlrit.ac.in",
      contactPhone: "+91 9876543210",
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
      contactEmail: "cultural@mlrit.ac.in",
      contactPhone: "+91 9876543211",
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
      contactEmail: "ecell@mlrit.ac.in",
      contactPhone: "+91 9876543212",
    },
  ]

  useEffect(() => {
    if (!ticketId) {
      router.push("/student/dashboard")
      return
    }

    // Get ticket data
    const tickets = JSON.parse(localStorage.getItem("tickets") || "[]")
    const foundTicket = tickets.find((t: any) => t.id === ticketId)

    if (!foundTicket) {
      router.push("/student/dashboard")
      return
    }

    // Get event data
    const foundEvent = sampleEvents.find((e) => e.id === eventId)
    if (!foundEvent) {
      router.push("/student/dashboard")
      return
    }

    setTicket(foundTicket)
    setEvent(foundEvent)
    setLoading(false)
  }, [ticketId, eventId, router])

  const downloadTicket = () => {
    // Create a simple ticket content
    const ticketContent = `
MLRIT CampusHub - Event Ticket
================================

Event: ${event?.title}
Club: ${event?.club}
Date: ${new Date(event?.date).toLocaleDateString()}
Time: ${event?.time}
Venue: ${event?.venue}

Participant: ${ticket?.participantName}
Ticket ID: ${ticket?.id}
Transaction ID: ${ticket?.transactionId}
Amount Paid: ₹${ticket?.amount}

Please present this ticket at the venue.
For queries, contact: ${event?.contactEmail}

Generated on: ${new Date().toLocaleString()}
    `

    const blob = new Blob([ticketContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ticket-${ticket?.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const shareTicket = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Event Registration Confirmed - ${event?.title}`,
          text: `I've registered for ${event?.title} on ${new Date(event?.date).toLocaleDateString()}!`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading confirmation details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">CampusHub</h1>
                <p className="text-sm text-gray-600">Registration Confirmed</p>
              </div>
            </div>
            <Link href="/student/dashboard">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Registration Successful!</h1>
            <p className="text-gray-600">
              Your registration for <strong>{event?.title}</strong> has been confirmed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ticket */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Event Ticket</CardTitle>
                      <CardDescription className="text-purple-100">Present this ticket at the venue</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      CONFIRMED
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Event Details */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{event?.title}</h3>
                        <p className="text-gray-600">{event?.club}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(event?.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {event?.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event?.venue}
                        </div>
                      </div>
                    </div>

                    {/* Participant Details */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Participant Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-2" />
                          {ticket?.participantName}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {ticket?.email || "N/A"}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {ticket?.phone || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Payment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Payment Information</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Amount Paid:</span>
                          <span className="font-medium">₹{ticket?.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment Method:</span>
                          <span className="capitalize">{ticket?.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transaction ID:</span>
                          <span className="font-mono text-xs">{ticket?.transactionId}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Ticket Information</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Ticket ID:</span>
                          <span className="font-mono text-xs">{ticket?.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Generated:</span>
                          <span>{new Date(ticket?.generatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <Badge variant="secondary" className="text-xs">
                            Confirmed
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* QR Code Placeholder */}
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-gray-400 text-xs">QR Code</span>
                    </div>
                    <p className="text-xs text-gray-500">Scan this QR code at the venue for quick entry</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actions & Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Action Buttons */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={downloadTicket} className="w-full bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Ticket
                  </Button>
                  <Button onClick={shareTicket} className="w-full bg-transparent" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={() => window.print()} className="w-full" variant="outline">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Ticket
                  </Button>
                </CardContent>
              </Card>

              {/* Important Information */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Important Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Please arrive at the venue 30 minutes before the event starts.
                    </AlertDescription>
                  </Alert>

                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>What to bring:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>This ticket (printed or digital)</li>
                      <li>Valid student ID</li>
                      <li>Any materials mentioned in event requirements</li>
                    </ul>
                  </div>

                  <Separator />

                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Contact Information:</strong>
                    </p>
                    <p className="text-xs mt-1">
                      Email: {event?.contactEmail}
                      <br />
                      Phone: {event?.contactPhone}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>✅ Registration confirmed</p>
                    <p>✅ Payment processed</p>
                    <p>📧 Confirmation email sent</p>
                    <p>📅 Event added to your calendar</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Link href="/student/dashboard">
                      <Button variant="outline" className="w-full bg-transparent">
                        View My Events
                      </Button>
                    </Link>
                    <Link href="/student/calendar">
                      <Button variant="outline" className="w-full bg-transparent">
                        Open Calendar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
