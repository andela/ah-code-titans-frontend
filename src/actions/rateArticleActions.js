import * as types from "./actionTypes";
import rateArticleApi from "../api/rateArticleApi";

export const rateArticleSuccess = data => ({
  type: types.RATE_ARTICLE_SUCCESS,
  data
});

export const getArticleRateSuccess = data => ({
  type: types.GET_ARTICLE_RATING_SUCCESS,
  data
});

export const getRates = slug => (dispatch) => {
  rateArticleApi.getArticleRate(slug).then((response) => {
    if (response.success) {
      dispatch(getArticleRateSuccess(response.articleRating));
    }
  });
};

export const rateArticle = (rate, slug) => (dispatch) => {
  rateArticleApi.rateArticle(rate, slug).then((response) => {
    if (response.success) {
      dispatch(rateArticleSuccess(rate));
      dispatch(getRates(slug));
    }
  });
};
