"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, ArrowLeft, Chrome, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check for admin credentials
      if (formData.email === "admin@mlrit.ac.in" && formData.password === "Admin@1234") {
        const adminData = {
          email: formData.email,
          role: "admin",
          name: "Administrator",
        }
        localStorage.setItem("user", JSON.stringify(adminData))
        router.push("/admin/dashboard")
        return
      }

      // Validate MLRIT domain for regular users
      if (!formData.email.endsWith("@mlrit.ac.in")) {
        setError("Please use your MLRIT email address (@mlrit.ac.in)")
        setLoading(false)
        return
      }

      // Mock login for students and clubs
      // In a real app, this would be an API call
      const mockUsers = [
        {
          email: "student@mlrit.ac.in",
          password: "password123",
          role: "student",
          name: "John Doe",
          rollNo: "21A91A0501",
          department: "Computer Science Engineering",
          year: "3rd Year",
        },
        {
          email: "club@mlrit.ac.in",
          password: "password123",
          role: "club",
          name: "Tech Club",
          clubName: "CIE Club",
          description: "Center for Innovation and Entrepreneurship",
        },
      ]

      const user = mockUsers.find((u) => u.email === formData.email && u.password === formData.password)

      if (user) {
        localStorage.setItem("user", JSON.stringify(user))

        // Redirect based on role
        if (user.role === "student") {
          router.push("/student/dashboard")
        } else if (user.role === "club") {
          router.push("/club/dashboard")
        }
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    setError("")
    alert("Google OAuth integration would be implemented here with @mlrit.ac.in domain restriction")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">Sign in to your MLRIT Event Hub account</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="border-red-200 bg-red-50 mb-4">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {/* Admin Login Info */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Shield className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Admin Access</span>
              </div>
              <p className="text-xs text-blue-700">
                Email: admin@mlrit.ac.in
                <br />
                Password: Admin@1234
              </p>
            </div>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent mb-6"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or sign in with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Test Credentials */}
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Test Credentials:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong>Student:</strong> student@mlrit.ac.in / password123
                </p>
                <p>
                  <strong>Club:</strong> club@mlrit.ac.in / password123
                </p>
                <p>
                  <strong>Admin:</strong> admin@mlrit.ac.in / Admin@1234
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
