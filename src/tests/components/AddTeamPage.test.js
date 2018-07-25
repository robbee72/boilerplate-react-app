import React from 'react';
import { shallow } from 'enzyme';
import { AddTeamPage } from '../../components/AddTeamPage';
import teams from '../fixtures/teams';

let startAddTeam, history, wrapper;

beforeEach(() => {
  startAddTeam = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddTeamPage startAddTeam={startAddTeam} history={history} />);
});

test('should render AddTeamPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  wrapper.find('TeamForm').prop('onSubmit')(teams[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startAddTeam).toHaveBeenLastCalledWith(teams[1]);
});
