import React from 'react';
import { shallow } from 'enzyme';
import SubProcessComponent from './SubProcessComponent';

describe('<SubProcessComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<SubProcessComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
