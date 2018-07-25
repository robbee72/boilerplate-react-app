import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class TeamForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      homeTown: props.team ? props.team.homeTown : '',
      teamName: props.team ? props.team.teamName : '',
      note: props.team ? props.team.note : '',
      conference: props.team ? props.team.conference : '',
      division: props.team ? props.team.division : '',
      createdAt: props.team ? moment(props.team.createdAt) : moment(),
      calendarFocused: false,
      error: ''
    };
  }
  onHomeTownChange = (e) => {
    const homeTown = e.target.value;
    this.setState(() => ({ homeTown }));
  };
  onTeamNameChange = (e) => {
    const teamName = e.target.value;
    this.setState(() => ({ teamName }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onConferenceChange = (e) => {
    const conference = e.target.value;

    if (!conference || conference.match) {
      this.setState(() => ({ conference }));
    }
  };
  onDivisionChange = (e) => {
    const division = e.target.value;

    if (!division || division.match) {
      this.setState(() => ({ division }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.homeTown || !this.state.teamName || !this.state.conference || !this.state.division) {
      this.setState(() => ({ error: 'Please provide Team\'s, Name, conference, and division.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        homeTown: this.state.homeTown,
        teamName: this.state.teamName,
        conference: this.state.conference,
        division: this.state.division,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Home Town"
          autoFocus
          className="text-input"
          value={this.state.homeTown}
          onChange={this.onHomeTownChange}
        />
        <input
          type="text"
          placeholder="Team Name"
          autoFocus
          className="text-input"
          value={this.state.teamName}
          onChange={this.onTeamNameChange}
        />
        <input
          type="text"
          placeholder="Conference"
          className="text-input"
          value={this.state.conference}
          onChange={this.onConferenceChange}
        />
        <input
          type="text"
          placeholder="Division"
          className="text-input"
          value={this.state.division}
          onChange={this.onDivisionChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add a note for your team (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        >
        </textarea>
        <div>
          <button className="button">Save Team</button>
        </div>
      </form>
    )
  }
}
