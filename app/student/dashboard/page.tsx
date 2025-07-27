"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationBell } from "@/components/ui/notification-bell"
import { useNotifications } from "@/components/providers/notification-provider"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Download,
  Eye,
  Ticket,
  CheckCircle,
  XCircle,
  Settings,
  LogOut,
  Search,
  Plus,
  CreditCard,
  QrCode,
  Share2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [registrations, setRegistrations] = useState<any[]>([])
  const [tickets, setTickets] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()
  const { addNotification } = useNotifications()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "student") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/login")
    }

    // Load registrations and tickets
    const storedRegistrations = localStorage.getItem("registrations")
    const storedTickets = localStorage.getItem("tickets")

    if (storedRegistrations) {
      setRegistrations(JSON.parse(storedRegistrations))
    }

    if (storedTickets) {
      setTickets(JSON.parse(storedTickets))
    }
  }, [router])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending Payment
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.eventTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.participantName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = statusFilter === "all" || registration.status === statusFilter
    return matchesSearch && matchesFilter
  })

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const downloadTicket = (ticket: any) => {
    // Create a simple ticket download
    const ticketContent = `
CAMPUSHUB EVENT TICKET
======================
Event: ${ticket.eventTitle}
Participant: ${ticket.participantName}
Date: ${new Date(ticket.eventDate).toLocaleDateString()}
Time: ${ticket.eventTime}
Venue: ${ticket.venue}
Ticket ID: ${ticket.id}
Transaction ID: ${ticket.transactionId}
Amount Paid: ₹${ticket.amount}

Please present this ticket at the event venue.
    `

    const blob = new Blob([ticketContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ticket-${ticket.id}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Student Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-3xl font-bold text-gray-900">{registrations.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-3xl font-bold text-green-600">
                    {registrations.filter((r) => r.status === "confirmed").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Tickets</p>
                  <p className="text-3xl font-bold text-purple-600">{tickets.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Events & Tickets</CardTitle>
                <CardDescription>Manage your event registrations and tickets</CardDescription>
              </div>
              <Link href="/">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Browse Events
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="events">My Events ({registrations.length})</TabsTrigger>
                <TabsTrigger value="tickets">My Tickets ({tickets.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="mt-6">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Events List */}
                <div className="space-y-4">
                  {filteredRegistrations.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                      <p className="text-gray-600 mb-4">You haven't registered for any events yet.</p>
                      <Link href="/">
                        <Button>Browse Events</Button>
                      </Link>
                    </div>
                  ) : (
                    filteredRegistrations.map((registration) => (
                      <Card key={registration.id} className="border border-gray-200">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <img
                                src="/placeholder.svg?height=80&width=80"
                                alt={registration.eventTitle}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="text-lg font-semibold">{registration.eventTitle}</h3>
                                  {getStatusBadge(registration.status)}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(registration.eventDate).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {registration.eventTime}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {registration.venue}
                                  </div>
                                </div>
                                <div className="text-sm">
                                  <p>
                                    <strong>Participant:</strong> {registration.participantName}
                                  </p>
                                  <p>
                                    <strong>Registration Date:</strong>{" "}
                                    {new Date(registration.registrationDate).toLocaleDateString()}
                                  </p>
                                  {registration.transactionId && (
                                    <p>
                                      <strong>Transaction ID:</strong> {registration.transactionId}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              {registration.status === "pending" && (
                                <Link
                                  href={`/student/events/${registration.eventId}/payment?registrationId=${registration.id}`}
                                >
                                  <Button size="sm" className="w-full">
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Complete Payment
                                  </Button>
                                </Link>
                              )}
                              {registration.status === "confirmed" && (
                                <Button size="sm" variant="outline" className="w-full bg-transparent">
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tickets" className="mt-6">
                <div className="space-y-4">
                  {tickets.length === 0 ? (
                    <div className="text-center py-12">
                      <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
                      <p className="text-gray-600 mb-4">Your confirmed event tickets will appear here.</p>
                      <Link href="/">
                        <Button>Browse Events</Button>
                      </Link>
                    </div>
                  ) : (
                    tickets.map((ticket) => (
                      <Card key={ticket.id} className="border border-green-200 bg-green-50/50">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <Ticket className="w-8 h-8 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-2">{ticket.eventTitle}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(ticket.eventDate).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {ticket.eventTime}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {ticket.venue}
                                  </div>
                                </div>
                                <div className="text-sm">
                                  <p>
                                    <strong>Ticket ID:</strong> {ticket.id}
                                  </p>
                                  <p>
                                    <strong>Participant:</strong> {ticket.participantName}
                                  </p>
                                  <p>
                                    <strong>Amount Paid:</strong> ₹{ticket.amount}
                                  </p>
                                  <p>
                                    <strong>Transaction ID:</strong> {ticket.transactionId}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button size="sm" onClick={() => downloadTicket(ticket)}>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              <Button size="sm" variant="outline">
                                <QrCode className="w-4 h-4 mr-2" />
                                QR Code
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
