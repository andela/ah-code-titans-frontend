import * as types from "./actionTypes";
import TagSearchingAPI from "../api/searchAPI";

export const getAllTagRelatedArticles = payload => ({
  type: types.GET_TAG_RELATED_ARTICLES_SUCCESS,
  payload
});

export const getAllSpecificTagRelatedArticles = tagName => (dispatch) => {
  TagSearchingAPI.searchByTag(tagName)
    .then((response) => {
      dispatch(getAllTagRelatedArticles(response));
    });
};
