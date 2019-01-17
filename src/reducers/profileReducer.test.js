import initialState from "../store/initialState";
import profileReducer from "./profileReducer";

describe("reducer: ", () => {
  it("should return initial state", () => {
    expect(profileReducer(initialState.profileReducer, {})).toEqual(
      initialState.profileReducer
    );
  });
});
