"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  Search,
  Filter,
  ChevronDown,
  Play,
  Award,
  Target,
  Zap,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Trigger animations on load
    setTimeout(() => setIsVisible(true), 100)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Symposium 2024",
      club: "CIE Club",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      price: 150,
      category: "technical",
      image: "/placeholder.svg?height=200&width=300&text=Tech+Symposium",
      registrations: 245,
      maxCapacity: 500,
      rating: 4.8,
      description: "Annual technical symposium featuring latest innovations and tech talks",
    },
    {
      id: 2,
      title: "Cultural Fest - Rangoli",
      club: "Literati Club",
      date: "2024-02-20",
      time: "2:00 PM",
      venue: "Open Ground",
      price: 100,
      category: "cultural",
      image: "/placeholder.svg?height=200&width=300&text=Cultural+Fest",
      registrations: 180,
      maxCapacity: 300,
      rating: 4.6,
      description: "Celebrate diversity through art, music, and cultural performances",
    },
    {
      id: 3,
      title: "Entrepreneurship Workshop",
      club: "EWB Club",
      date: "2024-02-25",
      time: "11:00 AM",
      venue: "Seminar Hall",
      price: 200,
      category: "workshop",
      image: "/placeholder.svg?height=200&width=300&text=Entrepreneurship",
      registrations: 95,
      maxCapacity: 150,
      rating: 4.9,
      description: "Learn from successful entrepreneurs and build your startup ideas",
    },
    {
      id: 4,
      title: "Robotics Competition",
      club: "ROBOTICS Club",
      date: "2024-03-01",
      time: "9:00 AM",
      venue: "Engineering Lab",
      price: 300,
      category: "technical",
      image: "/placeholder.svg?height=200&width=300&text=Robotics",
      registrations: 120,
      maxCapacity: 200,
      rating: 4.7,
      description: "Build and compete with autonomous robots in various challenges",
    },
    {
      id: 5,
      title: "Design Thinking Workshop",
      club: "AKRITI Club",
      date: "2024-03-05",
      time: "1:00 PM",
      venue: "Design Studio",
      price: 180,
      category: "workshop",
      image: "/placeholder.svg?height=200&width=300&text=Design+Thinking",
      registrations: 75,
      maxCapacity: 100,
      rating: 4.8,
      description: "Master the art of creative problem solving and user-centered design",
    },
    {
      id: 6,
      title: "AI/ML Hackathon",
      club: "AIM Club",
      date: "2024-03-10",
      time: "8:00 AM",
      venue: "Computer Lab",
      price: 250,
      category: "technical",
      image: "/placeholder.svg?height=200&width=300&text=AI+Hackathon",
      registrations: 200,
      maxCapacity: 300,
      rating: 4.9,
      description: "48-hour intensive hackathon focusing on AI and Machine Learning solutions",
    },
  ]

  const recentEvents = [
    {
      id: 7,
      title: "Winter Coding Challenge",
      club: "SQUAD Club",
      date: "2024-01-28",
      participants: 150,
      rating: 4.7,
      image: "/placeholder.svg?height=150&width=200&text=Coding+Challenge",
      description: "Intense coding competition with algorithmic challenges",
    },
    {
      id: 8,
      title: "Photography Exhibition",
      club: "CAM Club",
      date: "2024-01-25",
      participants: 85,
      rating: 4.5,
      image: "/placeholder.svg?height=150&width=200&text=Photography",
      description: "Showcase of stunning photography by talented students",
    },
    {
      id: 9,
      title: "Innovation Summit",
      club: "SCOPE Club",
      date: "2024-01-20",
      participants: 200,
      rating: 4.8,
      image: "/placeholder.svg?height=150&width=200&text=Innovation+Summit",
      description: "Exploring cutting-edge technologies and future innovations",
    },
  ]

  const categories = [
    { id: "all", name: "All Events", color: "bg-gray-100", icon: "🎯" },
    { id: "technical", name: "Technical", color: "bg-blue-100", icon: "💻" },
    { id: "cultural", name: "Cultural", color: "bg-pink-100", icon: "🎨" },
    { id: "workshop", name: "Workshop", color: "bg-green-100", icon: "🛠️" },
    { id: "sports", name: "Sports", color: "bg-orange-100", icon: "⚽" },
  ]

  const clubs = [
    {
      name: "CIE Club",
      category: "Central",
      description: "Center for Innovation and Entrepreneurship",
      members: 150,
      events: 12,
      logo: "/placeholder.svg?height=60&width=60&text=CIE",
    },
    {
      name: "SCOPE Club",
      category: "Central",
      description: "Student Community of Programming Enthusiasts",
      members: 200,
      events: 15,
      logo: "/placeholder.svg?height=60&width=60&text=SCOPE",
    },
    {
      name: "Literati Club",
      category: "Central",
      description: "Literary and Cultural Society",
      members: 120,
      events: 8,
      logo: "/placeholder.svg?height=60&width=60&text=LIT",
    },
    {
      name: "EWB Club",
      category: "Central",
      description: "Engineers Without Borders",
      members: 90,
      events: 6,
      logo: "/placeholder.svg?height=60&width=60&text=EWB",
    },
    {
      name: "CAM Club",
      category: "Central",
      description: "Camera and Media Club",
      members: 80,
      events: 10,
      logo: "/placeholder.svg?height=60&width=60&text=CAM",
    },
    {
      name: "SQUAD Club",
      category: "Departmental",
      description: "Software Quality and Development",
      members: 110,
      events: 9,
      logo: "/placeholder.svg?height=60&width=60&text=SQUAD",
    },
    {
      name: "CODE Club",
      category: "Departmental",
      description: "Competitive Programming Club",
      members: 95,
      events: 11,
      logo: "/placeholder.svg?height=60&width=60&text=CODE",
    },
    {
      name: "AKRITI Club",
      category: "Departmental",
      description: "Design and Creative Arts",
      members: 75,
      events: 7,
      logo: "/placeholder.svg?height=60&width=60&text=ART",
    },
    {
      name: "ROBOTICS Club",
      category: "Departmental",
      description: "Robotics and Automation",
      members: 85,
      events: 8,
      logo: "/placeholder.svg?height=60&width=60&text=ROBOT",
    },
    {
      name: "AIM Club",
      category: "Departmental",
      description: "Artificial Intelligence and Machine Learning",
      members: 130,
      events: 13,
      logo: "/placeholder.svg?height=60&width=60&text=AIM",
    },
  ]

  const filteredEvents = upcomingEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-x-hidden">
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
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent transition-all duration-300 hover:scale-105"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          ></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
            style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
          ></div>
          <div
            className="absolute top-40 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
            style={{ transform: `translate(-50%, ${scrollY * 0.05}px)` }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Discover Amazing
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block md:inline">
                {" "}
                Campus Events
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join exciting events, connect with clubs, and make your college experience unforgettable at MLRIT
            </p>
          </div>

          {/* Floating Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Explore Events
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 bg-white/80 backdrop-blur-sm text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Users className="w-5 h-5 mr-2" />
              Join Community
            </Button>
          </div>

          {/* Search and Filter */}
          <div
            className={`max-w-4xl mx-auto mb-16 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search events, clubs, workshops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 border-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm shadow-lg rounded-full text-lg"
                />
              </div>
              <Button
                variant="outline"
                className="h-14 px-8 border-purple-200 text-purple-700 bg-white/80 backdrop-blur-sm shadow-lg rounded-full hover:shadow-xl transition-all duration-300"
              >
                <Filter className="w-5 h-5 mr-2" />
                Advanced Filter
              </Button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/25"
                      : `${category.color} text-gray-700 hover:shadow-md bg-white/80 backdrop-blur-sm`
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-purple-500 mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Calendar, number: "150+", label: "Events Organized", color: "from-blue-400 to-blue-500" },
              { icon: Users, number: "25+", label: "Active Clubs", color: "from-green-400 to-green-500" },
              { icon: Star, number: "5000+", label: "Happy Students", color: "from-purple-400 to-purple-500" },
              { icon: Award, number: "4.8", label: "Average Rating", color: "from-pink-400 to-pink-500" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h4>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Clubs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Amazing Clubs</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover diverse communities and find your passion among our vibrant student clubs
            </p>
          </div>

          {/* Central Clubs */}
          <div className="mb-12">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Target className="w-6 h-6 mr-2 text-purple-500" />
              Central Clubs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs
                .filter((club) => club.category === "Central")
                .map((club, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm overflow-hidden hover:scale-105"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <img
                          src={club.logo || "/placeholder.svg"}
                          alt={club.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                        {club.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{club.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{club.members} members</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{club.events} events</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Departmental Clubs */}
          <div>
            <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-blue-500" />
              Departmental Clubs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs
                .filter((club) => club.category === "Departmental")
                .map((club, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm overflow-hidden hover:scale-105"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <img
                          src={club.logo || "/placeholder.svg"}
                          alt={club.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{club.name}</CardTitle>
                      <p className="text-sm text-gray-600">{club.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{club.members} members</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{club.events} events</span>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">Upcoming Events</h3>
              <p className="text-xl text-gray-600">Don't miss out on these exciting opportunities</p>
            </div>
            <Link href="/events">
              <Button
                variant="outline"
                className="border-purple-200 text-purple-700 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.slice(0, 6).map((event, index) => (
              <Card
                key={event.id}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/70 backdrop-blur-sm overflow-hidden hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-800 hover:bg-white shadow-lg">₹{event.price}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-purple-500/90 text-white shadow-lg">
                      {event.club}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors line-clamp-2">
                    {event.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-600 space-x-4 mt-2">
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
                      className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(event.registrations / event.maxCapacity) * 100}%` }}
                    ></div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Events */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Recent Events</h3>
            <p className="text-xl text-gray-600">See what amazing events happened recently</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recentEvents.map((event, index) => (
              <Card
                key={event.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:scale-105"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-xl mb-2 group-hover:text-purple-600 transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {event.participants} participants
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                      {event.rating}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    {event.club}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students who are already part of the MLRIT Event Hub community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105"
              >
                Join as Student
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Register Club
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-2xl font-bold">MLRIT Event Hub</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your gateway to amazing campus events and experiences at Marri Laxman Reddy Institute of Technology.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">i</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">Quick Links</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/events" className="hover:text-white transition-colors hover:underline">
                    All Events
                  </Link>
                </li>
                <li>
                  <Link href="/clubs" className="hover:text-white transition-colors hover:underline">
                    Clubs Directory
                  </Link>
                </li>
                <li>
                  <Link href="/calendar" className="hover:text-white transition-colors hover:underline">
                    Event Calendar
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors hover:underline">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">For Clubs</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/club/register" className="hover:text-white transition-colors hover:underline">
                    Register Club
                  </Link>
                </li>
                <li>
                  <Link href="/club/dashboard" className="hover:text-white transition-colors hover:underline">
                    Club Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white transition-colors hover:underline">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="hover:text-white transition-colors hover:underline">
                    Event Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-lg">Contact Info</h5>
              <div className="space-y-3 text-gray-400">
                <p>
                  MLRIT Campus
                  <br />
                  Dundigal, Hyderabad
                  <br />
                  Telangana - 500043
                </p>
                <p>Phone: +91 40 2304 1000</p>
                <p>Email: support@mlrit.ac.in</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MLRIT Event Hub. All rights reserved. | Made with ❤️ for MLRIT Community</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
