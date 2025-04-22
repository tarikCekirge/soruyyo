import axios from 'axios'
import { BASE_URL } from './apiPaths'
import { toast } from 'sonner';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 3000,
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
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:

                    console.error("Unauthorized! Redirecting to login");
                    toast.error("Yetkisiz! Girişe yönlendiriliyorsunuz")
                    window.location.href = "/login";
                    break;
                case 500:
                    console.error("Server error.");
                    toast.error("Sunucu haatası")
                    break;
                default:
                    console.error(`Error: ${error.response.status}`);
                    toast.error(`${error.response.status || "Beklenmeyen bir hata oldu"}`)
                    break;
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout.");
            toast.error("Zaman aşımı")
        }
        return Promise.reject(error);
    }
)


export default axiosInstance
