import moment from 'moment';

// Get visible teams

export default (teams, { text, sortBy, startDate, endDate }) => {
  return teams.filter((team) => {
    const createdAtMoment = moment(team.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatchHomeTown = team.homeTown.toLowerCase().includes(text.toLowerCase());
    const textMatchTeamName = team.teamName.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatchHomeTown && textMatchTeamName;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'division') {
      return a.division < b.division ? 1 : -1;
    }
  });
};
