import * as React from 'react';
import { IITK_EMAIL_REGEX } from '../../utils/base';
import { useFormField } from '../hooks';
import { login } from '../../utils/requests';
import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFieldPassword,
  EuiButton,
  EuiCallOut,
  EuiSpacer,
} from '@elastic/eui';
import * as yup from 'yup';

const errorForStatus = {
  401: 'Incorrect password',
  404: 'User does not exist',
};

const emailValidator = yup
  .string()
  .required('Email is required')
  .email('Invalid email address')
  .matches(IITK_EMAIL_REGEX, 'Must be a valid IITK email id.');

const pswdValidator = yup.string().required('Password is required');

type Props = {
  onLogin: () => void;
};

const LoginForm = (props: Props) => {
  const [email, setEmail, emailError] = useFormField('', emailValidator);
  const [password, setPassword, pswdError] = useFormField('', pswdValidator);
  const [loading, setLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      props.onLogin();
    } catch (error) {
      setLoading(false);
      const status = error.response && error.response.status;
      const errorMsg = errorForStatus[status] as string;
      setFormError(errorMsg || 'An unknown error occured');
    }
  };

  return (
    <EuiForm component="form">
      {!!formError && (
        <>
          <EuiCallOut
            title={formError}
            size="s"
            color="danger"
            iconType="alert"
          ></EuiCallOut>
          <EuiSpacer></EuiSpacer>
        </>
      )}

      <EuiFormRow
        label="Email"
        isInvalid={!!emailError}
        error={emailError}
        fullWidth
      >
        <EuiFieldText
          name="email"
          isInvalid={!!emailError}
          value={email}
          spellCheck={false}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
      </EuiFormRow>

      <EuiFormRow
        label="Password"
        isInvalid={!!pswdError}
        error={pswdError}
        fullWidth
      >
        <EuiFieldPassword
          name="password"
          value={password}
          isInvalid={!!pswdError}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
      </EuiFormRow>

      <EuiButton
        type="submit"
        isLoading={loading}
        fullWidth
        fill
        onClick={handleSubmit}
      >
        Login
      </EuiButton>
    </EuiForm>
  );
};

export default LoginForm;
