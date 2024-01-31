import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  timeout: 10000,
  headers: {
    common: {
      Authorization: `Bearer  ${process.env.REACT_APP_SERVER_API_KEY}`,
    },
  },
});

export default axiosClient;
