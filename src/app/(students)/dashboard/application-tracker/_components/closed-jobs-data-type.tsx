
export interface ClosedJob {
  _id: string
  title: string
  location: string
  companyName: string
  companyType: string | null
  postedBy: string
  level: string
  salaryRange: string
  startDate: string
  applicationDeadline: string
  jobId: string
  jobStatus: "Open" | "Closed" | string
  description: string
  status: "active" | "inactive" | string
  requiredSkills: string[]
  createBy: string
  url: string
  notes: string
  companyId: string | null
  applicants: string[]
  createdAt: string
  updatedAt: string
  __v: number
}


export interface Meta {
  total: number
  page: number
  limit: number
}


export interface ClosedJobsApiResponse {
  statusCode: number
  success: boolean
  message: string
  meta: Meta
  data: ClosedJob[]
}


