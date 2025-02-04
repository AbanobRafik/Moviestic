import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://signup-signin-backend.vercel.app/user",
  timeout: 5000,
});

export default axiosInstance;
