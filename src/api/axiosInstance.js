import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://volunteer-server-ten.vercel.app",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
