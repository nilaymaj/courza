import React from 'react';
import Form from '../elements/form';
import { IITK_EMAIL_REGEX } from '../utils';
import * as yup from 'yup';

const LoginForm = props => {
  return (
    <Form
      scheme={[
        {
          name: 'iitkEmail',
          placeholder: 'IITK email id',
          type: 'email',
          validator: yup
            .string('Invalid email address.')
            .required()
            .email('Invalid email address.')
            .matches(IITK_EMAIL_REGEX, 'Must be a valid IITK email id.')
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          validator: yup
            .string()
            .required()
            .min(8, 'Password must be 8-16 characters.')
            .max(16, 'Password must be 8-16 characters.')
        }
      ]}
      btnText="Log in"
      onSubmit={props.onSubmit}
    ></Form>
  );
};

export default LoginForm;
