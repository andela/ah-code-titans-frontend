import React from "react";
import { shallow } from "enzyme";

import SingleArticle from "../articles/SingleArticle";

describe("Single artice tests", () => {
  it("renders a list of tags", () => {
    const items = ["software", "react", "redux"];
    const wrapper = shallow(<SingleArticle items={items} />);

    expect(wrapper.find(".article__tags")).toBeDefined();
  });
});
