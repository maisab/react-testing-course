import React from "react";
import { shallow } from "enzyme";
import { mapStateToProps, StackList } from "../components/StackList";
import { stacks } from '../data/fixtures';
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { getText, getLength} from "./utils/UIHelper.js";

const props = { stacks };

describe("StackList", () => {
  const stackList = shallow(<StackList {...props} />);

  it("renders the correct number of links", () => {
    expect(getLength(stackList, "Link")).toEqual(1);
  });

  it("renders the correct number of links", () => {
    expect(mapStateToProps(props).stacks.length).toEqual(1);
  });

  it("renders the link title", () => {
    expect(getText(stackList, 'h4')).toEqual('test title');
  });

  describe("mapStateToProps", () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      id: 0,
      title: 'test title',
      cards: [
        { id: 0, prompt: 'test prompt', answer: 'test answer' },
        { id: 1, prompt: 'test prompt 2', answer: 'test answer 2' }
      ]
    });

    const wrapper = shallow(
      <Provider store={store}>
          <StackList {...props}/>
       </Provider>
    );
   
    it("mapStateToProps should return the right stacks value", () => {
      expect(wrapper.props().stacks.length).toBe(1);

      expect(wrapper.props().stacks).toEqual([{
        id: 0,
        title: 'test title',
        cards: [
          { id: 0, prompt: 'test prompt', answer: 'test answer' },
          { id: 1, prompt: 'test prompt 2', answer: 'test answer 2' }
        ]
      }])
    });
  });
});
