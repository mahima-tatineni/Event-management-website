"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, User, Users, AlertCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [userType, setUserType] = useState<"student" | "club">("student")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollNo: "",
    department: "",
    year: "",
    phone: "",
  })

  const [clubData, setClubData] = useState({
    clubName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactPerson: "",
    phone: "",
    description: "",
  })

  const clubs = [
    // Central Clubs
    { value: "cie", label: "CIE", fullName: "Center for Innovation & Entrepreneurship", type: "central" },
    { value: "scope", label: "SCOPE", fullName: "Society of Computer Professionals & Engineers", type: "central" },
    { value: "literati", label: "Literati", fullName: "Literary & Debating Society", type: "central" },
    { value: "ewb", label: "EWB", fullName: "Engineers Without Borders", type: "central" },
    { value: "cam", label: "CAM", fullName: "Creative Arts & Media", type: "central" },

    // Departmental Clubs
    { value: "squad", label: "SQUAD", fullName: "Student Quality Assurance & Development", type: "departmental" },
    { value: "code", label: "CODE", fullName: "Computer Organization & Development Engineers", type: "departmental" },
    { value: "me", label: "ME", fullName: "Mechanical Engineers Club", type: "departmental" },
    { value: "akriti", label: "AKRITI", fullName: "Architecture & Design Club", type: "departmental" },
    { value: "robotics", label: "ROBOTICS", fullName: "Robotics & Automation Club", type: "departmental" },
    { value: "aim", label: "AIM", fullName: "Artificial Intelligence & Machine Learning", type: "departmental" },
  ]

  const departments = ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "CHEM", "BIOTECH"]
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validation
    if (!studentData.name || !studentData.email || !studentData.password || !studentData.rollNo) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    if (studentData.password !== studentData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (studentData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store user in database
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")

      // Check if user with same email or roll number already exists
      const userExists = existingUsers.some(
        (user: any) =>
          (user.email === studentData.email && user.role === "student") ||
          (user.rollNo === studentData.rollNo && user.role === "student"),
      )

      if (userExists) {
        setError("User with this email or roll number already exists. Please log in.")
        setLoading(false)
        router.push("/login") // Redirect to login page
        return
      }

      const newUser = {
        ...studentData,
        role: "student",
        id: Date.now(),
        createdAt: new Date().toISOString(),
      }
      existingUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(existingUsers))

      // Also store in current session
      localStorage.setItem("user", JSON.stringify(newUser))

      alert("Registration successful! Welcome to CampusHub!")
      router.push("/student/dashboard")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClubSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validation
    if (!clubData.clubName || !clubData.email || !clubData.password || !clubData.contactPerson) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    if (clubData.password !== clubData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (clubData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store club in database
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const newUser = {
        ...clubData,
        role: "club",
        id: Date.now(),
        createdAt: new Date().toISOString(),
      }
      existingUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(existingUsers))

      // Also store in current session
      localStorage.setItem("user", JSON.stringify(newUser))

      alert("Club registration successful! Welcome to CampusHub!")
      router.push("/club/dashboard")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join CampusHub</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-md">
          <CardHeader>
            <Tabs
              value={userType}
              onValueChange={(value) => setUserType(value as "student" | "club")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="club" className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Club
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="border-red-200 bg-red-50 mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <Tabs value={userType} className="w-full">
              <TabsContent value="student">
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Full Name *</Label>
                      <Input
                        id="student-name"
                        placeholder="Enter your full name"
                        value={studentData.name}
                        onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                        className="h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-roll">Roll Number *</Label>
                      <Input
                        id="student-roll"
                        placeholder="e.g., 21CS001"
                        value={studentData.rollNo}
                        onChange={(e) => setStudentData({ ...studentData, rollNo: e.target.value })}
                        className="h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-email">Email Address *</Label>
                    <Input
                      id="student-email"
                      type="email"
                      placeholder="your.email@mlrit.ac.in"
                      value={studentData.email}
                      onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
                      className="h-12 border-gray-200 focus:border-purple-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-department">Department</Label>
                      <Select onValueChange={(value) => setStudentData({ ...studentData, department: value })}>
                        <SelectTrigger className="h-12 border-gray-200 focus:border-purple-400">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-year">Year</Label>
                      <Select onValueChange={(value) => setStudentData({ ...studentData, year: value })}>
                        <SelectTrigger className="h-12 border-gray-200 focus:border-purple-400">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-phone">Phone Number</Label>
                    <Input
                      id="student-phone"
                      placeholder="+91 9876543210"
                      value={studentData.phone}
                      onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
                      className="h-12 border-gray-200 focus:border-purple-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="student-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={studentData.password}
                          onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
                          className="h-12 border-gray-200 focus:border-purple-400 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-confirm-password">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="student-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={studentData.confirmPassword}
                          onChange={(e) => setStudentData({ ...studentData, confirmPassword: e.target.value })}
                          className="h-12 border-gray-200 focus:border-purple-400 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg font-semibold"
                  >
                    {loading ? "Creating Account..." : "Create Student Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="club">
                <form onSubmit={handleClubSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="club-select">Select Club *</Label>
                    <Select
                      onValueChange={(value) => {
                        const selectedClub = clubs.find((club) => club.value === value)
                        if (selectedClub) {
                          setClubData({
                            ...clubData,
                            clubName: selectedClub.label,
                            fullName: selectedClub.fullName,
                          })
                        }
                      }}
                    >
                      <SelectTrigger className="h-12 border-gray-200 focus:border-purple-400">
                        <SelectValue placeholder="Choose your club" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1 text-sm font-semibold text-purple-600">Central Clubs</div>
                        {clubs
                          .filter((club) => club.type === "central")
                          .map((club) => (
                            <SelectItem key={club.value} value={club.value}>
                              <div>
                                <div className="font-medium">{club.label}</div>
                                <div className="text-xs text-gray-500">{club.fullName}</div>
                              </div>
                            </SelectItem>
                          ))}
                        <div className="px-2 py-1 text-sm font-semibold text-purple-600 mt-2">Departmental Clubs</div>
                        {clubs
                          .filter((club) => club.type === "departmental")
                          .map((club) => (
                            <SelectItem key={club.value} value={club.value}>
                              <div>
                                <div className="font-medium">{club.label}</div>
                                <div className="text-xs text-gray-500">{club.fullName}</div>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="club-email">Club Email *</Label>
                    <Input
                      id="club-email"
                      type="email"
                      placeholder="club@mlrit.ac.in"
                      value={clubData.email}
                      onChange={(e) => setClubData({ ...clubData, email: e.target.value })}
                      className="h-12 border-gray-200 focus:border-purple-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-person">Contact Person *</Label>
                      <Input
                        id="contact-person"
                        placeholder="Faculty coordinator name"
                        value={clubData.contactPerson}
                        onChange={(e) => setClubData({ ...clubData, contactPerson: e.target.value })}
                        className="h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="club-phone">Contact Phone</Label>
                      <Input
                        id="club-phone"
                        placeholder="+91 9876543210"
                        value={clubData.phone}
                        onChange={(e) => setClubData({ ...clubData, phone: e.target.value })}
                        className="h-12 border-gray-200 focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="club-description">Club Description</Label>
                    <Input
                      id="club-description"
                      placeholder="Brief description of your club"
                      value={clubData.description}
                      onChange={(e) => setClubData({ ...clubData, description: e.target.value })}
                      className="h-12 border-gray-200 focus:border-purple-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="club-password">Password *</Label>
                      <div className="relative">
                        <Input
                          id="club-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={clubData.password}
                          onChange={(e) => setClubData({ ...clubData, password: e.target.value })}
                          className="h-12 border-gray-200 focus:border-purple-400 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="club-confirm-password">Confirm Password *</Label>
                      <div className="relative">
                        <Input
                          id="club-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={clubData.confirmPassword}
                          onChange={(e) => setClubData({ ...clubData, confirmPassword: e.target.value })}
                          className="h-12 border-gray-200 focus:border-purple-400 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg font-semibold"
                  >
                    {loading ? "Creating Account..." : "Create Club Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
