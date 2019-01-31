/* eslint-disable import/prefer-default-export */
import toastr from "toastr";
import * as types from "./actionTypes";
import ArticleAPI from "../api/articleAPI";

export const retrieveArticlesSuccess = (data = {}) => ({
  type: types.RETRIEVE_ALL_ARTICLES_SUCCESS,
  data
});

export const retrieveArticlesIsLoading = (data = {}) => ({
  type: types.RETRIEVE_ALL_ARTICLES_IS_LOADING,
  data
});

export const retrieveArticlesFailure = (data = {}) => ({
  type: types.RETRIEVE_ALL_ARTICLES_FAILURE,
  data
});

const handleArticlePagination = (articlesSection, response, dispatch, reset = false) => {
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
};

export const getArticles = (articlesSection, reset = false) => (dispatch, getState) => {
  const { next, isLoading } = getState().article.articles[articlesSection];
  if (!isLoading) dispatch(retrieveArticlesIsLoading({ section: articlesSection }));

  ArticleAPI.getAllArticles(reset ? "api/articles/all" : next).then((response) => {
    handleArticlePagination(articlesSection, response, dispatch, reset);
  });
};

export const searchForArticles = (
  articlesSection,
  query,
  reset = false
) => (dispatch, getState) => {
  const { next, isLoading } = getState().article.articles[articlesSection];
  if (!isLoading) dispatch(retrieveArticlesIsLoading({ section: articlesSection }));

  let initialLink = query.title !== undefined && query.title !== "" ? `search=${query.title}` : "";
  initialLink += query.author !== undefined && query.author !== "" ? `author=${query.author}` : "";

  ArticleAPI.getAllArticles(
    reset ? `api/search/articles/${initialLink === "" ? "" : `?${initialLink}`}` : next
  ).then((response) => {
    handleArticlePagination(articlesSection, response, dispatch, reset);
  });
};

export const searchForArticlesByTag = (
  articlesSection,
  tagName,
  reset = false
) => (dispatch, getState) => {
  const { next, isLoading } = getState().article.articles[articlesSection];
  if (!isLoading) dispatch(retrieveArticlesIsLoading({ section: articlesSection }));

  ArticleAPI.getAllArticles(
    reset ? `/api/tag/articles/?tags=${tagName}` : next
  ).then((response) => {
    handleArticlePagination(articlesSection, response, dispatch, reset);
  });
};

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
