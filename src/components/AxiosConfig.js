import axios from "axios";
const token = sessionStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});
axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axiosInstance;
