// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface IEPFormProps {
  iep: any
  onSave: (iep: any) => void
  onCancel: () => void
}

export function IEPForm({ iep, onSave, onCancel }: IEPFormProps) {
  const [formData, setFormData] = useState({
    id: iep?.id || `new-${Date.now()}`,
    studentId: iep?.studentId || "",
    studentName: iep?.studentName || "",
    studentGrade: iep?.studentGrade || "",
    studentSection: iep?.studentSection || "",
    avatar: iep?.avatar || "/placeholder.svg?height=128&width=128",
    startDate: iep?.startDate || new Date().toISOString().split("T")[0],
    reviewDate: iep?.reviewDate || new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    endDate: iep?.endDate || new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: iep?.status || "active",
    primaryDisability: iep?.primaryDisability || "",
    accommodations: iep?.accommodations || [""],
    goals: iep?.goals || [],
    meetings: iep?.meetings || [],
    documents: iep?.documents || [],
    team: iep?.team || [],
  })

  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleAccommodationChange = (index: number, value: string) => {
    const updatedAccommodations = [...formData.accommodations]
    updatedAccommodations[index] = value
    handleChange("accommodations", updatedAccommodations)
  }

  const handleAddAccommodation = () => {
    handleChange("accommodations", [...formData.accommodations, ""])
  }

  const handleRemoveAccommodation = (index: number) => {
    const updatedAccommodations = [...formData.accommodations]
    updatedAccommodations.splice(index, 1)
    handleChange("accommodations", updatedAccommodations)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter out empty accommodations
    const filteredAccommodations = formData.accommodations.filter((a) => a.trim() !== "")
    onSave({
      ...formData,
      accommodations: filteredAccommodations,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">{iep ? "Edit IEP" : "Create New IEP"}</h2>
        </div>
        <Button onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Save IEP
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Student Name</label>
                  <Input
                    value={formData.studentName}
                    onChange={(e) => handleChange("studentName", e.target.value)}
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Grade</label>
                    <Select
                      value={formData.studentGrade}
                      onValueChange={(value) => handleChange("studentGrade", value)}
                    >
                      <SelectTrigger>
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
                        <SelectItem value="7">Grade 7</SelectItem>
                        <SelectItem value="8">Grade 8</SelectItem>
                        <SelectItem value="9">Grade 9</SelectItem>
                        <SelectItem value="10">Grade 10</SelectItem>
                        <SelectItem value="11">Grade 11</SelectItem>
                        <SelectItem value="12">Grade 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Section</label>
                    <Select
                      value={formData.studentSection}
                      onValueChange={(value) => handleChange("studentSection", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                        <SelectItem value="D">Section D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">IEP Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Review Date</label>
                  <Input
                    type="date"
                    value={formData.reviewDate}
                    onChange={(e) => handleChange("reviewDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="review-needed">Review Needed</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Disability</label>
                  <Select
                    value={formData.primaryDisability}
                    onValueChange={(value) => handleChange("primaryDisability", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select disability category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Specific Learning Disability">Specific Learning Disability</SelectItem>
                      <SelectItem value="Other Health Impairment">Other Health Impairment</SelectItem>
                      <SelectItem value="Autism Spectrum Disorder">Autism Spectrum Disorder</SelectItem>
                      <SelectItem value="Emotional Disturbance">Emotional Disturbance</SelectItem>
                      <SelectItem value="Speech or Language Impairment">Speech or Language Impairment</SelectItem>
                      <SelectItem value="Visual Impairment">Visual Impairment</SelectItem>
                      <SelectItem value="Deafness">Deafness</SelectItem>
                      <SelectItem value="Hearing Impairment">Hearing Impairment</SelectItem>
                      <SelectItem value="Deaf-Blindness">Deaf-Blindness</SelectItem>
                      <SelectItem value="Orthopedic Impairment">Orthopedic Impairment</SelectItem>
                      <SelectItem value="Intellectual Disability">Intellectual Disability</SelectItem>
                      <SelectItem value="Traumatic Brain Injury">Traumatic Brain Injury</SelectItem>
                      <SelectItem value="Multiple Disabilities">Multiple Disabilities</SelectItem>
                      <SelectItem value="ADHD">ADHD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Accommodations & Modifications</h3>
                <Button type="button" variant="outline" size="sm" onClick={handleAddAccommodation}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>

              {formData.accommodations.map((accommodation, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Textarea
                    value={accommodation}
                    onChange={(e) => handleAccommodationChange(index, e.target.value)}
                    placeholder="Describe accommodation or modification"
                    className="flex-1"
                  />
                  {formData.accommodations.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAccommodation(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
