import axios from "axios";
import { BASE_API_URL } from "@env";
export const axiosClient = axios.create({
  baseURL: BASE_API_URL,
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
    // const user = JSON.parse((localStorage as any).getItem("user") || {});
    // const token = user?.accessToken;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
