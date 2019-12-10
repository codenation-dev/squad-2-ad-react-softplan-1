import React from 'react';
import { Route, Redirect } from 'react-router'

const PrivateRoute = props => {
  const isLogged = !!localStorage.getItem('appToken')
  return isLogged ? <Route {...props} /> : <Redirect to="/" />
}

export default PrivateRoute;