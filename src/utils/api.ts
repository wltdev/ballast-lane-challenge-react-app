import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { getUserToken, logout } from "./storage";

const API_URL = import.meta.env.VITE_API_URL;

interface ApiError {
  response?: {
    status?: number;
    data?: {
      error?: string;
      errorMessage?: string;
      errors?: Record<string, string[]>;
    };
  };
}

const fetch = (): AxiosInstance => {
  const defaultOptions = {
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await getUserToken();
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    }
  );

  instance.interceptors.response.use(
    async (response: AxiosResponse) => response,
    async (error: AxiosError<ApiError>) => {
      if (!error || !error.response) {
        throw new Error("Unexpected error. Please try again later.");
      }

      const { status } = error.response || {};
      if (status && status === 401) {
        logout();
      }

      if (error.response?.data) {
        let errorMessage = error.response.data.error;

        if (error.response.data.errors) {
          const errors = error.response.data.errors;
          errorMessage = Object.values(errors).flat().join("\n");
        }

        throw new Error(
          errorMessage || "Unexpected error. Please try again later."
        );
      }

      throw error;
    }
  );

  return instance;
};

export const api = fetch();
