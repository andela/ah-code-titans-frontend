/* eslint-disable import/prefer-default-export */
import toastr from "toastr";
import * as types from "./actionTypes";
import ArticleAPI from "../api/articleAPI";

export const retrieveArticlesSuccess = (data = {}) => ({
  type: types.RETRIEVE_ALL_ARTICLES_SUCCESS,
  data
});

export const retrieveArticlesFailure = (data = {}) => ({
  type: types.RETRIEVE_ALL_ARTICLES_FAILURE,
  data
});

export const getArticles = (articlesSection, reset = false) => (dispatch, getState) => {
  const link = getState().articleReducer.articles[articlesSection].next;

  ArticleAPI.getAllArticles(reset ? "" : link).then((response) => {
    if (response.success && response.content.results !== undefined) {
      response.content.reset = reset;

      dispatch(retrieveArticlesSuccess({
        section: articlesSection,
        content: response.content
      }));
    } else {
      if (response.error !== undefined && response.error.status !== 404) {
        toastr.error(response.error.message);
        return;
      }

      dispatch(retrieveArticlesFailure({
        section: articlesSection,
        content: response.content
      }));
    }
  });
};
