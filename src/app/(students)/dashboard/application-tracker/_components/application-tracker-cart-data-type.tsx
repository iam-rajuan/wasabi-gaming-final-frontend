// ==========================
// Login History Type
// ==========================
export interface LoginHistory {
  _id: string;
  device: string;
  ipAddress: string;
  loginTime: string; // ISO Date string
}

// ==========================
// Applied Job Type
// ==========================
export interface ApplicationJob {
  job: string;
  status: "Applied" | "Interview" | "Rejected" | "Accepted" | string;
  interviewDate?: string;
  notes?: string;
}

// ==========================
// Subscription Type
// ==========================
export interface Subscription {
  _id: string;
  name: string;
  price: number;
  type: "weekly" | "monthly" | "yearly" | string;
  features: string[];
  totalSubscripeUser: string[];
  subscriptionCategory: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ==========================
// User Profile Type
// ==========================
export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "student" | "admin" | string;
  profileImage: string;
  phone: string;
  verified: boolean;
  registered: boolean;
  status: "active" | "inactive" | string;
  skills: string[];
  isSubscription: boolean;
  course: any[];
  education: any[];
  experience: any[];
  socileLinks: any[];
  loginHistory: LoginHistory[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  subscription: string;
  subscriptionExpiry: string | null;
  applicationJob: ApplicationJob[];
  provider: "email" | "google" | string;
}

// ==========================
// Final API Response Type
// ==========================
export interface UserProfileApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    data: UserProfile;
    subscription: Subscription;
  };
}


