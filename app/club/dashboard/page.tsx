"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Bell,
  Plus,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Home,
  TrendingUp,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ClubDashboard() {
  const [user, setUser] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "club") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/login")
    }

    // Load notifications for this club
    const clubNotifications = JSON.parse(localStorage.getItem("clubNotifications") || "[]")
    const userClubNotifications = clubNotifications.filter(
      (notif: any) => notif.club === (userData ? JSON.parse(userData).clubName || JSON.parse(userData).name : ""),
    )
    setNotifications(userClubNotifications)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const markNotificationAsRead = (notificationId: number) => {
    const allNotifications = JSON.parse(localStorage.getItem("clubNotifications") || "[]")
    const updatedNotifications = allNotifications.map((notif: any) =>
      notif.id === notificationId ? { ...notif, read: true } : notif,
    )
    localStorage.setItem("clubNotifications", JSON.stringify(updatedNotifications))

    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, read: true } : notif)))
  }

  const clubEvents = [
    {
      id: 1,
      title: "Tech Symposium 2024",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      price: 150,
      status: "approved",
      registrations: 245,
      maxCapacity: 500,
      revenue: 36750,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "AI & Machine Learning Workshop",
      date: "2024-02-20",
      time: "2:00 PM",
      venue: "Lab 301",
      price: 150,
      status: "pending",
      registrations: 0,
      maxCapacity: 80,
      revenue: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const pastEvents = [
    {
      id: 3,
      title: "Hackathon 2024",
      date: "2024-01-28",
      participants: 120,
      revenue: 18000,
      rating: 4.7,
      reportSubmitted: true,
    },
    {
      id: 4,
      title: "AI Workshop",
      date: "2024-01-15",
      participants: 85,
      revenue: 12750,
      rating: 4.5,
      reportSubmitted: false,
    },
  ]

  const stats = {
    totalEvents: 15,
    totalRevenue: 125000,
    totalParticipants: 2500,
    averageRating: 4.6,
    upcomingEvents: 3,
    pendingApprovals: 1,
  }

  const unreadNotifications = notifications.filter((notif) => !notif.read)

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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Club Dashboard</h1>
                <p className="text-sm text-gray-600">{user.clubName || user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="w-4 h-4" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </Button>
              <Link href="/club/new-event">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
                </Button>
              </Link>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>{user.clubName?.charAt(0) || user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-2xl">
                    {user.clubName?.charAt(0) || user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{user.clubName || user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  Club
                </Badge>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Link href="/club/dashboard">
                    <Button variant="ghost" className="w-full justify-start bg-purple-50 text-purple-700">
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/club/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/club/events">
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Events
                    </Button>
                  </Link>
                  <Link href="/club/calendar">
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Calendar
                    </Button>
                  </Link>
                  <Link href="/club/analytics">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                  </Link>
                  <Link href="/club/reports">
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Reports
                    </Button>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Notifications */}
            {unreadNotifications.length > 0 && (
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications ({unreadNotifications.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {unreadNotifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          notification.type === "approval" ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => markNotificationAsRead(notification.id)}>
                            Mark as Read
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Events</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">+2 this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">+15% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Participants</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalParticipants}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">+8% engagement</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="current" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="current">Current Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clubEvents.map((event) => (
                    <Card key={event.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm overflow-hidden">
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge variant={event.status === "approved" ? "default" : "secondary"}>{event.status}</Badge>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-white/90 text-gray-800">₹{event.price}</Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.venue}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Registrations</span>
                            <span className="font-medium">
                              {event.registrations}/{event.maxCapacity}
                            </span>
                          </div>
                          <Progress value={(event.registrations / event.maxCapacity) * 100} className="h-2" />

                          <div className="flex items-center justify-between text-sm">
                            <span>Revenue</span>
                            <span className="font-medium text-green-600">₹{event.revenue.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Edit Event
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="past" className="space-y-6">
                <div className="space-y-4">
                  {pastEvents.map((event) => (
                    <Card key={event.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                              <span className="font-medium">{event.rating}</span>
                            </div>
                            <Badge variant={event.reportSubmitted ? "default" : "destructive"}>
                              {event.reportSubmitted ? "Report Submitted" : "Report Pending"}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{event.participants}</p>
                            <p className="text-sm text-blue-600">Participants</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">₹{event.revenue.toLocaleString()}</p>
                            <p className="text-sm text-green-600">Revenue</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Report
                          </Button>
                          <Button variant="outline" size="sm">
                            View Feedback
                          </Button>
                          {!event.reportSubmitted && (
                            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                              Submit Report
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Event Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average Rating</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="font-medium">{stats.averageRating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Upcoming Events</span>
                          <span className="font-medium">{stats.upcomingEvents}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Pending Approvals</span>
                          <Badge variant="secondary">{stats.pendingApprovals}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Monthly Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">+25%</p>
                          <p className="text-sm text-purple-600">Participation Growth</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">+15%</p>
                          <p className="text-sm text-green-600">Revenue Growth</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recent Feedback</CardTitle>
                    <CardDescription>Latest feedback from event participants</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">Hackathon 2024</span>
                        </div>
                        <p className="text-sm">
                          "Amazing event with great learning opportunities! Well organized and engaging."
                        </p>
                        <p className="text-xs text-gray-500 mt-1">- Student, CSE Dept</p>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center mb-2">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                          <span className="ml-2 text-sm text-gray-600">AI Workshop</span>
                        </div>
                        <p className="text-sm">"Good content and presentation. Could have been more interactive."</p>
                        <p className="text-xs text-gray-500 mt-1">- Student, IT Dept</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
