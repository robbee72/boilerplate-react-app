import moment from 'moment'

export default [{
  id: '1',
  homeTown: 'Vegas',
  teamName: 'Golden Knights',
  note: '',
  division: 5,
  createdAt: 0
}, {
  id: '2',
  homeTown: 'Minnesota',
  teamName: 'Wild',
  note: '',
  division: 23,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  homeTown: 'Pittsburgh',
  teamName: 'Penguins',
  note: '',
  division: 4,
  createdAt: moment(0).add(4, 'days').valueOf()
}];
