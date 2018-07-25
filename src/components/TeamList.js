import React from 'react';
import { connect } from 'react-redux';
import TeamListItem from './TeamListItem';
import selectTeams from '../selectors/teams';

export const TeamList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Teams</div>
      <div className="show-for-desktop">Team</div>
      <div className="show-for-desktop">Division</div>
    </div>
    {
      props.teams.length === 0 ? (
        <p>No teams</p>
      ) : (
          props.teams.map((team) => {
            return <TeamListItem key={team.id} {...team} />;
          })
        )
    }
  </div>
);

const mapStateToProps = (state) => {
  return {
    teams: selectTeams(state.teams, state.filters)
  };
};

export default connect(mapStateToProps)(TeamList);
