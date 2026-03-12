
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Users, Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export interface LawFirm {
  aboutFirm: any;
  exertise: any;
  _id: string;
  firmName: string;
  tagline: string;
  location: string;
  size: string;
  coverImage: string;
  tags: string[];
  gradient: string;
  featured?: boolean;
  disabled?: boolean;
  bookmarkedUser?: string[];
}

const LawFirmCard = ({
  firm,
  isBookmarked,
  disabled,
}: {
  firm: LawFirm;
  isBookmarked: boolean;
  disabled: boolean;
}) => {
  const visibleTags = firm.tags?.slice(0, 2) ?? [];
  const extraCount = (firm.tags?.length ?? 0) - visibleTags.length;

  const { data: session } = useSession();
  const token = (session as any)?.accessToken as string | undefined;
  const userId = (session as any)?.user?.id as string | undefined;

  const queryClient = useQueryClient();

  // ✅ helper for optimistic map update
  const updateBookmarkMap = (
    current: Record<string, string[]>,
    firmId: string,
    userId: string,
    makeBookmarked: boolean
  ) => {
    const next = { ...current };
    const list = next[firmId] ? [...next[firmId]] : [];

    if (makeBookmarked) {
      if (!list.includes(userId)) list.push(userId);
      next[firmId] = list;
      return next;
    }

    next[firmId] = list.filter((id) => id !== userId);
    return next;
  };

  // ✅ helper for optimistic firm list update
  const patchFirmList = (oldData: any) => {
    if (!oldData) return oldData;

    // case: api returns { data: [...] }
    if (Array.isArray(oldData?.data)) {
      return {
        ...oldData,
        data: oldData.data.map((f: any) => {
          if (f._id !== firm._id) return f;

          const prevUsers = Array.isArray(f.bookmarkedUser)
            ? f.bookmarkedUser
            : [];

          const nextUsers = !isBookmarked
            ? prevUsers.includes(userId)
              ? prevUsers
              : [...prevUsers, userId]
            : prevUsers.filter((id: string) => id !== userId);

          return { ...f, bookmarkedUser: nextUsers };
        }),
      };
    }

    // case: api returns array directly
    if (Array.isArray(oldData)) {
      return oldData.map((f: any) => {
        if (f._id !== firm._id) return f;

        const prevUsers = Array.isArray(f.bookmarkedUser) ? f.bookmarkedUser : [];

        const nextUsers = !isBookmarked
          ? prevUsers.includes(userId)
            ? prevUsers
            : [...prevUsers, userId]
          : prevUsers.filter((id: string) => id !== userId);

        return { ...f, bookmarkedUser: nextUsers };
      });
    }

    return oldData;
  };

  const { mutate: toggleBookmark, isPending } = useMutation({
    mutationFn: async () => {
      if (!token || !userId) throw new Error("Not authenticated");

      if (isBookmarked) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/law-bookmark/${firm._id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to remove bookmark");
        return { action: "deleted" as const };
      } else {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/law-bookmark`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookmarkedLaws: firm._id }),
        });
        if (!res.ok) throw new Error("Failed to add bookmark");
        return { action: "added" as const };
      }
    },

    onMutate: async () => {
      if (!userId) return;

      // ✅ cancel queries
      await queryClient.cancelQueries({ queryKey: ["law-bookmarks", userId] });
      await queryClient.cancelQueries({ queryKey: ["lawfirms"] });
      await queryClient.cancelQueries({ queryKey: ["featuredLawFirms"] });

      // ✅ snapshot previous
      const previousBookmarks =
        queryClient.getQueryData<Record<string, string[]>>(["law-bookmarks", userId]) ??
        {};

      const previousFeatured = queryClient.getQueryData(["featuredLawFirms"]);
      const previousLawfirms = queryClient.getQueriesData({ queryKey: ["lawfirms"] });

      // ✅ optimistic update bookmarkMap
      queryClient.setQueryData<Record<string, string[]>>(
        ["law-bookmarks", userId],
        (old = {}) => updateBookmarkMap(old, firm._id, userId, !isBookmarked)
      );

      // ✅ optimistic update all lawfirms caches (সব variation)
      queryClient.setQueriesData({ queryKey: ["lawfirms"] }, (oldData: any) =>
        patchFirmList(oldData)
      );

      // ✅ optimistic update featured list cache (IMPORTANT FIX)
      queryClient.setQueryData(["featuredLawFirms"], (oldData: any) =>
        patchFirmList(oldData)
      );

      return { previousBookmarks, previousFeatured, previousLawfirms };
    },

    onError: (_err, _vars, ctx) => {
      if (!userId) return;

      // ✅ rollback bookmark map
      if (ctx?.previousBookmarks) {
        queryClient.setQueryData(["law-bookmarks", userId], ctx.previousBookmarks);
      }

      // ✅ rollback featured list
      if (ctx?.previousFeatured) {
        queryClient.setQueryData(["featuredLawFirms"], ctx.previousFeatured);
      }

      // ✅ rollback all lawfirms variations
      if (ctx?.previousLawfirms && Array.isArray(ctx.previousLawfirms)) {
        ctx.previousLawfirms.forEach(([key, data]: any) => {
          queryClient.setQueryData(key, data);
        });
      }
    },

    onSettled: () => {
      if (!userId) return;

      // ✅ refetch all relevant lists
      queryClient.invalidateQueries({ queryKey: ["law-bookmarks", userId] });
      queryClient.invalidateQueries({ queryKey: ["lawfirms"] });
      queryClient.invalidateQueries({ queryKey: ["featuredLawFirms"] });
    },
  });

  return (
    <Card className="rounded-3xl overflow-hidden border-gray-200 shadow-sm w-full max-w-full mx-auto flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Header */}
      <div
        className={`bg-gradient-to-r ${
          firm.gradient || "from-blue-50 to-blue-100"
        } p-4 md:p-6 flex justify-center items-center relative h-24 md:h-32`}
      >
        <div
          className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center p-2 md:p-4 bg-white shadow-md z-10"
          style={{
            background: "linear-gradient(135deg, #00C950 0%, #009966 100%)",
          }}
        >
          {firm.coverImage ? (
            <img
              src={firm.coverImage}
              alt={`${firm.firmName} logo`}
              className="w-full h-full object-cover rounded-[8px]"
            />
          ) : (
            <div className="text-white font-bold text-xl">
              {firm.firmName?.[0]}
            </div>
          )}
        </div>

        {firm.featured && (
          <span className="absolute top-2 right-2 md:top-4 md:right-4 rounded-full font-medium bg-[#ffff00] text-black text-xs md:text-sm px-3 py-1">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl font-medium text-gray-900">
          {firm.firmName}
        </h3>

        <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
          {firm.tagline}
        </p>

        <div className="mt-3 md:mt-4 flex items-center gap-4 text-xs md:text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <MapPin className="!w-4 !h-4 text-[#FFFF00]" />
            <span>{firm.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="!w-4 !h-4 text-[#FFFF00]" />
            <span>{firm.size}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {visibleTags.map((tag, i) => (
            <Badge
              key={i}
              variant="outline"
              className="rounded-full font-normal text-gray-600 border-gray-300"
            >
              {tag}
            </Badge>
          ))}
          {extraCount > 0 && (
            <Badge
              variant="outline"
              className="rounded-full font-normal text-gray-600 border-gray-300"
            >
              +{extraCount} more
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-6 flex items-center gap-3">
          <button
            disabled={disabled || isPending}
            onClick={() => toggleBookmark()}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
            title={isBookmarked ? "Remove bookmark" : "Bookmark"}
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                isBookmarked
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>

          <Link href={`/dashboard/law-firm-profiles/${firm._id}`} className="flex-1">
            <Button className="w-full bg-[#ffff00] hover:bg-[#e6e600] text-black font-medium border-none rounded-xl h-7 md:h-[36px]">
              View Profile <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default LawFirmCard;
