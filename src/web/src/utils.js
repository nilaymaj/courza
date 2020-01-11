import axios from 'axios';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const BASE_URL = process.env.COURZA_BASE_URL || 'http://localhost:8000/api';
export async function request(method, url, data) {
  console.log('Requesting ', BASE_URL + url);
  const res = await axios({ method, data, url: BASE_URL + url });
  return res.data;
}

export const PrivateRoute = ({ children, authenticated, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? render() : <Redirect to={{ pathname: '/', state: { from: location } }} />
      }
    />
  );
};
