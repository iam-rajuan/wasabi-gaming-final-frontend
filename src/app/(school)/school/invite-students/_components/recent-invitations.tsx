'use client';

import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { GetAllRecentInviteApiResponse } from "./recent-invitations-data-type";
import WasabiPagination from "@/components/ui/WasabiPagination";
import { useState } from "react";

function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} hour ago`;
  }

  return `${diffDays} day ago`;
}


/* -------------------------------
   Loading Skeleton
-------------------------------- */
function InvitationSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="h-3 w-20 bg-gray-100 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------
   Error State
-------------------------------- */
function ErrorState({ message }: { message?: string }) {
  return (
    <div className="p-6 border border-red-200 bg-red-50 rounded-xl text-center">
      <p className="text-sm font-semibold text-red-600">
        Failed to load invitations
      </p>
      <p className="text-xs text-red-500 mt-1">
        {message || "Something went wrong. Please try again."}
      </p>
    </div>
  );
}

/* -------------------------------
   Main Component
-------------------------------- */
export function RecentInvitations() {
  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken;

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } =
    useQuery<GetAllRecentInviteApiResponse>({
      queryKey: ["recent-invitations", currentPage],
      enabled: !!token, // wait until token exists
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/invite-students?page=${currentPage}&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch invitations");
        }

        return res.json();
      },
    });

      const totalPages = data?.meta ? Math.ceil(data.meta.total / data.meta.limit) : 0;

  return (
    <div className="container mx-auto w-full space-y-8 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#1E1E1E]">Recent Invitations</h3>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {isLoading && <InvitationSkeleton />}

        {isError && (
          <ErrorState message={(error as Error)?.message} />
        )}

        {!isLoading && !isError && data?.data?.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-6">
            No invitations found.
          </p>
        )}

        {!isLoading &&
          !isError &&
          data?.data?.map((invitation) => (
            <div
              key={invitation._id}
              className="flex items-center justify-between p-3 md:p-4 lg:p-5 bg-white cursor-pointer rounded-xl border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 md:gap-3 lg:gap-4 flex-1">
                <div className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 bg-[#FFFF00] rounded-full flex items-center justify-center font-normal text-base text-[#1E1E1E]">
                   {invitation.name?.charAt(0)?.toUpperCase() || "N/A"}
                </div>

                <div className="flex-1">
                  <p className="font-normal text-[15px] md:text-base text-[#1E1E1E]">
                    {invitation.name}
                  </p>
                  <p className="font-normal text-[15px] md:text-base text-[#1E1E1E]">
                    {invitation.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-6 shrink-0">
                <p className="text-sm text-[#666666] font-normal">
                  {timeAgo(invitation.createdAt)}
                </p>


                <span
                  className={cn(
                    "text-sm font-normal px-4 py-2 rounded-full",
                    invitation.status === "accepted"
                      ? "bg-[#FFFF00] text-[#1E1E1E]"
                      : "bg-[#F5F5F5] text-[#666666]"
                  )}
                >
                  {invitation.status}
                </span>
              </div>
            </div>

            
          ))}
      </div>

      {/* pagination  */}
        {
          totalPages > 1 && (
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-6">
              <p className="hidden md:block text-base font-normal text-[#68706A] leading-[150%]">
                Showing {currentPage} to 5 of {data?.meta?.total} results
              </p>
              <div>
                <WasabiPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
               <p className="block md:hidden text-base font-normal text-[#68706A] leading-[150%]">
                Showing {currentPage} to 5 of {data?.meta?.total} results
              </p>
            </div>
          )
        }
    </div>
  );
}




