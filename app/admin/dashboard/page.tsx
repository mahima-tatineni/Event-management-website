"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Home,
  TrendingUp,
  DollarSign,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

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
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const pendingApprovals = [
    {
      id: 1,
      title: "Coding Workshop",
      club: "Computer Science Club",
      date: "2024-02-20",
      venue: "Lab 301",
      price: 100,
      capacity: 50,
      proofSubmitted: true,
      submittedDate: "2024-02-10",
    },
    {
      id: 2,
      title: "Cultural Night",
      club: "Cultural Club",
      date: "2024-02-25",
      venue: "Open Ground",
      price: 200,
      capacity: 300,
      proofSubmitted: true,
      submittedDate: "2024-02-12",
    },
  ]

  const recentEvents = [
    {
      id: 3,
      title: "Tech Symposium 2024",
      club: "Computer Science Club",
      date: "2024-02-15",
      status: "completed",
      participants: 245,
      revenue: 36750,
      rating: 4.8,
    },
    {
      id: 4,
      title: "Hackathon 2024",
      club: "Coding Club",
      date: "2024-01-28",
      status: "completed",
      participants: 120,
      revenue: 18000,
      rating: 4.7,
    },
  ]

  const clubs = [
    {
      id: 1,
      name: "Computer Science Club",
      email: "cse@mlrit.ac.in",
      eventsCount: 8,
      totalRevenue: 45000,
      averageRating: 4.6,
      status: "active",
    },
    {
      id: 2,
      name: "Cultural Club",
      email: "cultural@mlrit.ac.in",
      eventsCount: 12,
      totalRevenue: 38000,
      averageRating: 4.4,
      status: "active",
    },
    {
      id: 3,
      name: "E-Cell",
      email: "ecell@mlrit.ac.in",
      eventsCount: 6,
      totalRevenue: 28000,
      averageRating: 4.8,
      status: "active",
    },
  ]

  const stats = {
    totalEvents: 45,
    totalRevenue: 285000,
    totalParticipants: 8500,
    activeClubs: 15,
    pendingApprovals: 2,
    platformFee: 5, // percentage
    monthlyGrowth: 18,
  }

  const handleApproveEvent = (eventId: number) => {
    // Mock approval logic
    alert(`Event ${eventId} approved successfully!`)
  }

  const handleRejectEvent = (eventId: number) => {
    // Mock rejection logic
    alert(`Event ${eventId} rejected.`)
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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">MLRIT Event Hub Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>A</AvatarFallback>
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
                  <AvatarFallback className="text-2xl">A</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">System Administrator</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Badge variant="default" className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500">
                  Admin
                </Badge>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Link href="/admin/dashboard">
                    <Button variant="ghost" className="w-full justify-start bg-purple-50 text-purple-700">
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/admin/approvals">
                    <Button variant="ghost" className="w-full justify-start">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approvals ({stats.pendingApprovals})
                    </Button>
                  </Link>
                  <Link href="/admin/clubs">
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Clubs
                    </Button>
                  </Link>
                  <Link href="/admin/calendar">
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Calendar
                    </Button>
                  </Link>
                  <Link href="/admin/analytics">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                  </Link>
                  <Link href="/admin/reports">
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Reports
                    </Button>
                  </Link>
                  <Link href="/admin/settings">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    <span className="text-green-600">+{stats.monthlyGrowth}% this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">
                        ₹{((stats.totalRevenue * stats.platformFee) / 100).toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-gray-600">{stats.platformFee}% platform fee</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Participants</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalParticipants.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">High engagement</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Clubs</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.activeClubs}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <AlertCircle className="w-4 h-4 text-orange-500 mr-1" />
                    <span className="text-orange-600">{stats.pendingApprovals} pending</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="approvals" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
                <TabsTrigger value="events">Recent Events</TabsTrigger>
                <TabsTrigger value="clubs">Club Management</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="approvals" className="space-y-6">
                <div className="space-y-4">
                  {pendingApprovals.map((event) => (
                    <Card key={event.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {event.club}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event.venue}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />₹{event.price}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {event.proofSubmitted && (
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                Proof Submitted
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <p>Submitted: {new Date(event.submittedDate).toLocaleDateString()}</p>
                            <p>Capacity: {event.capacity} participants</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectEvent(event.id)}
                              className="border-red-200 text-red-700 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApproveEvent(event.id)}
                              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <Card key={event.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <p className="text-sm text-gray-600">{event.club}</p>
                          </div>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {event.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{event.participants}</p>
                            <p className="text-sm text-blue-600">Participants</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">₹{event.revenue.toLocaleString()}</p>
                            <p className="text-sm text-green-600">Revenue</p>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-center justify-center">
                              <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                              <p className="text-2xl font-bold text-yellow-600">{event.rating}</p>
                            </div>
                            <p className="text-sm text-yellow-600">Rating</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            View Feedback
                          </Button>
                          <Button variant="outline" size="sm">
                            Download Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="clubs" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clubs.map((club) => (
                    <Card key={club.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" />
                            <AvatarFallback>{club.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <Badge variant={club.status === "active" ? "default" : "secondary"}>{club.status}</Badge>
                        </div>
                        <CardTitle className="text-lg">{club.name}</CardTitle>
                        <CardDescription>{club.email}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Events Organized</span>
                            <span className="font-medium">{club.eventsCount}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Total Revenue</span>
                            <span className="font-medium text-green-600">₹{club.totalRevenue.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Average Rating</span>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                              <span className="font-medium">{club.averageRating}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Platform Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                          <p className="text-3xl font-bold text-purple-600">
                            ₹{((stats.totalRevenue * stats.platformFee) / 100).toLocaleString()}
                          </p>
                          <p className="text-sm text-purple-600">Platform Revenue ({stats.platformFee}%)</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                          <p className="text-3xl font-bold text-green-600">+{stats.monthlyGrowth}%</p>
                          <p className="text-sm text-green-600">Monthly Growth</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Active Clubs</span>
                          <span className="font-medium text-green-600">{stats.activeClubs}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Pending Approvals</span>
                          <Badge variant="secondary">{stats.pendingApprovals}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">System Status</span>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Healthy
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
