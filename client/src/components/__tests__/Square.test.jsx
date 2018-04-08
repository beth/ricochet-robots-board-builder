import React from 'react';
import renderer from 'react-test-renderer';
import Square from '../Square';

describe('Square Component', () => {
  it('renders correctly', () => {
    const square = {
      walls: {},
      connector: null,
      glyph: null,
    };
    const domTree = renderer.create(<Square
      square={square}
      row={0}
      col={0}
      onClick={() => {}}
    />).toJSON();
    expect(domTree).toMatchSnapshot();
  });

  it('renders correctly when walls are present', () => {
    const square = {
      walls: {
        top: true,
        bottom: true,
      },
      connector: null,
      glyph: null,
    };
    const domTree = renderer.create(<Square
      square={square}
      row={0}
      col={0}
      onClick={() => {}}
    />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
