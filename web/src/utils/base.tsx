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

interface FileValidationOptions {
  /** Permitted file mimetypes */
  mimetypes: string[];
  /** Maximum size of file in kilobytes */
  maxSize: number;
}
export const validateFile = (file: File, options: FileValidationOptions) => {
  // Implement this.
  console.log(file);
  if (file.size > options.maxSize * 1024) return 'File too large.';
  else if (!options.mimetypes.includes(file.type)) return 'Invalid file format';
  return;
};

export const IITK_EMAIL_REGEX = /^([a-z]{3,17})@iitk\.ac\.in$/;
export const COURSE_CODE_REGEX = /^[A-Z]{2,3}[0-9]{3}[A-Z]?$/;
