import React from "react";
import { mount } from "enzyme";
import App from "../components/App.js";
import { getBtnText, clickBtn, getText} from "./utils/UIHelper.js";

describe("App", () => {
  let app = mount(<App />);

  it("renders the App title", () => {
    expect(getText(app, "h2")).toEqual("Note to Self");
  });

  it("renders the clear button", () => {
    expect(getBtnText(app, 1)).toEqual("Clear Notes");
  });

  describe("when rendering the form", () => {
    it("creates a Form component", () => {
      expect(app.find("Form").exists()).toBe(true);
    });

    it("renders a FormControl component", () => {
      expect(app.find("FormControl").find("input").exists()).toBe(true);
    });

    it("renders a submit button", () => {
      expect(getBtnText(app, 0)).toEqual("Submit");
    });
  });

  describe("when creating a note", () => {
    let testNote = "test note";

    beforeEach(() => {
      app.find("FormControl").simulate("change", {
        target: { value: testNote },
      });
    });

    it("updates the text in state", () => {
      expect(app.state().text).toEqual("test note");
    });

    describe("and submitting the new note", () => {
      beforeEach(() => {
        clickBtn(app, 0);
      });

      afterEach(() => {
        clickBtn(app, 1);
      });

      it("adds the new note to the state", () => {
        expect(app.state().notes[0].text).toEqual("test note");
      });

      describe("and remounting the component", () => {
        let app2;

        beforeEach(() => {
          app2 = mount(<App />);
        });

        it("reads the stored note cookies", () => {
          expect(app2.state().notes).toEqual([{ text: testNote }]);
        });
      });

      describe("and clicking the clear button", () => {
        beforeEach(() => {
          expect(app.state().notes).toEqual([
            {
              text: "test note",
            },
          ]);

          expect(app.state().text).toEqual("test note");

          clickBtn(app, 1);
        });

        it("clears the notes in state", () => {
          expect(app.state().notes).toEqual([]);
        });
      });
    });
  });
});
