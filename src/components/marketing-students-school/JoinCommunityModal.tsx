'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Loader2, X, Check, Users } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/utils/cn'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  fullName: string
  email: string
  age: string
  location: string
  raceEthnicity: string
  yearGroup: string

  industry: string
  pathway: string

  firstInFamilyToAttendUni: string
  receivedFreeSchoolMeals: string
  careExperience: string
  homePostcode: string
}

type Status = 'idle' | 'success' | 'error'

type Community = {
  id: string
  name: string
  badgeLeft?: string
  badgeRight?: string
  filled?: boolean
  whatsappLink?: string
}

const JoinCommunityModal = ({ open, onOpenChange }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    age: '',
    location: '',
    raceEthnicity: '',
    yearGroup: '',

    industry: '',
    pathway: '',

    firstInFamilyToAttendUni: 'Prefer not to say',
    receivedFreeSchoolMeals: 'Prefer not to say',
    careExperience: 'Prefer not to say',
    homePostcode: '',
  })

  const [submitStatus, setSubmitStatus] = useState<Status>('idle')
  const [communityModalOpen, setCommunityModalOpen] = useState(false)

  const communities: Community[] = useMemo(
    () => [
      {
        id: 'c2',
        name: 'Community 1',
        badgeLeft: 'Active',
        badgeRight: 'Most popular',
        filled: false,
        whatsappLink: 'https://chat.whatsapp.com/EuKQPgsyLF22yy1IbcH9Zn',
      },
    ],
    []
  )

  const mutation = useMutation({
    mutationFn: async (payload: {
      fullName: string
      email: string
      age: number
      location: string
      raceEthnicity: string
      yearGroup: string
      industry: string
      pathway: string
      firstInFamilyToAttendUni: string
      receivedFreeSchoolMeals: string
      careExperience: string
      homePostcode: string
      status: 'active'
    }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/community`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to join community')
      }

      return response.json()
    },
    onSuccess: () => {
      setSubmitStatus('success')
      setTimeout(() => {
        onOpenChange(false)
        setCommunityModalOpen(true)
      }, 300)
    },
    onError: () => setSubmitStatus('error'),
  })

  useEffect(() => {
    if (open) setSubmitStatus('idle')
  }, [open])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: keyof FormData; value: string }
  ) => {
    const name = 'target' in e ? (e.target.name as keyof FormData) : e.name
    const value = 'target' in e ? e.target.value : e.value
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const requiredOk =
      formData.fullName.trim() &&
      formData.email.trim() &&
      formData.age.trim() &&
      formData.location.trim() &&
      formData.raceEthnicity.trim() &&
      formData.yearGroup.trim() &&
      formData.industry.trim() &&
      formData.pathway.trim() &&
      formData.firstInFamilyToAttendUni.trim() &&
      formData.receivedFreeSchoolMeals.trim() &&
      formData.careExperience.trim() &&
      formData.homePostcode.trim()

    if (!requiredOk) {
      setSubmitStatus('error')
      return
    }

    const ageNumber = Number(formData.age)
    if (!Number.isFinite(ageNumber) || ageNumber <= 0) {
      setSubmitStatus('error')
      return
    }

    setSubmitStatus('idle')

    // ✅ matches the exact payload you asked for
    mutation.mutate({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      age: ageNumber,
      location: formData.location.trim(),
      raceEthnicity: formData.raceEthnicity,
      yearGroup: formData.yearGroup,

      industry: formData.industry,
      pathway: formData.pathway,

      firstInFamilyToAttendUni: formData.firstInFamilyToAttendUni,
      receivedFreeSchoolMeals: formData.receivedFreeSchoolMeals,
      careExperience: formData.careExperience,
      homePostcode: formData.homePostcode.trim(),

      status: 'active',
    })
  }

  const isLoading = mutation.isPending

  // ✅ shared classes (design unchanged)
  const labelClass = 'text-sm font-semibold text-[#0A0A23]'
  const inputClass = 'border border-[#0000001A] rounded-[8px] h-[44px]'
  const selectTriggerClass = 'border h-[44px] border-[#0000001A] rounded-[8px]'
  const helperEnter = (text: string) => `Enter ${text}`

  const openWhatsApp = (link?: string) => {
    if (!link) return
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* -------------------- 1) FORM MODAL -------------------- */}
      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl !rounded-[12px] bg-[#FFFEF0] p-6 border-2 border-[#FFFF00] h-[85vh] overflow-y-auto hide-scrollbar">

          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Join Community"
              width={1000}
              height={1000}
              className="w-[66px] h-[40px] mb-3"
            />
          </div>

          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Join the Community
            </DialogTitle>
          </DialogHeader>

          {submitStatus === 'success' ? (
            <div className="py-10 text-center">
              <h3 className="text-xl font-bold text-green-600 mb-3">
                Submitted successfully ✅
              </h3>
              <p className="text-sm text-gray-600">
                Next step: choose your WhatsApp community…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h5 className="text-lg font-medium text-[#0A0A23] mt-8 border-l-4 border-[#FFFF00] pl-2">
                ABOUT YOU
              </h5>

              {/* ✅ responsive grid exactly like your layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className={labelClass} htmlFor="fullName">
                    FULL NAME *
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Alex Smith"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className={labelClass} htmlFor="email">
                    EMAIL *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Age */}
                <div className="space-y-1">
                  <label className={labelClass} htmlFor="age">
                    AGE *
                  </label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="16-35"
                    value={formData.age}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className={labelClass} htmlFor="location">
                    LOCATION *
                  </label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="City or Town"
                    value={formData.location}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Race/Ethnicity (dropdown like image) */}
                <div className="space-y-1">
                  <label className={labelClass}>RACE/ETHNICITY *</label>
                  <Select
                    value={formData.raceEthnicity}
                    onValueChange={(value) =>
                      handleChange({ name: 'raceEthnicity', value })
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none">
                      <SelectItem value="Asian">Asian</SelectItem>
                      <SelectItem value="Black">Black</SelectItem>
                      <SelectItem value="White">White</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Prefer not to say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Year Group */}
                <div className="space-y-1">
                  <label className={labelClass}>YEAR GROUP *</label>
                  <Select
                    value={formData.yearGroup}
                    onValueChange={(value) =>
                      handleChange({ name: 'yearGroup', value })
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none">
                      <SelectItem value="Year 10">Year 10</SelectItem>
                      <SelectItem value="Year 11">Year 11</SelectItem>
                      <SelectItem value="Year 12">Year 12</SelectItem>
                      <SelectItem value="Year 13">Year 13</SelectItem>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <h5 className="text-lg font-medium text-[#0A0A23] mt-8 border-l-4 border-[#FFFF00] pl-2">
                CAREER INTERESTS
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {/* Industry (dropdown like image) */}
                <div className="space-y-1">
                  <label className={labelClass}>INDUSTRY *</label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      handleChange({ name: 'industry', value })
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none">
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Law">Law</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Pathway (dropdown like image) */}
                <div className="space-y-1">
                  <label className={labelClass}>PATHWAY *</label>
                  <Select
                    value={formData.pathway}
                    onValueChange={(value) =>
                      handleChange({ name: 'pathway', value })
                    }
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none">
                      <SelectItem value="Software Engineering">
                        Software Engineering
                      </SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Product Management">
                        Product Management
                      </SelectItem>
                      <SelectItem value="Consulting">Consulting</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="Apprenticeship">Apprenticeship</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Help Us Support You box (design unchanged) */}
              <div className="border-2 border-[#FFFF00] rounded-[14px] bg-[#FFFF00]/10 p-4 mt-6">
                <div>
                  <div className="flex items-center gap-4 sm:gap-10 text-[#0A0A23]">
                    <span className="w-[60px] h-[60px] bg-[#FFFF00] rounded-[100%] flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6" />
                    </span>

                    <div className="min-w-0">
                      <h5 className="text-lg font-medium text-[#0A0A23] mt-4">
                        Help Us Support You
                      </h5>
                      <p className="text-sm text-[#0A0A23]/80">
                        Required for funding that keeps our events more
                        affordable. Your data is anonymized and confidential
                        when used.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {/* First in family (dropdown) */}
                    <div className="space-y-1">
                      <label className={labelClass}>
                        FIRST IN FAMILY TO ATTEND UNI?
                      </label>
                      <Select
                        value={formData.firstInFamilyToAttendUni}
                        onValueChange={(value) =>
                          handleChange({
                            name: 'firstInFamilyToAttendUni',
                            value,
                          })
                        }
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Prefer not to say" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-none">
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Prefer not to say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Free school meals (dropdown) */}
                    <div className="space-y-1">
                      <label className={labelClass}>
                        RECEIVED FREE SCHOOL MEALS?
                      </label>
                      <Select
                        value={formData.receivedFreeSchoolMeals}
                        onValueChange={(value) =>
                          handleChange({
                            name: 'receivedFreeSchoolMeals',
                            value,
                          })
                        }
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Prefer not to say" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-none">
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Prefer not to say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {/* Care experience (dropdown) */}
                    <div className="space-y-1">
                      <label className={labelClass}>CARE EXPERIENCE?</label>
                      <Select
                        value={formData.careExperience}
                        onValueChange={(value) =>
                          handleChange({ name: 'careExperience', value })
                        }
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Prefer not to say" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-none">
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Prefer not to say">
                            Prefer not to say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Home postcode */}
                    <div className="space-y-1">
                      <label className={labelClass}>
                        HOME POSTCODE (FIRST HALF)
                      </label>
                      <Input
                        id="homePostcode"
                        name="homePostcode"
                        placeholder="e.g. E1, M1"
                        value={formData.homePostcode}
                        onChange={handleChange}
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {submitStatus === 'error' && (
                <p className="text-red-600 text-center mt-4">
                  {mutation.error?.message || 'Please fill all fields correctly'}
                </p>
              )}

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-[300px] mt-6 bg-[#FFFF00] text-black rounded-[14px] font-bold hover:bg-[#FFFF00]/90 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* -------------------- 2) COMMUNITY SELECT MODAL -------------------- */}
      <Dialog open={communityModalOpen} onOpenChange={setCommunityModalOpen}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden !rounded-[18px] border border-[#FFFF00] bg-[#FFFEF0]">
          <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
            <button
              type="button"
              onClick={() => setCommunityModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-white/10 text-white/80"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="text-[#1E1E1E] text-xl font-semibold">
                Join Community
              </div>
            </div>
            <p className="text-[#1E1E1E] text-sm mt-1">
              Empowering young professionals across the UK 🇬🇧
            </p>
          </div>

          <div className="p-6">
            <div className="rounded-2xl border border-white/10 bg-[#FFFF00] px-5 py-6 text-center">
              <div className="mx-auto mb-3 h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="text-xl">🎉</span>
              </div>
              <h3 className="text-[#1E1E1E] text-lg font-semibold">
                Welcome to the Network!
              </h3>
              <p className="text-[#1E1E1E] text-sm mt-1">
                Your details have been registered. Join a community group below
                to get started.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-[#1E1E1E] text-xs font-semibold tracking-wider">
                SELECT A WHATSAPP COMMUNITY
              </p>

              <div className="mt-3 space-y-3">
                {communities.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-white/10 bg-[#FFF7ED] px-4 py-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-[#1E1E1E] font-semibold">
                        {c.name}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-[#1E1E1E]/60">
                        {c.badgeLeft && (
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded-full border',
                              c.filled
                                ? 'border-[#FEF9C2] bg-[#FEF9C2] text-[#1E1E1E]'
                                : 'border-[#FFDF20] bg-[#FEF9C2] text-[#894B00]'
                            )}
                          >
                            {c.badgeLeft}
                          </span>
                        )}
                        {c.badgeRight && <span>{c.badgeRight}</span>}
                      </div>
                    </div>

                    {c.filled ? (
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                          Filled
                        </span>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => openWhatsApp(c.whatsappLink)}
                        className="bg-[#FFFF00] text-black font-semibold rounded-xl hover:bg-[#FFFF00]/80"
                      >
                        Join Group →
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-[#1E1E1E] text-xs">
                <Check className="h-4 w-4" />
                Redirecting to external WhatsApp application
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default JoinCommunityModal
