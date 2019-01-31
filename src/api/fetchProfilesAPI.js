/* eslint-disable consistent-return */
import instance from "./axiosConfig";
import toastr from "../helpers/toastrConfig";

export default class RetrieveUserProfilesAPI {
  static getUsers() {
    return instance.get(
      "/api/profiles/"
    ).then((response) => {
      if (response.status === 200) {
        return response;
      }
    })
      .catch((response) => {
        if (response.response.status === 401) {
          toastr.error("You have been logged out. Please log in and try again");
          window.location.assign("/login");
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info("Please try again after some time");
          window.location.assign("/profile");
        }
      });
  }

  static followUser(username) {
    return instance.post(
      `/api/profiles/${username}/follow`
    ).then((response) => {
      if (response.status === 201) {
        toastr.success(`You have successfully followed ${username}`);
        return response;
      }
    })
      .catch((response) => {
        if (response.response.status === 401) {
          toastr.error(`Please login to follow ${username}`);
        } else if (response.response.status === 400) {
          toastr.warning("You have already followed this user");
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info("Please try again after some time");
        }
      });
  }

  static unFollowUser(username) {
    return instance.delete(
      `/api/profiles/${username}/follow`
    ).then((response) => {
      if (response.status === 204) {
        toastr.success(`You have successfully unfollowed ${username}`);
        return response;
      }
    })
      .catch((response) => {
        if (response.response.status === 401) {
          toastr.error("You have been logged out. Please log in and try again");
          window.location.assign("/login");
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info("Please try again after some time");
          window.location.assign("/profiles");
        }
      });
  }
}
