import axios from "axios";
import toastr from "../helpers/toastrConfig";
import { MOCK } from "./config";

import profileApiMock from "./mock/profileApi";

export default class profileApi {
  static profile(username) {
    if (MOCK) profileApiMock.profile(username);
    return axios
      .get(`/api/profiles/${username}`)
      .then(response => {
        if (response.status === 200) {
          return {
            content: response.data
          };
        }
      })
      .catch(err => {
        throw err;
      });
  }

  static updateProfile(username, data) {
    return axios
      .put(`/api/profiles/edit/${username}`, data)
      .then(response => {
        if (response.status === 200) {
          toastr.success("Updated profile successfully ");
          return {
            content: response.data
          };
        }
      })

      .catch(err => {
        throw err;
      });
  }
}
