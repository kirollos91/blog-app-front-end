import axios from "axios";

const request = axios.create({
  baseURL: "https://blog-app-back-end-production.up.railway.app",
  // baseURL: "http://localhost:3010",
});

export default request;
