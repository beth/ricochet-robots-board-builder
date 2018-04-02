import React from 'react';
import renderer from 'react-test-renderer';
import Row from '../Row';
import BoardConstructor from '../../lib/Board';

describe('Row Component', () => {
  it('renders correctly', () => {
    const board = new BoardConstructor(8);
    const domTree = renderer.create(<Row squares={board.squares[0]} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
