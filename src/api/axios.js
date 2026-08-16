import axios from "axios";
import { backend_prod } from "./_config.js";

const axiosInstance = axios.create({
  baseURL: `${backend_prod}/api/v1`,
  withCredentials: true, // sends cookies
});

export default axiosInstance;
