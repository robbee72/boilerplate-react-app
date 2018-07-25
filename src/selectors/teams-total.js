export default (teams) => {
  return teams
      .map((team) => team.division)
      .reduce((sum, value) => sum + value, 0);
};
