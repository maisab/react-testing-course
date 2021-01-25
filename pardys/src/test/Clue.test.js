import React from 'react';
import { shallow } from 'enzyme';
import Clue from '../components/Clue';
import { clue } from '../data/fixtures';

const props = { clue };

describe('Clue', () => {
  let clueWrapper = shallow(<Clue {...props} />);

  it('renders the clue value', () => {
    expect(clueWrapper.find('h4').text()).toEqual("200");
  });

  it('renders the clue question', () => {
    expect(clueWrapper.find('h5').at(0).text()).toEqual("q one");
  });

  it('renders the clue answer', () => {
    expect(clueWrapper.find('h5').at(1).text()).toEqual("a one");
  });

  it('sets the answer with the `text-hidden` class', () => {
    expect(clueWrapper.find('h5').at(1).hasClass('text-hidden')).toBe(true);
  });

  it('initializes the `reveal` state to be `false`', () => {
    expect(clueWrapper.state().reveal).toBe(false);
  });

  describe('when rendering a clue with no value', () => {
    beforeEach(() => {
      props.clue.value = undefined;
      props.clue.question = undefined;
      props.clue.answer = undefined;

      clueWrapper = shallow(<Clue {...props} />);
    });

    it('displays the value as `unknown`', () => {
      expect(clueWrapper.find('h4').text()).toEqual('unknown');
    });
  });

  describe('when clicking on the clue', () => {
    beforeEach(() => clueWrapper.simulate('click'));

    it('sets the `reveal` state to be `true`', () => {
      expect(clueWrapper.state().reveal).toBe(true);
    });

    it('sets the answer with the `text-revealed` class', () => {
      expect(clueWrapper.find('h5').at(1).hasClass('text-revealed')).toBe(true);
    });
  });
});