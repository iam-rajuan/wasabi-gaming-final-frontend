// "use client";

// import React, { use } from "react";
// import { ICONS } from "../../../assets";
// import { CircleCheckBig, TrendingUp, UserPlus } from "lucide-react";
// import { useSession } from "next-auth/react";

// const stats = [
//   { icon: UserPlus, label: "Total Students", value: 6 },
//   { icon: TrendingUp,  label: "Active Applications", value: 73 },
//   {
//    icon: CircleCheckBig, 
//     label: "Assessment Completion Overview",
//     value: 325,
//   },
//   { icon: TrendingUp,  label: "Avg Progress", value: "81%" },
// ];

// export default function ManageStudentsHeader() {
//     const session=useSession();
//     const token=session?.data?.accessToken
//   return (
//     <div className="font-poppins">
//       <div className="mb-2 bg-[#FFFEF0]">
//         <div className="px-6 py-16 max-w-[1600px] mx-auto pb-20">
//           <h1 className="text-2xl md:text-4xl font-bold">Manage Students</h1>
//           <p className="md:text-lg mt-4 text-[#666666]">
//             Track, monitor, and support every student's career journey in one central dashboard
//           </p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12 px-6 max-w-[1600px] mx-auto pb-20">
//         {stats.map((s, i) => {
//           const Icon = s.icon as any;

//           return (
//             <div
//               key={i}
//               className="p-6 rounded-3xl shadow-sm bg-[#FFFEF0] border-2 border-[#E5E5E5] flex flex-col justify-between"
//             >
//               <div className="flex items-center justify-between gap-4">
//                 {/* ✅ If icon is a string/url => use img, else render as component */}
//                 {typeof s.icon === "string" ? (
//                   <img src={s.icon} alt="icon" className="w-10 h-10 object-contain" />
//                 ) : (
//                   <Icon className="w-10 h-10" />
//                 )}

//                 <p className="bg-[#FFFF00] text-2xl font-bold rounded-2xl py-3 px-4">
//                   {s.value}
//                 </p>
//               </div>

//               <p className="text-sm font-semibold text-gray-600 mt-6">{s.label}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }



"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CircleCheckBig, TrendingUp, UserPlus } from "lucide-react";
import { useSession } from "next-auth/react";

// Skeleton Card Component
const StatCardSkeleton = () => (
  <div className="p-6 rounded-3xl shadow-sm bg-[#FFFEF0] border-2 border-[#E5E5E5] flex flex-col justify-between animate-pulse">
    <div className="flex items-center justify-between gap-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="bg-gray-200 text-2xl font-bold rounded-2xl py-4 px-8 w-24" />
    </div>
    <div className="h-5 bg-gray-200 rounded mt-6 w-3/4" />
  </div>
);

export default function ManageStudentsHeader() {
  const { data: session, status } = useSession();
  const token = session?.accessToken;

  const { data, isLoading, error } = useQuery({
    queryKey: ["school-overview"],
    queryFn: async () => {
      if (!token) throw new Error("No authentication token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/school-management/overview`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store", // or "force-cache" depending on your needs
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch overview: ${res.status}`);
      }

      const json = await res.json();
      return json.data; // return the data object directly
    },
    enabled: status === "authenticated" && !!token, // only run when logged in
  });

  // Define stats based on real API data
  const stats = [
    {
      icon: UserPlus,
      label: "Total Students",
      value: data?.totalStudents ?? 0,
    },
    {
      icon: TrendingUp, // You can use a different icon if you like
      label: "Active Students",
      value: data?.activeStudents ?? 0,
    },
    {
      icon: CircleCheckBig,
      label: "Total Assessments",
      value: data?.totalAssessments ?? 0,
    },
    {
      icon: TrendingUp, // You can use a different icon if you like
      label: "Total Applications",
      value: data?.totalAppliedApplications ?? 0,
    },
  ];

  return (
    <div className="font-poppins">
      <div className="mb-2 bg-[#FFFEF0]">
        <div className="px-6 py-16 max-w-[1600px] mx-auto pb-20">
          <h1 className="text-2xl md:text-4xl font-bold">Manage Students</h1>
          <p className="md:text-lg mt-4 text-[#666666]">
            Track, monitor, and support every student's career journey in one central dashboard
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12 px-6 max-w-[1600px] mx-auto pb-20">
        {isLoading || status === "loading" ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : error ? (
          <div className="col-span-full text-center text-red-600 py-8">
            Failed to load statistics. Please try again later.
          </div>
        ) : (
          stats.map((s, i) => {
            const Icon = s.icon;

            return (
              <div
                key={i}
                className="p-6 rounded-3xl shadow-sm bg-[#FFFEF0] border-2 border-[#E5E5E5] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-4">
                  <Icon className="w-10 h-10 text-gray-700" />
                  <p className="bg-[#FFFF00] text-2xl font-bold rounded-2xl py-3 px-5 min-w-[80px] text-center">
                    {s.value}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-600 mt-6">{s.label}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}