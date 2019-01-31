import {
  LIKE_ARTICLE_REQUEST,
  LIKE_ARTICLE_SUCCESS,
  LIKE_ARTICLE_FAILURE,
  DISLIKE_ARTICLE_REQUEST,
  DISLIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_FAILURE
} from "../actions/actionTypes";

const likeDislike = (state = {}, action) => {
  switch (action.type) {
    case LIKE_ARTICLE_REQUEST:
      return { ...state, isLiking: true };
    case LIKE_ARTICLE_FAILURE:
      return {
        ...state,
        isLiking: false,
        errors: action.payload.response.data
      };
    case LIKE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLiking: false
      };
    case DISLIKE_ARTICLE_REQUEST:
      return { ...state, isDisliking: true };
    case DISLIKE_ARTICLE_FAILURE:
      return {
        ...state,
        isDisliking: false,
        errors: action.payload.response.data
      };
    case DISLIKE_ARTICLE_SUCCESS:
      return {
        ...state,
        isDisliking: false
      };
    default:
      return state;
  }
};

export default likeDislike;
