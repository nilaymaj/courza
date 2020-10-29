import * as React from 'react';
import { IITK_EMAIL_REGEX } from '../../utils/base';
import { useFormField } from '../hooks';
import { registerUnverified } from '../../utils/requests';
import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiCallOut,
  EuiSpacer,
} from '@elastic/eui';
import * as yup from 'yup';

const errorForStatus = {
  400: 'That account already exists - try logging in instead.',
  409: 'A verification mail has already been sent - please check your email.',
};

const emailValidator = yup
  .string()
  .required('Email is required')
  .email('Invalid email address')
  .matches(IITK_EMAIL_REGEX, 'Must be a valid IITK email id.');

/**
 * Form for creating an unverified account with an IITK email ID
 */
const RegistrationForm = () => {
  const [email, setEmail, emailError] = useFormField('', emailValidator);
  const [loading, setLoading] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const [submittedMail, setSubmittedMail] = React.useState('');

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ticket = await registerUnverified(email);
      setSubmittedMail(ticket.iitkEmail);
    } catch (error) {
      setLoading(false);
      const status = error.response && error.response.status;
      const errorMsg = errorForStatus[status] as string;
      setFormError(errorMsg || 'An unknown error occured');
    }
  };

  if (submittedMail)
    return (
      <EuiCallOut
        title={`A verification mail has been sent to ${submittedMail} - check your mail!`}
        size="s"
        color="success"
        iconType="check"
      ></EuiCallOut>
    );

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

      <EuiButton
        type="submit"
        isLoading={loading}
        fullWidth
        fill
        onClick={handleSubmit}
      >
        Register
      </EuiButton>
    </EuiForm>
  );
};

export default RegistrationForm;
