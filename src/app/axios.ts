import axios from "axios";
import { API_URL } from "./const";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
