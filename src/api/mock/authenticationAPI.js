import { DELAY } from "../config";

const USERS = [
  {
    email: "johndoe@gmail.com",
    password: "johndoe@A1",
    username: "johndoe",
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRhdmlza2ltYW1lIiwicmVmcmVzaF90b2tlbiI6ZmFsc2UsImlhdCI6MTU0NzQ4NTcyNywibmJmIjoxNTQ3NDg1NDI3LCJleHAiOjE1NDc0ODkzMjd9.0MWRC6PTjmbJxeWrWNmN8FMRMjS4f19u_hMjsheD4T0",
    refresh_token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRhdmlza2ltYW1lIiwicmVmcmVzaF90b2tlbiI6dHJ1ZSwiaWF0IjoxNTQ3NDg1NzI3LCJuYmYiOjE1NDc0ODU0MjcsImV4cCI6MTU0NzQ4OTMyN30.5AtXKT44TCTx7IGbSMPaN-YjkTi3J5h7Zo8EihW6xD8"
  }
];

export default class AuthenticationAPI {
  static login(userDetails) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = USERS.find(u => u.email === userDetails.email);

        if (user === undefined) {
          resolve({ success: false, content: { message: "User not found!" } });
          return;
        }

        if (user.password !== userDetails.password) {
          resolve({ success: false, content: { message: "Invalid Password!" } });
          return;
        }

        resolve({ success: true, content: user });
      }, DELAY);
    });
  }
}
