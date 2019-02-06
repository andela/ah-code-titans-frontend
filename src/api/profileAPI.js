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
            success: true,
            content: response.data
          };
        }
      })
      .catch((err) => {
        if (err.response.status !== 200) {
          return {
            success: false,
            error: {
              status: err.response.status
            }
          };
        }
      });
  }

  static updateProfile(username, data) {
    return axiosProtected.put(`/api/profiles/edit/${username}`, data)
      .then((response) => {
        if (response.status === 200) {
          toastr.success("Updated profile successfully ");
          return {
            success: true,
            content: response.data
          };
        }
      })

      .catch((response) => {
        const res = {
          success: false,
          error: {
            status: response.response.status
          }
        };

        switch (response.response.status) {
          case 403: {
            toastr.error(response.response.data.profile.detail);
            return res;
          }
          case 400: {
            toastr.error(response.response.data.profile.errors.website[0]);
            return res;
          }
          default: return res;
        }
      });
  }

  static retrieveUserFollowers() {
    return axiosProtected.get("/api/profiles/followers")
      .then((response) => {
        if (response.status === 200) {
          return { success: true, data: response.data.followers };
        }
      })
      .catch((response) => {
        if (response.response.status !== 200) {
          return {
            success: false,
            error: {
              status: response.response.status
            }
          };
        }
      });
  }

  static retrieveUsersFollowing() {
    return axiosProtected.get("/api/profiles/following")
      .then((response) => {
        if (response.status === 200) {
          return { success: true, data: response.data.following };
        }
      })
      .catch((response) => {
        if (response.response.status !== 200) {
          return {
            success: false,
            error: {
              status: response.response.status
            }
          };
        }
      });
  }
}
