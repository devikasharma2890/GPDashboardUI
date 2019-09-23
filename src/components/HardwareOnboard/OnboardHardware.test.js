import React from 'react';
import { shallow } from 'enzyme';
import HardwareOnboard from './HardwareOnboard';

describe('<HardwareOnboard />', () => {
  test('renders', () => {
    const wrapper = shallow(<HardwareOnboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
