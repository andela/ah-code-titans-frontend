import React from "react";
import { shallow } from "enzyme";
import App from "./app";

describe("App Component", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});
