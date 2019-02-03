/* eslint-disable consistent-return */
import { axiosProtected } from "./axiosConfig";
import toastr from "../helpers/toastrConfig";

export default class profileApi {
  static profile(username) {
    return axiosProtected
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
    return axiosProtected
      .put(`/api/profiles/edit/${username}`, data)
      .then((response) => {
        if (response.status === 200) {
          toastr.success("Updated profile successfully ");
          setTimeout(() => { window.location.assign("/profile"); }, 2000);
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
          window.location.assign("/");
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

  static retrieveUserFollowers() {
    return axiosProtected.get(
      "/api/profiles/followers"
    ).then((response) => {
      if (response.status === 200) {
        return { data: response.data.followers };
      }
    })
      .catch((response) => {
        if (response.response.status === 401) {
          toastr.error("You have been logged out. Please log in and try again");
          window.location.assign("/login");
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info("Please try again after some time");
          window.location.assign("/login");
        }
      });
  }

  static retrieveUsersFollowing() {
    return axiosProtected.get(
      "/api/profiles/following"
    ).then((response) => {
      if (response.status === 200) {
        return { data: response.data.following };
      }
    })
      .catch((response) => {
        if (response.response.status === 401) {
          toastr.error("You have been logged out. Please log in and try again");
          window.location.assign("/login");
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info("Please try again after some time");
          window.location.assign("/login");
        }
      });
  }
}
