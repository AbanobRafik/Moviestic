import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://signup-signin-backend.vercel.app/user",
  timeout: 3000,
});

export default axiosInstance;
