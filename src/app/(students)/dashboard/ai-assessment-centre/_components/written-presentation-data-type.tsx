export interface PresentationTaskApiResponse {
  statusCode: number
  success: boolean
  message: string
  data: PresentationTaskData
}


export interface PresentationTaskData {
  _id: string
  aiassigmentId: AiAssignment
  ventaraMobility: string
  keyObject: string[]
  proTip: string[]
  successTips: string[]
  recommendations: string[]
  applicant: Applicant
  createdAt: string
  updatedAt: string
  __v: number
  completionRate: number
  feedback: string[]
  overallGrade: string
  totalScore: number
  wordsCompleted: number
  writingSpeed: number
  yourResponse: string
}

export interface AiAssignment {
  _id: string
  logo: string
  title: string
  discription: string
  duration: number
  status: 'AVAILABLE' | 'UNAVAILABLE'
  applicationUser: string[]
  createdAt: string
  updatedAt: string
  __v: number
  type: 'PRESENTATION' | 'MCQ' | 'CODING'
}

export interface Applicant {
  _id: string
  firstName: string
  lastName: string
  email: string
  profileImage: string
}




