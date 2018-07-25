import selectTeamsTotal from '../../selectors/teams-total';
import teams from '../fixtures/teams';

test('should return 0 if no teams', () => {
  const res = selectTeamsTotal([]);
  expect(res).toBe(0);
});

test('should correctly add up a single team', () => {
  const res = selectTeamsTotal([teams[0]]);
  expect(res).toBe(495);
});

test('should correctly add up multiple teams', () => {
  const res = selectTeamsTotal(teams);
  expect(res).toBe(1490);
});
