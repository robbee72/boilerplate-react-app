import React from 'react';
import { shallow } from 'enzyme';
import { TeamList } from '../../components/TeamList';
import teams from '../fixtures/teams';

test('should render TeamList with teams', () => {
  const wrapper = shallow(<TeamList teams={teams} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render TeamList with empty message', () => {
  const wrapper = shallow(<TeamList teams={[]} />);
  expect(wrapper).toMatchSnapshot();
});
