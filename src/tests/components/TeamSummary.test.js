import React from 'react';
import { shallow } from 'enzyme';
import { TeamsSummary } from '../../components/TeamsSummary';

test('should correctly render TeamsSummary with 1 team', () => {
  const wrapper = shallow(<TeamsSummary teamCount={1} teamsTotal={235} />);
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render TeamsSummary with multiple teams', () => {
  const wrapper = shallow(<TeamsSummary teamCount={23} teamsTotal={23512340987} />);
  expect(wrapper).toMatchSnapshot();
});
