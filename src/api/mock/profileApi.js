const PROFILE = [
  {
    bio: "I am a coder and I enjoy gaming and swimming.",
    company: "Netflix",
    image:
      "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
    location: "Nairobi",
    phone: "0712345678",
    username: "deno",
    website: "https://netflix.com"
  }
];

export default class ProfileApi {
  static profile(username) {
    return new Promise(resolve => {
      setTimeout(() => {
        const userProfile = PROFILE.find(u => {
          return u.username == username;
        });

        if (userProfile === undefined) {
          resolve({ success: false, detail: "User profile not found" });
        }

        resolve({ success: true, content: { profile: userProfile } });
      });
    });
  }
}
