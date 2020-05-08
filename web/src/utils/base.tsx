import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  authenticated: boolean;
  render: () => JSX.Element;
  [k: string]: any;
};

export const PrivateRoute = (props: Props) => {
  const { authenticated, render, ...rest } = props;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        props.authenticated ? (
          props.render()
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  );
};

export const IITK_EMAIL_REGEX = /^([a-z]{3,17})@iitk\.ac\.in$/;
export const COURSE_CODE_REGEX = /^[A-Z]{2,3}[0-9]{3}[A-Z]?$/;
