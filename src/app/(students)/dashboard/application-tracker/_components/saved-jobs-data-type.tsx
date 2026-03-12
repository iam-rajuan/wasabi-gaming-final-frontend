export interface SavedJob {
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
  jobStatus: string
  description: string
  status: string
  requiredSkills: string[]
  createBy: string
  url: string
  notes?: string
  companyId: string | null
  applicants: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface BookmarkedJob {
  _id: string
  user: string
  job: SavedJob
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Meta {
  total: number
  page: number
  limit: number
}

export interface BookmarkedJobsApiResponse {
  statusCode: number
  success: boolean
  message: string
  data: {
    data: BookmarkedJob[]
    meta: Meta
  }
}
