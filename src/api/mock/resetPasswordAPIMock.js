import axios from "axios";
import toastr from "toastr";
import { DELAY } from "../config";

const USERS = [
  {
    email: "dariusndubi@gmail.com"
  }
];

export default class ResetPasswordAPIMock {
  static sendLink(email) {
    return new Promise(() => {
      setTimeout(() => {
        const user = USERS.find(u => u.email === email);

        if (user === undefined) {
          toastr.error("Please check your email");
          return;
        }
        toastr.success("Password reset link sent to your email");
      }, DELAY);
    });
  }

  static resetPassword(apiURL, password) {
    return axios.put(apiURL, {
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
