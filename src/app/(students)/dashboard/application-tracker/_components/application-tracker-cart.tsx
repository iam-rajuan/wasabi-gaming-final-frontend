"use client"
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { Mail, Clock4, Briefcase,  Calendar  } from 'lucide-react'
import React from 'react'
import { UserProfileApiResponse } from './application-tracker-cart-data-type';

const ApplicationTrackerCart = () => {
const session = useSession();
  const token = session?.data?.accessToken
  console.log(token)

  const { data, isLoading, isError, error } = useQuery<UserProfileApiResponse>({
    queryKey: ["profile-data"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      return res.json();
    }
  })

  console.log(data?.data?.data?.applicationJob)

  const resData = data?.data?.data?.applicationJob || []

  const interviewData = resData.filter((item) => item.status === "Interview")
  const offerData = resData.filter((item) => item.status === "Applied")
  const pendingData = resData.filter((item) => item.status === "pending")

  console.log("interviewData", interviewData)
  console.log("offerData", offerData)
  console.log("pendingData", pendingData)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className='border-[2px] border-[#FFFFB2] flex items-start gap-4 rounded-[20px] bg-white shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A] p-6'>
             <div className="w-12 h-12 bg-[#FFFF00] rounded-full flex items-center justify-center">
    <Mail className="w-6 h-6 text-[#1E1E1E]" />
  </div>
            <div>
                <h4 className='text-sm font-normal text-[#4A5565] leading-[20px]'>Applications Sent</h4>
                <h2 className='text-[#1E1E1E] font-semibold leading-[36px] text-2xl md:text-3xl py-1'>{resData?.length || 0}</h2>
                <p className='text-xs font-normal italic leading-[16px] text-[#6A7282]'>Great start!</p>
            </div>
        </div>
        <div className='border-[2px] border-[#FFFFB2] flex items-start gap-4 rounded-[20px] bg-white shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A] p-6'>
             <div className="w-12 h-12 bg-[#FFFF00] rounded-full flex items-center justify-center">
    <Calendar  className="w-6 h-6 text-[#1E1E1E]" />
  </div>
            <div>
                <h4 className='text-sm font-normal text-[#4A5565] leading-[20px]'>Interviews Scheduled</h4>
                <h2 className='text-[#1E1E1E] font-semibold leading-[36px] text-2xl md:text-3xl py-1'>{interviewData?.length || 0}</h2>
                <p className='text-xs font-normal italic leading-[16px] text-[#6A7282]'>You're making progress!</p>
            </div>
        </div>
        <div className='border-[2px] border-[#FFFFB2] flex items-start gap-4 rounded-[20px] bg-white shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A] p-6'>
             <div className="w-12 h-12 bg-[#FFFF00] rounded-full flex items-center justify-center">
    <Briefcase  className="w-6 h-6 text-[#1E1E1E]" />
  </div>
            <div>
                <h4 className='text-sm font-normal text-[#4A5565] leading-[20px]'>Offers Received</h4>
                <h2 className='text-[#1E1E1E] font-semibold leading-[36px] text-2xl md:text-3xl py-1'>{offerData?.length || 0}</h2>
                <p className='text-xs font-normal italic leading-[16px] text-[#6A7282]'>Success is near!</p>
            </div>
        </div>
        <div className='border-[2px] border-[#FFFFB2] flex items-start gap-4 rounded-[20px] bg-white shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A] p-6'>
             <div className="w-12 h-12 bg-[#FFFF00] rounded-full flex items-center justify-center">
    <Clock4  className="w-6 h-6 text-[#1E1E1E]" />
  </div>
            <div>
                <h4 className='text-sm font-normal text-[#4A5565] leading-[20px]'>Pending Responses</h4>
                <h2 className='text-[#1E1E1E] font-semibold leading-[36px] text-2xl md:text-3xl py-1'>{pendingData?.length || 0}</h2>
                <p className='text-xs font-normal italic leading-[16px] text-[#6A7282]'>Keep applying!</p>
            </div>
        </div>
    </div>
  )
}

export default ApplicationTrackerCart