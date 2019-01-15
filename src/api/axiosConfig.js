import axios from "axios";

const instance = axios.create({
  baseURL: "https://ah-codetitans-staging.herokuapp.com/",
  headers: { "Content-Type": "application/json" }
});

export default instance;
