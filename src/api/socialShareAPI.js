import instance from "./axiosConfig";
import toastr from "../helpers/toastrConfig";

export default class SocialShareAPI {
    static socialShare = (slug, platform) => instance.get(`/api/article/${slug}/share/${platform}`).then((response) => {
      window.open(response.data.share.link, "_blank");
    }).catch((error) => {
      if (error.response) {
        toastr.warning("Please login to share this article");
      }
    })
}
