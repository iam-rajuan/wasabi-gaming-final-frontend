import { createBrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/home/Home";
import SchoolAbout from "../page/about/SchoolAbout";
import ContactUs from "../page/contact/ContactUs";
import ManageStudents from "../page/school/ManageStudents";
import InviteStudents from "../page/school/InviteStudents";
import { PremiumFeatures } from "../page/school/PremiumFeatures";
import DashboardLayout from "../layout/DashboardLayout";
import Psychometric from "../page/student/Psychometric/Psychometric";
import MockInterview from "../page/student/MockInterview/MockInterview";
import SignUp from "../page/auth/SignUp";
import VerifyIdentity from "../page/auth/VerifyIdentity";
import Success from "../page/auth/Success";
import Login from "../page/auth/Login";
import ResetPassword from "../page/auth/ResetPassword";
import ForgotPassword from "../page/auth/ForgotPassword";
import WrongPassword from "../page/auth/WrongPassword";
import LawFirmDirectory from "../page/student/LawFirm/LawFirmDirectory";
import ProfileSettingsSection from "../page/student/ProfileSettingsSection/ProfileSettingsSection";
import EventListPage from "../page/student/Portfolio/Portfolio";
import ApplicationTracker from "../page/student/ApplicationTracker/ApplicationTracker";
import Courses from "../page/student/courses/Courses";
import { PaymentPage } from "../page/student/courses/PaymentPage";
import { CourseDetails } from "../page/student/courses/CourseDetails";
import LawFirmProfile from "../page/student/LawFirm/LawFirmProfile";
import PrivacyPolicies from "../page/privacyPolicies/PrivacyPolicies";
import AIAssessmentCentre from "../page/student/AIAssessmentCentre/AIAssessmentCentre";
import StudentAbout from "@/components/about/studentAbout/StudentAbout";
import CareerDashboard from "@/components/Dashboard/CareerDashboard";
import CVBuilder from "@/components/Dashboard/cvBuild/CVBuilder";
import CoverLetterBuilder from "@/components/Dashboard/CoverLetter/CoverLetterBuilder";
import StudentApplications from "@/components/school/student-management/StudentApplications";
import InviteStudent from "@/components/school/student-management/InviteStudent";
import { SchoolPrivateRoute, StudentPrivateRoute } from "./PrivateRoute";
import SchoolProfile from "@/page/school/SchoolProfile";

// Wrapper for VerifyIdentity to use navigate
// eslint-disable-next-line react-refresh/only-export-components
const VerifyIdentityWrapper = () => {
  const navigate = useNavigate();
  return (
    <VerifyIdentity
      email="johndoe@example.com"
      onSuccess={() => navigate("/success")}
    />
  );
};

// Wrapper for Success to use navigate
// eslint-disable-next-line react-refresh/only-export-components
const SuccessWrapper = () => {
  const navigate = useNavigate();
  return <Success onGoHome={() => navigate("/dashboard")} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about-us/school",
        element: <SchoolAbout />,
      },
      {
        path: "about-us/student",
        element: <StudentAbout />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/manage-students",
        element: <SchoolPrivateRoute><ManageStudents /></SchoolPrivateRoute>,
      },
      {
        path: "/school-profile",
        element: <SchoolPrivateRoute><SchoolProfile /></SchoolPrivateRoute>,
      },
      {
        path: "/student/applications/:studentId",
        element: <SchoolPrivateRoute><StudentApplications /></SchoolPrivateRoute>,
      },
      {
        path: "/student/invite/:studentId",
        element: <SchoolPrivateRoute><InviteStudent /></SchoolPrivateRoute>,
      },
      // {
      //   path: "/CareerDashboard",
      //   element: <CareerDashboard />,
      // },
      // {
      //   path: "/Cv-build",
      //   element: <CVBuilder></CVBuilder>,
      // },

      {
        path: "/invite-students",
        element: <SchoolPrivateRoute><InviteStudents /></SchoolPrivateRoute>,
      },
      {
        path: "/premium-features",
        element: <SchoolPrivateRoute><PremiumFeatures /></SchoolPrivateRoute>,
      },
      {
        path: "/portfolio",
        element: <EventListPage />,
      },
      {
        path: "/privacy-policies",
        element: <PrivacyPolicies />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <StudentPrivateRoute>
        <DashboardLayout />
      </StudentPrivateRoute>,
    children: [
      {
        index: true,
        element: <CareerDashboard />,
        // element: <DashboardDemo />,
      },
      {
        path: "psychometric-test",
        element: <Psychometric />,
      },
      {
        path: "cv-builder",
        element: <CVBuilder></CVBuilder>,
      },
      {
        path: "cover-letter",
        element: <CoverLetterBuilder></CoverLetterBuilder>,
      },
      {
        path: "ai-assessment-centre",
        element: <AIAssessmentCentre />,
      },
      {
        path: "mock-interview",
        element: <MockInterview />,
      },
      {
        path: "law-firm-profiles",
        element: <LawFirmDirectory />,
      },
      {
        path: "law-firm-profile/:id",
        element: <LawFirmProfile />,
      },
      {
        path: "application-tracker",
        element: <ApplicationTracker />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "course/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "payment/:courseId",
        element: <PaymentPage />,
      },
      {
        path: "profile",
        element: <ProfileSettingsSection />,
      },
    ],
  },

  { path: "/signUp", element: <SignUp /> },
  { path: "/verify-identity", element: <VerifyIdentityWrapper /> },
  { path: "/success", element: <SuccessWrapper /> },
  { path: "/login", element: <Login /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/wrong-password", element: <WrongPassword /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
]);

export default router;
