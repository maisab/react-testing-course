import React from "react";
import { shallow, mount } from "enzyme";
import { Stack } from "../components/Stack";
import { stack } from "../data/fixtures";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { getText, getLength} from "./utils/UIHelper.js";

const props = { stack };

describe("Stack", () => {
  const stack = shallow(<Stack {...props} />);

  it("renders the title", () => {
    expect(getText(stack, "h3")).toEqual(props.stack.title);
  });

  it("renders the Link home", () => {
    expect(getText(stack, "a h4")).toEqual("Home");
  });

  it("renders the correct number of cards", () => {
    expect(getLength(stack, "Card")).toEqual(2);
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
