import React from "react";
import { shallow, render } from "enzyme";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });
});
