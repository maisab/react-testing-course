import React from "react";
import { shallow, mount } from "enzyme";
import { Stack } from "../components/Stack";
import { stack } from "../data/fixtures";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const props = { stack };

describe("Stack", () => {
  const stack = shallow(<Stack {...props} />);

  it("renders the title", () => {
    expect(stack.find("h3").text()).toEqual(props.stack.title);
  });

  it("renders the Link home", () => {
    expect(stack.find("a h4").text()).toEqual("Home");
  });

  it("renders the correct number of cards", () => {
    expect(stack.find("Card").length).toEqual(2);
  });

  it("mapStateToProps should return the right stack value", () => {
    const cprops = { stack: "something" };

    const mockStore = configureMockStore();

    const store = mockStore({
      stack: "something",
    });

    const wrapper = shallow(
      <Provider store={store}>
        <Stack {...cprops} />
      </Provider>
    );
    expect(wrapper.props().stack).toBe("something");
  });
});
