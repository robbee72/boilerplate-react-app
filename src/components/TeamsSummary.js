import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import selectTeams from '../selectors/teams';
import selectTeamsTotal from '../selectors/teams-total';

export const TeamsSummary = ({ teamCount, teamsTotal }) => {
  const teamWord = teamCount === 1 ? 'team' : 'teams' ;

  return (
      <div className="page-header">
        <div className="content-container">
          <h3 className="page-header__title">Standing <span>{teamCount}</span> {teamWord}  <span>3</span></h3>
          <div className="page-header__actions">
            <Link className="button" to="/create">Add Team</Link>
          </div>
        </div>
      </div>
    );
  };

const mapStateToProps = (state) => {
  const visibleTeams = selectTeams(state.teams, state.filters);

  return {
    teamCount: visibleTeams.length,
    teamsTotal: selectTeamsTotal(visibleTeams)
  };
};

export default connect(mapStateToProps)(TeamsSummary);
