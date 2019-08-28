import React from 'react';
import { shallow } from 'enzyme';
import EmployeeOnboard from './EmployeeOnboard';

describe('<EmployeeOnboard />', () => {
  test('renders', () => {
    const wrapper = shallow(<EmployeeOnboard />);
    expect(wrapper).toMatchSnapshot();
  });
});
