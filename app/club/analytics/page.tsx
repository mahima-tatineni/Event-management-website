"use client"

import { BarChart3, TrendingUp, DollarSign, Users, Calendar, Home, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ClubAnalyticsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

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
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  // Mock data for analytics
  const analyticsData = {
    totalEvents: 25,
    totalRevenue: 250000,
    totalParticipants: 5000,
    averageRating: 4.8,
    eventTypes: [
      { name: "Workshops", count: 10, percentage: 40 },
      { name: "Hackathons", count: 5, percentage: 20 },
      { name: "Seminars", count: 7, percentage: 28 },
      { name: "Cultural", count: 3, percentage: 12 },
    ],
    revenueTrends: [
      { month: "Jan", revenue: 20000 },
      { month: "Feb", revenue: 35000 },
      { month: "Mar", revenue: 40000 },
      { month: "Apr", revenue: 55000 },
      { month: "May", revenue: 100000 },
    ],
    topEvents: [
      { id: 1, title: "Tech Symposium 2024", revenue: 36750, participants: 245 },
      { id: 2, title: "Annual Fest", revenue: 50000, participants: 300 },
      { id: 3, title: "Coding Challenge", revenue: 25000, participants: 180 },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Club Analytics</h1>
                <p className="text-sm text-gray-600">{user.clubName || user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/club/dashboard">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - simplified for analytics page */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Analytics Overview</CardTitle>
                <CardDescription>Key performance indicators for your club events.</CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Link href="/club/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/club/analytics">
                    <Button variant="ghost" className="w-full justify-start bg-purple-50 text-purple-700">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Events</p>
                      <p className="text-3xl font-bold text-gray-900">{analyticsData.totalEvents}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">+5 this quarter</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900">₹{analyticsData.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">+20% from last quarter</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Participants</p>
                      <p className="text-3xl font-bold text-gray-900">{analyticsData.totalParticipants}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-green-600">+10% engagement</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Event Type Distribution</CardTitle>
                  <CardDescription>Breakdown of events by category.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.eventTypes.map((type) => (
                      <div key={type.name} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{type.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{type.count}</Badge>
                          <span className="text-sm font-medium text-gray-800">{type.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue performance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end justify-around gap-2">
                    {analyticsData.revenueTrends.map((data) => (
                      <div key={data.month} className="flex flex-col items-center">
                        <div
                          className="w-8 bg-gradient-to-t from-purple-400 to-pink-400 rounded-t-md"
                          style={{ height: `${data.revenue / 1000}%` }} // Scale height based on revenue
                        />
                        <span className="text-xs text-gray-600 mt-1">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Top Performing Events</CardTitle>
                  <CardDescription>Events with highest revenue and participation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-800">{event.title}</h4>
                          <p className="text-sm text-gray-600">Participants: {event.participants}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-600">₹{event.revenue.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
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
