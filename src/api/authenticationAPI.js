import axios from "axios";
import { MOCK } from "./config";
import AuthenticationAPIMock from "./mock/authenticationAPI";

export default class AuthenticationAPI {
  static login(userDetails) {
    if (MOCK) return AuthenticationAPIMock.login(userDetails);

    return axios
      .post("/api/users/login", {
        user: {
          email: userDetails.email,
          password: userDetails.password
        }
      })
      .then((response) => {
        if (response.data.user) {
          return { success: true, content: response.data.user };
        }
      })
      .catch((response) => {
        if (response.response.status !== 200) {
          return {
            success: false,
            content: response.response.data,
            error: {
              status: response.status
            }
          };
        }
      });
  }
}
