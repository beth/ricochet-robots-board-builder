import React from 'react';
import renderer from 'react-test-renderer';
import Board from '../Board';

jest.mock('../../containers/SquareContainer', () => 'SquareContainer');

describe('Board Component', () => {
  it('renders correctly', () => {
    const domTree = renderer.create(<Board size={8} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
