import axios from 'axios'
import { BASE_URL } from './apiPaths'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.error("Unauthorized! Redirecting to login");
                window.location.href = "/login"
            } else if (error.response.status === 500) {
                console.error("Server error.");
            } else if (error.code === "ECONNABORTED") {
                console.error("Request timeout.");
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
