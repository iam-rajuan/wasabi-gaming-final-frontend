


"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  CheckCircle2,
  Trophy,
  BookOpen,
  GraduationCap,
  Award,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import QuizModal from "./quiz-modal";
import RatingModal from "./RatingModal";
import CourseDetailsSkeleton from "./CourseDetailsSkeleton";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SingleCourseResponse } from "@/types/course";
import { useSession } from "next-auth/react";

/**
 * ✅ Certificate API response type
 */
type CertificateDownloadResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: {
    certificateId: string;
    issuedAt: string;
    downloadUrl: string;
  };
};

const SingelCourse = ({ id }: { id: string }) => {
  const router = useRouter();

  const { data: sessionData, status } = useSession();
  const token = (sessionData as any)?.accessToken as string | undefined;

  const { data, isLoading, isError, refetch } = useQuery<SingleCourseResponse>({
    queryKey: ["single-course", id, token],
    enabled: Boolean(id && token),
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/course/${id}/student`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to load course");
      return res.json();
    },
  });

  const course = data?.data;
  const lessons = course?.courseVideo || [];

  const [currentLesson, setCurrentLesson] = useState<
    (typeof lessons)[0] | null
  >(null);

  const [openQuiz, setOpenQuiz] = useState(false);
  const [openRating, setOpenRating] = useState(false);

  // Per-video complete loading state
  const [completeLoading, setCompleteLoading] = useState(false);

  // ✅ Certificate download loading
  const [certificateLoading, setCertificateLoading] = useState(false);

  // Backend যদি completed না পাঠায়, UI session এ track করার জন্য
  const [completedNowMap, setCompletedNowMap] = useState<Record<string, boolean>>(
    {}
  );

  // Set first lesson as default on load
  useEffect(() => {
    if (lessons.length > 0 && !currentLesson) {
      setCurrentLesson(lessons[0]);
    }
  }, [lessons, currentLesson]);

  // Current index + last lesson detect
  const currentIndex = useMemo(() => {
    if (!currentLesson) return -1;
    return lessons.findIndex((l) => l._id === currentLesson._id);
  }, [currentLesson, lessons]);

  const isLastLesson = lessons.length > 0 && currentIndex === lessons.length - 1;

  // Completed detect (backend field OR local map)
  const isCompleted = useMemo(() => {
    if (!currentLesson) return false;
    return Boolean(
      (currentLesson as any).completed ||
        (currentLesson as any).isCompleted ||
        completedNowMap[currentLesson._id]
    );
  }, [currentLesson, completedNowMap]);

  // Overall course completion (সব ভিডিও complete হলে true) - optional
  const allCompleted = useMemo(() => {
    if (!lessons.length) return false;
    return lessons.every((l) =>
      Boolean((l as any).completed || (l as any).isCompleted || completedNowMap[l._id])
    );
  }, [lessons, completedNowMap]);

  // Progress calculation (quiz attempted ভিত্তিক তোমার আগের logic রাখা হলো)
  const attemptedCount = lessons.filter((l) => Boolean((l as any).attempted)).length;
  const progressValue = lessons.length > 0 ? (attemptedCount / lessons.length) * 100 : 0;

  // ✅ Complete API call
  const handleComplete = async () => {
    if (!token) return alert("Token missing. Please login again.");
    if (!course?._id) return alert("Course not found");
    if (!currentLesson?._id) return alert("Video not found");

    try {
      setCompleteLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/video-progress/course/${course._id}/video/${currentLesson._id}/complete`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to complete video");
      }

      // local update
      setCompletedNowMap((prev) => ({
        ...prev,
        [currentLesson._id]: true,
      }));

      // server updated data আনতে refetch
      await refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      alert(message);
    } finally {
      setCompleteLoading(false);
    }
  };

  /**
   * ✅ Download Certificate
   * GET /certificate/course/:id/download
   * response থেকে data.downloadUrl নিয়ে open/redirect করবে
   */
  const handleDownloadCertificate = async () => {
    if (!token) return alert("Token missing. Please login again.");
    const courseId = course?._id || id;
    if (!courseId) return alert("Course id missing");

    try {
      setCertificateLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/certificate/course/${courseId}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to get certificate");
      }

      const json = (await res.json()) as CertificateDownloadResponse;
      const downloadUrl = json?.data?.downloadUrl;

      if (!downloadUrl) throw new Error("downloadUrl missing from response");

      // ✅ new tab open (best)
      window.open(downloadUrl, "_blank", "noopener,noreferrer");

      // ✅ same tab redirect (alternative)
      // window.location.href = downloadUrl;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      alert(message);
    } finally {
      setCertificateLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (isError || !course) return <p>Something went wrong</p>;

  return (
    <div className="container mx-auto p-6 bg-white min-h-screen mb-6 font-sans">
      {/* ================= HEADER ================= */}
      <header className="mb-8 flex items-center gap-4 pb-4">
        <Button
          onClick={() => router.push("/dashboard/courses")}
          variant="outline"
          size="sm"
          className="text-xs rounded-full border-slate-300 flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Courses
        </Button>
        <div>
          <h1 className="text-2xl text-slate-800">{course.name}</h1>
          <p className="text-slate-500 text-sm">
            Grade {course.gradeLevel} • {course.category}
          </p>
        </div>
      </header>

      {/* ================= PROGRESS ================= */}
      <Card className="mb-8 border-[#0000001A] rounded-2xl shadow-sm">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-[#1E1E1E]">Your Progress</h2>
            <Badge
              className={`text-slate-900 text-[10px] px-2 py-0.5 ${
                lessons.length > 0 && lessons.every((l) => Boolean((l as any).attempted))
                  ? "bg-green-500 text-white"
                  : "bg-[#FFFF00]"
              }`}
            >
              {attemptedCount} of {lessons.length} quizzes submitted
            </Badge>
          </div>

          <Progress
            value={progressValue}
            className={`h-2 rounded-full ${
              lessons.length > 0 && lessons.every((l) => Boolean((l as any).attempted))
                ? "bg-green-500"
                : ""
            }`}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT: LESSON LIST ================= */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-[#1E1E1E] mb-4">Course Content</h3>

          {lessons.map((lesson) => {
            const lessonDone = Boolean(
              (lesson as any).completed ||
                (lesson as any).isCompleted ||
                completedNowMap[lesson._id]
            );

            return (
              <div
                key={lesson._id}
                onClick={() => setCurrentLesson(lesson)}
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer
                  ${
                    currentLesson?._id === lesson._id
                      ? "bg-[#FEFCE8] border-[#FFFF00]"
                      : "bg-white border-slate-200"
                  }`}
              >
                <CheckCircle2
                  className={`w-5 h-5 mt-0.5 ${
                    lessonDone ? "text-green-500" : "text-slate-300"
                  }`}
                />

                <div>
                  <p className="text-sm font-semibold text-[#1E1E1E]">
                    {(lesson as any).title}
                  </p>
                  {lessonDone && (
                    <p className="text-[11px] text-green-600 mt-1">
                      Video Completed
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= RIGHT: VIDEO + DETAILS ================= */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-slate-100 shadow-sm">
            <div className="aspect-video bg-black">
              {currentLesson && (
                <video
                  key={(currentLesson as any).url}
                  className="w-full h-full object-cover"
                  controls
                >
                  <source src={(currentLesson as any).url} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              )}
            </div>
          </Card>

          <Card className="mt-4 p-6">
            <h2 className="text-xl font-bold text-slate-800">
              {(currentLesson as any)?.title}
            </h2>
            <p className="text-slate-500 text-sm mt-2">{course.description}</p>

            {/* ✅ COMPLETE + DOWNLOAD */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                onClick={handleComplete}
                disabled={completeLoading || !currentLesson || isCompleted}
                className="bg-[#FFFF00] text-slate-900 rounded-xl"
              >
                {isCompleted
                  ? "Completed"
                  : completeLoading
                  ? "Completing..."
                  : "Complete"}
              </Button>

              {/* ✅ last video complete হলে download */}
              {isLastLesson && isCompleted && (
                <Button
                  onClick={handleDownloadCertificate}
                  disabled={certificateLoading}
                  className="bg-[#FFFF00] text-[#1E1E1E] rounded-xl"
                >
                  {certificateLoading ? "Preparing..." : "Download Certificate"}
                </Button>
              )}

              {/* ✅ alternative: সব ভিডিও complete হলে download */}
              {/* {allCompleted && (
                <Button
                  onClick={handleDownloadCertificate}
                  disabled={certificateLoading}
                  className="bg-slate-900 text-white rounded-xl"
                >
                  {certificateLoading ? "Preparing..." : "Download Certificate"}
                </Button>
              )} */}
            </div>

            {isLastLesson && !isCompleted && (
              <p className="text-xs text-slate-500 mt-2">
                You can complete this course by watching the last video.
              </p>
            )}
          </Card>
        </div>
      </div>

      {/* ================= QUIZ CARD ================= */}
      <Card className="mt-8 bg-[linear-gradient(135deg,#FEFCE8_0%,#FFF7ED_100%)] border-2 rounded-xl border-[#FFFF00]">
        <CardContent className="p-8 flex flex-col md:flex-row gap-6">
          <div className="h-16 w-16 flex bg-[#FFFF00] items-center justify-center rounded-xl">
            <Award className="text-[#1E1E1E]" size={20} />
          </div>

          <div className="flex-1">
            <h3 className="text-xl text-slate-800">Ready for the Quiz?</h3>

            <p className="text-slate-600 text-sm mt-1">
              Quiz data comes from selected video.
            </p>

            <div className="flex gap-4 mt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {((currentLesson as any)?.quiz?.length as number) || 0} Questions
              </span>

              <span className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                70% to Pass
              </span>

              <span className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                Certificate
              </span>
            </div>

            {Boolean((currentLesson as any)?.attempted) && (
              <p className="text-sm font-semibold text-green-500 mt-2">
                You have already attempted the quiz.
              </p>
            )}

            {((currentLesson as any)?.quiz?.length as number) === 0 && (
              <p className="text-sm font-semibold text-red-500 mt-2">
                No quiz available for this lesson.
              </p>
            )}

            <Button
              onClick={() => setOpenQuiz(true)}
              disabled={Boolean((currentLesson as any)?.attempted) || !((currentLesson as any)?.quiz?.length)}
              className="mt-6 bg-[#FFFF00] text-slate-900 rounded-xl"
            >
              Take Quiz
            </Button>

            <Button
              onClick={() => setOpenRating(true)}
              className="mt-6 ml-5 bg-[#FFFF00] text-slate-900 rounded-xl"
            >
              Rate this course
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= MODALS ================= */}
      <QuizModal
        open={openQuiz}
        setOpen={setOpenQuiz}
        courseId={course._id}
        currentLesson={currentLesson}
      />

      <RatingModal
        token={token || ""}
        courseId={id}
        open={openRating}
        onOpenChange={setOpenRating}
      />
    </div>
  );
};

export default SingelCourse;