import * as types from "./actionTypes";
import instance from "../api/axiosConfig";

/* eslint-disable import/prefer-default-export */
export const statsRequest = () => ({
  type: types.STATS_REQUEST
});

export const statsRequestSuccess = response => ({
  type: types.STATS_REQUEST_SUCCESS,
  payload: response
});

export const statsRequestFailure = errors => ({
  type: types.STATS_REQUEST_FAILURE,
  payload: errors
});

export const readStatsRequest = () => ({
  type: types.READ_STATS_REQUEST
});

export const readStatsRequestSuccess = response => ({
  type: types.READ_STATS_REQUEST_SUCCESS,
  payload: response
});

export const readStatsRequestFailure = errors => ({
  type: types.READ_STATS_REQUEST_FAILURE,
  payload: errors
});

export const readingStatsAsync = user => (dispatch) => {
  dispatch(statsRequest());
  instance
    .get(`api/search/articles/?author=${user}&limit=${3000}`)
    .then((res) => {
      const response = res.data;
      dispatch(statsRequestSuccess(response));
    })
    .catch((err) => {
      const { data } = err.response;
      dispatch(statsRequestFailure(data));
    });
};

export const articleReadStats = () => (dispatch) => {
  dispatch(readStatsRequest());
  instance
    .get("api/read-stats")
    .then((res) => {
      const response = res.data;
      dispatch(readStatsRequestSuccess(response));
    })
    .catch((err) => {
      const { data } = err.response;
      dispatch(readStatsRequestFailure(data));
    });
};
