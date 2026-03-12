import React from "react";
import ReviewInterview from "./_components/review-interview";

const page = () => {
  return (
    <div className="container mt-5 mb-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Interview Summary </h1>
        <p className="text-gray-600">
          Practice real law firm-style interviews, build confidence, and improve
          your performance.
        </p>
      </div>

      <div className="w-full h-[1px] bg-black"></div>

      <div>
        <ReviewInterview />
      </div>
    </div>
  );
};

export default page;
