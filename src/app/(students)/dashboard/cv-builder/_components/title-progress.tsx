"use client";
import { Progress } from "@/components/ui/progress";
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { CvBuilderFormType } from "./cv-making-form";
import { useStudentDashboardStore } from "@/store/studentDashboardStore";

interface TitleProgressProps {
  form: UseFormReturn<CvBuilderFormType>;
}

const TitleProgress = ({ form }: TitleProgressProps) => {

  const formValues = form.watch();

  const calculateCompletion = () => {
    const requiredFields = [
      formValues.firstName,
      formValues.lastName,
      formValues.profession,
      formValues.email,
      formValues.phone,
      formValues.location,

      formValues.cvformet,

      formValues.summary,

      formValues.educationLevel?.[0]?.subject,
      formValues.educationLevel?.[0]?.institution,
      formValues.educationLevel?.[0]?.educationLevel,

      formValues.legalWorkExperience?.[0]?.jobTitle ||
      formValues.nonLegalWorkExperienceSchema?.[0]?.jobTitle,

      formValues.legalWorkExperience?.[0]?.organization ||
      formValues.nonLegalWorkExperienceSchema?.[0]?.organization,

      formValues.achievements?.skills?.[0],
    ];

    const filled = requiredFields.filter(
      (field) => field && field.trim() !== "",
    ).length;

    return Math.round((filled / requiredFields.length) * 100);
  };

  const completionPercentage = calculateCompletion();

  const { setCvCompletion } = useStudentDashboardStore();

  useEffect(() => {
    setCvCompletion(completionPercentage);
  }, [completionPercentage, setCvCompletion]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">CV Builder</h1>
        <p className="text-gray-600">
          Create a professional resume that stands out to employers.
        </p>
      </div>

      <div className="p-4 border-2 rounded-xl border-primary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">CV Completion</h1>
            <p className="text-gray-600">You're almost there! Keep going.</p>
          </div>

          <div>
            <h1 className="text-3xl font-bold">{completionPercentage} %</h1>
          </div>
        </div>

        <div className="mt-5">
          <Progress value={completionPercentage} />
        </div>
      </div>
    </div>
  );
};

export default TitleProgress;
