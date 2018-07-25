import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_TEAM
export const addTeam = (team) => ({
  type: 'ADD_TEAM',
  team
});

export const startAddTeam = (teamData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      homeTown = '',
      teamName = '',
      note = '',
      conference = '',
      division = '',
      createdAt = 0
    } = teamData;
    const team = { homeTown, teamName, note, conference, division, createdAt };

    return database.ref(`users/${uid}/teams`).push(team).then((ref) => {
      dispatch(addTeam({
        id: ref.key,
        ...team
      }));
    });
  };
};

// REMOVE_TEAM
export const removeTeam = ({ id } = {}) => ({
  type: 'REMOVE_TEAM',
  id
});

export const startRemoveTeam = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/teams/${id}`).remove().then(() => {
      dispatch(removeTeam({ id }));
    });
  };
};

// EDIT_TEAM
export const editTeam = (id, updates) => ({
  type: 'EDIT_TEAM',
  id,
  updates
});

export const startEditTeam = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/teams/${id}`).update(updates).then(() => {
      dispatch(editTeam(id, updates));
    });
  };
};

// SET_TEAMS
export const setTeams = (teams) => ({
  type: 'SET_TEAMS',
  teams
});

export const startSetTeams = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/teams`).once('value').then((snapshot) => {
      const teams = [];

      snapshot.forEach((childSnapshot) => {
        teams.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setTeams(teams));
    });
  };
};
