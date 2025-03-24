import axios, { AxiosError } from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Thay bằng URL backend của bạn
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

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    let message = 'An unexpected error occurred'

    if (status) {
      switch (status) {
        case 400:
          message = 'Bad request: Please check your input'
          break
        case 401:
          message = 'Unauthorized: Please log in again'
          break
        case 403:
          message = 'Forbidden: You do not have permission'
          break
        case 404:
          message = 'Not found: Resource does not exist'
          break
        case 500:
          message = 'Server error: Please try again later'
          break
        default:
          message = `Error ${status}: Something went wrong`
      }
    } else if (error.request) {
      message = 'Network error: Please check your connection'
    }

    const errorData = error.response?.data as { message?: string }
    const customMessage = errorData?.message || message
    return Promise.reject(new Error(customMessage))
  }
)

export default apiClient