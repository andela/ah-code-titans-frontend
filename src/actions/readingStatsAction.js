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

const readingStatsAsync = () => (dispatch) => {
  dispatch(statsRequest());
  instance
    .get("api/read-stats")
    .then((res) => {
      const response = res.data;
      dispatch(statsRequestSuccess(response));
    })
    .catch((err) => {
      const { data } = err.response;
      dispatch(statsRequestFailure(data));
    });
};

export default readingStatsAsync;
