import moment from 'moment';
import selectTeams from '../../selectors/teams';
import teams from '../fixtures/teams';

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectTeams(teams, filters);
  expect(result).toEqual([teams[2], teams[1]]);
});

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };
  const result = selectTeams(teams, filters);
  expect(result).toEqual([teams[2], teams[0]]);
});

test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(2, 'days')
  };
  const result = selectTeams(teams, filters);
  expect(result).toEqual([teams[0], teams[1]]);
});

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectTeams(teams, filters);
  expect(result).toEqual([teams[2], teams[0], teams[1]]);
});

test('should sort by conference', () => {
  const filters = {
    text: '',
    sortBy: 'conference',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectTeams(teams, filters);
  expect(result).toEqual([teams[1], teams[2], teams[0]]);
});
test('should sort by division', () => {
  const filters = {
    text: '',
    sortBy: 'division',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectTeams(teams, filters);
  expect(result).toEqual([teams[1], teams[2], teams[0]]);
});
