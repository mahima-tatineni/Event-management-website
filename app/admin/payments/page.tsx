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
  CreditCard,
  DollarSign,
  TrendingUp,
  Search,
  Download,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Phone,
  Mail,
  FileText,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminPayments() {
  const [user, setUser] = useState<any>(null)
  const [payments, setPayments] = useState<any[]>([])
  const [filteredPayments, setFilteredPayments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [eventFilter, setEventFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
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

    // Load payments from localStorage
    const storedPayments = localStorage.getItem("payments")
    if (storedPayments) {
      const paymentsData = JSON.parse(storedPayments)
      setPayments(paymentsData)
      setFilteredPayments(paymentsData)
    }
  }, [router])

  // Sample payment data structure
  const samplePayments = [
    {
      id: "PAY001",
      transactionId: "TXN123456789",
      studentId: "STU001",
      studentName: "Rahul Sharma",
      studentEmail: "rahul.sharma@mlrit.ac.in",
      studentPhone: "+91 9876543210",
      eventId: "EVT001",
      eventTitle: "AI & Machine Learning Workshop",
      eventDate: "2024-02-20",
      eventVenue: "Lab 301",
      amount: 150,
      paymentMethod: "UPI",
      paymentStatus: "completed",
      paymentDate: "2024-02-15T10:30:00Z",
      registrationDate: "2024-02-15T10:25:00Z",
      teamMembers: [],
      specialRequirements: "Vegetarian meal",
      emergencyContact: {
        name: "Suresh Sharma",
        phone: "+91 9876543211",
        relation: "Father",
      },
    },
    {
      id: "PAY002",
      transactionId: "TXN123456790",
      studentId: "STU002",
      studentName: "Priya Patel",
      studentEmail: "priya.patel@mlrit.ac.in",
      studentPhone: "+91 9876543212",
      eventId: "EVT002",
      eventTitle: "Cultural Night",
      eventDate: "2024-02-25",
      eventVenue: "Open Ground",
      amount: 200,
      paymentMethod: "Credit Card",
      paymentStatus: "pending",
      paymentDate: null,
      registrationDate: "2024-02-16T14:20:00Z",
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
    },
    {
      id: "PAY003",
      transactionId: "TXN123456791",
      studentId: "STU003",
      studentName: "Arjun Kumar",
      studentEmail: "arjun.kumar@mlrit.ac.in",
      studentPhone: "+91 9876543214",
      eventId: "EVT001",
      eventTitle: "AI & Machine Learning Workshop",
      eventDate: "2024-02-20",
      eventVenue: "Lab 301",
      amount: 150,
      paymentMethod: "Net Banking",
      paymentStatus: "failed",
      paymentDate: "2024-02-16T09:15:00Z",
      registrationDate: "2024-02-16T09:10:00Z",
      teamMembers: [],
      specialRequirements: "Wheelchair accessible seating",
      emergencyContact: {
        name: "Lakshmi Kumar",
        phone: "+91 9876543215",
        relation: "Mother",
      },
    },
  ]

  // Initialize with sample data if no payments exist
  useEffect(() => {
    if (payments.length === 0) {
      setPayments(samplePayments)
      setFilteredPayments(samplePayments)
      localStorage.setItem("payments", JSON.stringify(samplePayments))
    }
  }, [])

  // Filter payments based on search and filters
  useEffect(() => {
    let filtered = payments

    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((payment) => payment.paymentStatus === statusFilter)
    }

    if (eventFilter !== "all") {
      filtered = filtered.filter((payment) => payment.eventId === eventFilter)
    }

    setFilteredPayments(filtered)
  }, [payments, searchTerm, statusFilter, eventFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "upi":
        return "📱"
      case "credit card":
      case "debit card":
        return "💳"
      case "net banking":
        return "🏦"
      default:
        return "💰"
    }
  }

  const stats = {
    totalPayments: payments.length,
    completedPayments: payments.filter((p) => p.paymentStatus === "completed").length,
    pendingPayments: payments.filter((p) => p.paymentStatus === "pending").length,
    failedPayments: payments.filter((p) => p.paymentStatus === "failed").length,
    totalRevenue: payments.filter((p) => p.paymentStatus === "completed").reduce((sum, p) => sum + p.amount, 0),
    averageAmount: payments.length > 0 ? payments.reduce((sum, p) => sum + p.amount, 0) / payments.length : 0,
  }

  const exportPayments = () => {
    const csvContent = [
      [
        "Payment ID",
        "Transaction ID",
        "Student Name",
        "Email",
        "Event",
        "Amount",
        "Status",
        "Payment Method",
        "Date",
      ].join(","),
      ...filteredPayments.map((payment) =>
        [
          payment.id,
          payment.transactionId,
          payment.studentName,
          payment.studentEmail,
          payment.eventTitle,
          payment.amount,
          payment.paymentStatus,
          payment.paymentMethod,
          payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "N/A",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `payments-${new Date().toISOString().split("T")[0]}.csv`
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Payment Management</h1>
                <p className="text-sm text-gray-600">Track and manage all payments</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={exportPayments}>
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
                  <p className="text-sm font-medium text-gray-600">Total Payments</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalPayments}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">Avg: ₹{Math.round(stats.averageAmount)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completedPayments}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {stats.totalPayments > 0 ? Math.round((stats.completedPayments / stats.totalPayments) * 100) : 0}%
                success rate
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending/Failed</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingPayments + stats.failedPayments}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {stats.pendingPayments} pending, {stats.failedPayments} failed
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
                    placeholder="Search by student name, email, event, or transaction ID..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
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

        {/* Payments Table */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Payment Transactions</CardTitle>
            <CardDescription>
              Showing {filteredPayments.length} of {payments.length} payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>{payment.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{payment.studentName}</p>
                            <p className="text-sm text-gray-600">{payment.studentEmail}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.eventTitle}</p>
                          <p className="text-sm text-gray-600">{new Date(payment.eventDate).toLocaleDateString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">₹{payment.amount}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{getPaymentMethodIcon(payment.paymentMethod)}</span>
                          <span>{payment.paymentMethod}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.paymentStatus)}</TableCell>
                      <TableCell>
                        {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "N/A"}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedPayment(payment)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Payment Details</DialogTitle>
                              <DialogDescription>
                                Complete information for payment {selectedPayment?.id}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedPayment && (
                              <div className="space-y-6">
                                {/* Payment Info */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Payment Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Payment ID:</strong> {selectedPayment.id}
                                      </p>
                                      <p>
                                        <strong>Transaction ID:</strong> {selectedPayment.transactionId}
                                      </p>
                                      <p>
                                        <strong>Amount:</strong> ₹{selectedPayment.amount}
                                      </p>
                                      <p>
                                        <strong>Method:</strong> {selectedPayment.paymentMethod}
                                      </p>
                                      <p>
                                        <strong>Status:</strong> {getStatusBadge(selectedPayment.paymentStatus)}
                                      </p>
                                      <p>
                                        <strong>Payment Date:</strong>{" "}
                                        {selectedPayment.paymentDate
                                          ? new Date(selectedPayment.paymentDate).toLocaleString()
                                          : "N/A"}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Student Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p>
                                        <strong>Name:</strong> {selectedPayment.studentName}
                                      </p>
                                      <p>
                                        <strong>Email:</strong> {selectedPayment.studentEmail}
                                      </p>
                                      <p>
                                        <strong>Phone:</strong> {selectedPayment.studentPhone}
                                      </p>
                                      <p>
                                        <strong>Registration Date:</strong>{" "}
                                        {new Date(selectedPayment.registrationDate).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Event Info */}
                                <div>
                                  <h4 className="font-semibold mb-2">Event Information</h4>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p>
                                        <strong>Event:</strong> {selectedPayment.eventTitle}
                                      </p>
                                      <p>
                                        <strong>Date:</strong>{" "}
                                        {new Date(selectedPayment.eventDate).toLocaleDateString()}
                                      </p>
                                      <p>
                                        <strong>Venue:</strong> {selectedPayment.eventVenue}
                                      </p>
                                    </div>
                                    <div>
                                      <p>
                                        <strong>Special Requirements:</strong> {selectedPayment.specialRequirements}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Team Members */}
                                {selectedPayment.teamMembers && selectedPayment.teamMembers.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Team Members</h4>
                                    <div className="space-y-2">
                                      {selectedPayment.teamMembers.map((member: any, index: number) => (
                                        <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                                          <p>
                                            <strong>Name:</strong> {member.name}
                                          </p>
                                          <p>
                                            <strong>Roll Number:</strong> {member.rollNumber}
                                          </p>
                                          <p>
                                            <strong>Branch:</strong> {member.branch}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Emergency Contact */}
                                <div>
                                  <h4 className="font-semibold mb-2">Emergency Contact</h4>
                                  <div className="text-sm">
                                    <p>
                                      <strong>Name:</strong> {selectedPayment.emergencyContact.name}
                                    </p>
                                    <p>
                                      <strong>Phone:</strong> {selectedPayment.emergencyContact.phone}
                                    </p>
                                    <p>
                                      <strong>Relation:</strong> {selectedPayment.emergencyContact.relation}
                                    </p>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-4 border-t">
                                  <Button variant="outline" size="sm">
                                    <Mail className="w-4 h-4 mr-1" />
                                    Send Email
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Phone className="w-4 h-4 mr-1" />
                                    Call Student
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <FileText className="w-4 h-4 mr-1" />
                                    Generate Receipt
                                  </Button>
                                  {selectedPayment.paymentStatus === "failed" && (
                                    <Button variant="outline" size="sm" className="text-blue-600 bg-transparent">
                                      <RefreshCw className="w-4 h-4 mr-1" />
                                      Retry Payment
                                    </Button>
                                  )}
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
