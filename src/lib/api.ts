import { getSession } from 'next-auth/react'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1'

async function request(endpoint: string, options: RequestInit = {}) {
  const session = await getSession()
  const headers = new Headers(options.headers)

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  // Use token from headers if provided, otherwise fallback to session
  if (!headers.has('Authorization') && session?.accessToken) {
    headers.set('Authorization', `Bearer ${session.accessToken}`)
  }

  const config: RequestInit = {
    ...options,
    headers,
  }

  const response = await fetch(`${baseURL}${endpoint}`, config)

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(
      errorBody || `API Error: ${response.status} ${response.statusText}`,
    )
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }
  return response.text()
}

const api = {
  get: (url: string, config?: RequestInit) =>
    request(url, { ...config, method: 'GET' }),
  post: (url: string, data?: any, config?: RequestInit) =>
    request(url, { ...config, method: 'POST', body: data instanceof FormData ? data : JSON.stringify(data) }),
  put: (url: string, data?: any, config?: RequestInit) =>
    request(url, { ...config, method: 'PUT', body: data instanceof FormData ? data : JSON.stringify(data) }),
  patch: (url: string, data?: any, config?: RequestInit) =>
    request(url, { ...config, method: 'PATCH', body: data instanceof FormData ? data : JSON.stringify(data) }),
  delete: (url: string, config?: RequestInit) =>
    request(url, { ...config, method: 'DELETE' }),
  interceptors: {
    request: { use: () => { } },
    response: { use: () => { } },
  },
}

export default api
