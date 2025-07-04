import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:3010",
});

export default request;
