import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';
import { getText} from "./utils/UIHelper.js";

describe('App', () => {
  const app = shallow(<App />);

  it('renders the `Flashcard` title', () => {
    expect(getText(app, 'h2')).toEqual('Flashcard')
  });

  it('renders the StackList', () => {
    expect(app.find('Connect(StackList)').exists()).toBe(true);
  });

  it('renders a link to create new stacks', () => {
    expect(getText(app, 'Link h4')).toEqual('Create a New Stack');
  });
});