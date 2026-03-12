// ===== Common Types =====
export interface Meta {
  total: number
  page: number
  limit: number
}

export interface Quiz {
  _id: string
  courseId: string
  videoId: string
  title: string
  options: string[]
  answer: string
  userAnswer: string
  score: number
  isCorrect: boolean
  userId: string[]
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CourseVideo {
  _id: string
  attempted: boolean
  title: string
  url: string
  time: string
  quiz: Quiz[]
}

export interface Course {
  _id: string
  name: string
  description: string
  averageRating:number
  thumbnail: string
  gradeLevel: string
  category: string
  courseVideo: CourseVideo[]
  createdBy: string
  status: 'active' | 'inactive'
  enrolledStudents: string[]
  coursePrice: number
  isCourseFree: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

// ===== API Response Type =====
export interface CourseResponse {
  statusCode: number
  success: boolean
  message: string
  meta: Meta
  data: Course[]
}

export interface SingleCourse {
  _id: string
  name: string
  description: string
  gradeLevel: string
  category: string
  courseVideo: CourseVideo[]
  createdBy: string
  status: "active" | "inactive"

  enrolledStudents: string[]
  coursePrice: number
  isCourseFree: boolean

  createdAt: string
  updatedAt: string
  __v: number
}

export interface SingleCourseResponse {
  statusCode: number
  success: boolean
  message: string
  data: SingleCourse
}