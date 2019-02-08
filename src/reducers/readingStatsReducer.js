import * as types from "../actions/actionTypes";

const readStats = (state = { read: { count: "" }, authored: {}, isFetching: false }, action) => {
  switch (action.type) {
    case types.STATS_REQUEST:
      return { ...state, isFetching: true };
    case types.STATS_REQUEST_SUCCESS:
      return { ...state, authored: { ...action.payload }, isFetching: false };
    case types.STATS_REQUEST_FAILURE:
      return { ...state, isFetching: false };
    case types.READ_STATS_REQUEST:
      return { ...state, isFetching: true };
    case types.READ_STATS_REQUEST_SUCCESS:
      return { ...state, read: { ...action.payload }, isFetching: false };
    case types.READ_STATS_REQUEST_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default readStats;
