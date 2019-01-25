/* eslint-disable consistent-return */
import instance from "./axiosConfig";
import toastr from "../helpers/toastrConfig";

export default class profileApi {
  static profile(username) {
    return instance
      .get(`/api/profiles/${username}`)
      .then((response) => {
        if (response.status === 200) {
          return {
            content: response.data
          };
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  static updateProfile(username, data) {
    return instance
      .put(`/api/profiles/edit/${username}`, data)
      .then((response) => {
        if (response.status === 200) {
          toastr.success("Updated profile successfully ");
          return {
            content: response.data
          };
        }
      })

      .catch((response) => {
        if (response.response.status === 403) {
          toastr.error(response.response.data.profile.detail);
          return {
            content: response.response.data
          };
        }
        if (response.response.status === 401) {
          toastr.error("You have been logged out. Please log in and try again");
          window.location.assign("/login");
          return {
            content: response.response.data
          };
        }
        if (response.response.status === 400) {
          toastr.error(response.response.data.profile.errors.website[0]);
          setInterval(() => { window.location.reload(); }, 2000);
          return {
            content: response.response.data
          };
        }
      });
  }
}
