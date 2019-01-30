import axios from "axios";

export const axiosUnprotected = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { "Content-Type": "application/json" }
});

export const axiosProtected = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { "Content-Type": "application/json" }
});

const token = localStorage.getItem("user");

let authToken;
if (token !== null) {
  authToken = token.replace(/"/g, "");
  axiosProtected.defaults.headers.common.Authorization = `Token ${authToken}`;
} else {
  delete axios.defaults.headers.common.Authorization;
}

export default axiosUnprotected;
