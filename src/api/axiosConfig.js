import axios from "axios";

const instance = axios.create({
  baseURL: "https://ah-codetitans-staging.herokuapp.com/",
  headers: { "Content-Type": "application/json" }
});

const token = window.localStorage.getItem("user");
let authToken;
if (token !== null) {
  authToken = token.replace(/"/g, "");
  instance.defaults.headers.common.Authorization = `Token ${authToken}`;
} else {
  delete axios.defaults.headers.common.authorization;
}

export default instance;
