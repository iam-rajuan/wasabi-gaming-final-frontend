"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  Users,
  Clock,
  ChevronRight,
  Search,
  Lock,
  UsersRoundIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CourseResponse } from "@/types/course";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function CourseCard() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data: sessionData } = useSession();
  const token = sessionData?.accessToken;
  const id = sessionData?.user?.id;

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch courses
  const { data, isLoading, isError } = useQuery<CourseResponse>({
    queryKey: ["courses", debouncedSearchTerm, selectedCategory],
    queryFn: async () => {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/course`);

      if (debouncedSearchTerm)
        url.searchParams.append("searchTerm", debouncedSearchTerm);
      if (selectedCategory && selectedCategory !== "All")
        url.searchParams.append("category", selectedCategory);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to load courses");
      return res.json();
    },
  });

  const courses = data?.data ?? [];

  const payMutation = useMutation({
    mutationFn: async (courseId: string) => {
      if (!token) throw new Error("Authentication token missing");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/course/enroll/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to enroll course");
      }

      return response.json();
    },

    onSuccess: (data: any) => {
      console.log(data.data);
      toast.success("enroll successful!");
      console.log(data.url);
      window.location.href = data?.data?.url;
    },

    onError: (err: any) => {
      toast.error(err.message || "Something went wrong");
      console.error(err);
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* SEARCH + FILTER SKELETON */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <Skeleton className="h-10 w-full md:flex-1 rounded-full" />
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </div>
        </section>

        {/* COURSES SKELETON */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden border border-[#0000001A] shadow-sm rounded-2xl bg-white"
            >
              <Skeleton className="h-48 w-full" />
              <CardHeader className="space-y-4 pt-6">
                <Skeleton className="h-4 w-24 rounded-full" />
                <Skeleton className="h-6 w-3/4 rounded-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-5/6 rounded-full" />
                <Skeleton className="h-2 w-full rounded-full mt-4" />
              </CardContent>
              <CardFooter className="pb-6">
                <Skeleton className="h-10 w-full rounded-xl" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <p>Failed to load courses.</p>;

  return (
    <div className="space-y-6">
      {/* SEARCH + FILTER */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F3F3F5] rounded-full  px-10 py-2 text-sm outline-none"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {[
              "All",
              "Mathematics",
              "Science",
              "English",
              "History",
              "Technology",
            ].map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs border ${
                  selectedCategory === cat
                    ? "bg-[#FFFF00] border-[#FFFF00]"
                    : "bg-white border-slate-300 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      {courses.length === 0 && (
        <div className="text-center text-slate-500">
          <p className="text-lg">No courses found.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course._id}
            className="overflow-hidden border border-[#0000001A] shadow-sm rounded-2xl bg-white"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={course?.thumbnail}
                alt={course.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-[#00A63E] text-white px-2 py-1 text-[10px] rounded-full">
                {course.coursePrice || "Free"}
              </Badge>
            </div>

            <CardHeader className="space-y-4 pt-6">
              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className="text-slate-600 border-[#0000001A] border font-normal hover:bg-slate-100"
                >
                  {course.gradeLevel}
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-slate-600 border-[#0000001A] border font-normal hover:bg-slate-100"
                >
                  {course.category}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 leading-tight">
                {course.name}
              </h3>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                {course.description}
              </p>
            <div className="flex gap-3">
  <p className="flex text-[#4A5565] items-center gap-1">
    <UsersRoundIcon className="w-4 h-4" />
    {course.enrolledStudents?.length}
  </p>

  <div className="flex items-center gap-1">
     <span className="ml-1 text-sm text-[#4A5565]">
      {Number(course?.averageRating || 0).toFixed(1)}
    </span>
     {Array.from({ length: 5 }).map((_, index) => {
    const rating = course?.averageRating || 0;
    const full = index + 1 <= Math.floor(rating);
    const half = index + 1 === Math.ceil(rating) && rating % 1 !== 0;

    return (
      <div key={index} className="relative w-4 h-4">
        {/* Empty star */}
        <Star className="w-4 h-4 text-gray-300 absolute" />

        {/* Full star */}
        {full && (
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 absolute" />
        )}

        {/* Half star */}
        {half && (
          <div className="absolute overflow-hidden w-1/2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>
        )}
      </div>
    );
  })}
   
  </div>
</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Progress</span>
                  <span>{course.gradeLevel}</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden">
                  <Progress value={Number(course.gradeLevel)} />
                </div>
              </div>
            </CardContent>

            <CardFooter className="pb-6">
              {id && course?.enrolledStudents?.includes(id) ? (
                <Button
                  onClick={() =>
                    router.push(`/dashboard/courses/${course?._id}`)
                  }
                  className="w-full bg-[#FFFF00] hover:bg-[#FFFF00]/80 text-slate-900 py-2 rounded-xl transition-all flex items-center justify-center"
                >
                  Continue Learning
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              ) : course.coursePrice ? (
                <Button
                  onClick={() => payMutation.mutate(course?._id)}
                  className="w-full flex items-center justify-center hover:bg-[#FFFF00]/5 bg-transparent gap-3 border border-[#0000001A] text-slate-900 py-2 rounded-xl transition-all"
                >
                  <Lock className="ml-2 w-3 h-3" />
                  Enroll Now - {course?.coursePrice}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    router.push(`/dashboard/courses/${course._id}`)
                  }
                  className="w-full bg-[#FFFF00] hover:bg-[#FFFF00]/80 text-slate-900 py-2 rounded-xl transition-all flex items-center justify-center"
                >
                  Continue Learning
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
