
"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import LawFirmCard, { LawFirm } from "./LawFirmCard";

interface LawFirmApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: LawFirm[];
}

type BookmarkApiResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    bookmarkedLaws: Array<{
      _id: string; // firmId
      bookmarkedUser?: string[];
    }>;
  };
};

interface AllFirmsGridProps {
  searchTerm: string;
  selectedTag: string;
}

const AllFirmsGrid = ({ searchTerm, selectedTag }: AllFirmsGridProps) => {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken as string | undefined;
  const userId = (session as any)?.user?.id as string | undefined;

  // ✅ Law firms list
  const { data, isLoading, isError } = useQuery<LawFirmApiResponse>({
    queryKey: ["lawfirms", searchTerm.trim().toLowerCase(), selectedTag],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
      if (selectedTag !== "All") params.set("tags", selectedTag);

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/lawfirm?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load law firms");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  // Bookmark list (single call) → firmId -> bookmarkedUser[]
  const { data: bookmarkMap = {}, isLoading: bmLoading } = useQuery<
    Record<string, string[]>
  >({
    queryKey: ["law-bookmarks", userId],
    enabled: !!token && !!userId,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/law-bookmark`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to load bookmarks");
      const json: BookmarkApiResponse = await res.json();

      const map: Record<string, string[]> = {};
      const arr = json?.data?.bookmarkedLaws ?? [];
      for (const item of arr) {
        map[item._id] = item.bookmarkedUser ?? [];
      }
      return map;
    },
    staleTime: 10_000,
  });

  const firms = data?.data ?? [];

  // helper: is this firm bookmarked by current user?
  const isFirmBookmarked = useMemo(() => {
    if (!userId) return () => false;
    return (firmId: string) => (bookmarkMap[firmId] ?? []).includes(userId);
  }, [bookmarkMap, userId]);

  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500">Loading law firms...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-center py-10 text-red-600">
        Failed to load law firms
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
      {firms.length > 0 ? (
        firms.map((firm) => (
          <div key={firm._id} className="h-full">
            <LawFirmCard
              firm={firm}
              isBookmarked={isFirmBookmarked(firm._id)}
              disabled={!token || !userId || bmLoading}
            />
          </div>
        ))
      ) : (
        <p className="col-span-full text-center py-16 text-gray-500">
          No law firms found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default AllFirmsGrid;
