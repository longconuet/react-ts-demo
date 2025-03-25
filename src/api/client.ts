import axios, { AxiosError } from 'axios'

const apiClient = axios.create({
  baseURL: 'https://localhost:7244/api', // Thay bằng URL backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

interface ValidationError {
  propertyName: string
  errorMessage: string
  attemptedValue: string
  customState: null | any
  severity: number
  errorCode: string
  formattedMessagePlaceholderValues: Record<string, string>
}

interface ApiErrorResponse {
  title: string
  status: number
  detail: string
  instance: string
  traceId: string
  ValidationErrors: ValidationError[]
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    const customMessage = error.response?.data as { message?: string }
    let message = 'An unexpected error occurred'

    if (status) {
      switch (status) {
        case 400:
          const apiError = error.response?.data as ApiErrorResponse
          if (apiError.ValidationErrors?.length > 0) {
            message = apiError.ValidationErrors.map(
              (err) => `${err.errorMessage}`
            ).join('. ')
          } else {
            message = 'Bad Request: Invalid input data'
          }
          break
        case 401:
          message = 'Unauthorized: Please log in again'
          break
        case 403:
          message = 'Forbidden: You do not have permission'
          break
        case 404:
          message = customMessage.message || 'Not found: Resource does not exist'
          break
        case 500:
          message = customMessage.message || 'Server error: Please try again later'
          break
        default:
          message = `Error ${status}: Something went wrong`
      }
    } else if (error.request) {
      message = 'Network error: Please check your connection'
    }

    if (status && status == 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(new Error(message))
  }
)

export default apiClient