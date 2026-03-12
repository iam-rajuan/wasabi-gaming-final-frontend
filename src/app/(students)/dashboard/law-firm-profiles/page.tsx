"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import SubscriptionGuard from "@/components/shared/SubscriptionGuard";
import HeaderBanner from "@/components/student/law-firms/HeaderBanner";
import SearchFilterBar from "@/components/student/law-firms/SearchFilterBar";
import StatsSection from "@/components/student/law-firms/StatsSection";
import FeaturedFirms from "@/components/student/law-firms/FeaturedFirms";
import AllFirmsGrid from "@/components/student/law-firms/AllFirmsGrid";
import SavedFirms from "@/components/student/law-firms/SavedFirms";
import WhyUseCard from "@/components/student/law-firms/WhyUseCard";
import Image from "next/image";

export default function LawFirmDirectoryPage() {
  const [showSaved, setShowSaved] = useState(false);
  const [savedCount] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  return (
    <SubscriptionGuard requireSubscription={true} requireLogin={true} requiredPlan="basic" message="Please choose a plan to access Law Firm profiles">
      <div className="min-h-screen bg-[linear-gradient(135deg,#FEFCE8_0%,#FFFFFF_50%,#EFF6FF_100%)] px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:p-12">
        {/* ✅ Only apply container sizing on lg so mobile/tablet doesn’t feel cramped */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 w-full lg:container lg:mx-auto">
          {showSaved && (
            <Button
              variant="outline"
              onClick={() => setShowSaved(false)}
              className="h-10 px-4 rounded-xl gap-2 hover:bg-white w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Law Firms Directory
            </Button>
          )}

          {!showSaved && <HeaderBanner />}

          <SearchFilterBar
            onSavedClick={() => setShowSaved(!showSaved)}
            savedCount={savedCount}
            showSaved={showSaved}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />

          {showSaved ? (
            <SavedFirms />
          ) : (
            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              <section>
                <h4 className="mb-3 sm:mb-4 md:mb-6 flex items-center gap-2 text-base sm:text-lg md:text-2xl font-normal text-[#1E1E1E]">
                  <Image
                    src="/images/star.png"
                    width={1000}
                    height={1000}
                    alt="star"
                    className="w-6 h-6 sm:w-7 sm:h-7 object-cover"
                  />
                  Featured Law Firms
                </h4>
                <FeaturedFirms />
              </section>

              <section>
                <h4 className="mb-3 sm:mb-4 md:mb-6 text-base sm:text-lg md:text-2xl font-normal text-[#1E1E1E]">
                  All Law Firms
                </h4>
                <AllFirmsGrid searchTerm={searchTerm} selectedTag={selectedTag} />
              </section>

              <StatsSection />
              <WhyUseCard />
            </div>
          )}
        </div>
      </div>
    </SubscriptionGuard>
  );
}
