"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Search,
  ArrowLeft,
  ShoppingCart,
  Eye,
  Settings,
  LogOut,
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NotificationBell } from "@/components/ui/notification-bell"
import Link from "next/link"
import { searchEvents } from "@/lib/events"
import { logoutUser } from "@/lib/auth"

export default function EventsPage() {
  const [user, setUser] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    }

    // Load approved events from Supabase
    const loadEvents = async () => {
      const { events: approvedEvents, error } = await searchEvents("", "all")
      if (!error && approvedEvents) {
        setEvents(approvedEvents)
      }
    }

    loadEvents()

    // Load cart
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const categories = [
    { id: "all", name: "All Events" },
    { id: "technical", name: "Technical" },
    { id: "cultural", name: "Cultural" },
    { id: "business", name: "Business" },
    { id: "sports", name: "Sports" },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (event: any) => {
    const newCart = [...cart, { ...event, cartId: Date.now() }]
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))
  }

  const handleLogout = async () => {
    await logoutUser()
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="verve-header sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={user ? (user.role === "student" ? "/student/dashboard" : "/club/dashboard") : "/"}>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 verve-gradient rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-lg">C</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Explore Events</h1>
                  <p className="text-sm text-gray-400">Discover amazing campus events</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user && <NotificationBell />}
              {cart.length > 0 && (
                <Button variant="outline" className="relative verve-button-outline">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart ({cart.length})
                </Button>
              )}
              {user ? (
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
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login">
                    <Button variant="outline" className="verve-button-outline">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="verve-button-primary">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
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
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <Card
                key={event.id}
                className="group verve-event-card overflow-hidden"
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
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-orange-400 transition-colors">{event.title}</CardTitle>
                  <CardDescription className="text-gray-400">{event.description}</CardDescription>
                  <div className="flex items-center text-sm text-gray-400 space-x-4 pt-2">
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
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.venue}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-1 text-green-400" />
                      <span>
                        {event.registered}/{event.capacity}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      <span>4.8</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="verve-gradient h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    />
                  </div>

                  <div className="flex space-x-2">
                    {user && user.role === "student" ? (
                      <>
                        <Button
                          onClick={() => addToCart(event)}
                          className="flex-1 verve-button-primary"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Register
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 verve-button-outline">
                              <Eye className="w-4 h-4 mr-2" />
                              Learn More
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl verve-card">
                            <DialogHeader>
                              <DialogTitle className="text-white">{event.title}</DialogTitle>
                              <DialogDescription className="text-gray-400">{event.club}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <img
                                src={event.image || "/placeholder.jpg"}
                                alt={event.title}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                                <div>
                                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                                </div>
                                <div>
                                  <strong>Time:</strong> {event.time}
                                </div>
                                <div>
                                  <strong>Venue:</strong> {event.venue}
                                </div>
                                <div>
                                  <strong>Price:</strong> ₹{event.price}
                                </div>
                                <div>
                                  <strong>Capacity:</strong> {event.capacity} participants
                                </div>
                                <div>
                                  <strong>Category:</strong> {event.category}
                                </div>
                              </div>
                              <div>
                                <strong className="text-white">Description:</strong>
                                <p className="mt-1 text-gray-400">{event.description}</p>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button
                                  onClick={() => addToCart(event)}
                                  className="verve-button-primary"
                                >
                                  <ShoppingCart className="w-4 h-4 mr-2" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    ) : (
                      <div className="flex-1 text-center">
                        <Link href="/login">
                          <Button className="w-full verve-button-primary">
                            Login to Register
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
