/* eslint-disable prefer-const */
import objectAssign from "object-assign";
import * as types from "../actions/actionTypes";
import initialState from "../store/initialState";

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ARTICLE_COMMENTS_SUCCESS: {
      let newState = objectAssign({}, state);

      if (action.payload.reset) {
        newState.comments = action.payload.comments;
      } else {
        newState.comments = newState.comments.concat(action.payload.comments);
      }

      newState.hasMore = true;
      newState.mainOffset = action.payload.offset;
      return newState;
    }
    case types.GET_REPLY_COMMENT_SUCCESS: {
      const newState = objectAssign({}, state);
      let oldComments = newState.comments;
      let newComments = [];
      const { parentId, comments, offset } = action.payload;

      if (action.payload.reset) {
        oldComments = oldComments.forEach((comment, i) => {
          if (comment.parent !== parentId) {
            newComments.push(comment);
          }
        });

        newComments = [...newComments, ...comments];
      } else {
        newComments = [...oldComments, ...comments];
      }

      return {
        ...state,
        comments: newComments.map((comment) => {
          if (comment.id === parentId) {
            return Object.assign({}, comment, {
              hasMore: true,
              offset
            });
          }

          return comment;
        })
      };
    }
    case types.GET_ARTICLE_COMMENTS_FAILURE: {
      return { ...state, hasMore: false };
    }
    case types.GET_REPLY_COMMENT_FAILURE: {
      const nextState = objectAssign({}, state);
      let newComments = nextState.comments;
      const { parentId } = action.payload;

      return {
        ...state,
        comments: newComments.map((comment) => {
          if (comment.id === parentId) {
            return Object.assign({}, comment, {
              hasMore: true
            });
          }

          return comment;
        })
      };
    }
    default:
      return state;
  }
};

export default commentReducer;
