import axios from 'axios';
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

const BASE_URL = process.env.COURZA_BASE_URL || 'http://localhost:8000/api';
export async function request(method, url, data) {
  const res = await axios({
    method,
    data,
    url: BASE_URL + url,
    checkCredentials: true,
  });
  return res.data;
}

export const PrivateRoute = ({ children, authenticated, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          render()
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  );
};

export const IITK_EMAIL_REGEX = /^([a-z]{3,17})@iitk\.ac\.in$/;
export const COURSE_CODE_REGEX = /^[A-Z]{2,3}[0-9]{3}[A-Z]?$/;
