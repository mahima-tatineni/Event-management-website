"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationBell } from "@/components/ui/notification-bell"
import { useNotifications } from "@/components/providers/notification-provider"
import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Download,
  Search,
  MoreHorizontal,
  Settings,
  LogOut,
  CreditCard,
  FileText,
  BarChart3,
  UserCheck,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const router = useRouter()
  const { addNotification } = useNotifications()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "admin") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/login")
    }

    // Load events from localStorage
    const storedEvents = localStorage.getItem("events")
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    } else {
      // Initialize with sample data
      const sampleEvents = [
        {
          id: 1,
          title: "AI & Machine Learning Workshop",
          club: "Computer Science Club",
          date: "2024-02-20",
          time: "10:00 AM",
          venue: "Lab 301",
          description: "Learn the fundamentals of AI and ML with hands-on projects",
          capacity: 50,
          registered: 35,
          price: 150,
          status: "pending",
          image: "/placeholder.jpg",
          createdAt: "2024-02-10T10:00:00Z",
          category: "Technical",
        },
        {
          id: 2,
          title: "Cultural Night - Rangoli Competition",
          club: "Cultural Club",
          date: "2024-02-25",
          time: "6:00 PM",
          venue: "Open Ground",
          description: "Showcase your artistic skills in this vibrant rangoli competition",
          capacity: 100,
          registered: 78,
          price: 100,
          status: "approved",
          image: "/placeholder.jpg",
          createdAt: "2024-02-12T14:30:00Z",
          category: "Cultural",
        },
        {
          id: 3,
          title: "Entrepreneurship Bootcamp",
          club: "E-Cell",
          date: "2024-03-01",
          time: "9:00 AM",
          venue: "Seminar Hall",
          description: "Learn from successful entrepreneurs and build your startup idea",
          capacity: 75,
          registered: 45,
          price: 200,
          status: "rejected",
          image: "/placeholder.jpg",
          createdAt: "2024-02-08T16:45:00Z",
          category: "Business",
          rejectionReason: "Insufficient budget allocation for this month",
        },
      ]
      setEvents(sampleEvents)
      localStorage.setItem("events", JSON.stringify(sampleEvents))
    }
  }, [router])

  const handleEventAction = (eventId: number, action: "approve" | "reject", reason?: string) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        const updatedEvent = {
          ...event,
          status: action === "approve" ? "approved" : "rejected",
          ...(reason && { rejectionReason: reason }),
          reviewedAt: new Date().toISOString(),
          reviewedBy: user?.name,
        }

        // Send notification to club
        addNotification({
          type: action === "approve" ? "registration_confirmed" : "system",
          title: `Event ${action === "approve" ? "Approved" : "Rejected"}`,
          message: `Your event "${event.title}" has been ${action}d by admin${reason ? `. Reason: ${reason}` : ""}`,
          priority: action === "approve" ? "high" : "medium",
          targetRole: "club",
          data: {
            eventId: event.id,
            eventTitle: event.title,
            action,
            reason,
          },
          actionUrl: "/club/dashboard",
        })

        return updatedEvent
      }
      return event
    })

    setEvents(updatedEvents)

    // If approving, also add to approved events list for public display
    if (action === "approve") {
      const approvedEvent = {
        ...updatedEvents.find((e) => e.id === eventId),
        featured: true, // Mark as featured for homepage
      }

      // You can add additional logic here to feature events on homepage
    }

    localStorage.setItem("events", JSON.stringify(updatedEvents))

    toast({
      title: `Event ${action}d`,
      description: `"${events.find((e) => e.id === eventId)?.title}" has been ${action}d successfully.`,
      variant: action === "approve" ? "default" : "destructive",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || event.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    totalEvents: events.length,
    pendingEvents: events.filter((e) => e.status === "pending").length,
    approvedEvents: events.filter((e) => e.status === "approved").length,
    rejectedEvents: events.filter((e) => e.status === "rejected").length,
    totalRegistrations: events.reduce((sum, e) => sum + e.registered, 0),
    totalRevenue: events.filter((e) => e.status === "approved").reduce((sum, e) => sum + e.registered * e.price, 0),
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (!user) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="verve-header sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 verve-gradient rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CampusHub Admin</h1>
                <p className="text-sm text-gray-400">Event Management Dashboard</p>
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
                <DropdownMenuContent className="w-56 verve-card" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                      <p className="text-xs leading-none text-gray-400">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-white hover:bg-white/10">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-white hover:bg-white/10">
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="verve-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Events</p>
                  <p className="text-3xl font-bold text-white">{stats.totalEvents}</p>
                </div>
                <div className="w-12 h-12 verve-gradient rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-black" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="verve-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Pending Review</p>
                  <p className="text-3xl font-bold text-yellow-400">{stats.pendingEvents}</p>
                </div>
                <div className="w-12 h-12 verve-gradient rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-black" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">Requires immediate attention</div>
            </CardContent>
          </Card>

          <Card className="verve-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Registrations</p>
                  <p className="text-3xl font-bold text-white">{stats.totalRegistrations}</p>
                </div>
                <div className="w-12 h-12 verve-gradient rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-black" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">Across all approved events</div>
            </CardContent>
          </Card>

          <Card className="verve-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Revenue Generated</p>
                  <p className="text-3xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 verve-gradient rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">From registration fees</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/admin/payments">
            <Card className="verve-card hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 verve-gradient rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">Payment Tracking</h3>
                    <p className="text-xs text-gray-400">Monitor transactions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/registrations">
            <Card className="verve-card hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 verve-gradient rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">Registrations</h3>
                    <p className="text-xs text-gray-400">Manage participants</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="verve-card hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 verve-gradient rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">Analytics</h3>
                    <p className="text-xs text-gray-400">View insights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="verve-card hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 verve-gradient rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">Reports</h3>
                  <p className="text-xs text-gray-400">Generate reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="verve-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search events by title or club..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 verve-input"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 verve-input">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="verve-card">
                  <SelectItem value="all" className="text-white hover:bg-white/10">All Status</SelectItem>
                  <SelectItem value="pending" className="text-white hover:bg-white/10">Pending</SelectItem>
                  <SelectItem value="approved" className="text-white hover:bg-white/10">Approved</SelectItem>
                  <SelectItem value="rejected" className="text-white hover:bg-white/10">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="verve-button-outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Events Management */}
        <Card className="verve-card">
          <CardHeader>
            <CardTitle className="text-white">Event Management</CardTitle>
            <CardDescription className="text-gray-400">Review and manage event submissions from clubs</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="pending" className="flex items-center space-x-2 data-[state=active]:verve-button-primary data-[state=active]:text-black">
                  <Clock className="w-4 h-4" />
                  <span>Pending ({stats.pendingEvents})</span>
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex items-center space-x-2 data-[state=active]:verve-button-primary data-[state=active]:text-black">
                  <CheckCircle className="w-4 h-4" />
                  <span>Approved ({stats.approvedEvents})</span>
                </TabsTrigger>
                <TabsTrigger value="rejected" className="flex items-center space-x-2 data-[state=active]:verve-button-primary data-[state=active]:text-black">
                  <XCircle className="w-4 h-4" />
                  <span>Rejected ({stats.rejectedEvents})</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-6">
                <div className="space-y-4">
                  {filteredEvents
                    .filter((event) => event.status === "pending")
                    .map((event) => (
                      <Card key={event.id} className="border border-yellow-500/30 bg-yellow-500/5">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <img
                                src={event.image || "/placeholder.jpg"}
                                alt={event.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                                  {getStatusBadge(event.status)}
                                </div>
                                <p className="text-sm text-gray-400 mb-2">{event.club}</p>
                                <p className="text-sm text-gray-300 mb-3">{event.description}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium text-gray-400">Date:</span> <span className="text-white">{event.date}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">Time:</span> <span className="text-white">{event.time}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">Venue:</span> <span className="text-white">{event.venue}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">Price:</span> <span className="text-white">₹{event.price}</span>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">
                                      Capacity: <span className="text-white">{event.registered}/{event.capacity}</span>
                                    </span>
                                    <span className="text-white">{Math.round((event.registered / event.capacity) * 100)}% filled</span>
                                  </div>
                                  <Progress value={(event.registered / event.capacity) * 100} className="mt-1" />
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="verve-button-outline">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl verve-card">
                                  <DialogHeader>
                                    <DialogTitle className="text-white">{event.title}</DialogTitle>
                                    <DialogDescription className="text-gray-400">Event details and review</DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <img
                                      src={event.image || "/placeholder.jpg"}
                                      alt={event.title}
                                      className="w-full h-48 object-cover rounded-lg"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="text-white">Club</Label>
                                        <p className="text-sm text-gray-300">{event.club}</p>
                                      </div>
                                      <div>
                                        <Label className="text-white">Category</Label>
                                        <p className="text-sm text-gray-300">{event.category}</p>
                                      </div>
                                      <div>
                                        <Label className="text-white">Date & Time</Label>
                                        <p className="text-sm text-gray-300">
                                          {event.date} at {event.time}
                                        </p>
                                      </div>
                                      <div>
                                        <Label className="text-white">Venue</Label>
                                        <p className="text-sm text-gray-300">{event.venue}</p>
                                      </div>
                                      <div>
                                        <Label className="text-white">Capacity</Label>
                                        <p className="text-sm text-gray-300">{event.capacity} participants</p>
                                      </div>
                                      <div>
                                        <Label className="text-white">Registration Fee</Label>
                                        <p className="text-sm text-gray-300">₹{event.price}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <Label className="text-white">Description</Label>
                                      <p className="text-sm mt-1 text-gray-300">{event.description}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                size="sm"
                                onClick={() => handleEventAction(event.id, "approve")}
                                className="verve-button-primary"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="destructive">
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="verve-card">
                                  <DialogHeader>
                                    <DialogTitle className="text-white">Reject Event</DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                      Please provide a reason for rejecting "{event.title}"
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="reason" className="text-white">Rejection Reason</Label>
                                      <Textarea
                                        id="reason"
                                        placeholder="Please provide a detailed reason for rejection..."
                                        onChange={(e) =>
                                          setSelectedEvent({ ...event, rejectionReason: e.target.value })
                                        }
                                        className="verve-input"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      variant="destructive"
                                      onClick={() => {
                                        handleEventAction(event.id, "reject", selectedEvent?.rejectionReason)
                                        setSelectedEvent(null)
                                      }}
                                    >
                                      Reject Event
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="approved" className="mt-6">
                <div className="space-y-4">
                  {filteredEvents
                    .filter((event) => event.status === "approved")
                    .map((event) => (
                      <Card key={event.id} className="border border-green-500/30 bg-green-500/5">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <img
                                src={event.image || "/placeholder.jpg"}
                                alt={event.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                                  {getStatusBadge(event.status)}
                                </div>
                                <p className="text-sm text-gray-400 mb-2">{event.club}</p>
                                <p className="text-sm text-gray-300 mb-3">{event.description}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium text-gray-400">Date:</span> <span className="text-white">{event.date}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">Time:</span> <span className="text-white">{event.time}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">Venue:</span> <span className="text-white">{event.venue}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">Revenue:</span> <span className="text-white">₹
                                    {(event.registered * event.price).toLocaleString()}</span>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-400">
                                      Registrations: <span className="text-white">{event.registered}/{event.capacity}</span>
                                    </span>
                                    <span className="text-white">{Math.round((event.registered / event.capacity) * 100)}% filled</span>
                                  </div>
                                  <Progress value={(event.registered / event.capacity) * 100} className="mt-1" />
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="verve-button-outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm" className="verve-button-outline">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="verve-card">
                                  <DropdownMenuItem className="text-white hover:bg-white/10">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Event
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-white hover:bg-white/10">
                                    <Users className="w-4 h-4 mr-2" />
                                    View Registrations
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-white hover:bg-white/10">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export Data
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="rejected" className="mt-6">
                <div className="space-y-4">
                  {filteredEvents
                    .filter((event) => event.status === "rejected")
                    .map((event) => (
                      <Card key={event.id} className="border border-red-500/30 bg-red-500/5">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <img
                                src={event.image || "/placeholder.jpg"}
                                alt={event.title}
                                className="w-16 h-16 object-cover rounded-lg opacity-75"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                                  {getStatusBadge(event.status)}
                                </div>
                                <p className="text-sm text-gray-400 mb-2">{event.club}</p>
                                <p className="text-sm text-gray-300 mb-3">{event.description}</p>
                                {event.rejectionReason && (
                                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-3">
                                    <p className="text-sm font-medium text-red-400 mb-1">Rejection Reason:</p>
                                    <p className="text-sm text-red-300">{event.rejectionReason}</p>
                                  </div>
                                )}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium text-gray-400">Date:</span> <span className="text-white">{event.date}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">Time:</span> <span className="text-white">{event.time}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">Venue:</span> <span className="text-white">{event.venue}</span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-400">Price:</span> <span className="text-white">₹{event.price}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="verve-button-outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleEventAction(event.id, "approve")}
                                className="verve-button-primary"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Reconsider
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
