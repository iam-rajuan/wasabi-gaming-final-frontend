import { z } from "zod";

export const educationSchema = z.object({
  educationLevel: z.string().min(1, "Education level is required"),
  institution: z.string().min(1, "Institution is required"),
  grade: z.string().optional(),
  subject: z.string().optional(),
  startYear: z.string().min(1, "Start year is required"),
  endYear: z.string().min(1, "End year is required"),
});

export const leadershipSchema = z.object({
  role: z.string().min(1, "Find type is required"),
  organization: z.string().min(1, "Organization is required"),
  dateYear: z.string().min(1, "Date year is required"),
  description: z.string().optional(),
});

export const achievementSchema = z.object({
  skills: z.array(z.string()).default([]),
  recommendedSkills: z.array(z.string()).default([]),
});

export const legalWorkExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  organization: z.string().min(1, "Organization is required"),
  keyResponsibilities: z.string().min(1, "Responsibilities are required"),
  startYear: z.string().min(1, "Start year is required"),
  endYear: z.string().optional(),
});

export const nonLegalWorkExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  organization: z.string().min(1, "Organization is required"),
  keyResponsibilities: z.string().min(1, "Responsibilities are required"),
  startYear: z.string().min(1, "Start year is required"),
  endYear: z.string().optional(),
});

export const cvBuilderSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  profession: z
    .string({ required_error: "Profession is required" })
    .min(1, "Profession is required"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  legalWorkExperience: z.array(legalWorkExperienceSchema).default([]),
  nonLegalWorkExperienceSchema: z
    .array(nonLegalWorkExperienceSchema)
    .default([]),

  educationLevel: z.array(educationSchema).default([]),
  leadership: z.array(leadershipSchema).default([]),

  achievements: achievementSchema.default({
    skills: [],
    recommendedSkills: [],
  }),

  summary: z.string().optional(),

  cvformet: z.string().optional(),
});
