import instance, { axiosRefresh } from "./axiosConfig";
import { MOCK } from "./config";
import AuthenticationAPIMock from "./mock/authenticationAPI";

export const errors = {
  400: "Invalid email or password. Please confirm your details!",
  500: "Access to server failed!"
};

/* eslint-disable consistent-return */
export default class AuthenticationAPI {
  static login(userDetails) {
    if (MOCK) return AuthenticationAPIMock.login(userDetails);

    return instance
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
            error: {
              status: response.response.status,
              message: errors[response.response.status]
            }
          };
        }
      });
  }

  static refreshToken() {
    return axiosRefresh("/api/token/refresh").then((response) => {
      if (response.status === 200) {
        return ({
          success: true,
          accessToken: response.data.access_token
        });
      }
    }).catch((response) => {
      if (response.response.status !== 200) {
        return ({
          success: false,
          error: {
            status: response.response.status
          }
        });
      }
    });
  }
}
