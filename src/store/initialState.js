export default {
  loginReducer: {
    auth: {
      authentication: "",
      user: {},
      isFetching: false
    },
    login: {
      state: "",
      error: null
    }
  },
  userSettingsReducer: {
    settings: {
      walkThrough: true
    }
  },
  profileReducer: {
    profile: {}
  },
  article: {
    article: {},
    singleArticle: {},
    editedArticle: {},
    deletedArticle: {},
    articles: {
      landingSection: {
        next: "",
        results: []
      },
      topStoriesSection: {
        next: "",
        results: []
      },
      recentStoriesSection: {
        next: "",
        results: []
      }
    }
  },
  comment: {
    comments: [],
    mainOffset: {
      next: 0,
      previous: 0
    }
  },
  rateArticle: {
    rate: {},
    rating: 0
  },
  tag: {
    articles: {}
  }

};
