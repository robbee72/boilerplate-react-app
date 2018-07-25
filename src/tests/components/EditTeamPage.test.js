import React from 'react';
import { shallow } from 'enzyme';
import teams from '../fixtures/teams';
import { EditTeamPage } from '../../components/EditTeamPage';

let startEditTeam, startRemoveTeam, history, wrapper;

beforeEach(() => {
  startEditTeam = jest.fn();
  startRemoveTeam = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditTeamPage
      startEditTeam={startEditTeam}
      startRemoveTeam={startRemoveTeam}
      history={history}
      team={teams[2]}
    />
  );
});

test('should render EditTeamPage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditTeam', () => {
  wrapper.find('TeamForm').prop('onSubmit')(teams[2]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditTeam).toHaveBeenLastCalledWith(teams[2].id, teams[2]);
});

test('should handle startRemoveTeam', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveTeam).toHaveBeenLastCalledWith({
    id: teams[2].id
  });
});
