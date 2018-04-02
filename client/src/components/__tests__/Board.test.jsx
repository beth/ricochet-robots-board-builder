import React from 'react';
import renderer from 'react-test-renderer';
import Board from '../Board';
import BoardConstructor from '../../lib/Board';

describe('Board Component', () => {
  it('renders correctly', () => {
    const board = new BoardConstructor(16);
    const domTree = renderer.create(<Board squares={board.squares} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
