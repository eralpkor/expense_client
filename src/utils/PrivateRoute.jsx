import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route 
      { ...rest }
      render={ props => {
        if (localStorage.getItem('user')) {
          return <Component { ...props } />;
        }
        return <Redirect to='/' />
      }}
    />
  )
}

export default PrivateRoute;