import axios from "axios";
const axiosInstance = axios.create()
  axiosInstance.defaults.headers.common["xaccesstoken"] = `${localStorage.getItem(
    "token"
  ) || ""}`;
export default axiosInstance