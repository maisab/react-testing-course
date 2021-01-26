import React from 'react';
import { mount } from 'enzyme';
import Note from '../components/Note';
import { getText} from "./utils/UIHelper.js";

const props = { note: { text: 'test_note' } };

describe('Note', () => {
  let note = mount(<Note {...props} />);

  it('renders the note text', () => {
    expect(getText(note, 'p')).toEqual('test_note');
  });
});

