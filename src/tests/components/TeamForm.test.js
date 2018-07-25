import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import TeamForm from '../../components/TeamForm';
import teams from '../fixtures/teams';

test('should render TeamForm correctly', () => {
  const wrapper = shallow(<TeamForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render TeamForm correctly with team data', () => {
  const wrapper = shallow(<TeamForm team={teams[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<TeamForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set homeTown on input change', () => {
  const value = 'New homeTown';
  const wrapper = shallow(<TeamForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('homeTown')).toBe(value);
});

test('should set teamName on input change', () => {
  const value = '';
  const wrapper = shallow(<TeamForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('teamName')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'New note value';
  const wrapper = shallow(<TeamForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set division if valid input', () => {
  const value = '';
  const wrapper = shallow(<TeamForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('division')).toBe(value);
});

test('should not set division if invalid input', () => {
  const value = '12';
  const wrapper = shallow(<TeamForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('division')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<TeamForm team={teams[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    homeTown: teams[0].homeTown,
    teamName: teams[0].teamName,
    division: teams[0].division,
    note: teams[0].note,
    createdAt: teams[0].createdAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<TeamForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
  const focused = true;
  const wrapper = shallow(<TeamForm />);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
  expect(wrapper.state('calendarFocused')).toBe(focused);
});
