import React from 'react';
import { Link } from 'react-router-dom';

const TeamListItem = ({ id, homeTown, teamName, conference, division, createdAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3>{homeTown} {teamName}   {conference} {division}</h3>
  </div>
  </Link>
);

export default TeamListItem;
