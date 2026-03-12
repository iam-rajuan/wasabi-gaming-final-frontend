"use client";
import React, { useState } from "react";
import MockInterviewDetails from "./mock-interview-details";
import Interview from "./interview";
import { useInterviewSessionStore } from "@/zustand/useInterviewSessionId";
import { toast } from "sonner";

const DetailsLayout = () => {
  const [showInterview, setShowInterview] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setInterviewSessionId } = useInterviewSessionStore();

  const handleProceed = async (interviewData: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-interview-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${interviewData.token}`,
          },
          body: JSON.stringify({
            category: "Technical Interview",
            questionNumber: "3",
          }),
        },
      );

      const result = await response.json();
      if (result.success) {
        setSessionData(result.data.session);
        setInterviewSessionId(result?.data?.session?._id);
        setShowInterview(true);
      } else {
        throw new Error(result.message || "Failed to create session");
      }
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create session",
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {!showInterview ? (
        <MockInterviewDetails onProceed={handleProceed} />
      ) : (
        <Interview
          sessionData={sessionData}
          onBack={() => setShowInterview(false)}
          isLoading={loading}
        />
      )}
    </div>
  );
};

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-300px)]">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 border-t-4 rounded-full border-primary solid border- animate-spin"></div>
      <p className="text-lg font-semibold text-gray-700">
        Setting up your interview session...
      </p>
    </div>
  </div>
);

export default DetailsLayout;
