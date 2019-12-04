import React from 'react';
import { Router, Route, Switch } from 'react-router';
import Login from '../pages/login';
import Register from '../pages/register';
import Forgot from '../pages/forgot';
import Events from './Events';
import NotFound from './NotFound';
import Home from '../pages/home';
import PrivateRoute from './PrivateRoute';


import { history } from '../history'

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route component={Login} exact path="/" />
      <Route component={Register} exact path="/register" />
      <Route component={Forgot} exact path="/forgot" />
      <Route component={Events} exact path="/events" />
      <PrivateRoute component={Home} exact path="/home" />
      <PrivateRoute component={NotFound} />
    </Switch>
  </Router>
)

export default Routes;