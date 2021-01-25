import React from 'react';
import { shallow } from 'enzyme';
import App from '../components/App';

describe('App', () => {
  const app = shallow(<App />);

  it('renders the `Flashcard` title', () => {
    expect(app.find('h2').text()).toEqual('Flashcard')
  });

  it('renders the StackList', () => {
    expect(app.find('Connect(StackList)').exists()).toBe(true);
  });

  it('renders a link to create new stacks', () => {
    expect(app.find('Link h4').text()).toEqual('Create a New Stack');
  });
});