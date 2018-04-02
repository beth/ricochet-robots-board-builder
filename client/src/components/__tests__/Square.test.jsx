import React from 'react';
import renderer from 'react-test-renderer';
import Square from '../Square';
import { Square as SquareConstructor } from '../../lib/Square';

describe('Square Component', () => {
  it('renders correctly', () => {
    const square = new SquareConstructor(0, 0);
    const domTree = renderer.create(<Square square={square} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });

  it('renders correctly when walls are present', () => {
    const square = new SquareConstructor(0, 0);
    square.modifyWalls({ top: true, bottom: true });
    const domTree = renderer.create(<Square square={square} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
