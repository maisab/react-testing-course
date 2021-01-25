import React from "react";
import { mount, shallow } from "enzyme";
import { Category, LinkedCategory } from "../components/Category";
import { categories, clues } from "../data/fixtures";
import { fakeServer } from "sinon";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const props = { category: categories[0] };

describe("Category", () => {
  let server;

  beforeEach(() => {
    server = fakeServer.create();
    server.respondWith(
      "GET",
      `http://jservice.io/api/clues?category=${props.category.id}`,
      [200, { "Content-Type": "application/json" }, JSON.stringify(clues)]
    );
  });

  describe("when creating a new category", () => {
    let category;

    beforeEach((done) => {
      category = mount(<Category {...props} />);

      server.respond();

      setTimeout(done);
    });

    it("initializes the clues in state", () => {
      expect(category.state().clues).toEqual(clues);
    });

    it("renders the category title", () => {
      expect(category.find("h2").text()).toEqual("category one");
    });

    it("renders the correct number of clues", () => {
      expect(category.find("Clue").length).toEqual(2);
    });
  });
});

describe("LinkedCategory", () => {
  const linkedCategory = shallow(<LinkedCategory />);

  it("creates the link to navigate home", () => {
    expect(linkedCategory.find("Link h4").text()).toEqual("Home");
  });

  it("creates a category component", () => {
    expect(linkedCategory.find("Category").exists()).toBe(true);
  });

  describe("mapStateToProps", () => {
    const mockStore = configureMockStore();
    const store = mockStore({ props });

    const wrapper = shallow(
      <Provider store={store}>
        <LinkedCategory {...props} />
      </Provider>
    );

    it("mapStateToProps should return the right categories value", () => {
      expect(wrapper.props().category).toEqual({
        id: 0,
        title: "category one",
      });
    });
  });
});
