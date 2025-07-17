import axios from "axios";
import { backend_prod } from "./_config.js";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api/v1",
  baseURL: `${backend_prod}/api/v1`, 
  withCredentials: true, // sends cookies
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosInstance;
  