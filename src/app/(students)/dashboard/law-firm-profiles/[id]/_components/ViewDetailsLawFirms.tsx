"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Award,
  CircleCheckBig,
  ExternalLink,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  Target,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ShowOpenPosition from "./ShowOpenPosition";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// TypeScript interface
interface RecentInfo {
  title?: string;
  description?: string;
  url?: string;
}

interface LawFirmData {
  _id: string;
  aboutFirm?: string;
  exertise?: string;
  internshipTraining?: string;
  description?: string;
  coverImage?: string;
  createBy?: string;
  numberOfPartners?: number;
  cultureAndValue?: string[];
  status?: string;
  applyNumber?: string[];
  location?: string;
  contactEmail?: string;
  phone?: string;
  website?: string;
  establishedYear?: number;
  benefitsAndPerks?: string[];
  employees?: string;
  createdAt?: string;
  updatedAt?: string;
  firmName?: string;
  firmType?: string;
  subtitle?: string;
  foundationYear?: string;
  foundedNGO?: string;
  practiceAreas?: string;
  keyHighlights?: string;
  recentWork?: RecentInfo;
  tags?: string[];
  email?: string;
  phoneNumber?: string;
  technologyInitiatives: {
    title?: string;
    description?: string;
    link?: string;
  };
  recentWorks: {
    title?: string;
    description?: string;
    link?: string;
  };
  diversityEquityAndInclusion: {
    title?: string;
    description?: string;
    link?: string;
  };
  recentAnnualRevenue?: {
    title?: string;
    description?: string;
    link?: string;
  };
  CSRAndProBono: {
    title?: string;
    description?: string;
    link?: string;
  };
  jobs?: string[];
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: LawFirmData;
}

function ViewDetailsLawFirms() {
  const params = useParams();
  const router = useRouter();
  const session = useSession();
  const token = session.data?.accessToken;

  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : undefined;

  // Tab state
  const [activeTab, setActiveTab] = useState<
    "overview" | "positions" | "culture"
  >("overview");
  const [recommendedJobsCount, setRecommendedJobsCount] = useState(0);
  const [recommendedJobsLoading, setRecommendedJobsLoading] = useState(false);

  // Fetch law firm data from API
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<ApiResponse>({
    queryKey: ["law-firm-profile", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lawfirm/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch law firm data");
      return res.json();
    },
    enabled: !!id,
  });

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch profile data");
      return res.json();
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (!token) {
      setRecommendedJobsCount(0);
      return;
    }

    let isMounted = true;

    const fetchRecommendedJobs = async () => {
      setRecommendedJobsLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/job/recommended-jobs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) throw new Error("Failed to fetch recommended jobs");

        const result = await res.json();

        if (isMounted) {
          if (result.success && Array.isArray(result.data)) {
            setRecommendedJobsCount(result.data.length);
          } else {
            setRecommendedJobsCount(0);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setRecommendedJobsCount(0);
        }
      } finally {
        if (isMounted) {
          setRecommendedJobsLoading(false);
        }
      }
    };

    fetchRecommendedJobs();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const isSubscriptionActive = profileData?.data?.data?.isSubscription === true;
  const subscriptionName = profileData?.data?.subscription?.name ?? "";
  const isPremium = isSubscriptionActive && subscriptionName === "premium";

  const handlePremiumTab = (tab: "positions" | "culture") => {
    if (!isPremium) {
      toast.error(
        "This section is for premium subscribers only. Upgrade your plan to access it.",
        {
          duration: 3000,
        },
      );
      setTimeout(() => router.push("/plans"), 1500);
      return;
    }
    setActiveTab(tab);
  };

  const firmData = response?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading law firm details...</p>
        </div>
      </div>
    );
  }

  if (error || !firmData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600">Failed to load law firm details</p>
          <p className="text-sm text-gray-500 mt-2">
            {error instanceof Error ? error.message : "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Section */}
      <div className="pb-8">
        {/* ✅ Mobile/Tablet responsive container, LG unchanged */}
        <div className="w-full lg:container lg:mx-auto pt-4 sm:pt-6 px-4 sm:px-6 lg:px-0">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-3 sm:gap-4 text-[#1E1E1E] mb-6 font-normal text-sm border border-[#0000001A] rounded-full py-2 px-4 hover:bg-gray-100 transition-colors w-fit"
          >
            <ArrowLeft className="text-[#1E1E1E] w-4 h-4" />
            Back to Law Firms
          </button>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm relative border-2 border-[#0000001A]">
            {firmData.status === "approved" && (
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <span className="bg-yellow-300 text-black text-xs font-semibold px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  Featured Position
                </span>
              </div>
            )}

            {/* Logo */}
            <div className="flex justify-center mb-6 bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] py-8 sm:py-10 rounded-t-2xl">
              {firmData.coverImage ? (
                <img
                  src={firmData.coverImage}
                  alt={`${firmData.firmName || "Law Firm"} Logo`}
                  className="w-20 h-20 rounded-[24px] object-cover shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display =
                        "flex";
                    }
                  }}
                />
              ) : null}

              <div
                className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-5 w-20 h-20 flex items-center justify-center shadow-lg"
                style={{ display: firmData.coverImage ? "none" : "flex" }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
            </div>

            {/* Title and Info */}
            <div className="mb-6 px-4 sm:px-6 lg:px-[32px]">
              <h1 className="text-2xl md:text-[36px] font-normal text-[#1E1E1E] mb-1">
                {firmData.firmName || "Law Firm"}
              </h1>
              <p className="text-base sm:text-xl text-[#4A5565] mb-6">
                {firmData.firmType || "Professional Legal Services"}
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-start gap-4 sm:gap-6 text-sm text-gray-600 mb-6 flex-wrap">
                {firmData.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="text-[#DF0000] w-5 h-5" />
                    <span className="text-base text-[#364153]">
                      {firmData.location}
                    </span>
                  </span>
                )}

                <span className="flex items-center gap-1.5">
                  <Users className="text-[#00CD1F] w-5 h-5" />
                  <span className="text-base text-[#364153]">
                    {firmData.numberOfPartners}+ employees
                  </span>
                </span>

                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-5 h-5 text-[#BEAE00]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                  </svg>
                  <span className="text-base text-[#364153]">
                    Founded {firmData.foundationYear}
                  </span>
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {firmData?.tags?.map((tag, index) => (
                  <div
                    key={index}
                    className="text-sm sm:text-base font-medium text-[#1E1E1E] border border-[#0000001A] rounded-full px-3 py-1 inline-block"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-6 lg:px-[32px] pt-6 pb-6 bg-[#F9FAFB] rounded-2xl">
              <div className="flex justify-between items-center gap-4">
                <div className="flex gap-3 items-center">
                  <Globe className="w-5 h-5 text-[#1905CD]" />
                  <div>
                    <p className="text-sm text-[#6A7282] font-normal">
                      Website
                    </p>
                    <span className="text-sm font-normal text-[#364153] break-all">
                      {firmData?.website}
                    </span>
                  </div>
                </div>

                {firmData.website && (
                  <a
                    href={
                      firmData.website.startsWith("http")
                        ? firmData.website
                        : `https://${firmData.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <ExternalLink className="text-[#364153] w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-[#AECC29]" />
                <div>
                  <p className="text-sm text-[#6A7282] font-normal">Email</p>
                  <span className="text-sm font-normal text-[#364153] break-all">
                    {firmData?.email}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-[#00AE26]" />
                <div>
                  <p className="text-sm text-[#6A7282] font-normal">
                    Phone Number
                  </p>
                  <span className="text-sm font-normal text-[#364153] break-all">
                    {firmData?.phoneNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 bg-[#ECECF0] rounded-[20px] p-2">
            <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 min-w-[130px] sm:min-w-[150px] text-sm font-medium py-3 rounded-full transition-all ${
                  activeTab === "overview"
                    ? "bg-[#FFFF00] text-black shadow-sm"
                    : "text-[#1E1E1E]"
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => handlePremiumTab("positions")}
                className={`flex-1 min-w-[160px] sm:min-w-[180px] text-sm font-medium py-3 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "positions"
                    ? "bg-[#FFFF00] text-black shadow-sm"
                    : "text-[#1E1E1E]"
                }`}
              >
                {!isPremium && <Lock className="w-3.5 h-3.5 flex-shrink-0" />}
                Open Positions ({firmData?.jobs?.length ?? 0})
              </button>

              <button
                onClick={() => handlePremiumTab("culture")}
                className={`flex-1 min-w-[170px] sm:min-w-[190px] text-sm font-medium py-3 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "culture"
                    ? "bg-[#FFFF00] text-black shadow-sm"
                    : "text-[#1E1E1E]"
                }`}
              >
                {!isPremium && <Lock className="w-3.5 h-3.5 flex-shrink-0" />}
                Cultures & Benefits
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-5 border border-[#0000001A] rounded-2xl mt-6 sm:mt-8">
            <div className="lg:col-span-2 space-y-8">
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <>
                  {firmData.aboutFirm && (
                    <div>
                      <h2 className="text-xl sm:text-2xl font-normal text-[#1E1E1E] mb-6">
                        About {firmData.firmName || "Law Firm"}
                      </h2>
                      <p className="text-base text-[#364153] leading-relaxed mb-8">
                        {firmData.aboutFirm}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-6 bg-white border border-[#0000001A] rounded-2xl overflow-hidden">
                        {firmData.practiceAreas && (
                          <div className="space-y-5 p-5">
                            <h3 className="font-normal text-lg text-[#1E1E1E] mb-4 flex items-center gap-2">
                              <Target className="w-4 h-4 text-[#1E1E1E]" />
                              Key Practice Areas
                            </h3>

                            <ul className="space-y-2 text-gray-700">
                              {firmData.practiceAreas
                                .split(",")
                                .map((area, index) => (
                                  <li
                                    key={index}
                                    className="flex gap-2 items-center"
                                  >
                                    <CircleCheckBig className="w-4 h-4 text-green-500" />
                                    {area.trim()}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}

                        {firmData.keyHighlights && (
                          <div className="space-y-5 p-5">
                            <h3 className="font-normal text-lg text-[#1E1E1E] mb-4 flex items-center gap-2">
                              <Award className="w-4 h-4 text-[#1E1E1E]" />
                              Key Highlights
                            </h3>

                            <ul className="space-y-2 text-gray-700">
                              {firmData.keyHighlights
                                .split(",")
                                .map((highlight, index) => (
                                  <li
                                    key={index}
                                    className="flex gap-2 items-center"
                                  >
                                    <CircleCheckBig className="w-4 h-4 text-green-500" />
                                    {highlight.trim()}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {firmData.exertise && !firmData.practiceAreas && (
                    <div className="border-t border-gray-100 pt-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Areas of Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {firmData.exertise.split(",").map((item, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                          >
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {firmData.internshipTraining && (
                    <div className="border-t border-gray-100 pt-8">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-3">
                            Internship & Training
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {firmData.internshipTraining}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Extra cards */}
                  <div className="shadow-md rounded-[12px] pt-6 sm:pt-8 p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/lawicon.png"
                          width={1000}
                          height={1000}
                          alt="Recent Annual Revenue"
                          className="w-6 h-6 object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-normal text-[#1E1E1E] mb-2">
                          {firmData?.recentAnnualRevenue?.title ||
                            "Recent Awards"}
                        </h2>
                        <h3 className="text-base font-normal text-[#4A5565] mb-3">
                          {firmData.recentAnnualRevenue?.description}
                        </h3>

                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          Url Link:{" "}
                          <span className="text-blue-600 text-base break-all">
                            {firmData.recentAnnualRevenue?.link}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shadow-md rounded-[12px] pt-6 sm:pt-8 p-4 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Image
                          src="/lawicon.png"
                          width={1000}
                          height={1000}
                          alt="Recent Works"
                          className="w-6 h-6 object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-normal text-[#1E1E1E] mb-2">
                          {firmData?.recentWorks?.title || "Recent Works"}
                        </h2>
                        <h3 className="text-base font-normal text-[#4A5565] mb-3">
                          {firmData.recentWorks?.description}
                        </h3>

                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          Url Link:{" "}
                          <span className="text-blue-600 text-base break-all">
                            {firmData.recentWorks?.link}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {isPremium && (
                    <>
                      <div className="shadow-md rounded-[12px] pt-6 sm:pt-8 p-4 sm:p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Image
                              src="/lawicon.png"
                              width={1000}
                              height={1000}
                              alt="Technology Initiatives"
                              className="w-6 h-6 object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-normal text-[#1E1E1E] mb-2">
                              {firmData?.technologyInitiatives?.title ||
                                "Technology Initiatives"}
                            </h2>
                            <h3 className="text-base font-normal text-[#4A5565] mb-3">
                              {firmData.technologyInitiatives?.description}
                            </h3>

                            <p className="text-gray-700 text-sm leading-relaxed mb-2">
                              Url Link:{" "}
                              <span className="text-blue-600 text-base break-all">
                                {firmData.technologyInitiatives?.link}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="shadow-md rounded-[12px] pt-6 sm:pt-8 p-4 sm:p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Image
                              src="/lawicon.png"
                              width={1000}
                              height={1000}
                              alt="Diversity, Equity & Inclusion"
                              className="w-6 h-6 object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-normal text-[#1E1E1E] mb-2">
                              {firmData?.diversityEquityAndInclusion?.title ||
                                "Diversity, Equity & Inclusion"}
                            </h2>
                            <h3 className="text-base font-normal text-[#4A5565] mb-3">
                              {
                                firmData.diversityEquityAndInclusion
                                  ?.description
                              }
                            </h3>

                            <p className="text-gray-700 text-sm leading-relaxed mb-2">
                              Url Link:{" "}
                              <span className="text-blue-600 text-base break-all">
                                {firmData.diversityEquityAndInclusion?.link}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="shadow-md rounded-[12px] pt-6 sm:pt-8 p-4 sm:p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Image
                              src="/lawicon.png"
                              width={1000}
                              height={1000}
                              alt="CSR & Pro Bono"
                              className="w-6 h-6 object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-normal text-[#1E1E1E] mb-2">
                              {firmData?.CSRAndProBono?.title ||
                                "CSR & Pro Bono"}
                            </h2>
                            <h3 className="text-base font-normal text-[#4A5565] mb-3">
                              {firmData.CSRAndProBono?.description}
                            </h3>

                            <p className="text-gray-700 text-sm leading-relaxed mb-2">
                              Url Link:{" "}
                              <span className="text-blue-600 text-base break-all">
                                {firmData.CSRAndProBono?.link}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-6">
                    {/* Career Strengths */}
                    <div
                      className="max-w-6xl mx-auto border-2 border-[#BEDBFF] rounded-2xl p-4 sm:p-[32px] shadow-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)",
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 sm:w-[64px] sm:h-[64px]">
                          <Image
                            src="/images/icon11.png"
                            width={1000}
                            height={1000}
                            alt="Career Strengths"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-semibold text-[#1E1E1E] mb-2">
                            Your Career Strengths
                          </h3>
                          <p className="text-sm sm:text-base text-[#4A5565] leading-relaxed mb-4">
                            Based on your profile and interests, this law firm
                            aligns with your strengths in analytical thinking
                            and problem-solving. We found{" "}
                            {recommendedJobsLoading ? "..." : recommendedJobsCount}{" "}
                            new job opportunities that match your profile.
                          </p>

                          {!isPremium && (
                            <Link href="/plans">
                              <button className="bg-[#FFFF00] rounded-[24px] w-full sm:w-[215px] hover:bg-[#FFFF00]/90 text-[#1E1E1E] font-normal py-3 px-2 transition-colors shadow-md">
                                Upgrade Your Plan
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="bg-[#FFFEF0] border-2 border-[#FFFF00] rounded-2xl p-5 sm:p-6 shadow-sm w-full sm:w-[80%] lg:w-[60%] mx-auto">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <Image
                            src="/images/icon2.png"
                            width={1000}
                            height={1000}
                            alt="Motivational Quote"
                            className="w-6 h-6 sm:w-7 sm:h-7 object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#1E1E1E] text-base sm:text-lg text-center font-medium italic leading-relaxed">
                            "Success is the sum of small efforts repeated day in
                            and day out."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* POSITIONS TAB */}
              {activeTab === "positions" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Open Positions
                  </h2>
                  <ShowOpenPosition firmName={firmData?.firmName} />
                </div>
              )}

              {/* CULTURE TAB */}
              {activeTab === "culture" && (
                <div className="space-y-6">
                  <div className="border border-[#0000001A] rounded-[12px] py-6">
                    <h2 className="text-xl font-medium mb-4 px-4 sm:px-6">
                      Culture & Benefits
                    </h2>

                    <div className="px-4 sm:px-6">
                      {Array.isArray(firmData?.cultureAndValue) &&
                      firmData.cultureAndValue.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                          {firmData.cultureAndValue.map(
                            (item: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 text-gray-700"
                              >
                                <div className="w-10 h-10 bg-[#FFFF00] flex justify-center items-center rounded-full">
                                  <CircleCheckBig className="w-5 h-5 text-[#1E1E1E] mt-1 flex-shrink-0" />
                                </div>
                                <p className="leading-relaxed text-[#364153]">
                                  {item}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No culture and benefits information available.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border border-[#0000001A] rounded-[12px] py-6">
                    <h2 className="text-xl font-medium mb-4 px-4 sm:px-6">
                      Benefits & Perks
                    </h2>

                    <div className="px-4 sm:px-6">
                      {Array.isArray(firmData?.benefitsAndPerks) &&
                      firmData.benefitsAndPerks.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                          {firmData.benefitsAndPerks.map(
                            (item: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 text-gray-700 p-3 rounded-[8px]"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 100%)",
                                }}
                              >
                                <Award className="w-5 h-5 text-[#155DFC] mt-1 flex-shrink-0" />
                                <p className="leading-relaxed text-base text-[#364153] font-normal">
                                  {item}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No culture and benefits information available.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* END TAB CONTENT */}
        </div>
      </div>

      {/* Optional: put this in globals.css */}
      {/* 
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      */}
    </div>
  );
}

export default ViewDetailsLawFirms;
