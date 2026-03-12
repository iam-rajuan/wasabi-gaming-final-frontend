export interface AiAssessmentsApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: Meta;
  data: AiAssessment[];
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface AiAssessment {
  _id: string;
  logo: string;
  title: string;
  discription: string;
  duration: number;
  status: "AVAILABLE" | "COMPLETED" | "PENDING";
  type: "WRITTEN_CASE" | "PRESENTATION" | "EMAIL_EXERCISE" | "DUTY_OF_CARE";

  applicationUser: string[];
  createdAt: string;
  updatedAt: string;
}






// export interface AiAssessmentsApiResponse {
//   statusCode: number;
//   success: boolean;
//   message: string;
//   meta: Meta;
//   data: AiAssessment[];
// }


// export interface Meta {
//   total: number;
//   page: number;
//   limit: number;
// }


// export interface AiAssessment {
//   _id: string;
//   logo: string;
//   title: string;
//   score: string;
//   icon: string;
//   discription: string; // keeping backend spelling
//   duration: number; // in minutes
//   status: "AVAILABLE" | "COMPLETED" | "PENDING"; // extend if needed
//   applicationUser: string[];
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
//   __v: number;
// }


// export interface AiAssessmentUI {
//   id: string;
//   logo: string;
//   title: string;
//   description: string;
//   duration: number;
//   status: string;
//   users: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }


