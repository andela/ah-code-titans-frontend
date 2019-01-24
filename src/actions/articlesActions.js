
import toastr from "toastr";
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

export const getSpecificArticle = payload => ({
  type: types.GET_SPECIFIC_ARTICLE_SUCCESS,
  payload
});

export const getSingleArticle = slug => (dispatch) => {
  ArticleAPI.getSingleArticle(slug)
    .then((response) => {
      if (response.success) {
        dispatch(getSpecificArticle(response.content));
      } else {
        toastr.error(response.error.message);
      }
    });
};

export const createArticle = articleDetails => (dispatch) => {
  ArticleAPI.createArticle(articleDetails).then((response) => {
    if (response.success) {
      dispatch(createArticleSuccess(response.article));
    } else {
      dispatch(createArticleFailure(response.error));
    }
  });
};
