import React from 'react';
import { shallow } from 'enzyme';
import TeamDashboardPage from '../../components/TeamDashboardPage';

test('should render TeamDashboardPage correctly', () => {
  const wrapper = shallow(<TeamDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
