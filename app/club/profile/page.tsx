"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Upload,
  Save,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ClubMember {
  id: number
  name: string
  year: string
  department: string
  rollNumber: string
  designation: string
  email: string
  phone: string
  joinDate: string
  isActive: boolean
}

export default function ClubProfile() {
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const router = useRouter()

  const [clubProfile, setClubProfile] = useState({
    name: "CIE",
    fullName: "Center for Innovation & Entrepreneurship",
    description:
      "Fostering innovation and entrepreneurship among students through workshops, competitions, and mentorship programs.",
    email: "cie@mlrit.ac.in",
    phone: "+91 40 1234 5678",
    workspace: "Innovation Lab, Block A, 3rd Floor",
    establishedYear: "2018",
    logo: "/placeholder.svg?height=100&width=100",
    socialMedia: {
      website: "https://cie.mlrit.ac.in",
      facebook: "https://facebook.com/cie.mlrit",
      twitter: "https://twitter.com/cie_mlrit",
      instagram: "https://instagram.com/cie_mlrit",
      linkedin: "https://linkedin.com/company/cie-mlrit",
    },
    flagshipEvents: [
      { name: "Innovation Challenge", year: "2024", description: "Annual innovation competition" },
      { name: "Startup Bootcamp", year: "2023", description: "Intensive entrepreneurship program" },
    ],
  })

  const [members, setMembers] = useState<ClubMember[]>([
    {
      id: 1,
      name: "Rahul Sharma",
      year: "4th Year",
      department: "CSE",
      rollNumber: "20CS001",
      designation: "President",
      email: "rahul.sharma@mlrit.ac.in",
      phone: "+91 9876543210",
      joinDate: "2023-08-01",
      isActive: true,
    },
    {
      id: 2,
      name: "Priya Patel",
      year: "3rd Year",
      department: "ECE",
      rollNumber: "21EC015",
      designation: "Vice President",
      email: "priya.patel@mlrit.ac.in",
      phone: "+91 9876543211",
      joinDate: "2023-08-01",
      isActive: true,
    },
    {
      id: 3,
      name: "Arjun Kumar",
      year: "3rd Year",
      department: "CSE",
      rollNumber: "21CS032",
      designation: "Technical Lead",
      email: "arjun.kumar@mlrit.ac.in",
      phone: "+91 9876543212",
      joinDate: "2023-09-15",
      isActive: true,
    },
    {
      id: 4,
      name: "Sneha Reddy",
      year: "2nd Year",
      department: "IT",
      rollNumber: "22IT008",
      designation: "Event Coordinator",
      email: "sneha.reddy@mlrit.ac.in",
      phone: "+91 9876543213",
      joinDate: "2024-01-10",
      isActive: true,
    },
  ])

  const [newMember, setNewMember] = useState<Partial<ClubMember>>({
    name: "",
    year: "",
    department: "",
    rollNumber: "",
    designation: "",
    email: "",
    phone: "",
    isActive: true,
  })

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

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleAddMember = () => {
    if (newMember.name && newMember.rollNumber && newMember.designation) {
      const member: ClubMember = {
        id: Date.now(),
        name: newMember.name!,
        year: newMember.year!,
        department: newMember.department!,
        rollNumber: newMember.rollNumber!,
        designation: newMember.designation!,
        email: newMember.email!,
        phone: newMember.phone!,
        joinDate: new Date().toISOString().split("T")[0],
        isActive: true,
      }
      setMembers([...members, member])
      setNewMember({
        name: "",
        year: "",
        department: "",
        rollNumber: "",
        designation: "",
        email: "",
        phone: "",
        isActive: true,
      })
      setShowAddMember(false)
      alert("Member added successfully!")
    }
  }

  const handleRemoveMember = (memberId: number) => {
    if (confirm("Are you sure you want to remove this member?")) {
      setMembers(members.filter((member) => member.id !== memberId))
    }
  }

  const boardMembers = members.filter((member) =>
    ["President", "Vice President", "Secretary", "Treasurer"].includes(member.designation),
  )

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
                <h1 className="text-xl font-bold text-gray-800">Club Profile</h1>
                <p className="text-sm text-gray-600">{clubProfile.name}</p>
              </div>
            </div>
            <Button
              onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Club Profile</TabsTrigger>
            <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
            <TabsTrigger value="board">Board Members</TabsTrigger>
            <TabsTrigger value="events">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Basic Information */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clubName">Club Name</Label>
                        <Input
                          id="clubName"
                          value={clubProfile.name}
                          onChange={(e) => setClubProfile({ ...clubProfile, name: e.target.value })}
                          disabled={!isEditing}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="establishedYear">Established Year</Label>
                        <Input
                          id="establishedYear"
                          value={clubProfile.establishedYear}
                          onChange={(e) => setClubProfile({ ...clubProfile, establishedYear: e.target.value })}
                          disabled={!isEditing}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={clubProfile.fullName}
                        onChange={(e) => setClubProfile({ ...clubProfile, fullName: e.target.value })}
                        disabled={!isEditing}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={clubProfile.description}
                        onChange={(e) => setClubProfile({ ...clubProfile, description: e.target.value })}
                        disabled={!isEditing}
                        className="min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={clubProfile.email}
                            onChange={(e) => setClubProfile({ ...clubProfile, email: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone"
                            value={clubProfile.phone}
                            onChange={(e) => setClubProfile({ ...clubProfile, phone: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workspace">Workspace Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="workspace"
                          value={clubProfile.workspace}
                          onChange={(e) => setClubProfile({ ...clubProfile, workspace: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm mt-6">
                  <CardHeader>
                    <CardTitle>Social Media & Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="website"
                            value={clubProfile.socialMedia.website}
                            onChange={(e) =>
                              setClubProfile({
                                ...clubProfile,
                                socialMedia: { ...clubProfile.socialMedia, website: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook</Label>
                        <div className="relative">
                          <Facebook className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="facebook"
                            value={clubProfile.socialMedia.facebook}
                            onChange={(e) =>
                              setClubProfile({
                                ...clubProfile,
                                socialMedia: { ...clubProfile.socialMedia, facebook: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram</Label>
                        <div className="relative">
                          <Instagram className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="instagram"
                            value={clubProfile.socialMedia.instagram}
                            onChange={(e) =>
                              setClubProfile({
                                ...clubProfile,
                                socialMedia: { ...clubProfile.socialMedia, instagram: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="linkedin"
                            value={clubProfile.socialMedia.linkedin}
                            onChange={(e) =>
                              setClubProfile({
                                ...clubProfile,
                                socialMedia: { ...clubProfile.socialMedia, linkedin: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Logo and Quick Stats */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Club Logo</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Avatar className="w-32 h-32 mx-auto mb-4">
                      <AvatarImage src={clubProfile.logo || "/placeholder.svg"} />
                      <AvatarFallback className="text-4xl">{clubProfile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Members</span>
                      <span className="font-semibold">{members.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Members</span>
                      <span className="font-semibold">{members.filter((m) => m.isActive).length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Board Members</span>
                      <span className="font-semibold">{boardMembers.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Established</span>
                      <span className="font-semibold">{clubProfile.establishedYear}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Club Members</CardTitle>
                    <CardDescription>Manage your club members and their details</CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowAddMember(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showAddMember && (
                  <Card className="mb-6 border-purple-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="memberName">Name *</Label>
                          <Input
                            id="memberName"
                            value={newMember.name}
                            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                            placeholder="Enter full name"
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rollNumber">Roll Number *</Label>
                          <Input
                            id="rollNumber"
                            value={newMember.rollNumber}
                            onChange={(e) => setNewMember({ ...newMember, rollNumber: e.target.value })}
                            placeholder="e.g., 21CS001"
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year">Year</Label>
                          <Select onValueChange={(value) => setNewMember({ ...newMember, year: value })}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1st Year">1st Year</SelectItem>
                              <SelectItem value="2nd Year">2nd Year</SelectItem>
                              <SelectItem value="3rd Year">3rd Year</SelectItem>
                              <SelectItem value="4th Year">4th Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select onValueChange={(value) => setNewMember({ ...newMember, department: value })}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CSE">CSE</SelectItem>
                              <SelectItem value="ECE">ECE</SelectItem>
                              <SelectItem value="EEE">EEE</SelectItem>
                              <SelectItem value="MECH">MECH</SelectItem>
                              <SelectItem value="CIVIL">CIVIL</SelectItem>
                              <SelectItem value="IT">IT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="designation">Designation *</Label>
                          <Select onValueChange={(value) => setNewMember({ ...newMember, designation: value })}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select designation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="President">President</SelectItem>
                              <SelectItem value="Vice President">Vice President</SelectItem>
                              <SelectItem value="Secretary">Secretary</SelectItem>
                              <SelectItem value="Treasurer">Treasurer</SelectItem>
                              <SelectItem value="Technical Lead">Technical Lead</SelectItem>
                              <SelectItem value="Event Coordinator">Event Coordinator</SelectItem>
                              <SelectItem value="Marketing Head">Marketing Head</SelectItem>
                              <SelectItem value="Member">Member</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="memberEmail">Email</Label>
                          <Input
                            id="memberEmail"
                            type="email"
                            value={newMember.email}
                            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                            placeholder="email@mlrit.ac.in"
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="memberPhone">Phone</Label>
                          <Input
                            id="memberPhone"
                            value={newMember.phone}
                            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                            placeholder="+91 9876543210"
                            className="h-12"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <Button onClick={handleAddMember} className="bg-green-600 hover:bg-green-700">
                          Add Member
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddMember(false)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.rollNumber}</TableCell>
                        <TableCell>{member.year}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              ["President", "Vice President", "Secretary", "Treasurer"].includes(member.designation)
                                ? "default"
                                : "secondary"
                            }
                          >
                            {member.designation}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={member.isActive ? "default" : "secondary"}>
                            {member.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="board" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boardMembers.map((member) => (
                <Card key={member.id} className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      <AvatarFallback className="text-2xl">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.designation}</CardDescription>
                    <Badge variant="default" className="mt-2">
                      {member.year} - {member.department}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Roll Number:</span>
                        <span className="font-medium">{member.rollNumber}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-xs">{member.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{member.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Joined:</span>
                        <span className="font-medium">{new Date(member.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Past Events & Flagship Events</CardTitle>
                <CardDescription>History of events organized by the club</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Flagship Events</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {clubProfile.flagshipEvents.map((event, index) => (
                        <Card key={index} className="border-purple-200">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-purple-700">{event.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                            <Badge variant="outline" className="mt-2">
                              {event.year}
                            </Badge>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
                    <div className="space-y-4">
                      <Card className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">Hackathon 2024</h4>
                              <p className="text-sm text-gray-600">48-hour coding competition</p>
                              <p className="text-xs text-gray-500 mt-1">January 28, 2024</p>
                            </div>
                            <div className="text-right">
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                              <p className="text-sm font-medium mt-1">120 participants</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">AI Workshop</h4>
                              <p className="text-sm text-gray-600">Introduction to Machine Learning</p>
                              <p className="text-xs text-gray-500 mt-1">January 15, 2024</p>
                            </div>
                            <div className="text-right">
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                Completed
                              </Badge>
                              <p className="text-sm font-medium mt-1">85 participants</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
