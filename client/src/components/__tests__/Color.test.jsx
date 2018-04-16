import React from 'react';
import renderer from 'react-test-renderer';
import Color from '../Color';

describe('Color Component', () => {
  it('renders correctly when given color', () => {
    const domTree = renderer.create(<Color
      color="BLUE"
      row={8}
      col={8}
      setQuadrant={() => {}}
    />).toJSON();
    expect(domTree).toMatchSnapshot();
  });

  it('renders correctly when not given color', () => {
    const domTree = renderer.create(<Color
      color=""
      row={8}
      col={8}
      setQuadrant={() => {}}
    />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
