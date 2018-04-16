import React from 'react';
import renderer from 'react-test-renderer';
import Colors from '../Colors';

jest.mock('../../containers/ColorContainer', () => 'ColorContainer');

describe('Colors Component', () => {
  it('renders four ColorContainers when given four colors', () => {
    const domTree = renderer.create(<Colors
      colors={['RED', 'BLUE', 'YELLOW', 'GREEN']}
      row={8}
      col={8}
    />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
  it('renders two ColorContainers when given two colors', () => {
    const domTree = renderer.create(<Colors
      colors={['RED', 'GREEN']}
      row={8}
      col={8}
    />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
