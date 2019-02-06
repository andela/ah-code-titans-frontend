import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router";
import { connectRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { history } from "../../../../store/configureStore";
import { Profile } from "../Profile";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("profile with props: ", () => {
  it("clicks a button", () => {
    const props = {
      getProfile: {
        username: "",
        bio: "",
        company: "",
        phone: "",
        website: ""
      },
      actions: { getProfile: () => Promise.resolve() },
      getReadingStats: () => Promise.resolve(),
      getArticlesReadStats: () => Promise.resolve(),
      editing: false,
      location: {
        pathname: "/"
      }
    };

    const store = mockStore({
      router: connectRouter(history),
      login: {
        auth: {
          authentication: "",
          user: {},
          isFetching: false
        },
        login: {
          state: "",
          error: null
        }
      },
      userSettings: {
        settings: {
          walkThrough: true
        }
      },
      profile: {
        profile: {}
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Profile {...props} />
        </MemoryRouter>
      </Provider>
    );

    const firstButton = wrapper.find(".profile__editBtn").at(0);

    firstButton.simulate("click");
    expect(wrapper.find("Form").hasClass("test-form")).toBe(true);
    const saveButton = wrapper.find(".ui.green.button");
    expect(saveButton.prop("type")).toBe("submit");
    saveButton.simulate("click");
  });
});
