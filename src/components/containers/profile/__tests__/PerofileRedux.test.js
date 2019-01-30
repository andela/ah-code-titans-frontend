import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
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
      editing: false
    };

    const store = mockStore({
      loginReducer: {
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
      userSettingsReducer: {
        settings: {
          walkThrough: true
        }
      },
      profileReducer: {
        profile: {}
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <Profile {...props} />
      </Provider>
    );
    const firstButton = wrapper.find(".profile__editBtn").first();
    firstButton.simulate("click");
    expect(wrapper.find("Form").hasClass("test-form")).toBe(true);
    const saveButton = wrapper.find(".ui.green.button");
    expect(saveButton.prop("type")).toBe("submit");
    saveButton.simulate("click");
  });
});
