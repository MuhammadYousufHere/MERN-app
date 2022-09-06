import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from '../services/authServices';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
  <Route
    {...rest}
    render={props => {
      const content = Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
      return content
    }}
  />
)}

export default PrivateRoute
