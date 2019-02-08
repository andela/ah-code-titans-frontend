import axios from "axios";
import { store } from "../store";

export const axiosUnprotected = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { "Content-Type": "application/json" }
});

const axiosProtected = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { "Content-Type": "application/json" }
});

const axiosRefresh = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { "Content-Type": "application/json" }
});

axiosProtected.interceptors.request.use((config) => {
  const loggedIn = store.getState().login.auth;
  const { token } = loggedIn.user;
  const newConfig = config;

  if (token) { newConfig.headers.Authorization = `Token ${token}`; }
  return newConfig;
});

axiosRefresh.interceptors.request.use((config) => {
  const loggedIn = store.getState().login.auth;
  const refreshToken = loggedIn.user.refresh_token;
  const newConfig = config;

  if (loggedIn.authentication !== "") { newConfig.headers.Authorization = `Token ${refreshToken}`; }
  return newConfig;
});

export {
  axiosProtected,
  axiosRefresh
};

export default axiosUnprotected;
