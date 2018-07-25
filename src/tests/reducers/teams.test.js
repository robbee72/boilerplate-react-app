import teamsReducer from '../../reducers/teams';
import teams from '../fixtures/teams';

test('should set default state', () => {
  const state = teamsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove team by id', () => {
  const action = {
    type: 'REMOVE_TEAM',
    id: teams[1].id
  };
  const state = teamsReducer(teams, action);
  expect(state).toEqual([teams[0], teams[2]]);
});

test('should not remove teams if id not found', () => {
  const action = {
    type: 'REMOVE_TEAM',
    id: '-1'
  };
  const state = teamsReducer(teams, action);
  expect(state).toEqual(teams);
});

test('should add an team', () => {
  const team = {
    id: '110',
    homeTown: 'Vegas',
    teamName: 'Golden Knights',
    note: '',
    createdAt: 20000,
    conference: 'Western',
    division: 'Pacific'
  };
  const action = {
    type: 'ADD_TEAM',
    team
  };
  const state = teamsReducer(teams, action);
  expect(state).toEqual([...teams, team]);
});

test('should edit an team', () => {
  const division = 12;
  const action = {
    type: 'EDIT_TEAM',
    id: teams[1].id,
    updates: {
      division
    }
  };
  const state = teamsReducer(teams, action);
  expect(state[1].division).toBe(division);
});

test('should not edit an team if id not found', () => {
  const division = 12;
  const action = {
    type: 'EDIT_TEAM',
    id: '-1',
    updates: {
      division
    }
  };
  const state = teamsReducer(teams, action);
  expect(state).toEqual(teams);
});

test('should set teams', () => {
  const action = {
    type: 'SET_TEAMS',
    teams: [teams[1]]
  };
  const state = teamsReducer(teams, action);
  expect(state).toEqual([teams[1]]);
});
