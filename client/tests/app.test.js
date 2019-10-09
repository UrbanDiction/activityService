import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../src/App.jsx';

it('works', function () {
  expect(App).toEqual(App)
})

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});