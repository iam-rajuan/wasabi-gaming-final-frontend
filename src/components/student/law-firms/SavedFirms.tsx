
"use client";

import { useQuery } from "@tanstack/react-query";
import LawFirmCard from "./LawFirmCard";
import { useSession } from "next-auth/react";

export interface LawFirm {
  _id: string;
  firmName: string;
  tagline: string;
  location: string;
  size: string;
  coverImage: string;
  gradient: string;
  tags: string[];
  featured?: boolean;
  aboutFirm: string;
  exertise: string[];     // ← note: typo in your code (should be expertise?)
  bookmarkedUser?: string[];
}



export default function SavedFirms() {
    const sellsion= useSession();
    const token = sellsion?.data?.accessToken
    async function fetchBookmarks(): Promise<LawFirm[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/law-bookmark/`, {
  
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch bookmarks");

  const json = await res.json();
  if (!json?.success || !Array.isArray(json.data?.bookmarkedLaws)) {
    return [];
  }

  return json.data.bookmarkedLaws.map((item: any) => ({
    _id: item._id,
    firmName: item.firmName || "Unnamed Firm",
    tagline:
      item.keyHighlights ||
      item.description?.slice(0, 80) + (item.description?.length > 80 ? "..." : "") ||
      "No description available",
    location: item.location || "—",
    size: item.numberOfAttorneys
      ? `${item.numberOfAttorneys}+`
      : item.foundationYear
      ? `${new Date().getFullYear() - item.foundationYear}+ yrs`
      : "—",
    tags: item.tags || [],
    coverImage: item.coverImage || item.logo || "",
    gradient: "from-amber-50 to-yellow-50",
    featured: false,
    aboutFirm: item.aboutFirm || item.description || "",
    exertise: item.tags || [],
    bookmarkedUser: item.bookmarkedUser || [],
  }));
}
  const {
    data: firms = [],
    isLoading,
    isError,
    error,
  } = useQuery<LawFirm[]>({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });

  if (isLoading) {
    return <div className="py-12 text-center text-gray-500">Loading saved firms...</div>;
  }

  if (isError) {
    return (
      <div className="py-12 text-center text-red-600">
        {error instanceof Error ? error.message : "Failed to load saved firms"}
      </div>
    );
  }

  if (firms.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-xl font-medium text-gray-700">No saved law firms yet</p>
        <p className="mt-3 text-gray-500">
          Bookmark firms you're interested in to see them here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">Saved Law Firms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {firms.map((firm) => (
          <LawFirmCard key={firm._id} firm={firm} isBookmarked={true} disabled={false} />
        ))}
      </div>
    </div>
  );
}