//"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Save, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Import the uploadFile function at the top of the file
import { uploadFile } from "@/lib/supabase-storage"
import { useToast } from "@/components/ui/use-toast"

interface StudentFormProps {
  student?: any
  onSave: (student: any) => void
  onCancel: () => void
}

export function StudentForm({ student, onSave, onCancel }: StudentFormProps) {
  const isEditing = !!student

  // Add the toast hook inside the StudentForm component
  const { toast } = useToast()

  // Add a new state for avatar upload
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Add a file input ref
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    id: student?.id || `new-${Date.now()}`,
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    gender: student?.gender || "male",
    grade: student?.grade || "5",
    section: student?.section || "A",
    dateOfBirth: student?.dateOfBirth || "",
    guardianName: student?.guardianName || "",
    guardianEmail: student?.guardianEmail || "",
    guardianPhone: student?.guardianPhone || "",
    address: student?.address || "",
    allergies: student?.allergies || "",
    emergencyContact: student?.emergencyContact || "",
    notes: student?.notes || "",
    avatar:
      student?.avatar ||
      `/placeholder.svg?height=128&width=128&text=${student?.firstName?.charAt(0) || ""}${student?.lastName?.charAt(0) || ""}`,
  })

  const [date, setDate] = useState<Date | undefined>(formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })

    // Update avatar if first or last name changes
    if (name === "firstName" || name === "lastName") {
      const firstInitial = name === "firstName" ? value.charAt(0) : formData.firstName.charAt(0)
      const lastInitial = name === "lastName" ? value.charAt(0) : formData.lastName.charAt(0)
      setFormData({
        ...formData,
        [name]: value,
        avatar: `/placeholder.svg?height=128&width=128&text=${firstInitial}${lastInitial}`,
      })
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      setFormData({
        ...formData,
        dateOfBirth: format(date, "yyyy-MM-dd"),
      })
    }
  }

  // Add a function to handle avatar file selection
  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0])

      // Create a preview
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({
            ...formData,
            avatar: event.target.result as string,
          })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  // Modify the handleSubmit function to upload the avatar if selected
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // If there's an avatar file, upload it to Supabase Storage
      if (avatarFile) {
        setIsUploading(true)
        const result = await uploadFile(avatarFile, "avatar", `students/${formData.id}`)
        setFormData({
          ...formData,
          avatar: result.url,
        })
        setIsUploading(false)
      }

      // Save the student data with the new avatar URL
      onSave(formData)
    } catch (error) {
      setIsUploading(false)
      toast({
        title: "Error uploading avatar",
        description: "There was a problem uploading the avatar image.",
        variant: "destructive",
      })
      console.error("Error uploading avatar:", error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle>{isEditing ? "Edit Student" : "Add New Student"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            {/* Add an avatar upload section to the form, right after the grid with firstName and lastName */}
            {/* Add this after the firstName/lastName grid and before the gender/grade/section grid */}
            <div className="flex items-center justify-center my-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={formData.avatar || "/placeholder.svg"}
                    alt={`${formData.firstName} ${formData.lastName}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarSelect}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-3">
                <Label htmlFor="gender">Gender</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                  className="flex"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">
                      Female
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="grade">Grade</Label>
                <Select value={formData.grade} onValueChange={(value) => handleSelectChange("grade", value)}>
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="K">Kindergarten</SelectItem>
                    <SelectItem value="1">Grade 1</SelectItem>
                    <SelectItem value="2">Grade 2</SelectItem>
                    <SelectItem value="3">Grade 3</SelectItem>
                    <SelectItem value="4">Grade 4</SelectItem>
                    <SelectItem value="5">Grade 5</SelectItem>
                    <SelectItem value="6">Grade 6</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="section">Section</Label>
                <Select value={formData.section} onValueChange={(value) => handleSelectChange("section", value)}>
                  <SelectTrigger id="section">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={handleDateSelect}/>
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-3">
              <h3 className="text-lg font-medium">Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="guardianName">Guardian Name</Label>
                  <Input
                    id="guardianName"
                    name="guardianName"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    placeholder="Enter guardian name"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="guardianPhone">Guardian Phone</Label>
                  <Input
                    id="guardianPhone"
                    name="guardianPhone"
                    value={formData.guardianPhone}
                    onChange={handleInputChange}
                    placeholder="Enter guardian phone"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="guardianEmail">Guardian Email</Label>
                <Input
                  id="guardianEmail"
                  name="guardianEmail"
                  type="email"
                  value={formData.guardianEmail}
                  onChange={handleInputChange}
                  placeholder="Enter guardian email"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>

            <div className="grid gap-3">
              <h3 className="text-lg font-medium">Medical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Input
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    placeholder="Enter allergies or 'None'"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Name, Phone Number"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Enter any additional notes about the student"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          {/* Update the Button in CardFooter to show loading state */}
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <span className="animate-spin mr-2">◌</span> Uploading...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" /> {isEditing ? "Save Changes" : "Add Student"}
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
