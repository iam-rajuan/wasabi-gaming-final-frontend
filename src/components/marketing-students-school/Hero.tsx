
'use client'

import React, { useEffect, useState } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Star } from 'lucide-react'
import JoinCommunityModal from './JoinCommunityModal'
import { useRouter } from 'next/navigation'
import HeroDropDown from '../ui/HeroDropDown'
import { useUserProfile } from '@/hooks/useUserProfile'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { LocationsApiResponse } from '@/types/location-data-type'

const jobTypeList = [
  { id: 1, name: "None", value: "__none__" },
  { id: 2, name: "Solicitor Apprenticeships", value: "Solicitor Apprenticeship" },
  { id: 3, name: "Paralegal Apprenticeships", value: "Paralegal Apprenticeship" },
  { id: 4, name: "Year 12 Work Experience", value: "Year 12 Work Experience" },
  { id: 5, name: "Year 13 Work Experience", value: "Year 13 Work Experience" },
  { id: 6, name: "Training Contracts", value: "Training Contracts" },
  { id: 7, name: "Vacation Schemes", value: "Vacation Schemes" },
  { id: 8, name: "Insight Days", value: "Insight Days" },
  { id: 9, name: "Open Days", value: "Open Days" },
];

// const locationList = [
//   { id: 1, name: "London", value: "London" },
//   { id: 2, name: "Manchester", value: "Manchester" },
//   { id: 3, name: "Birmingham", value: "Birmingham" },
//   { id: 4, name: "Leeds", value: "Leeds" },
//   { id: 5, name: "Liverpool", value: "Liverpool" },
//   { id: 6, name: "Cardiff", value: "Cardiff" },
// ];

const Hero = () => {
  const words = ['DREAMS', 'FUTURE', 'PASSION']
  const [index, setIndex] = useState(0)
  const router = useRouter();
  const { hasActiveSubscription, isAuthenticated } = useUserProfile()

  const [openModal, setOpenModal] = useState(false)
  const [jobType, setJobType] = useState<string | undefined>("");
  const [location, setLocation] = useState<string | undefined>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    const filterData = {
      jobType,
      location,
      source: "hero",
    };

    localStorage.setItem("jobFilters", JSON.stringify(filterData));

    router.push("/dashboard/application-tracker");
  };


  const { data } = useQuery<LocationsApiResponse>({
    queryKey: ["location-data"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/job/locations`)

      return res.json();
    }
  })

  console.log(data?.data)

  const locationData = data?.data || []


  // const locationDataWithNone = [
  //   { id: 0, name: "None", value: "__none__" },
  //   ...locationData.map((loc, index) => ({
  //     id: loc.id || index + 1,
  //     name: loc.name.trim(),
  //     value: loc.value.trim(),
  //   })),
  // ];

  const cleanedLocations = Array.from(
    new Map(
      locationData
        .map((loc) => {
          let cleanName = loc.name.trim();

          // remove postcode (anything inside bracket)
          cleanName = cleanName.replace(/\(.*?\)/g, "");

          // remove "and X other location"
          cleanName = cleanName.replace(/and\s+\d+\s+other\s+location(s)?/gi, "");

          cleanName = cleanName.trim();

          return cleanName;
        })
        .filter((name) => name && name.toLowerCase() !== "paralegal") // remove paralegal
        .map((name) => [name.toLowerCase(), name]) // key দিয়ে duplicate remove
    ).values()
  );

  const locationDataWithNone = [
    { id: 0, name: "None", value: "__none__" },
    ...cleanedLocations.map((name, index) => ({
      id: index + 1,
      name,
      value: name,
    })),
  ];

  // console.log(locationDataWithNone)





  return (
    <section
      className="relative text-center py-16 sm:py-20 px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/heroImage.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* FLOATING CARD */}
      <Card
        className="
          hidden lg:block rounded-[16px]
          lg:absolute lg:left-4 lg:top-12
          xl:left-12
          2xl:left-24
          bg-white border-none
          lg:w-56 py-2
          shadow-[0px_8px_16px_0px_#0000001F]
        "
      >
        <CardContent className="py-2 flex flex-col px-2 lg:px-4 items-start gap-2">
          {/* Avatars */}
          <div className="flex -space-x-2 sm:-space-x-3">
            {[
              '/star1.jpg',
              '/star2.jpg',
              '/star3.jpg',
              '/star4.jpg',
              '/star5.jpg',
            ].map((src, i) => (
              <Avatar
                key={i}
                className="h-8 w-8 xl:h-10 xl:w-10 border-2 border-white ring-1 ring-gray-100"
              >
                <AvatarImage src={src} alt={`Student ${i + 1}`} />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            ))}
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 text-[#FFC107]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5 fill-current"
              />
            ))}
          </div>

          <p className="text-xs w-full text-left font-medium text-gray-900">
            Joined by Students Nationwide
          </p>
        </CardContent>
      </Card>

      {/* HEADING */}
      <div className="flex justify-center">
        <div className="max-w-5xl">
          <h1
            className="
              text-3xl sm:text-5xl md:text-[52px]
              leading-tight sm:leading-[60px]
              font-bold text-gray-900 mb-6
            "
          >
            PURSUE YOUR LEGAL <br />
            <span className="text-[#E4E403]">{words[index]}</span> WITH
            CONFIDENCE
          </h1>

          <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            Your pathway into the legal profession starts here
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 w-full max-w-4xl mx-auto ">
        <div
          className="
             w-full flex flex-col sm:flex-row items-center gap-4 bg-white shadow-[0px_8px_16px_0px_#00000014,8px_0px_16px_0px_#00000014] border border-[#E7E7E7] rounded-[12px] md:rounded-full py-4 px-4 sm:px-6"
        >


          <div className="w-full flex flex-col sm:flex-row items-center gap-4 md:gap-0 md:border md:border-[#E7E7E7] md:rounded-full ">
            {/* job type  */}
            <div className="w-full xs:border xs:border-[#E7E7E7] xs:rounded-full ">
              <HeroDropDown
                list={jobTypeList}
                selectedValue={jobType}
                // onValueChange={setJobType}

                onValueChange={(value) => {
                  if (value === "__none__") {
                    setJobType("");
                  } else {
                    setJobType(value);
                  }
                }}

                placeholderText="Select Job Type"
              />
            </div>
            {/* location */}
            <div className="w-full xs:border xs:border-[#E7E7E7] xs:rounded-full  md:border-l md:border-[#E7E7E7] ">
              <HeroDropDown
                list={locationDataWithNone}
                selectedValue={location}
                onValueChange={(value) => {
                  if (value === "__none__") {
                    setLocation("");
                  } else {
                    setLocation(value);
                  }
                }}
                placeholderText="Select Location"
              />

              {/* <HeroDropDown
                list={locationData}
                selectedValue={location}
                onValueChange={setLocation}

                placeholderText="Select Location"
              /> */}
            </div>
          </div>

          <Button onClick={handleSearch} className="w-full h-[50px] sm:w-auto bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-[#131313] text-base border border-[#CACA00] font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Search
          </Button>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10 sm:mt-12">
        <Button
          onClick={() => {
            if (!isAuthenticated || !hasActiveSubscription) {
              toast.error('This feature requires an active subscription')
              router.push('/plans')
              return
            }
            setOpenModal(true)
          }}
          className="w-full sm:w-auto bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-[#1E1E1E] border border-[#CACA00] font-bold py-6 px-10 sm:px-16 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
        >
          Join the Community!
        </Button>
      </div>

      {/* MODAL */}
      <JoinCommunityModal open={openModal} onOpenChange={setOpenModal} />
    </section>
  )
}

export default Hero
