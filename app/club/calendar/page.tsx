"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { ArrowLeft, CalendarIcon, Clock, MapPin, Users, Plus, Filter, Download } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ClubCalendar() {
  const [user, setUser] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedView, setSelectedView] = useState<"month" | "list">("month")
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
  }, [router])

  const events = [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      date: "2024-02-20",
      time: "2:00 PM - 5:00 PM",
      venue: "Lab 301",
      status: "approved",
      type: "workshop",
      participants: 0,
      maxCapacity: 80,
    },
    {
      id: 2,
      title: "Tech Symposium 2024",
      date: "2024-02-15",
      time: "10:00 AM - 6:00 PM",
      venue: "Main Auditorium",
      status: "completed",
      type: "conference",
      participants: 245,
      maxCapacity: 500,
    },
    {
      id: 3,
      title: "Innovation Challenge",
      date: "2024-03-01",
      time: "9:00 AM - 5:00 PM",
      venue: "Innovation Lab",
      status: "upcoming",
      type: "competition",
      participants: 45,
      maxCapacity: 100,
    },
    {
      id: 4,
      title: "Startup Bootcamp",
      date: "2024-03-15",
      time: "10:00 AM - 4:00 PM",
      venue: "Seminar Hall",
      status: "planning",
      type: "workshop",
      participants: 0,
      maxCapacity: 60,
    },
  ]

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateString)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "approved":
        return "bg-blue-100 text-blue-800"
      case "upcoming":
        return "bg-purple-100 text-purple-800"
      case "planning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-orange-100 text-orange-800"
      case "conference":
        return "bg-indigo-100 text-indigo-800"
      case "competition":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const generateYearEndReport = () => {
    // Generate year-end report logic
    alert("Generating year-end report... This will include all events from the academic year.")
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
              <Link href="/club/dashboard" className="text-purple-600 hover:text-purple-700">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Event Calendar</h1>
                <p className="text-sm text-gray-600">{user.clubName || user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setSelectedView(selectedView === "month" ? "list" : "month")}>
                {selectedView === "month" ? "List View" : "Calendar View"}
              </Button>
              <Button variant="outline" onClick={generateYearEndReport}>
                <Download className="w-4 h-4 mr-2" />
                Year Report
              </Button>
              <Link href="/club/new-event">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            {selectedView === "month" ? (
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Academic Calendar 2024</CardTitle>
                  <CardDescription>View and manage your club's event schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                      hasEvent: events.map((event) => new Date(event.date)),
                    }}
                    modifiersStyles={{
                      hasEvent: {
                        backgroundColor: "#e0e7ff",
                        color: "#3730a3",
                        fontWeight: "bold",
                      },
                    }}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Events</CardTitle>
                      <CardDescription>Complete list of club events</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <Card key={event.id} className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                              <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
                                <div className="flex items-center">
                                  <CalendarIcon className="w-4 h-4 mr-1" />
                                  {new Date(event.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {event.time}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {event.venue}
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {event.participants}/{event.maxCapacity}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="outline" className={getStatusColor(event.status)}>
                                  {event.status}
                                </Badge>
                                <Badge variant="outline" className={getTypeColor(event.type)}>
                                  {event.type}
                                </Badge>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Events */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>{selectedDate ? selectedDate.toLocaleDateString() : "Select a Date"}</CardTitle>
                <CardDescription>Events for selected date</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).map((event) => (
                      <div key={event.id} className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{event.time}</p>
                        <p className="text-xs text-gray-600">{event.venue}</p>
                        <Badge variant="outline" className={`${getStatusColor(event.status)} mt-2`} size="sm">
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No events scheduled for this date</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Event Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Events</span>
                    <span className="font-semibold">{events.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="font-semibold text-green-600">
                      {events.filter((e) => e.status === "completed").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Upcoming</span>
                    <span className="font-semibold text-blue-600">
                      {events.filter((e) => e.status === "upcoming" || e.status === "approved").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">In Planning</span>
                    <span className="font-semibold text-yellow-600">
                      {events.filter((e) => e.status === "planning").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Next Events</CardTitle>
                <CardDescription>Upcoming events this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events
                    .filter((event) => new Date(event.date) >= new Date())
                    .slice(0, 3)
                    .map((event) => (
                      <div key={event.id} className="p-3 border rounded-lg">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {new Date(event.date).toLocaleDateString()} • {event.time}
                        </p>
                        <p className="text-xs text-gray-600">{event.venue}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
