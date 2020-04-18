import * as React from 'react';
import Form from '../elements/form';
import { IITK_EMAIL_REGEX } from '../utils';
import * as yup from 'yup';

const LoginForm = (props) => {
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
            .matches(IITK_EMAIL_REGEX, 'Must be a valid IITK email id.'),
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          validator: yup.string().required(),
        },
      ]}
      btnText="Log in"
      onSubmit={props.onSubmit}
      errorText={{
        404: 'User does not exist',
        401: 'Incorrect password',
      }}
    ></Form>
  );
};

export default LoginForm;
