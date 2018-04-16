import React from 'react';
import renderer from 'react-test-renderer';
import Connector from '../Connector';

jest.mock('../../containers/ColorsContainer', () => 'ColorsContainer');

describe('Connector Component', () => {
  it('renders a plain div when given a valid color', () => {
    const domTree = renderer.create(<Connector
      color="RED"
      row={8}
      col={8}
    />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
  it('renders a ColorsContainers component when given an empty string', () => {
    const domTree = renderer.create(<Connector
      color=""
      row={8}
      col={8}
    />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
