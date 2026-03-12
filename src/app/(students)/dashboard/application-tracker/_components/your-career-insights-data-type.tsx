export interface ResumeCompletionApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    averageScore: number;
  };
}


export interface PsychometricScoreApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    averageScore: number;
  };
}
