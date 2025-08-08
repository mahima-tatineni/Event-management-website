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
import { loginUser, getStudentProfile, getClubProfile } from "@/lib/auth"

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

      // Login with Supabase
      const { user, error } = await loginUser(formData.email, formData.password)

      if (error) {
        setError(error)
        setLoading(false)
        return
      }

      if (user) {
        // Get additional profile data based on role
        if (user.role === "student") {
          const { student } = await getStudentProfile(user.id)
          const userWithProfile = { ...user, student }
          localStorage.setItem("user", JSON.stringify(userWithProfile))
          router.push("/student/dashboard")
        } else if (user.role === "club") {
          const { club } = await getClubProfile(user.id)
          const userWithProfile = { ...user, club }
          localStorage.setItem("user", JSON.stringify(userWithProfile))
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 verve-pattern opacity-10" />
      
      {/* Gradient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 verve-animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 verve-animate-pulse-slow" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="verve-glass border-0 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 verve-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-black font-bold text-2xl">C</span>
            </div>
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">Sign in to your CampusHub Event Hub account</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="border-red-500/20 bg-red-500/10 mb-4">
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            {/* Admin Login Info */}
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center mb-2">
                <Shield className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-300">Admin Access</span>
              </div>
              <p className="text-xs text-blue-400">
                Email: admin@mlrit.ac.in
                <br />
                Password: Admin@1234
              </p>
            </div>

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-12 verve-button-outline mb-6"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Continue with Google
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-gray-400">Or sign in with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@mlrit.ac.in"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 h-12 verve-input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 h-12 verve-input"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-400">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-orange-400 hover:text-orange-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 verve-button-primary"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-orange-400 hover:text-orange-300 font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            {/* Test Credentials */}
            <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">Test Credentials:</h4>
              <div className="text-xs text-gray-400 space-y-1">
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
