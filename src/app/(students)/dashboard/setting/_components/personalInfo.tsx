'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Globe, Linkedin, Github, CheckCircle2 } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSession } from 'next-auth/react'

export default function ProfileForm() {
  const { data: sessionData } = useSession()
  const token = sessionData?.accessToken

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // jobTitle: "",
    company: '',
    address: '',
    grade: '',
    bio: '',
    socials: {
      website: '',
      linkedin: '',
      github: '',
    },
  })

  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!res.ok) throw new Error('Failed to load profile')
      return res.json()
    },
  })

  useEffect(() => {
    if (data?.data) {
      const user = data?.data?.data

      const getSocial = (name: string) =>
        user.socileLinks?.find((s: any) => s.name === name)?.link || ''

      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        // jobTitle: user.jobTitle || "",
        company: user.company || '',
        address: user.address || '',
        grade: user.grade || '',
        bio: user.bio || '',
        socials: {
          website: getSocial('website'),
          linkedin: getSocial('linkedin'),
          github: getSocial('github'),
        },
      })
    }
  }, [data])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target
    setProfileData(prev => ({ ...prev, [id]: value }))
  }

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setProfileData(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [id]: value,
      },
    }))
  }

  const changeProfile = useMutation({
    mutationFn: async () => {
      const payload = {
        ...profileData,
        socileLinks: [
          { name: 'website', link: profileData.socials.website },
          { name: 'linkedin', link: profileData.socials.linkedin },
          { name: 'github', link: profileData.socials.github },
        ],
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      )

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile')
      }
      return data
    },
    onSuccess: () => toast.success('Profile changed successfully'),
    onError: (err: any) => toast.error(err.message),
  })

  const calculateCompletion = () => {
    const requiredFields = [
      profileData.firstName,
      profileData.lastName,
      profileData.email,
      profileData.phone,
      profileData.company,
      profileData.address,
      profileData.bio,
      profileData.socials.website,
      profileData.socials.linkedin,
      profileData.socials.github,
    ]

    const filled = requiredFields.filter(
      field => field && field.trim() !== '',
    ).length

    return Math.round((filled / requiredFields.length) * 100)
  }

  const completionPercentage = calculateCompletion()

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Basic Info Skeleton */}
        <div className="p-8 border border-[#0000001A] rounded-3xl bg-white shadow-sm space-y-6">
          <Skeleton className="h-6 w-48" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </div>
        </div>

        {/* Social Links Skeleton */}
        <div className="p-8 border border-[#0000001A] rounded-3xl bg-white shadow-sm space-y-6">
          <Skeleton className="h-6 w-40" />

          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}
        </div>

        {/* Completion Skeleton */}
        <div className="p-6 border-2 rounded-3xl space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-end pt-4">
          <Skeleton className="h-14 w-48 rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="p-8 border border-[#0000001A] rounded-3xl bg-white shadow-sm space-y-6">
        <h3 className="text-xl text-[#1E1E1E]">Basic Information</h3>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        ["firstName", "First Name"],
                        ["lastName", "Last Name"],
                        ["email", "Email Address"],
                        ["phone", "Phone Number"],
                        ["jobTitle", "Job Title"],
                        ["address", "Location"],
                        ["grade", "Grade"],
                        ["company", "Company"],
                    ].map(([id, label]) => (
                        <div key={id} className="space-y-2">
                            <Label htmlFor={id} className="text-[#364153]">
                                {label}
                            </Label>
                            <Input
                                id={id}
                                value={(profileData as any)[id]}
                                onChange={handleInputChange}
                                className="bg-slate-50 border-none h-12 rounded-xl"
                            />
                        </div>
                    ))}
                </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ['firstName', 'First Name'],
            ['lastName', 'Last Name'],
            ['email', 'Email Address'],
            ['phone', 'Phone Number'],
            // ["jobTitle", "Job Title"],
            ['address', 'Location'],
            // ["company", "Company"],
          ].map(([id, label]) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id} className="text-[#364153]">
                {label}
              </Label>

              <Input
                id={id}
                value={(profileData as any)[id]}
                onChange={handleInputChange}
                disabled={id === 'email'}
                className="bg-slate-50 border-none h-12 rounded-xl"
              />
            </div>
          ))}

          {/* ✅ Grade Select Field */}
          <div className="space-y-2">
            <Label className="text-[#364153]">Year Group</Label>

            <Select
              value={profileData.grade || ''}
              onValueChange={value =>
                setProfileData((prev: any) => ({
                  ...prev,
                  grade: value,
                }))
              }
            >
              <SelectTrigger className="bg-slate-50 border-none h-12 rounded-xl">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>

              <SelectContent className="bg-white border-none">
                <SelectItem value="Year 8">Year 8</SelectItem>
                <SelectItem value="Year 9">Year 9</SelectItem>
                <SelectItem value="Year 10">Year 10</SelectItem>
                <SelectItem value="Year 11">Year 11</SelectItem>
                <SelectItem value="Year 12">Year 12</SelectItem>
                <SelectItem value="Year 13">Year 13</SelectItem>
                <SelectItem value="Graduate">Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={handleInputChange}
            className="bg-slate-50 border-none min-h-[100px] rounded-xl"
          />
        </div>
      </div>

      <div className="p-8 border border-[#0000001A] rounded-3xl bg-white shadow-sm space-y-6">
        <h3 className="text-xl text-[#1E1E1E]">Social Links</h3>

        <div className="space-y-4">
          {[
            ['website', Globe],
            ['linkedin', Linkedin],
            ['github', Github],
          ].map(([id, Icon]: any) => (
            <div key={id} className="flex items-center gap-4">
              <Icon className="w-5 h-5 text-slate-400" />
              <Input
                id={id}
                value={(profileData.socials as any)[id]}
                onChange={handleSocialChange}
                className="bg-slate-50 border-none h-12 rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] border-[#B9F8CF] border-2 rounded-3xl flex items-start gap-4">
        <CheckCircle2 className="text-white bg-[#00A63E] rounded-xl p-1" />
        <div className="flex-1">
          <p className="mb-2">Profile Completion</p>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00A63E]"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="text-sm">{completionPercentage}% Complete</span>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={() => changeProfile.mutate()}
          className="bg-[#FFFF00] hover:bg-[#FFFF00]/80 text-black px-6 py-6 rounded-2xl text-lg"
        >
          Submit All Data
        </Button>
      </div>
    </div>
  )
}
