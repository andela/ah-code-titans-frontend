import toastr from "../helpers/toastrConfig";

import { MOCK } from "./config";
import ResetPasswordAPIMock from "./mock/resetPasswordAPIMock";
import instance from "./axiosConfig";

export default class ResetPasswordAPI {
  static sendLink(email) {
    if (MOCK) return ResetPasswordAPIMock.sendLink(email);

    return instance.post(
      "/api/resetrequest",
      {
        user: {
          email
        }
      }
    )
      .then((response) => {
        if (response.status === 200) {
          toastr.success("Password reset link sent to your email");
        }
      })
      .catch((response) => {
        if (response.response.status === 504 || response.response.status === 500) {
          toastr.info("Please try again after sometime");
        } else if (response.response.status === 400) {
          toastr.info("User with that email is not registered");
        }
      });
  }

  static resetPassword(apiURL, password) {
    return instance.put(apiURL, {
      user: { password }
    })
      .then((response) => {
        if (response.status === 200) {
          toastr.success(response.data.user.message);
        }
      })
      .catch((response) => {
        if (response.response.status === 504) {
          toastr.info("Please try again after sometime");
        } else if (response.response.status === 401) {
          toastr.warning("Reset Link has expired request for another one!");
        } else if (response.response.data === 500) {
          toastr.error("Invalid reset link");
        }
      });
  }
}
