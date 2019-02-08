import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case types.RETRIEVE_ALL_ARTICLES_SUCCESS: {
      const articles = objectAssign({}, state.articles);
      const payload = action.data;
      const section = objectAssign({}, articles[payload.section]);

      section.next = payload.content.next;
      section.previous = payload.content.previous;
      section.more = payload.content.next !== null;
      section.isLoading = false;

      if (payload.content.reset) {
        section.results = payload.content.results;
      } else {
        section.results = section.results.concat(payload.content.results);
      }

      articles[payload.section] = section;
      return { ...state, articles };
    }
    case types.RETRIEVE_ALL_ARTICLES_FAILURE: {
      const articles = objectAssign({}, state.articles);
      const payload = action.data;
      const section = objectAssign({}, articles[payload.section]);

      section.more = false;
      section.isLoading = false;
      articles[payload.section] = section;
      return { ...state, articles };
    }
    case types.RETRIEVE_ALL_ARTICLES_IS_LOADING: {
      const articles = objectAssign({}, state.articles);
      const payload = action.data;
      const section = objectAssign({}, articles[payload.section]);
      section.isLoading = true;
      articles[payload.section] = section;
      return { ...state, articles };
    }
    case types.CREATE_ARTICLE_SUCCESS: {
      return { ...state, article: action.payload, isFetching: false };
    }
    case (types.GET_SPECIFIC_ARTICLE_SUCCESS): {
      return { ...state, singleArticle: action.payload, isFetching: false };
    }
    case (types.EDIT_ARTICLE_SUCCESS): {
      return { ...state, editedArticle: action.payload, isFetching: false };
    }
    case (types.DELETE_ARTICLE_SUCCESS): {
      return { ...state, deletedArticle: action.payload, isFetching: false, singleArticle: {}
      };
    }
    case (types.CREATE_ARTICLE_LOADER): {
      return { ...state, isFetching: true };
    }
    default:
      return state;
  }
};
