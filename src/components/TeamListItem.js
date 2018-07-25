import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';


const TeamListItem = ({ id, homeTown, teamName, conference, division, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h4>{homeTown} {teamName}   {conference} {division}</h4>

    <span>{moment(createdAt).format('MMMM Do, YYYY')}</span>
  </div>
  </Link>
);

export default TeamListItem;
