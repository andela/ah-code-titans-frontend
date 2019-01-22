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
      section.more = true;

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
      articles[payload.section] = section;
      return { ...state, articles };
    }
    default:
      return state;
  }
};
