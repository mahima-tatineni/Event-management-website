"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, Star, ArrowRight, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Symposium 2024",
      club: "Computer Science Club",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      price: 150,
      category: "technical",
      image: "/placeholder.svg?height=200&width=300",
      registrations: 245,
      maxCapacity: 500,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Cultural Fest - Rangoli",
      club: "Cultural Club",
      date: "2024-02-20",
      time: "2:00 PM",
      venue: "Open Ground",
      price: 100,
      category: "cultural",
      image: "/placeholder.svg?height=200&width=300",
      registrations: 180,
      maxCapacity: 300,
      rating: 4.6,
    },
    {
      id: 3,
      title: "Entrepreneurship Workshop",
      club: "E-Cell",
      date: "2024-02-25",
      time: "11:00 AM",
      venue: "Seminar Hall",
      price: 200,
      category: "workshop",
      image: "/placeholder.svg?height=200&width=300",
      registrations: 95,
      maxCapacity: 150,
      rating: 4.9,
    },
  ]

  const recentEvents = [
    {
      id: 4,
      title: "Hackathon 2024",
      club: "Coding Club",
      date: "2024-01-28",
      participants: 120,
      rating: 4.7,
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      id: 5,
      title: "Dance Competition",
      club: "Dance Club",
      date: "2024-01-25",
      participants: 85,
      rating: 4.5,
      image: "/placeholder.svg?height=150&width=200",
    },
  ]

  const categories = [
    { id: "all", name: "All Events", color: "bg-gray-100" },
    { id: "technical", name: "Technical", color: "bg-blue-100" },
    { id: "cultural", name: "Cultural", color: "bg-pink-100" },
    { id: "workshop", name: "Workshop", color: "bg-green-100" },
    { id: "sports", name: "Sports", color: "bg-orange-100" },
  ]

  const filteredEvents = upcomingEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">MLRIT Event Hub</h1>
                <p className="text-sm text-gray-600">Campus Event Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Discover Amazing
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Campus Events
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join exciting events, connect with clubs, and make your college experience unforgettable
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search events, clubs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-purple-200 focus:border-purple-400"
                />
              </div>
              <Button variant="outline" className="h-12 px-6 border-purple-200 text-purple-700 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-purple-500 text-white shadow-lg"
                      : `${category.color} text-gray-700 hover:shadow-md`
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-800">Upcoming Events</h3>
            <Link href="/events">
              <Button variant="outline" className="border-purple-200 text-purple-700 bg-transparent">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-800 hover:bg-white">₹{event.price}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-purple-500/90 text-white">
                      {event.club}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">{event.title}</CardTitle>
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

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-1 text-green-500" />
                      <span>
                        {event.registrations}/{event.maxCapacity}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                      <span>{event.rating}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.registrations / event.maxCapacity) * 100}%` }}
                    ></div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Events */}
      <section className="py-12 px-4 bg-white/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Recent Events</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {recentEvents.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm"
              >
                <div className="flex">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-32 h-32 object-cover rounded-l-lg"
                  />
                  <div className="flex-1 p-4">
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{event.club}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {event.participants} participants
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                        {event.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-gray-800 mb-2">150+</h4>
              <p className="text-gray-600">Events Organized</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-gray-800 mb-2">25+</h4>
              <p className="text-gray-600">Active Clubs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-gray-800 mb-2">5000+</h4>
              <p className="text-gray-600">Happy Students</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-gray-800 mb-2">4.8</h4>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-xl font-bold">MLRIT Event Hub</span>
              </div>
              <p className="text-gray-400">Your gateway to amazing campus events and experiences.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/events" className="hover:text-white transition-colors">
                    All Events
                  </Link>
                </li>
                <li>
                  <Link href="/clubs" className="hover:text-white transition-colors">
                    Clubs
                  </Link>
                </li>
                <li>
                  <Link href="/calendar" className="hover:text-white transition-colors">
                    Calendar
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Clubs</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/club/register" className="hover:text-white transition-colors">
                    Register Club
                  </Link>
                </li>
                <li>
                  <Link href="/club/dashboard" className="hover:text-white transition-colors">
                    Club Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <p className="text-gray-400 mb-2">MLRIT Campus</p>
              <p className="text-gray-400 mb-2">Hyderabad, Telangana</p>
              <p className="text-gray-400">support@mlrit.ac.in</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MLRIT Event Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
