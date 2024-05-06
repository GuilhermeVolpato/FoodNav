import axios from "axios";

import { AppError } from "@utils/AppError";
const BASE_URL = process.env.BASE_URL;
const placeApi = axios.create();
placeApi.defaults.timeout = 5000;

placeApi.defaults.baseURL = BASE_URL; 

placeApi.interceptors.request.use(
  (config) => {
    // const token = asyncStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

placeApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { placeApi };
