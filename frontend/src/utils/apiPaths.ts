// utils/apiPaths.ts

export const BASE_URL: string = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
    UPDATE_PROFILE: "/api/v1/auth/update",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
} as const;

// Types
export type ApiPaths = typeof API_PATHS;
export type AuthApiPaths = keyof ApiPaths["AUTH"];
export type ImageApiPaths = keyof ApiPaths["IMAGE"];
