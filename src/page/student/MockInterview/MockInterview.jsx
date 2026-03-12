import { useState } from "react";
import AvailableInterviews from "../../../components/student/mockInterview/AvailableInterviews";
import Instructions from "../../../components/student/mockInterview/Instructions";
import InterviewSession from "../../../components/student/mockInterview/InterviewSession";
import Results from "../../../components/student/mockInterview/Results";

export default function MockInterview() {
  const [currentPage, setCurrentPage] = useState("available");
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  const handleStartTest = (interview) => {
    setSelectedInterview(interview);
    setCurrentPage("instructions");
  };

  const handleProceed = () => {
    setCurrentPage("interview");
  };

  const handleFinishInterview = (results) => {
    setSessionData(results);
    setCurrentPage("results");
  };

  const handlePracticeAgain = () => {
    setSelectedInterview(null);
    setSessionData(null);
    setCurrentPage("available");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === "available" && (
        <AvailableInterviews onStartTest={handleStartTest} />
      )}
      {currentPage === "instructions" && (
        <Instructions interview={selectedInterview} onProceed={handleProceed} />
      )}
      {currentPage === "interview" && (
        <InterviewSession
          interview={selectedInterview}
          onFinish={handleFinishInterview}
          onBack={() => setCurrentPage("available")}
        />
      )}
      {currentPage === "results" && (
        <Results
          sessionData={sessionData}
          interview={selectedInterview}
          onPracticeAgain={handlePracticeAgain}
        />
      )}
    </div>
  );
}
