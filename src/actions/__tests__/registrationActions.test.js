import configureStore from "redux-mock-store";
import * as types from "../actionTypes";
import * as actions from "../registrationActions";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("actions", () => {
  it("should create an action to register a user", () => {
    const store = mockStore({});
    const expectedAction = {
      type: types.REGISTER_REQUEST
    };
    const actionsDispatched = store.dispatch(actions.registerRequest());
    expect(actionsDispatched).toEqual(expectedAction);
  });

  it("should create an action to return success response", () => {
    const store = mockStore({});
    const response = "user data";
    const expectedAction = {
      type: types.REGISTER_SUCCESS,
      response
    };
    const actionsDispatched = store.dispatch(actions.registerSuccess(response));
    expect(actionsDispatched).toEqual(expectedAction);
  });

  it("should create an action to return failure response", () => {
    const store = mockStore({});
    const errors = "errors";
    const expectedAction = {
      type: types.REGISTER_FAILURE,
      errors
    };
    const actionsDispatched = store.dispatch(actions.registerFailure(errors));
    expect(actionsDispatched).toEqual(expectedAction);
  });
});
