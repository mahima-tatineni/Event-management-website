"use client"

import { FileText, Download, BarChart3, Home, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ClubReportsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "club") {
        router.push("/login")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/login")
    }
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  // Mock data for reports
  const reportsData = [
    {
      id: 1,
      title: "Q1 2024 Event Performance Report",
      date: "2024-04-01",
      status: "Generated",
      summary: {
        totalEvents: 10,
        totalRevenue: 120000,
        totalParticipants: 2000,
      },
      downloadLink: "#",
    },
    {
      id: 2,
      title: "Annual Report 2023",
      date: "2024-01-15",
      status: "Generated",
      summary: {
        totalEvents: 35,
        totalRevenue: 450000,
        totalParticipants: 8000,
      },
      downloadLink: "#",
    },
    {
      id: 3,
      title: "Hackathon 2024 Post-Event Analysis",
      date: "2024-02-20",
      status: "Pending",
      summary: {
        totalEvents: 1,
        totalRevenue: 36750,
        totalParticipants: 245,
      },
      downloadLink: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Club Reports</h1>
                <p className="text-sm text-gray-600">{user.clubName || user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/club/dashboard">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - simplified for reports page */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">Reports Overview</CardTitle>
                <CardDescription>Generate and manage your club's event reports.</CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Link href="/club/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/club/analytics">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                  </Link>
                  <Link href="/club/reports">
                    <Button variant="ghost" className="w-full justify-start bg-purple-50 text-purple-700">
                      <FileText className="w-4 h-4 mr-2" />
                      Reports
                    </Button>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-end">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="w-4 h-4 mr-2" /> Generate New Report
              </Button>
            </div>

            <div className="space-y-6">
              {reportsData.map((report) => (
                <Card key={report.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{report.title}</h3>
                        <p className="text-sm text-gray-600">
                          Generated on: {new Date(report.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={report.status === "Generated" ? "default" : "secondary"}>{report.status}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-xl font-bold text-blue-600">{report.summary.totalEvents}</p>
                        <p className="text-sm text-blue-600">Events</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-xl font-bold text-green-600">
                          ₹{report.summary.totalRevenue.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-600">Revenue</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-xl font-bold text-purple-600">{report.summary.totalParticipants}</p>
                        <p className="text-sm text-purple-600">Participants</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" disabled={report.status === "Pending"}>
                        View Details
                      </Button>
                      <Button size="sm" disabled={report.status === "Pending"}>
                        <Download className="w-4 h-4 mr-2" /> Download Report
                      </Button>
                      {report.status === "Pending" && (
                        <Button variant="secondary" size="sm" disabled>
                          Processing...
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
