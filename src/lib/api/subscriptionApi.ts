import { getSession } from 'next-auth/react'

export interface IReview {
  user: string
  rating: number
  comment: string
  _id: string
}

export interface IPremiumPlan {
  _id: string
  name: string
  price: number
  type: string // 'monthly' | 'yearly'
  features: string[]
  totalSubscripeUser: any[]
  subscriptionCategory: 'students' | 'school'
  createdAt: string
  updatedAt: string
  __v: number
}

// Re-using common response type if available, otherwise defining minimal
interface IPremiumResponse {
  statusCode: number
  success: boolean
  message: string
  meta: {
    total: number
    page: number
    limit: number
  }
  data: IPremiumPlan[]
}

export const getAllPremiums = async (interval: string): Promise<IPremiumResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/premium?type=${interval}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch premiums')
  }

  return res.json()
}

export const getPlansByCategory = async (category: string): Promise<IPremiumResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/premium?subscriptionCategory=${category}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch premiums by category')
  }

  return res.json()
}

export const getPremiumById = async (id: string): Promise<any> => {
  const session = await getSession()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/premium/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.accessToken}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch premium by ID')
  }

  return res.json()
}

export const createPaymentSession = async (planId: string): Promise<any> => {
  const session = await getSession()
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/premium/pay/${planId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.accessToken}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to create payment session')
  }

  return res.json()
}
