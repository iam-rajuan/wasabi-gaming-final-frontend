
"use client";

import React from "react";
import LawFirmCard from "./LawFirmCard";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const FeaturedFirms = () => {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken as string | undefined;
  const userId = (session as any)?.user?.id as string | undefined;

  // ✅ featured firms
  const { data: firmsResponse, isLoading, isError } = useQuery({
    queryKey: ["featuredLawFirms"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/lawfirm`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch firms");
      return res.json();
    },
  });

  // ✅ bookmarkMap (SAME KEY AS LawFirmCard)
  const { data: bookmarkMap } = useQuery<Record<string, string[]>>({
    queryKey: ["law-bookmarks", userId],
    enabled: !!userId && !!token,
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/law-bookmark`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // যদি 401/403 হয়, empty map
      if (!res.ok) return {};

      const json = await res.json();

      // ধরলাম API return করে: { data: { bookmarkedLaws: [{_id:...}, ...] } }
      const list = json?.data?.bookmarkedLaws ?? [];

      // map বানাচ্ছি: { [firmId]: [userId] }
      const map: Record<string, string[]> = {};
      for (const f of list) {
        if (f?._id) map[f._id] = [userId!];
      }
      return map;
    },
  });

  if (isLoading) {
    return <p className="text-center py-8 text-gray-500">Loading featured firms...</p>;
  }

  if (isError || !firmsResponse?.success) {
    return <p className="text-center py-8 text-red-600">Could not load featured firms</p>;
  }

  const featured = (firmsResponse.data || []).slice(0, 6);

  if (featured.length === 0) {
    return (
      <p className="text-center py-8 text-gray-600">
        No featured law firms available right now.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {featured.map((firm: any) => {
        const isActuallyBookmarked = !!bookmarkMap?.[firm._id]?.includes(userId || "");

        return (
          <div key={firm._id} className="h-full">
            <LawFirmCard firm={firm} isBookmarked={isActuallyBookmarked} disabled={false} />
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedFirms;
