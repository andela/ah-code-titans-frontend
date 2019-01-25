import tagSearchReducer from "../tagSearchReducer";

describe("Test on tagsearch Reducer", () => {
  it("should retrieve the initial state", () => {
    expect(tagSearchReducer({}, {})).toEqual({});
  });
});
