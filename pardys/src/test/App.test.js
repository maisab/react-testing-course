import React from "react";
import { shallow, mount } from "enzyme";
import { App } from "../components/App";
import { categories } from "../data/fixtures";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const props = { categories };

describe("App", () => {
  const app = shallow(<App {...props} />);

  it("renders the title", () => {
    expect(app.find("h2").text()).toEqual("Pardys!");
  });

  it("creates the correct number of links", () => {
    expect(app.find("Link").length).toEqual(3);
  });

  it("title the links correctly", () => {
    expect(app.find("Link h4").at(0).text()).toEqual("category one");
    expect(app.find("Link h4").at(1).text()).toEqual("category two");
    expect(app.find("Link h4").at(2).text()).toEqual("category three");
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
