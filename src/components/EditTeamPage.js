import React from 'react';
import { connect } from 'react-redux';
import TeamForm from './TeamForm';
import { startEditTeam, startRemoveTeam } from '../actions/teams';

export class EditTeamPage extends React.Component {
  onSubmit = (team) => {
    this.props.startEditTeam(this.props.team.id, team);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoveTeam({ id: this.props.team.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Team</h1>
          </div>
        </div>
        <div className="content-container">
          <TeamForm
            team={this.props.team}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Remove Team</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  team: state.teams.find((team) => team.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditTeam: (id, team) => dispatch(startEditTeam(id, team)),
  startRemoveTeam: (data) => dispatch(startRemoveTeam(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTeamPage);
