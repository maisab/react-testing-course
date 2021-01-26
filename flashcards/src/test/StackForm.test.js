import React from "react";
import { shallow } from "enzyme";
import { StackForm } from "../components/StackForm";
import { getTextAt, clickAt, findAt} from "./utils/UIHelper.js";

const changeTitle = "change title";
const changePrompt = "change prompt";
const changeAnswer = "change answer";

describe("StackForm", () => {
  const stackForm = shallow(<StackForm />);

  it("renders the form title", () => {
    expect(getTextAt(stackForm, "h4", 1)).toEqual("Create a New Stack");
  });

  it("renders a link home", () => {
    expect(getTextAt(stackForm, "h4", 0)).toEqual("Home");
  });

  it("click link go home", () => {
    expect(getTextAt(stackForm, "h4", 0)).toEqual("Home");
    clickAt(stackForm, "h4", 0)
    expect(window.location.pathname).toEqual("/");
  });

  it("renders a Form component", () => {
    expect(stackForm.find("Form").exists()).toBe(true);
  });

  it("renders a button to add a new card", () => {
    expect(findAt(stackForm, "Button", 0).props().children).toEqual("Add Card");
  });

  it("renders link to submit the form", () => {
    expect(findAt(stackForm, "Button", 1).props().children).toEqual(
      "Save and Add the Stack"
    );
  });

  describe("and updating the title", () => {
    beforeEach(() => {
      stackForm
        .find("FormControl")
        .simulate("change", { target: { value: changeTitle } });
    });

    it("updates the title in state", () => {
      expect(stackForm.state().title).toEqual(changeTitle);
    });
  });

  describe("when adding a new card", () => {
    beforeEach(() => {
      clickAt(stackForm, "Button", 0)
    });

    afterEach(() => {
      stackForm.setState({ cards: [] });
    });

    it("adds a new card to the state", () => {
      expect(stackForm.state().cards.length).toEqual(1);
    });

    it("renders the prompt section", () => {
      expect(findAt(stackForm, "ControlLabel", 1).props().children).toEqual(
        "Prompt:"
      );
    });

    it("renders the answer section", () => {
      expect(findAt(stackForm, "ControlLabel", 2).props().children).toEqual(
        "Answer:"
      );
    });

    describe("and updating the card prompt", () => {
      beforeEach(() => {
        stackForm
          .find("FormControl")
          .at(1)
          .simulate("change", { target: { value: changePrompt } });
      });

      it("updates the prompt in the state", () => {
        expect(stackForm.state().cards[0].prompt).toEqual("change prompt");
      });
    });

    describe("and updating the card answer", () => {
      beforeEach(() => {
        stackForm
          .find("FormControl")
          .at(2)
          .simulate("change", { target: { value: changeAnswer } });
      });

      it("updates the answer in the state", () => {
        expect(stackForm.state().cards[0].answer).toEqual("change answer");
      });
    });
  });

  describe("when adding and saving stack", () => {
    beforeEach(() => {
      clickAt(stackForm, "Button", 0)
    });

    it("adds a new card to the state", () => {
      expect(stackForm.state().cards.length).toEqual(1);
    });

    it("save the stack and go home", () => {
      clickAt(stackForm, "Button", 1)
      expect(window.location.pathname).toEqual("/");
    });
  });
});
