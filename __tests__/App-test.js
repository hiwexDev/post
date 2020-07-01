/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { shallow } from 'enzyme';

import CreateUser from '../app/views/createUser';

const Comp = shallow(<CreateUser/>);

describe('checking components', () => {
  it('renders correctly', () => {
    const finded = Comp.find('View')
    expect(finded).toHaveLength(1);
  });
});

it('renders correctly', () => {
  renderer.create(<App />);
});
