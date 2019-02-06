const initialArticlePaginationState = {
  next: "",
  isLoading: false,
  results: []
};

export default {
  login: {
    auth: {
      authentication: "",
      user: {},
      isFetching: false
    },
    login: {
      state: "",
      error: null
    },
    authPopup: false
  },
  userSettings: {
    settings: {
      walkThrough: true
    }
  },
  profile: {
    profile: {}
  },
  article: {
    article: {},
    singleArticle: {},
    editedArticle: {},
    deletedArticle: {},
    articles: {
      landingSection: initialArticlePaginationState,
      topStoriesSection: initialArticlePaginationState,
      recentStoriesSection: initialArticlePaginationState,
      mainDiscoverSection: initialArticlePaginationState
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
  bookmarkArticle: {
    bookmark: "",
    bookmarks: []
  },
  profiles: {
    users: []
  },
  searchedProfile: {
    user: {}
  },
  registration: {
    isFetching: false
  }
};
