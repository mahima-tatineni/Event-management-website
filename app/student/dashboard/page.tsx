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
  Clock,
  Users,
  Star,
  Bell,
  ShoppingCart,
  History,
  User,
  LogOut,
  Home,
  Search,
  Filter,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function StudentDashboard() {
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [cartItems, setCartItems] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Symposium 2024",
      club: "Computer Science Club",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      price: 150,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      registrations: 245,
      maxCapacity: 500,
    },
    {
      id: 2,
      title: "Cultural Fest - Rangoli",
      club: "Cultural Club",
      date: "2024-02-20",
      time: "2:00 PM",
      venue: "Open Ground",
      price: 100,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      registrations: 180,
      maxCapacity: 300,
    },
    {
      id: 3,
      title: "Entrepreneurship Workshop",
      club: "E-Cell",
      date: "2024-02-25",
      time: "11:00 AM",
      venue: "Seminar Hall",
      price: 200,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      registrations: 95,
      maxCapacity: 150,
    },
  ]

  const registeredEvents = [
    {
      id: 4,
      title: "Hackathon 2024",
      club: "Coding Club",
      date: "2024-01-28",
      status: "completed",
      rating: 5,
      feedback: "Amazing event with great learning opportunities!",
    },
    {
      id: 5,
      title: "Dance Competition",
      club: "Dance Club",
      date: "2024-01-25",
      status: "completed",
      rating: 4,
      feedback: "Well organized event, enjoyed participating!",
    },
  ]

  const addToCart = (event: any) => {
    setCartItems((prev) => [...prev, event])
  }

  const removeFromCart = (eventId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== eventId))
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
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Student Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <ShoppingCart className="w-4 h-4" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white rounded-full text-xs flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
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
                  <AvatarFallback className="text-2xl">{user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <CardDescription>{user.rollNo}</CardDescription>
                <Badge variant="secondary" className="mt-2">
                  {user.department}
                </Badge>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Link href="/student/dashboard">
                    <Button variant="ghost" className="w-full justify-start bg-purple-50 text-purple-700">
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/student/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/student/calendar">
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Calendar
                    </Button>
                  </Link>
                  <Link href="/student/history">
                    <Button variant="ghost" className="w-full justify-start">
                      <History className="w-4 h-4 mr-2" />
                      Event History
                    </Button>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="events" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                <TabsTrigger value="registered">My Events</TabsTrigger>
                <TabsTrigger value="cart">Cart ({cartItems.length})</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="space-y-6">
                {/* Search and Filter */}
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="Search events..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 h-12 border-purple-200 focus:border-purple-400"
                        />
                      </div>
                      <Button variant="outline" className="h-12 px-6 border-purple-200 text-purple-700 bg-transparent">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents
                    .filter(
                      (event) =>
                        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.club.toLowerCase().includes(searchTerm.toLowerCase()),
                    )
                    .map((event) => (
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
                            <Badge className="bg-white/90 text-gray-800">₹{event.price}</Badge>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <Badge variant="secondary" className="bg-purple-500/90 text-white">
                              {event.club}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                            {event.title}
                          </CardTitle>
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
                              className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                              style={{ width: `${(event.registrations / event.maxCapacity) * 100}%` }}
                            ></div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                              onClick={() => addToCart(event)}
                            >
                              Add to Cart
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="registered" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {registeredEvents.map((event) => (
                    <Card key={event.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{event.title}</h3>
                            <p className="text-gray-600">{event.club}</p>
                          </div>
                          <Badge variant={event.status === "completed" ? "secondary" : "default"}>{event.status}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        {event.status === "completed" && (
                          <div className="border-t pt-4">
                            <div className="flex items-center mb-2">
                              <span className="text-sm font-medium mr-2">Your Rating:</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < event.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{event.feedback}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cart" className="space-y-6">
                {cartItems.length === 0 ? (
                  <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                      <p className="text-gray-500">Add some events to get started!</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <Card key={item.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.club}</p>
                                <p className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-semibold">₹{item.price}</span>
                              <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                                Remove
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-semibold">Total:</span>
                          <span className="text-2xl font-bold text-purple-600">
                            ₹{cartItems.reduce((total, item) => total + item.price, 0)}
                          </span>
                        </div>
                        <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                          Proceed to Payment
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Pending Feedback</CardTitle>
                    <CardDescription>Please provide feedback for events you've attended</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">No pending feedback at the moment.</p>
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
