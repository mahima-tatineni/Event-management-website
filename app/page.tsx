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
  ChevronRight,
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
      title: "HandCraft",
      club: "Cultural Club",
      date: "8 December 2021",
      time: "2pm onwards",
      venue: "Main Auditorium",
      price: 150,
      image: "/placeholder.jpg",
      category: "cultural",
      description: "Creative arts and crafts workshop",
      registrations: 245,
      maxCapacity: 500,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Dance",
      club: "Dance Club",
      date: "8 December 2021",
      time: "6pm onwards",
      venue: "Open Ground",
      price: 100,
      image: "/placeholder.jpg",
      category: "cultural",
      description: "Dance performance and workshop",
      registrations: 180,
      maxCapacity: 300,
      rating: 4.6,
    },
    {
      id: 3,
      title: "Valorant",
      club: "Gaming Club",
      date: "9 December 2021",
      time: "2pm onwards",
      venue: "Computer Lab",
      price: 200,
      image: "/placeholder.jpg",
      category: "gaming",
      description: "Gaming tournament and competition",
      registrations: 95,
      maxCapacity: 150,
      rating: 4.9,
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 verve-pattern opacity-20" />
      
      {/* Gradient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 verve-animate-pulse-slow"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 verve-animate-pulse-slow"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute -bottom-32 left-20 w-72 h-72 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 verve-animate-pulse-slow"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
      </div>

      {/* Header */}
      <header className="verve-header sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 verve-gradient rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CampusHub</h1>
                <p className="text-sm text-gray-400">MLRIT Event Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" className="verve-button-outline">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="verve-button-primary">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="verve-hero-bg relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="space-y-6 animate-fade-in">
            {/* Enhanced logo/icon */}
            <div className="w-20 h-20 verve-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 verve-box-shadow transform hover:scale-110 transition-all duration-300">
              <span className="text-black font-bold text-3xl">C</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight verve-text-shadow">
              Welcome to{" "}
              <span className="verve-gradient-text">
                CampusHub
              </span>
            </h1>

            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
                Your gateway to exciting campus events, workshops, and competitions
              </p>
              <p className="text-base md:text-lg text-gray-400">
                Connect, learn, and grow with MLRIT's vibrant community of innovators and creators
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link href="/events">
                <Button
                  size="lg"
                  className="verve-button-primary text-lg px-10 py-5 rounded-full verve-box-shadow transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Explore Events
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  size="lg"
                  className="verve-button-outline text-lg px-10 py-5 rounded-full transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Join Community
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex justify-center items-center space-x-8 pt-12 opacity-70">
              <div className="text-center">
                <div className="text-2xl font-bold verve-gradient-text">2.5K+</div>
                <div className="text-sm text-gray-400">Active Students</div>
              </div>
              <div className="w-px h-12 bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl font-bold verve-gradient-text">50+</div>
                <div className="text-sm text-gray-400">Events Monthly</div>
              </div>
              <div className="w-px h-12 bg-gray-600" />
              <div className="text-center">
                <div className="text-2xl font-bold verve-gradient-text">15+</div>
                <div className="text-sm text-gray-400">Active Clubs</div>
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
                className="text-center verve-card hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 verve-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Clubs Section */}
      <section className="py-16 px-4 bg-black/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Clubs</h2>
            <p className="text-xl text-gray-400">Discover amazing clubs and communities at MLRIT</p>
          </div>

          {/* Central Clubs */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Central Clubs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {clubs
                .filter((club) => club.type === "central")
                .map((club, index) => (
                  <Card
                    key={club.name}
                    className="group hover:shadow-xl transform hover:scale-105 transition-all duration-300 verve-card cursor-pointer"
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
                      <h4 className="font-bold text-white mb-2">{club.name}</h4>
                      <p className="text-sm text-gray-400">{club.fullName}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Departmental Clubs */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Departmental Clubs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs
                .filter((club) => club.type === "departmental")
                .map((club, index) => (
                  <Card
                    key={club.name}
                    className="group hover:shadow-xl transform hover:scale-105 transition-all duration-300 verve-card cursor-pointer"
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
                      <h4 className="font-bold text-white mb-2">{club.name}</h4>
                      <p className="text-sm text-gray-400">{club.fullName}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-400">Don't miss out on these amazing upcoming events</p>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8 verve-card">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search events or clubs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 verve-input"
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
                          ? "verve-button-primary"
                          : "verve-button-outline"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <Card
                key={event.id}
                className="group verve-event-card overflow-hidden"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="relative">
                  <img
                    src={event.image || "/placeholder.jpg"}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="verve-badge">₹{event.price}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {event.club}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button className="w-8 h-8 p-0 rounded-full verve-button-primary">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-orange-400 transition-colors">{event.title}</CardTitle>
                  <CardDescription className="text-gray-400">{event.description}</CardDescription>
                  <div className="flex items-center text-sm text-gray-400 space-x-4 pt-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {event.time}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.venue}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-1 text-green-400" />
                      <span>
                        {event.registrations}/{event.maxCapacity}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      <span>{event.rating}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="verve-gradient h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(event.registrations / event.maxCapacity) * 100}%` }}
                    />
                  </div>

                  <Button className="w-full verve-button-primary">
                    Register
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 verve-gradient text-white relative overflow-hidden">
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
                className="text-lg px-8 py-4 rounded-full bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
              >
                Sign Up Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 verve-gradient rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">C</span>
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
      `}</style>
    </div>
  )
}
