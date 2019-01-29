
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

export const deleteSpecificArticle = payload => ({
  type: types.DELETE_ARTICLE_SUCCESS,
  payload
});

export const editSpecificArticle = payload => ({
  type: types.EDIT_ARTICLE_SUCCESS,
  payload
});
export const createArticle = articleDetails => (dispatch) => {
  ArticleAPI.createArticle(articleDetails).then((response) => {
    if (response.success) {
      dispatch(createArticleSuccess(response.article));
      dispatch(getSpecificArticle(response.article.slug));
    } else {
      dispatch(createArticleFailure(response.error));
    }
  });
};

export const getSingleArticle = slug => (dispatch) => {
  ArticleAPI.getSingleArticle(slug)
    .then((response) => {
      if (response.success) {
        dispatch(getSpecificArticle(response.content));
      } else {
        dispatch(getSpecificArticle(response.error.message));
      }
    });
};

export const deleteArticle = slug => (dispatch) => {
  ArticleAPI.deleteArticle(slug)
    .then((response) => {
      if (response.success) {
        dispatch(deleteSpecificArticle(response.article));
      } else {
        dispatch(deleteSpecificArticle(response.error.message));
      }
    });
};

export const editArticle = (slug, articleDetails) => (dispatch) => {
  ArticleAPI.editArticle(slug, articleDetails).then((response) => {
    if (response.success) {
      dispatch(editSpecificArticle(response.article));
    } else {
      dispatch(editSpecificArticle(response.error));
    }
  });
};
