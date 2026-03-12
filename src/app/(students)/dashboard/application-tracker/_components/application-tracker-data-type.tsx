

export interface AppliedJob {
  jobId: string
  title: string
  companyName: string
  location: string
  level: string
  status: "Applied" | "Interview" | "Rejected" | string
  interviewDate?: string
  notes?: string
  createdAt: string
}


export interface Meta {
  total: number
  page: number
  limit: number
}


export interface ApplicationTrackerApiResponse {
  statusCode: number
  success: boolean
  message: string
  meta: Meta
  data: AppliedJob[]
}
