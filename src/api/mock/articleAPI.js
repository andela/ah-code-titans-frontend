import { DELAY } from "../config";

export const article = {
  id: 1,
  author: {
    username: "msloan",
    bio: "International effort foreign book change task include until politics beautiful stage still truth present magazine win list who major foreign type American serve child environmental.",
    image: "https://picsum.photos/100/100/?random"
  },
  favorite: false,
  tag_list: [],
  bookmarked: false,
  slug: "mouth-letter-commercial-happen-allow",
  title: "Mouth letter commercial happen allow.",
  description: "['Set hundred entire process. Play author send member measure American.']",
  body: "['Serve soon course great everything federal instead.', 'Nation item above. Imagine across in improve.', 'Full I event office fine. Present goal again foreign military available view. Cause when turn else ball I.', 'Share across local body trade. With hotel occur something since six.', 'Couple spring general strong sit. Affect part do pick least thing. Stage door likely stock.']",
  image: "https://picsum.photos/1024/768/?random",
  time_to_read: 0,
  createdAt: "2019-01-22T14:27:18.601955Z",
  updatedAt: "2019-01-22T14:27:18.601979Z"
};

export default class ArticleAPI {
  static getAllArticles() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const articles = [];

        for (let index = 1; index <= 20; index += 1) {
          articles.push(article);
        }

        resolve({
          success: true,
          content: {
            next: "",
            previous: "",
            results: articles
          }
        });
      }, DELAY);
    });
  }
}
