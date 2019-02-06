/* eslint-disable import/prefer-default-export */
import toastr from "toastr";
import * as types from "./actionTypes";
import ArticleAPI from "../api/articleAPI";
import { checkIfUnauthorized } from "./authenticationActions";

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
    if (response.success) {
      handleArticlePagination(articlesSection, response, dispatch, reset);
    } else {
      checkIfUnauthorized(response, dispatch, () => {
        getArticles(articlesSection, reset);
      });
    }
  });
};

const getSearchLink = (params) => {
  const titleIsValid = params.title !== null && params.title !== "";
  const authorIsValid = params.author !== null && params.author !== "";

  let tags = [];

  if (params.tag !== "" && params.tag !== null) tags.push(params.tag);
  tags = tags.concat(params.tags);

  let link = titleIsValid ? `&search=${params.title}` : "";
  link += authorIsValid ? `&${titleIsValid ? "author" : "search"}=${params.author}` : "";
  link += tags.length !== 0 ? `&tags=${tags.join(",")}` : "";

  if (link !== "") link = link.substr(1);

  return link;
};

export const searchForArticles = (
  articlesSection,
  query,
  reset = false
) => (dispatch, getState) => {
  const { next, isLoading } = getState().article.articles[articlesSection];
  if (!isLoading) dispatch(retrieveArticlesIsLoading({ section: articlesSection }));

  const initialLink = getSearchLink(query);

  ArticleAPI.getAllArticles(
    reset ? `api/search/articles/${initialLink === "" ? "" : `?${initialLink}`}` : next
  ).then((response) => {
    if (response.success) {
      handleArticlePagination(articlesSection, response, dispatch, reset);
    } else {
      checkIfUnauthorized(response, dispatch, () => {
        searchForArticles(articlesSection, query, reset);
      });
    }
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
        dispatch(getSpecificArticle(response.error.message));
      }
    });
};

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

export const deleteSpecificArticle = payload => ({
  type: types.DELETE_ARTICLE_SUCCESS,
  payload
});

export const editSpecificArticle = payload => ({
  type: types.EDIT_ARTICLE_SUCCESS,
  payload
});

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
