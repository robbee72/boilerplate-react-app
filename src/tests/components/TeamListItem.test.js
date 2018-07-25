import React from 'react';
import { shallow } from 'enzyme';
import teams from '../fixtures/teams';
import TeamListItem from '../../components/TeamListItem';

test('should render TeamListItem correctly', () => {
  const wrapper = shallow(<TeamListItem {...teams[0]} />);
  expect(wrapper).toMatchSnapshot();
});
