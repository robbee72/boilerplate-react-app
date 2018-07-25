import React from 'react';
import { connect } from 'react-redux';
import TeamForm from './TeamForm';
import { startAddTeam } from '../actions/teams';

export class AddTeamPage extends React.Component {
  onSubmit = (team) => {
    this.props.startAddTeam(team);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Team</h1>
          </div>
        </div>
        <div className="content-container">
          <TeamForm
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddTeam: (team) => dispatch(startAddTeam(team))
});

export default connect(undefined, mapDispatchToProps)(AddTeamPage);
