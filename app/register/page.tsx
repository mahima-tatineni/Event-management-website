"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, User, Phone, Building, ArrowLeft, Upload, Chrome } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("student")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    // Student specific
    rollNo: "",
    department: "",
    year: "",
    branch: "",
    // Club specific
    clubName: "",
    description: "",
    venue: "",
    socialLinks: {
      instagram: "",
      facebook: "",
      twitter: "",
      linkedin: "",
    },
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const departments = [
    "Computer Science Engineering",
    "Electronics & Communication Engineering",
    "Electrical & Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Information Technology",
    "Chemical Engineering",
  ]

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("socialLinks.")) {
      const socialField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate MLRIT domain
    if (!formData.email.endsWith("@mlrit.ac.in")) {
      setError("Please use your MLRIT email address (@mlrit.ac.in)")
      setLoading(false)
      return
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock registration success
      const userData = {
        email: formData.email,
        role: activeTab,
        name: formData.name,
        ...(activeTab === "student" && {
          rollNo: formData.rollNo,
          department: formData.department,
          year: formData.year,
          branch: formData.branch,
        }),
        ...(activeTab === "club" && {
          clubName: formData.clubName,
          description: formData.description,
          venue: formData.venue,
          socialLinks: formData.socialLinks,
        }),
      }

      localStorage.setItem("user", JSON.stringify(userData))

      // Redirect based on role
      if (activeTab === "student") {
        router.push("/student/dashboard")
      } else {
        router.push("/club/dashboard")
      }
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    setError("")
    alert("Google OAuth integration would be implemented here with @mlrit.ac.in domain restriction")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Join MLRIT Event Hub</CardTitle>
            <CardDescription className="text-gray-600">Create your account to get started</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">Student</TabsTrigger>
                <TabsTrigger value="club">Club</TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="border-red-200 bg-red-50 mt-4">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <div className="mt-6">
                <Button
                  onClick={handleGoogleSignup}
                  variant="outline"
                  className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or register with email</span>
                  </div>
                </div>
              </div>

              <TabsContent value="student" className="space-y-4 mt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="student-name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-roll">Roll Number</Label>
                      <Input
                        id="student-roll"
                        placeholder="e.g., 21A91A0501"
                        value={formData.rollNo}
                        onChange={(e) => handleInputChange("rollNo", e.target.value)}
                        className="h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-dept">Department</Label>
                      <Select onValueChange={(value) => handleInputChange("department", value)} required>
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
                      <Select onValueChange={(value) => handleInputChange("year", value)} required>
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
                    <Label htmlFor="student-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="student-email"
                        type="email"
                        placeholder="your.email@mlrit.ac.in"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="student-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="student-password"
                          type="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="student-confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Student Account"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="club" className="space-y-4 mt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="club-name">Club Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="club-name"
                          placeholder="Enter club name"
                          value={formData.clubName}
                          onChange={(e) => handleInputChange("clubName", e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="club-contact-name">Contact Person Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="club-contact-name"
                          placeholder="Contact person name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="club-description">Club Description</Label>
                    <Textarea
                      id="club-description"
                      placeholder="Describe your club's mission and activities"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="min-h-[100px] border-gray-200 focus:border-purple-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="club-venue">Workspace/Venue</Label>
                    <Input
                      id="club-venue"
                      placeholder="e.g., Room 301, CSE Block"
                      value={formData.venue}
                      onChange={(e) => handleInputChange("venue", e.target.value)}
                      className="h-12 border-gray-200 focus:border-purple-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="club-email">Official Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="club-email"
                        type="email"
                        placeholder="club.email@mlrit.ac.in"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="club-phone">Contact Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="club-phone"
                        type="tel"
                        placeholder="Contact phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Social Media Links (Optional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Instagram URL"
                        value={formData.socialLinks.instagram}
                        onChange={(e) => handleInputChange("socialLinks.instagram", e.target.value)}
                        className="h-12 border-gray-200 focus:border-purple-400"
                      />
                      <Input
                        placeholder="Facebook URL"
                        value={formData.socialLinks.facebook}
                        onChange={(e) => handleInputChange("socialLinks.facebook", e.target.value)}
                        className="h-12 border-gray-200 focus:border-purple-400"
                      />
                      <Input
                        placeholder="Twitter URL"
                        value={formData.socialLinks.twitter}
                        onChange={(e) => handleInputChange("socialLinks.twitter", e.target.value)}
                        className="h-12 border-gray-200 focus:border-purple-400"
                      />
                      <Input
                        placeholder="LinkedIn URL"
                        value={formData.socialLinks.linkedin}
                        onChange={(e) => handleInputChange("socialLinks.linkedin", e.target.value)}
                        className="h-12 border-gray-200 focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="club-logo">Club Logo</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-purple-300 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="club-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="club-password"
                          type="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="club-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="club-confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Club Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
