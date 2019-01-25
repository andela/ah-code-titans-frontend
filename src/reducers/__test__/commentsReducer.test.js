import commentReducer from "../commentReducer";

describe("test suite for comments reducers", () => {
  it("should handle return default state ", () => {
    expect(commentReducer({}, {})).toEqual({});
  });
});
