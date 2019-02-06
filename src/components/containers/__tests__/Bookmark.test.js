import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { Bookmarks } from "../Bookmarks";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("bookmarks with props: ", () => {
  it("renders bookmarks ", () => {
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
      editing: false,
      location: {
        pathname: "/"
      }
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
    const wrapper = shallow(
      <Provider store={store}>
        <MemoryRouter>
          <Bookmarks {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(".ui.text.container")).toBeDefined();
    expect(wrapper.find(".bookmarkname")).toBeDefined();
  });
});
