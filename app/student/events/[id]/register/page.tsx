"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CreditCard,
  User,
  Phone,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function EventRegistration() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [formData, setFormData] = useState({
    participantName: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    rollNumber: "",
    emergencyContact: "",
    emergencyPhone: "",
    dietaryRestrictions: "",
    specialRequirements: "",
    teamName: "",
    teamMembers: "",
    paymentMethod: "online",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<any>({})

  // Sample events data (in real app, this would come from API)
  const sampleEvents = [
    {
      id: "1",
      title: "Tech Symposium 2024",
      club: "Computer Science Club",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      price: 150,
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.8,
      registrations: 245,
      maxCapacity: 500,
      description:
        "Join us for an exciting tech symposium featuring industry experts, workshops, and networking opportunities. Learn about the latest trends in technology and connect with like-minded individuals.",
      features: [
        "Industry Expert Speakers",
        "Hands-on Workshops",
        "Networking Sessions",
        "Certificate of Participation",
        "Lunch & Refreshments",
      ],
      requirements: ["Laptop required for workshops", "Basic programming knowledge preferred", "Student ID mandatory"],
      isTeamEvent: false,
      maxTeamSize: 1,
      registrationDeadline: "2024-02-10",
      contactEmail: "csc@mlrit.ac.in",
      contactPhone: "+91 9876543210",
    },
    {
      id: "2",
      title: "Cultural Fest - Rangoli",
      club: "Cultural Club",
      date: "2024-02-20",
      time: "2:00 PM",
      venue: "Open Ground",
      price: 100,
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.6,
      registrations: 180,
      maxCapacity: 300,
      description:
        "Celebrate the vibrant colors of culture with our annual Rangoli competition and cultural performances.",
      features: [
        "Rangoli Competition",
        "Cultural Performances",
        "Traditional Food Stalls",
        "Prize Distribution",
        "Cultural Workshops",
      ],
      requirements: [
        "Traditional attire encouraged",
        "Own art supplies for competition",
        "Registration fee includes materials",
      ],
      isTeamEvent: true,
      maxTeamSize: 4,
      registrationDeadline: "2024-02-18",
      contactEmail: "cultural@mlrit.ac.in",
      contactPhone: "+91 9876543211",
    },
    {
      id: "3",
      title: "Entrepreneurship Workshop",
      club: "E-Cell",
      date: "2024-02-25",
      time: "11:00 AM",
      venue: "Seminar Hall",
      price: 200,
      image: "/placeholder.svg?height=400&width=600",
      rating: 4.9,
      registrations: 95,
      maxCapacity: 150,
      description: "Learn from successful entrepreneurs and develop your business ideas in this intensive workshop.",
      features: [
        "Entrepreneur Mentorship",
        "Business Plan Development",
        "Pitch Practice Sessions",
        "Networking with Investors",
        "Startup Resources Kit",
      ],
      requirements: ["Business idea (optional)", "Notebook for planning", "Laptop recommended"],
      isTeamEvent: true,
      maxTeamSize: 3,
      registrationDeadline: "2024-02-23",
      contactEmail: "ecell@mlrit.ac.in",
      contactPhone: "+91 9876543212",
    },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData((prev) => ({
        ...prev,
        participantName: parsedUser.name || "",
        email: parsedUser.email || "",
        department: parsedUser.department || "",
        rollNumber: parsedUser.rollNo || "",
      }))
    } else {
      router.push("/login")
      return
    }

    // Find event by ID
    const foundEvent = sampleEvents.find((e) => e.id === eventId)
    if (foundEvent) {
      setEvent(foundEvent)
    } else {
      router.push("/student/dashboard")
      return
    }

    setLoading(false)
  }, [eventId, router])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.participantName.trim()) newErrors.participantName = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.department.trim()) newErrors.department = "Department is required"
    if (!formData.year.trim()) newErrors.year = "Year is required"
    if (!formData.rollNumber.trim()) newErrors.rollNumber = "Roll number is required"
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact is required"
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Emergency phone is required"
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms and conditions"

    if (event?.isTeamEvent && !formData.teamName.trim()) {
      newErrors.teamName = "Team name is required for team events"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegistration = async () => {
    if (!validateForm()) return

    setRegistering(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create registration data
      const registrationData = {
        id: Date.now(),
        eventId: event.id,
        userId: user.id,
        ...formData,
        registrationDate: new Date().toISOString(),
        status: "pending_payment",
        amount: event.price,
      }

      // Store registration data
      const existingRegistrations = JSON.parse(localStorage.getItem("registrations") || "[]")
      existingRegistrations.push(registrationData)
      localStorage.setItem("registrations", JSON.stringify(existingRegistrations))

      // Redirect to payment page
      router.push(`/student/events/${eventId}/payment?registrationId=${registrationData.id}`)
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setRegistering(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Event Not Found</h2>
            <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
            <Link href="/student/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/student/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Event Registration</h1>
                <p className="text-sm text-gray-600">Complete your registration for {event.title}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm sticky top-24">
              <div className="relative">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-800">₹{event.price}</Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.club}</CardDescription>
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
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {event.venue}
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Event Features</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {event.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {event.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <AlertCircle className="w-3 h-3 text-orange-500 mr-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="text-sm text-gray-600">
                    <p>
                      <strong>Registration Deadline:</strong>{" "}
                      {new Date(event.registrationDeadline).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Contact:</strong> {event.contactEmail}
                    </p>
                    <p>
                      <strong>Phone:</strong> {event.contactPhone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Registration Form</CardTitle>
                <CardDescription>Please fill in all required information to complete your registration</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="participantName">Full Name *</Label>
                      <Input
                        id="participantName"
                        value={formData.participantName}
                        onChange={(e) => handleInputChange("participantName", e.target.value)}
                        className={errors.participantName ? "border-red-500" : ""}
                      />
                      {errors.participantName && <p className="text-red-500 text-sm mt-1">{errors.participantName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="rollNumber">Roll Number *</Label>
                      <Input
                        id="rollNumber"
                        value={formData.rollNumber}
                        onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                        className={errors.rollNumber ? "border-red-500" : ""}
                      />
                      {errors.rollNumber && <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>}
                    </div>

                    <div>
                      <Label htmlFor="department">Department *</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                        className={errors.department ? "border-red-500" : ""}
                      />
                      {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                    </div>

                    <div>
                      <Label htmlFor="year">Year of Study *</Label>
                      <Input
                        id="year"
                        value={formData.year}
                        onChange={(e) => handleInputChange("year", e.target.value)}
                        placeholder="e.g., 2nd Year"
                        className={errors.year ? "border-red-500" : ""}
                      />
                      {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                        className={errors.emergencyContact ? "border-red-500" : ""}
                      />
                      {errors.emergencyContact && (
                        <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                        className={errors.emergencyPhone ? "border-red-500" : ""}
                      />
                      {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
                    </div>
                  </div>
                </div>

                {/* Team Information (if team event) */}
                {event.isTeamEvent && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Team Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="teamName">Team Name *</Label>
                          <Input
                            id="teamName"
                            value={formData.teamName}
                            onChange={(e) => handleInputChange("teamName", e.target.value)}
                            className={errors.teamName ? "border-red-500" : ""}
                          />
                          {errors.teamName && <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>}
                        </div>

                        <div>
                          <Label htmlFor="teamMembers">Team Members (Max {event.maxTeamSize} members)</Label>
                          <Textarea
                            id="teamMembers"
                            value={formData.teamMembers}
                            onChange={(e) => handleInputChange("teamMembers", e.target.value)}
                            placeholder="Enter team member names, roll numbers, and contact details (one per line)"
                            rows={4}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                      <Input
                        id="dietaryRestrictions"
                        value={formData.dietaryRestrictions}
                        onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                        placeholder="Any food allergies or dietary requirements"
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea
                        id="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                        placeholder="Any accessibility needs or special accommodations"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </h3>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online">Online Payment (UPI/Card/Net Banking)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="offline" id="offline" />
                      <Label htmlFor="offline">Pay at Venue</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeTerms", checked)}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-purple-600 hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-purple-600 hover:underline">
                        Privacy Policy
                      </Link>
                      . I understand that registration fees are non-refundable except in case of event cancellation.
                    </Label>
                  </div>
                  {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
                </div>

                {/* Registration Summary */}
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Registration Summary:</strong> You are registering for "{event.title}" scheduled on{" "}
                    {new Date(event.date).toLocaleDateString()} at {event.time}. Registration fee: ₹{event.price}
                  </AlertDescription>
                </Alert>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Link href="/student/dashboard">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                  <Button
                    onClick={handleRegistration}
                    disabled={registering}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {registering ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      `Register & Pay ₹${event.price}`
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
