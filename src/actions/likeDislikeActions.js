import {
  LIKE_ARTICLE_FAILURE,
  LIKE_ARTICLE_SUCCESS,
  LIKE_ARTICLE_REQUEST,
  DISLIKE_ARTICLE_FAILURE,
  DISLIKE_ARTICLE_SUCCESS,
  DISLIKE_ARTICLE_REQUEST
} from "./actionTypes";
import instance from "../api/axiosConfig";
import { getSingleArticle } from "./articlesActions";

export const likeArticleRequest = () => ({
  type: LIKE_ARTICLE_REQUEST
});

export const likeArticleSuccess = response => ({
  type: LIKE_ARTICLE_SUCCESS,
  payload: response
});

export const likeArticleFailure = errors => ({
  type: LIKE_ARTICLE_FAILURE,
  payload: errors
});

export const dislikeArticleRequest = () => ({
  type: DISLIKE_ARTICLE_REQUEST
});

export const dislikeArticleSuccess = response => ({
  type: DISLIKE_ARTICLE_SUCCESS,
  payload: response
});

export const dislikeArticleFailure = errors => ({
  type: DISLIKE_ARTICLE_FAILURE,
  payload: errors.data
});

export const likeAsync = slug => (dispatch) => {
  dispatch(likeArticleRequest());
  instance
    .post(`api/articles/${slug}/like/`)
    .then((res) => {
      const response = res.data;
      dispatch(likeArticleSuccess(response));
      dispatch(getSingleArticle(slug));
    })
    .catch(err => dispatch(likeArticleFailure(err)));
};

export const dislikeAsync = slug => (dispatch) => {
  dispatch(dislikeArticleRequest());
  instance
    .post(`api/articles/${slug}/dislike/`)
    .then((res) => {
      const response = res.data;
      dispatch(dislikeArticleSuccess(response));
      dispatch(getSingleArticle(slug));
    })
    .catch(err => dispatch(likeArticleFailure(err)));
};
