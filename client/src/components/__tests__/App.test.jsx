import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

jest.mock('../Board', () => 'Board');

describe('App Component', () => {
  it('renders correctly', () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
