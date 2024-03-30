import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env?.EXPO_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error.response;
  }
);

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
