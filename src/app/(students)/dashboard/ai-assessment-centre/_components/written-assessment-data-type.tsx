export type WrittenAiAssessmentApiResponse = {
  statusCode: number
  success: boolean
  message: string
  data: AiAssessmentData
}


export type AiAssessmentData = {
  _id: string
  aiassigmentId: AiAssignment
  roleContext: string
  ventaraAutomotive: string

  successTips: string[]
  recommendations: string[]

  applicant: Applicant

  createdAt: string
  updatedAt: string
  __v: number

  completionRate: number
  feedback: string[]
  overallGrade: "A" | "B" | "C" | "D" | "E" | "F"
  totalScore: number
  wordsCompleted: number
  writingSpeed: number
  yourResponse: string
}


export type AiAssignment = {
    _id: string
  logo: string
  title: string
  discription: string
  duration: number
  status: "AVAILABLE" | "UNAVAILABLE" | "DRAFT"
  applicationUser: string[]
  type: "WRITTEN_CASE" | "MCQ" | "VIDEO" | "CODING"
  createdAt: string
  updatedAt: string
  __v: number
}


export type Applicant = {
    _id: string
  firstName: string
  lastName: string
  email: string
  profileImage: string
}


