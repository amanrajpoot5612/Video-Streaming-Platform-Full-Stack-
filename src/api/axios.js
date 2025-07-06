import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // your backend base URL
  withCredentials: true, // sends cookies
});

export default axiosInstance;
  