import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://signup-signin-backend.vercel.app/user",
  headers: {
    "Content-Type": "application/json", // Ensures proper content-type for POST requests
  },
});

export default axiosInstance;
