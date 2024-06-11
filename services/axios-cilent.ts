import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://18.136.102.126:3030/api",
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
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
