"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  OpenJob,
  OpenApplicationApiResponse,
} from "./open-application-data-type";
import { Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import Link from "next/link";
import moment from "moment";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";
import WasabiDropDown from "@/components/ui/WasabiDropdown";
import YourCareerInsights from "./your-career-insights";
import ReadyToNextStep from "./ready-to-next-step";
import CloseJobViewDetailsModal from "./CloseJobViewDetailsModal";
import { LocationsApiResponse } from "@/types/location-data-type";

const jobTypeList = [
  { id: 1, name: "None", value: "__none__" },
  {
    id: 2,
    name: "Solicitor Apprenticeships",
    value: "Solicitor Apprenticeship",
  },
  {
    id: 3,
    name: "Paralegal Apprenticeships",
    value: "Paralegal Apprenticeship",
  },
  { id: 4, name: "Year 12 Work Experience", value: "Year 12 Work Experience" },
  { id: 5, name: "Year 13 Work Experience", value: "Year 13 Work Experience" },
  { id: 6, name: "Training Contracts", value: "Training Contracts" },
  { id: 7, name: "Vacation Schemes", value: "Vacation Schemes" },
  { id: 8, name: "Insight Days", value: "Insight Days" },
  { id: 9, name: "Open Days", value: "Open Days" },
];

const isJobClosed = (deadline: string) => {
  if (!deadline) return true;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  return deadlineDate < today;
};

const canApplyToJob = (job: OpenJob) => {
  return job.status === "active" && !isJobClosed(job.applicationDeadline);
};

const ALL = "__all__";

const OpenApplicationContainer = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [jobType, setJobType] = useState<string | undefined>("");
  const [location, setLocation] = useState<string | undefined>("");
  const [activeFilter, setActiveFilter] = useState<
    "search" | "jobType" | "location" | null
  >(null);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [filterSource, setFilterSource] = useState<"hero" | "container" | null>(
    null,
  );

  const session = useSession();
  const token = session?.data?.accessToken;
  console.log(token);
  const status = "Open";
  console.log(search);

  useEffect(() => {
    const storedFilters = localStorage.getItem("jobFilters");

    if (storedFilters) {
      const parsed = JSON.parse(storedFilters);

      if (parsed.jobType) setJobType(parsed.jobType);
      if (parsed.location) setLocation(parsed.location);

      setFilterSource(parsed.source);

      localStorage.removeItem("jobFilters");
    }
  }, []);

  const buildSearchTerm = () => {
    if (activeFilter === "search") return debouncedSearch;
    if (activeFilter === "jobType") return jobType;
    if (activeFilter === "location") return location;

    return "";
  };

  // location api start

  const { data: locations } = useQuery<LocationsApiResponse>({
    queryKey: ["location-data"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/locations`,
      );

      return res.json();
    },
  });

  console.log(locations?.data);

  const locationData = locations?.data || [];

  const cleanedLocations = Array.from(
    new Map(
      locationData
        .map((loc) => {
          let cleanName = loc.name.trim();

          // remove postcode (anything inside bracket)
          cleanName = cleanName.replace(/\(.*?\)/g, "");

          // remove "and X other location"
          cleanName = cleanName.replace(
            /and\s+\d+\s+other\s+location(s)?/gi,
            "",
          );

          cleanName = cleanName.trim();

          return cleanName;
        })
        .filter((name) => name && name.toLowerCase() !== "paralegal") // remove paralegal
        .map((name) => [name.toLowerCase(), name]), 
    ).values(),
  );

  const locationDataWithNone = [
    { id: 0, name: "None", value: "__none__" },
    ...cleanedLocations.map((name, index) => ({
      id: index + 1,
      name,
      value: name,
    })),
  ];

  // location api end

  // open application api start
  const { data, isLoading, isError, error } =
    useQuery<OpenApplicationApiResponse>({
      queryKey: [
        "open-application",
        currentPage,
        status,
        activeFilter,
        debouncedSearch,
        jobType,
        location,
      ],

      queryFn: async () => {
        const params = new URLSearchParams({
          jobStatus: status,
          page: String(currentPage),
          limit: "10",
        });

        // ✅ CASE 1: Hero থেকে আসলে
        if (filterSource === "hero") {
          if (jobType) params.append("title", jobType);
          if (location) params.append("location", location);
        }

        // ✅ CASE 2: Container থেকে filter হলে
        else {
          const searchTerm = buildSearchTerm();
          if (searchTerm) {
            params.append("searchTerm", searchTerm);
          }
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/not-my-applied-job?status=active&${params.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        return res.json();
      },

      // queryFn: async () => {
      //   const searchTerm = buildSearchTerm();

      //   const params = new URLSearchParams({
      //     jobStatus: status,
      //     page: String(currentPage),
      //     limit: "10",
      //   });

      //   if (searchTerm) {
      //     params.append("searchTerm", searchTerm);
      //   }
      //   const res = await fetch(
      //     // `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/not-my-applied-job?jobStatus=${status}&searchTerm=${location}&page=${currentPage}&limit=10`,
      //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/not-my-applied-job?${params.toString()}&location=${location}&title=${jobType}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //     },
      //   );

      //   return res.json();
      // },
    });

  // console.log(data);

  // open application api end

  const totalPages = data?.meta
    ? Math.ceil(data.meta.total / data.meta.limit)
    : 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const applideMutation = useMutation({
    onMutate: (jobId: string) => {
      setApplyingJobId(jobId);
    },
    mutationFn: async (jobId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/applied-job/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to apply");
      }

      return result;
    },

    onSuccess: (response, jobId) => {
      const redirectUrl = response?.data?.job?.url;

      if (redirectUrl) {
        window.open(redirectUrl, "_blank");
        return;
      }

      // router.push(`/dashboard/application-tracker/cv-uplode/${jobId}`);
    },

    onError: (error: any) => {
      console.error("Apply failed:", error.message);
    },
    onSettled: () => {
      setApplyingJobId(null);
    },
  });

  const handleApply = (jobId: string) => {
    applideMutation.mutate(jobId);
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between gap-3 pb-5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[40px] font-semibold leading-[120%] text-[#131313]">
          Filter Jobs
        </h2>
        <p className="text-base font-normal text-[#424242] leading-[150%]">
          {data?.data?.length || 0} + Results
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        {/* search  */}
        <div>
          <Input
            type="search"
            className="w-full  md:w-[300px] h-[36px] px-3  rounded-xl bg-[#E9EEF2] placeholder:text-[#929292] border border-[#616161]"
            //             />
            value={search}
            // onChange={(e) => setSearch(e.target.value)}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveFilter("search");
            }}
            placeholder="Search"
          />
        </div>

        {/* job type  */}
        <div>
          <WasabiDropDown
            list={jobTypeList}
            selectedValue={jobType}
            placeholderText="Job Type"
            // onValueChange={(value) => {
            //   setJobType(value);
            //   setActiveFilter("jobType");
            // }}
            onValueChange={(value) => {
              if (value === "__none__") {
                setJobType(""); 
                setActiveFilter(null);
              } else {
                setJobType(value);
                setActiveFilter("jobType");
              }
            }}
          />
        </div>
        {/* job type  */}
        <div>
          <WasabiDropDown
            list={locationDataWithNone}
            selectedValue={location}
            // onValueChange={(value) => {
            //   setLocation(value);
            //   setActiveFilter("location");
            // }}
            onValueChange={(value) => {
              if (value === "__none__") {
                setLocation("");
                setActiveFilter(null);
              } else {
                setLocation(value);
                setActiveFilter("location");
              }
            }}
            placeholderText="Location"
          />
        </div>
      </div>

      <h4 className="text-xl md:text-[22px] lg:text-2xl font-semibold text-[#1E1E1E] leading-[32px] pt-6 md:pt-7 lg:pt-8 pb-6">
        Your Applications
      </h4>

      {/* Job Cards */}
      {data?.data?.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-xl">
          No matching opportunities found.
          <p className="text-base mt-3">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((app) => (
              <div
                key={app._id}
                className="border-[2px] border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl transition-all bg-white flex flex-col h-full"
                // onClick={() => {
                //   setSelectedJob(app);
                //   setIsJobModalOpen(true);
                // }}
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] rounded-[20px] flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-[#4A5565]" />
                  </div>
                  <button
                    className={`h-[34px] rounded-[14px] py-1 px-3 font-medium leading-[16px] border bg-[#FFFF00] border-[#E5E500] text-[#1E1E1E]`}
                  >
                    {app?.jobStatus}
                  </button>
                </div>

                <h3 className="font-semibold text-base leading-[24px] text-[#1E1E1E] mb-2 line-clamp-2">
                  {app.title}
                </h3>
                <p className="text-[#4A5565] text-sm font-normal mb-4">
                  {app.companyName}
                </p>

                <div className="border-b border-[#F3F4F6]">
                  <div className="flex items-center gap-3 pb-4">
                    <Calendar className="w-4 h-4 text-[#6A7282]" />
                    <span className="text-[#6A7282] text-sm leading-[20px] font-normal">
                      {moment(app?.applicationDeadline).format("MMM DD, YYYY")}
                    </span>
                  </div>

                  <div className="">
                    {app?.notes && (
                      <span className="h-10 bg-[#F9FAFB] rounded-[16px] text-xs text-[#4A5565] font-normal leading-[16px] p-3">
                        {app?.notes}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
                  {/* <Button
                    variant="outline"
                    className="w-full h-[32px] flex items-center gap-2 bg-transparent border border-[#E5E500]  py-2 font-medium text-[#1E1E1E] leading-[20px] hover:bg-[#FFFF00]/90 rounded-[14px]"
                  >
                    <Eye className="w-4 h-4 text-[#1E1E1E]" /> View Details
                  </Button> */}
                  <CloseJobViewDetailsModal id={app?._id} />

                  <Button
                    onClick={() => handleApply(app._id)}
                   disabled={applideMutation.isPending && applyingJobId === app._id}
                    className="w-full h-[32px] rounded-[14px] hover:border-[1.5px] border-[#FFFF00] bg-[#FFFF00] hover:bg-transparent text-sm leading-[20px] text-[#1E1E1E] font-medium"
                  >
                    {applideMutation.isPending && applyingJobId === app._id
                      ? "Applying..."
                      : "Apply Now"}
                  </Button>

                  {/* {canApplyToJob(app) && (
                      <Link href="/dashboard/application-tracker/cv-uplode">
                        <Button className="w-full h-[32px] rounded-[14px] hover:border-[1.5px] border-[#FFFF00] bg-[#FFFF00] hover:bg-transparent text-sm leading-[20px] text-[#1E1E1E] font-medium">
                          Apply Now
                        </Button>
                      </Link>
                    )} */}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-gray-300"
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "min-w-[40px]",
                      currentPage === page
                        ? "bg-[#FFFF00] hover:bg-[#FFFF00] text-black border-none"
                        : "border-gray-300",
                    )}
                  >
                    {page}
                  </Button>
                ),
              )}

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-gray-300"
              >
                Next
              </Button>
            </div>
          )}

          <div className="text-center text-gray-600 mt-6 mb-6">
            Showing {data?.data?.length} of 10 opportunities{" "}
            {`(Page ${currentPage} of ${totalPages})`}
          </div>
        </>
      )}

      {/* YourCareerInsights section  */}
      <section className="py-8">
        <YourCareerInsights />
      </section>

      {/* Ready to Take the Next Step? section  */}

      <section>
        <ReadyToNextStep />
      </section>
    </div>
  );
};

export default OpenApplicationContainer;
