import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddTeam,
  addTeam,
  editTeam,
  startEditTeam,
  removeTeam,
  startRemoveTeam,
  setTeams,
  startSetTeams
} from '../../actions/teams';
import teams from '../fixtures/teams';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const teamsData = {};
  teams.forEach(({ id, homeTown, teamName, note, conference, division, createdAt }) => {
    teamsData[id] = { homeTown, teamName, note, conference, division, createdAt };
  });
  database.ref(`users/${uid}/teams`).set(teamsData).then(() => done());
});

test('should setup remove team action object', () => {
  const action = removeTeam({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_TEAM',
    id: '123abc'
  });
});

test('should remove team from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = teams[2].id;
  store.dispatch(startRemoveTeam({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_TEAM',
      id
    });
    return database.ref(`users/${uid}/teams/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup edit team action object', () => {
  const action = editTeam('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_TEAM',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should edit team from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = teams[0].id;
  const updates = { conference: 2 };
  const updates = { division: 4 };
  store.dispatch(startEditTeam(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_TEAM',
      id,
      updates
    });
    return database.ref(`users/${uid}/teams/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().conference).toBe(updates.conference);
    expect(snapshot.val().division).toBe(updates.division);
    done();
  });
});

test('should setup add team action object with provided values', () => {
  const action = addTeam(teams[2]);
  expect(action).toEqual({
    type: 'ADD_TEAM',
    team: teams[2]
  });
});

test('should add team to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const teamData = {
    homeTown: 'Vegas',
    teamName: 'Golden Knights',
    conference: 'Pacific',
    division: 'Western',
    note: 'This one is better',
    createdAt: 0
  };

  store.dispatch(startAddTeam(teamData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_TEAM',
      team: {
        id: expect.any(String),
        ...teamData
      }
    });

    return database.ref(`users/${uid}/teams/${actions[0].team.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(teamData);
    done();
  });
});

test('should add team with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const teamDefaults = {
    homeTown: '',
    teamName: '',
    conference: '',
    division: '',
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddTeam({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_TEAM',
      team: {
        id: expect.any(String),
        ...teamDefaults
      }
    });

    return database.ref(`users/${uid}/teams/${actions[0].team.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(teamDefaults);
    done();
  });
});

test('should setup set team action object with data', () => {
  const action = setTeams(teams);
  expect(action).toEqual({
    type: 'SET_TEAMS',
    teams
  });
});

test('should fetch the teams from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetTeams()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_TEAMS',
      teams
    });
    done();
  });
});
