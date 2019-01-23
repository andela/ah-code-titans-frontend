import {
  LIKE_ARTICLE_REQUEST,
  LIKE_ARTICLE_SUCCESS,
  LIKE_ARTICLE_FAILURE,
  DISLIKE_ARTICLE_REQUEST,
  DISLIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_FAILURE
} from "../actions/actionTypes";

/* eslint-disable import/prefer-default-export */
const likeDislike = (
  state = {
    isLiking: false,
    isFetching: false,
    likes: 0,
    dislikes: 0,
    likeIcon: "thumbs up outline",
    dislikeIcon: "thumbs down outline"
  },
  action
) => {
  switch (action.type) {
    case LIKE_ARTICLE_REQUEST:
      return { ...state, isLiking: true };
    case LIKE_ARTICLE_FAILURE:
      return {
        isLiking: false,
        errors: action.payload
      };
    case LIKE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLiking: false,
        likes: action.payload.total_likes,
        dislikes: action.payload.total_dislikes,
        likeIcon: state.likes < action.payload.total_likes ? "thumbs up" : "thumbs up outline",
        dislikeIcon: state.dislikes < action.payload.total_dislikes ? "thumbs down" : "thumbs down outline"
      };
    case DISLIKE_ARTICLE_REQUEST:
      return { ...state, isDisliking: true };
    case DISLIKE_ARTICLE_FAILURE:
      return {
        isDisliking: false,
        errors: action.payload
      };
    case DISLIKE_ARTICLE_SUCCESS:
      return {
        ...state,
        isDisliking: false,
        likes: action.payload.total_likes,
        dislikes: action.payload.total_dislikes,
        likeIcon: state.likes < action.payload.total_likes ? "thumbs up" : "thumbs up outline",
        dislikeIcon: state.dislikes < action.payload.total_dislikes ? "thumbs down" : "thumbs down outline"
      };
    default:
      return state;
  }
};

export default likeDislike;
