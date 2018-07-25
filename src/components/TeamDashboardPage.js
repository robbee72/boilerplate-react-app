import React from 'react';
import TeamList from './TeamList';
import TeamListFilters from './TeamListFilters';
import TeamsSummary from './TeamsSummary';

const TeamDashboardPage = () => (
  <div>
    <TeamsSummary />
    <TeamListFilters />
    <TeamList />
  </div>
);

export default TeamDashboardPage;
