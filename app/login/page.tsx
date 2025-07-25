"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, ArrowLeft, Chrome } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate MLRIT domain
    if (!email.endsWith("@mlrit.ac.in")) {
      setError("Please use your MLRIT email address (@mlrit.ac.in)")
      setLoading(false)
      return
    }

    // Mock authentication logic
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Fixed admin credentials
      if (email === "admin@mlrit.ac.in" && password === "Admin@1234") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: "admin@mlrit.ac.in",
            role: "admin",
            name: "System Administrator",
          }),
        )
        router.push("/admin/dashboard")
        return
      }

      // Mock club login
      if (email === "mlritcie@mlrit.ac.in" && password === "password123") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: "mlritcie@mlrit.ac.in",
            role: "club",
            name: "Computer Science Club",
            clubName: "CSE Club",
          }),
        )
        router.push("/club/dashboard")
        return
      }

      // Mock student login
      if (email.endsWith("@mlrit.ac.in") && password === "student123") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: email,
            role: "student",
            name: "Student User",
            rollNo: "21A91A0501",
          }),
        )
        router.push("/student/dashboard")
        return
      }

      setError("Invalid credentials. Please try again.")
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    setError("")
    // Mock Google OAuth
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
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="login">Login</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-700">{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@mlrit.ac.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="text-center space-y-2">
                  <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                    Forgot your password?
                  </Link>
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Demo Credentials:</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>
                  <strong>Admin:</strong> admin@mlrit.ac.in / Admin@1234
                </p>
                <p>
                  <strong>Club:</strong> mlritcie@mlrit.ac.in / password123
                </p>
                <p>
                  <strong>Student:</strong> any@mlrit.ac.in / student123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
