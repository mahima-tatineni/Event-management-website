"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewEventPage() {
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    price: '',
    isTeamEvent: false,
    teamSize: '',
    teamPrice: '',
    maxCapacity: '',
    category: '',
    requirements: '',
    contactPerson: '',
    contactPhone: '',
    estimatedBudget: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== 'club') {
        router.push('/login')
        return
      }
      setUser(parsedUser)
    } else {
      router.push('/login')
    }
  }, [router])

  const categories = [
    'Technical',
    'Cultural',
    'Sports',
    'Workshop',
    'Seminar',
    'Competition',
    'Social',
    'Academic'
  ]

  const venues = [
    'Main Auditorium',
    'Seminar Hall 1',
    'Seminar Hall 2',
    'Lab 301',
    'Lab 302',
    'Open Ground',
    'Basketball Court',
    'Conference Room',
    'Library Hall'
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.venue || !formData.price) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (formData.isTeamEvent && (!formData.teamSize || !formData.teamPrice)) {
      setError('Please fill in team event details')
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock success
      alert('Event submitted for approval successfully!')
      router.push('/club/dashboard')
    } catch (err) {
      setError('Failed to submit event. Please try again.')
    } finally {
      setLoading(false)
    }
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
              <Link href="/club/dashboard" className="text-purple-600 hover:text-purple-700">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Create New Event</h1>
                <p className="text-sm text-gray-600">{user.clubName || user.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl">Event Details</CardTitle>
            <CardDescription>
              Fill in the details for your new event. All fields marked with * are required.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert className="border-red-200 bg-red-50 mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter event title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="h-12 border-gray-200 focus:border-purple-400"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleInputChange('category', value)} required>
                      <SelectTrigger className="h-12 border-gray-200 focus:border-purple-400">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your event in detail"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-[120px] border-gray-200 focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              {/* Date, Time & Venue */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Schedule & Venue</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Event Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue *</Label>
                    <Select onValueChange={(value) => handleInputChange('venue', value)} required>
                      <SelectTrigger className="h-12 border-gray-200 focus\
