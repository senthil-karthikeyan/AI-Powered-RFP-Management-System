import { env } from "@/env"
import axios from "axios"

export const api = axios.create({
  baseURL: env.VITE_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.response.use(
  (response) => {
    if (response.data?.success === false) {
      // Backend returned explicit failure
      const errorData = response.data.error
      const error = new Error(errorData?.message || "Unknown error")
      // Attach code to error object if needed
      ;(error as any).code = errorData?.code
      return Promise.reject(error)
    }
    // Unwrap the data
    return response.data.data
  },
  (error) => {
    // Handle network errors or non-200 status codes that axios catches
    if (error.response?.data?.error) {
      const apiError = new Error(error.response.data.error.message)
      ;(apiError as any).code = error.response.data.error.code
      return Promise.reject(apiError)
    }
    return Promise.reject(error)
  },
)
