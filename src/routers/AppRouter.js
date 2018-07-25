import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import TeamDashboardPage from '../components/TeamDashboardPage';
import AddTeamPage from '../components/AddTeamPage';
import EditTeamPage from '../components/EditTeamPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={TeamDashboardPage} />
        <PrivateRoute path="/create" component={AddTeamPage} />
        <PrivateRoute path="/edit/:id" component={EditTeamPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
