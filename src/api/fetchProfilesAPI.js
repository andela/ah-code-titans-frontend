/* eslint-disable consistent-return */
import { axiosProtected } from "./axiosConfig";
import toastr from "../helpers/toastrConfig";
import { history } from "../store/configureStore";

export default class RetrieveUserProfilesAPI {
  static getUsers() {
    return axiosProtected.get(
      "/api/profiles/?limit=123456789"
    ).then((response) => {
      if (response.status === 200) {
        return {
          success: true,
          content: response
        };
      }
    })
      .catch((response) => {
        if (response.response !== undefined && response.response.status !== 200) {
          return {
            success: false,
            error: {
              status: response.response.status
            }
          };
        }

        return { success: false };
      });
  }

  static followUser(username) {
    return axiosProtected.post(
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
        } else if (response.response.status === 406) {
          toastr.error("You cannot follow your self!");
        }
      });
  }

  static unFollowUser(username) {
    return axiosProtected.delete(
      `/api/profiles/${username}/follow`
    ).then((response) => {
      if (response.status === 204) {
        toastr.success(`You have successfully unfollowed ${username}`);
        return response;
      }
    })
      .catch((response) => {
        if (response.response.status === 401) {
          toastr.error("You have been logged out. Please log in and try hhhhhhhagain");
          history.push("/");
          history.go(0);
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info("Please try again after some time");
        }
      });
  }

  static retrieveSpecificProfile(username) {
    return axiosProtected.get(
      `/api/profiles/${username}`
    ).then((response) => {
      if (response.status === 200) {
        return response;
      }
    })
      .catch((response) => {
        if (response.response.status === 401) {
          toastr.error("You have been logged out. Please log in and try again");
          history.push("/");
          history.go(0);
        } else if (response.response.status === 500 || response.response.status === 504) {
          toastr.info("Please try again after some time");
        }
      });
  }
}
