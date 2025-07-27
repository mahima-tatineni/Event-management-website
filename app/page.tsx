"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Search,
  ArrowRight,
  Sparkles,
  Trophy,
  BookOpen,
  Zap,
  Target,
  Globe,
  Code,
  Palette,
  Cpu,
  Wrench,
  Gamepad2,
  Brain,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)

    // Load approved events
    const storedEvents = localStorage.getItem("events")
    if (storedEvents) {
      const allEvents = JSON.parse(storedEvents)
      const approvedEvents = allEvents.filter((event: any) => event.status === "approved")
      // Update featuredEvents state if you want to show real events
    }
  }, [])

  const featuredEvents = [
    {
      id: 1,
      title: "Tech Symposium 2024",
      club: "CIE",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      price: 150,
      image: "/placeholder.svg?height=200&width=300&text=Tech+Symposium",
      category: "technical",
      description: "Annual technical symposium featuring industry experts and innovative projects",
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
      image: "/placeholder.svg?height=200&width=300&text=Cultural+Fest",
      category: "cultural",
      description: "Celebrate diversity through art, music, and traditional performances",
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
      image: "/placeholder.svg?height=200&width=300&text=Entrepreneurship",
      category: "workshop",
      description: "Learn from successful entrepreneurs and build your startup ideas",
      registrations: 95,
      maxCapacity: 150,
      rating: 4.9,
    },
    {
      id: 4,
      title: "Hackathon 2024",
      club: "CODE",
      date: "2024-03-01",
      time: "9:00 AM",
      venue: "Computer Lab",
      price: 300,
      image: "/placeholder.svg?height=200&width=300&text=Hackathon",
      category: "competition",
      description: "48-hour coding marathon with exciting prizes and mentorship",
      registrations: 120,
      maxCapacity: 200,
      rating: 4.7,
    },
  ]

  const clubs = [
    // Central Clubs
    {
      name: "CIE",
      fullName: "Center for Innovation & Entrepreneurship",
      type: "central",
      icon: Zap,
      color: "bg-blue-500",
    },
    {
      name: "SCOPE",
      fullName: "Society of Computer Professionals & Engineers",
      type: "central",
      icon: Code,
      color: "bg-green-500",
    },
    {
      name: "Literati",
      fullName: "Literary & Debating Society",
      type: "central",
      icon: BookOpen,
      color: "bg-purple-500",
    },
    { name: "EWB", fullName: "Engineers Without Borders", type: "central", icon: Globe, color: "bg-orange-500" },
    { name: "CAM", fullName: "Creative Arts & Media", type: "central", icon: Palette, color: "bg-pink-500" },

    // Departmental Clubs
    {
      name: "SQUAD",
      fullName: "Student Quality Assurance & Development",
      type: "departmental",
      icon: Target,
      color: "bg-red-500",
    },
    {
      name: "CODE",
      fullName: "Computer Organization & Development Engineers",
      type: "departmental",
      icon: Cpu,
      color: "bg-indigo-500",
    },
    { name: "ME", fullName: "Mechanical Engineers Club", type: "departmental", icon: Wrench, color: "bg-gray-500" },
    {
      name: "AKRITI",
      fullName: "Architecture & Design Club",
      type: "departmental",
      icon: Sparkles,
      color: "bg-teal-500",
    },
    {
      name: "ROBOTICS",
      fullName: "Robotics & Automation Club",
      type: "departmental",
      icon: Gamepad2,
      color: "bg-yellow-500",
    },
    {
      name: "AIM",
      fullName: "Artificial Intelligence & Machine Learning",
      type: "departmental",
      icon: Brain,
      color: "bg-cyan-500",
    },
  ]

  const categories = [
    { id: "all", name: "All Events", count: featuredEvents.length },
    { id: "technical", name: "Technical", count: featuredEvents.filter((e) => e.category === "technical").length },
    { id: "cultural", name: "Cultural", count: featuredEvents.filter((e) => e.category === "cultural").length },
    { id: "workshop", name: "Workshops", count: featuredEvents.filter((e) => e.category === "workshop").length },
    {
      id: "competition",
      name: "Competitions",
      count: featuredEvents.filter((e) => e.category === "competition").length,
    },
  ]

  const stats = [
    { label: "Active Events", value: "45+", icon: Calendar },
    { label: "Registered Students", value: "2.5K+", icon: Users },
    { label: "Active Clubs", value: "15+", icon: Trophy },
    { label: "Success Rate", value: "98%", icon: Star },
  ]

  const filteredEvents = featuredEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute -bottom-32 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">CampusHub</h1>
                <p className="text-sm text-gray-600">MLRIT Event Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="bg-transparent border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse animation-delay-2000" />
          <div className="absolute -bottom-32 left-20 w-96 h-96 bg-gradient-to-r from-pink-300 to-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse animation-delay-4000" />

          {/* Floating elements */}
          <div className="absolute top-20 left-1/4 w-4 h-4 bg-purple-400 rounded-full animate-bounce animation-delay-1000" />
          <div className="absolute top-40 right-1/4 w-6 h-6 bg-pink-400 rounded-full animate-bounce animation-delay-3000" />
          <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce animation-delay-5000" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="space-y-6 animate-fade-in">
            {/* Enhanced logo/icon */}
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition-all duration-300">
              <span className="text-white font-bold text-3xl">C</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                CampusHub
              </span>
            </h1>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
                Your gateway to exciting campus events, workshops, and competitions
              </p>
              <p className="text-base md:text-lg text-gray-500">
                Connect, learn, and grow with MLRIT's vibrant community of innovators and creators
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link href="/events">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-10 py-5 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Explore Events
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-5 rounded-full border-2 border-purple-200 text-purple-700 hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm font-semibold shadow-lg"
                >
                  Join Community
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex justify-center items-center space-x-8 pt-12 opacity-70">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">2.5K+</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">50+</div>
                <div className="text-sm text-gray-600">Events Monthly</div>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Active Clubs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="text-center border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Clubs Section */}
      <section className="py-16 px-4 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Clubs</h2>
            <p className="text-xl text-gray-600">Discover amazing clubs and communities at MLRIT</p>
          </div>

          {/* Central Clubs */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Central Clubs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {clubs
                .filter((club) => club.type === "central")
                .map((club, index) => (
                  <Card
                    key={club.name}
                    className="group hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm cursor-pointer"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 ${club.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <club.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{club.name}</h4>
                      <p className="text-sm text-gray-600">{club.fullName}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Departmental Clubs */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Departmental Clubs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs
                .filter((club) => club.type === "departmental")
                .map((club, index) => (
                  <Card
                    key={club.name}
                    className="group hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm cursor-pointer"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 ${club.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <club.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{club.name}</h4>
                      <p className="text-sm text-gray-600">{club.fullName}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Events</h2>
            <p className="text-xl text-gray-600">Don't miss out on these amazing upcoming events</p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search events or clubs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-purple-200 focus:border-purple-400"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : "border-purple-200 text-purple-700 hover:bg-purple-50"
                      } transition-all duration-300`}
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event, index) => (
              <Card
                key={event.id}
                className="group hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm overflow-hidden"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-800 font-semibold">₹{event.price}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-purple-500/90 text-white">
                      {event.club}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">{event.title}</CardTitle>
                  <CardDescription className="text-gray-600">{event.description}</CardDescription>
                  <div className="flex items-center text-sm text-gray-600 space-x-4 pt-2">
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
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students already using CampusHub to discover amazing events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 rounded-full bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                Sign Up Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">CampusHub</h3>
                  <p className="text-sm text-gray-400">MLRIT Event Management</p>
                </div>
              </div>
              <p className="text-gray-400">Connecting students with amazing campus events and opportunities.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/events" className="hover:text-white transition-colors">
                    Events
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
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="hover:text-white transition-colors">
                    Guidelines
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>MLRIT Campus</p>
                <p>Hyderabad, Telangana</p>
                <p>Email: info@campushub.mlrit.ac.in</p>
                <p>Phone: +91 40 1234 5678</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CampusHub - MLRIT. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-5000 {
          animation-delay: 5s;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  )
}
