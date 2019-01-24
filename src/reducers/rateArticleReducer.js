import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";

export default function rateArticleReducer(state = {}, action = {}) {
  switch (action.type) {
    case types.RATE_ARTICLE_SUCCESS: {
      let rate = objectAssign({}, state.rate);
      // let rating = objectAssign({}, state.rating);
      // rating = action.data;
      rate = action.data;
      return { ...state, rate };
    }
    case types.GET_ARTICLE_RATING_SUCCESS: {
      let rating = objectAssign({}, state.rating);
      rating = action.data;
      return { ...state, rating };
    }

    default: {
      return state;
    }
  }
}
