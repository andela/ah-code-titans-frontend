import * as types from "./actionTypes";
import { axiosProtected } from "../api/axiosConfig";
import { checkIfUnauthorized } from "./authenticationActions";

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
  axiosProtected
    .get(`api/search/articles/?author=${user}&limit=${3000}`)
    .then((res) => {
      const response = res.data;
      dispatch(statsRequestSuccess(response));
    })
    .catch((err) => {
      if (err.response.status !== 200) {
        if (err.response.status !== 401) {
          dispatch(statsRequestFailure(err.response.data));
        } else {
          checkIfUnauthorized({ error: { status: err.response.status } }, dispatch);
        }
      }
    });
};

export const articleReadStats = () => (dispatch) => {
  dispatch(readStatsRequest());
  axiosProtected
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
