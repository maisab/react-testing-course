import React from "react";
import { shallow, mount } from "enzyme";
import { App } from "../components/App";
import { categories } from "../data/fixtures";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { getText, getTextAt, getLength} from "./utils/UIHelper.js";

const props = { categories };

describe("App", () => {
  const app = shallow(<App {...props} />);

  it("renders the title", () => {
    expect(getText(app, "h2")).toEqual("Pardys!");
  });

  it("creates the correct number of links", () => {
    expect(getLength(app, "Link")).toEqual(3);
  });

  it("title the links correctly", () => {
    expect(getTextAt(app, "Link h4", 0)).toEqual("category one");
    expect(getTextAt(app, "Link h4", 1)).toEqual("category two");
    expect(getTextAt(app, "Link h4", 2)).toEqual("category three");
  });

  describe("mapStateToProps", () => {
    const mockStore = configureMockStore();
    const store = mockStore({ props });

    const wrapper = shallow(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );

    it("mapStateToProps should return the right categories value", () => {
      expect(wrapper.props().categories.length).toBe(3);

      expect(wrapper.props().categories).toEqual([
        { id: 0, title: "category one" },
        { id: 1, title: "category two" },
        { id: 2, title: "category three" },
      ]);
    });
  });
});
