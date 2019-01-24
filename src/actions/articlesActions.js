
import * as types from "./actionTypes";
import ArticleAPI from "../api/articleAPI";

export const createArticleSuccess = (article = {}) => ({
  type: types.CREATE_ARTICLE_SUCCESS,
  payload: article
});

export const createArticleFailure = (error = {}) => ({
  type: types.CREATE_ARTICLE_SUCCESS,
  payload: error
});

// Get article
export const getSpecificArticle = payload => ({
  type: types.GET_SPECIFIC_ARTICLE_SUCCESS,
  payload
});

export const createArticle = articleDetails => (dispatch) => {
  // performing our ap call
  ArticleAPI.createArticle(articleDetails).then((response) => {
  // dispatching our actions based on the response from our backend
    if (response.success) {
      dispatch(createArticleSuccess(response.article));
    } else {
      dispatch(createArticleFailure(response.error));
    }
  });
};

export const getSingleArticle = slug => (dispatch) => {
  ArticleAPI.getSingleArticle(slug)
    .then((response) => {
      dispatch(getSpecificArticle(response.articles));
    });
};
