import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: { "Content-Type": "application/json" }
});

const token = window.localStorage.getItem("user");
let authToken;
if (token !== null) {
  authToken = token.replace(/"/g, "");
  instance.defaults.headers.common.Authorization = `Token ${authToken}`;
} else {
  delete axios.defaults.headers.common.Authorization;
}

export default instance;
