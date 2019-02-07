import { DELAY } from "../config";
import toastr from "../../helpers/toastrConfig";

export const userdata = [
  {
    bio: "I am a coder and I enjoy gaming and swimming.",
    company: "Netflix",
    image:
          "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
    location: "Nairobi",
    phone: "0712345678",
    username: "deno",
    website: "https://netflix.com"
  },
  {
    bio: "I am a coder and I enjoy gaming and swimming.",
    company: "NTV",
    image:
          "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
    location: "Nairobi",
    phone: "0712345678",
    username: "Brian",
    website: "https://ntv.com"
  },
  {
    bio: "I am a coder and I enjoy gaming and swimming.",
    company: "KTN",
    image:
          "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
    location: "Nairobi",
    phone: "0712345678",
    username: "Beepoo",
    website: "https://ktn.com"
  }
];

export default class UserProfilesAPI {
  static fetchallUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (userdata === undefined) {
          toastr.error("You have been logged out, Please login");
        }
        resolve({ results: userdata });
      }, DELAY);
    });
  }
}
