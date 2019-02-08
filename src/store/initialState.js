const initialArticlePaginationState = {
  next: "",
  isLoading: false,
  results: []
};

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
  tag: {
    articles: {}
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
  }
};
