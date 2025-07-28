"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  UserCheck,
  Clock,
  Search,
  Download,
  Eye,
  RefreshCw,
  ArrowLeft,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminRegistrations() {
  const [user, setUser] = useState<any>(null)
  const [registrations, setRegistrations] = useState<any[]>([])
  const [filteredRegistrations, setFilteredRegistrations] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [eventFilter, setEventFilter] = useState("all")
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null)
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

    // Load registrations from localStorage
    const storedRegistrations = localStorage.getItem("registrations")
    if (storedRegistrations) {
      const registrationsData = JSON.parse(storedRegistrations)
      setRegistrations(registrationsData)
      setFilteredRegistrations(registrationsData)
    }
  }, [router])

  // Sample registration data
  const sampleRegistrations = [
    {
      id: "REG001",
      studentId: "STU001",
      studentName: "Rahul Sharma",
      studentEmail: "rahul.sharma@mlrit.ac.in",
      studentPhone: "+91 9876543210",
      rollNumber: "20B81A0501",
      branch: "Computer Science",
      year: "3rd Year",
      eventId: "EVT001",
      eventTitle: "AI & Machine Learning Workshop",
      eventDate: "2024-02-20",
      eventVenue: "Lab 301",
      registrationDate: "2024-02-15T10:25:00Z",
      registrationStatus: "confirmed",
      paymentStatus: "completed",
      amount: 150,
      teamSize: 1,
      teamMembers: [],
      specialRequirements: "Vegetarian meal",
      emergencyContact: {
        name: "Suresh Sharma",
        phone: "+91 9876543211",
        relation: "Father",
      },
      attendanceStatus: "present",
    },
    {
      id: "REG002",
      studentId: "STU002",
      studentName: "Priya Patel",
      studentEmail: "priya.patel@mlrit.ac.in",
      studentPhone: "+91 9876543212",
      rollNumber: "20B81A0502",
      branch: "Computer Science",
      year: "3rd Year",
      eventId: "EVT002",
      eventTitle: "Cultural Night",
      eventDate: "2024-02-25",
      eventVenue: "Open Ground",
      registrationDate: "2024-02-16T14:20:00Z",
      registrationStatus: "pending",
      paymentStatus: "pending",
      amount: 200,
      teamSize: 3,
      teamMembers: [
        { name: "Anita Sharma", rollNumber: "20B81A0502", branch: "CSE" },
        { name: "Kavya Reddy", rollNumber: "20B81A0503", branch: "CSE" },
      ],
      specialRequirements: "None",
      emergencyContact: {
        name: "Rajesh Patel",
        phone: "+91 9876543213",
        relation: "Father",
      },
      attendanceStatus: "not_marked",
    },
    {
      id: "REG003",
      studentId: "STU003",
      studentName: "Arjun Kumar",
      studentEmail: "arjun.kumar@mlrit.ac.in",
      studentPhone: "+91 9876543214",
      rollNumber: "20B81A0503",
      branch: "Electronics",
      year: "2nd Year",
      eventId: "EVT001",
      eventTitle: "AI & Machine Learning Workshop",
      eventDate: "2024-02-20",
      eventVenue: "Lab 301",
      registrationDate: "2024-02-16T09:10:00Z",
      registrationStatus: "cancelled",
      paymentStatus: "failed",
      amount: 150,
      teamSize: 1,
      teamMembers: [],
      specialRequirements: "Wheelchair accessible seating",
      emergencyContact: {
        name: "Lakshmi Kumar",
        phone: "+91 9876543215",
        relation: "Mother",
      },
      attendanceStatus: "absent",
    },
  ]

  // Initialize with sample data if no registrations exist
  useEffect(() => {
    if (registrations.length === 0) {
      setRegistrations(sampleRegistrations)
      setFilteredRegistrations(sampleRegistrations)
      localStorage.setItem("registrations", JSON.stringify(sampleRegistrations))
    }
  }, [])

  // Filter registrations based on search and filters
  useEffect(() => {
    let filtered = registrations

    if (searchTerm) {
      filtered = filtered.filter(
        (registration) =>
          registration.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          registration.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          registration.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          registration.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((registration) => registration.registrationStatus === statusFilter)
    }

    if (eventFilter !== "all") {
      filtered = filtered.filter((registration) => registration.eventId === eventFilter)
    }

    setFilteredRegistrations(filtered)
  }, [registrations, searchTerm, statusFilter, eventFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getAttendanceBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Present</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>
      case "not_marked":
        return <Badge className="bg-gray-100 text-gray-800">Not Marked</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const stats = {
    totalRegistrations: registrations.length,
    confirmedRegistrations: registrations.filter((r) => r.registrationStatus === "confirmed").length,
    pendingRegistrations: registrations.filter((r) => r.registrationStatus === "pending").length,
    cancelledRegistrations: registrations.filter((r) => r.registrationStatus === "cancelled").length,
    totalParticipants: registrations.reduce((sum, r) => sum + r.teamSize, 0),
    averageTeamSize:
      registrations.length > 0 ? registrations.reduce((sum, r) => sum + r.teamSize, 0) / registrations.length : 0,
  }

  const exportRegistrations = () => {
    const csvContent = [
      [
        "Registration ID",
        "Student Name",
        "Email",
        "Roll Number",
        "Branch",
        "Event",
        "Status",
        "Payment Status",
        "Team Size",
        "Registration Date",
      ].join(","),
      ...filteredRegistrations.map((registration) =>
        [
          registration.id,
          registration.studentName,
          registration.studentEmail,
          registration.rollNumber,
          registration.branch,
          registration.eventTitle,
          registration.registrationStatus,
          registration.paymentStatus,
          registration.teamSize,
          new Date(registration.registrationDate).toLocaleDateString(),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
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
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Registration Management</h1>
                <p className="text-sm text-gray-600">Track and manage all event registrations</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={exportRegistrations}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalRegistrations}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.confirmedRegistrations}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {stats.totalRegistrations > 0
                  ? Math.round((stats.confirmedRegistrations / stats.totalRegistrations) * 100)
                  : 0}
                % confirmed
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Participants</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.totalParticipants}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Avg team size: {Math.round(stats.averageTeamSize * 10) / 10}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending/Cancelled</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {stats.pendingRegistrations + stats.cancelledRegistrations}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {stats.pendingRegistrations} pending, {stats.cancelledRegistrations} cancelled
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by student name, email, roll number, or event..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="EVT001">AI & ML Workshop</SelectItem>
                  <SelectItem value="EVT002">Cultural Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Registrations Table */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Event Registrations</CardTitle>
            <CardDescription>
              Showing {filteredRegistrations.length} of {registrations.length} registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Team Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>{registration.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{registration.studentName}</p>
                            <p className="text-sm text-gray-600">
                              {registration.rollNumber} - {registration.branch}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{registration.eventTitle}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(registration.eventDate).toLocaleDateString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {registration.teamSize} member{registration.teamSize > 1 ? "s" : ""}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(registration.registrationStatus)}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            registration.paymentStatus === "completed"
                              ? "bg-green-100 text-green-800"
                              : registration.paymentStatus === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {registration.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{getAttendanceBadge(registration.attendanceStatus)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedRegistration(registration)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Registration Details</DialogTitle>
                              <DialogDescription>
                                Complete information for registration {selectedRegistration?.id}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedRegistration && (
                              <div className="space-y-6">
                                {/* Registration Info */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Registration Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Registration ID:</strong> {selectedRegistration.id}
                                      </p>
                                      <p>
                                        <strong>Status:</strong>{" "}
                                        {getStatusBadge(selectedRegistration.registrationStatus)}
                                      </p>
                                      <p>
                                        <strong>Registration Date:</strong>{" "}
                                        {new Date(selectedRegistration.registrationDate).toLocaleString()}
                                      </p>
                                      <p>
                                        <strong>Team Size:</strong> {selectedRegistration.teamSize}
                                      </p>
                                      <p>
                                        <strong>Amount:</strong> ₹{selectedRegistration.amount}
                                      </p>
                                      <p>
                                        <strong>Payment Status:</strong> {selectedRegistration.paymentStatus}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Student Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Name:</strong> {selectedRegistration.studentName}
                                      </p>
                                      <p>
                                        <strong>Email:</strong> {selectedRegistration.studentEmail}
                                      </p>
                                      <p>
                                        <strong>Phone:</strong> {selectedRegistration.studentPhone}
                                      </p>
                                      <p>
                                        <strong>Roll Number:</strong> {selectedRegistration.rollNumber}
                                      </p>
                                      <p>
                                        <strong>Branch:</strong> {selectedRegistration.branch}
                                      </p>
                                      <p>
                                        <strong>Year:</strong> {selectedRegistration.year}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Event Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Title:</strong> {selectedRegistration.eventTitle}
                                      </p>
                                      <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(selectedRegistration.eventDate).toLocaleDateString()}
                                      </p>
                                      <p>
                                        <strong>Venue:</strong> {selectedRegistration.eventVenue}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Team Members</h4>
                                    <div className="space-y-2 text-sm">
                                      {selectedRegistration.teamMembers.map((member, index) => (
                                        <p key={index}>
                                          {member.name} ({member.rollNumber})
                                        </p>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Special Requirements</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>{selectedRegistration.specialRequirements}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Emergency Contact</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Name:</strong> {selectedRegistration.emergencyContact.name}
                                      </p>
                                      <p>
                                        <strong>Phone:</strong> {selectedRegistration.emergencyContact.phone}
                                      </p>
                                      <p>
                                        <strong>Relation:</strong> {selectedRegistration.emergencyContact.relation}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
