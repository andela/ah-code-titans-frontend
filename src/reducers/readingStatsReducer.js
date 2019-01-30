import * as types from "../actions/actionTypes";

const readStats = (state = { results: [], isFetching: false }, action) => {
  switch (action.type) {
    case types.STATS_REQUEST:
      return { ...state, isFetching: true };
    case types.STATS_REQUEST_SUCCESS:
      return { ...state, ...action.payload, isFetching: false };
    case types.STATS_REQUEST_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default readStats;
