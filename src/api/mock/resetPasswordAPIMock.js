
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
}
