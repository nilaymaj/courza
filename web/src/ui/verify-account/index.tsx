import * as React from 'react';
import {
  EuiForm,
  EuiCallOut,
  EuiSpacer,
  EuiFormRow,
  EuiFieldText,
  EuiFieldNumber,
  EuiButton,
  EuiText,
  EuiFieldPassword,
} from '@elastic/eui';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useFormField } from '../hooks';
import { verifyAccount, getProfile } from '../../utils/requests';
import ProfileContext from '../../providers/profile-provider';

// Error messages
const errorForStatus = {
  400: "An error occurred - check the details you're providing.",
  404: 'Your verification link has expired - try registering again.',
};

// Data validators
const nameValidator = yup
  .string()
  .required('Name is required')
  .max(32, 'Keep it under 32 characters');
const rollNoValidator = yup
  .number()
  .integer()
  .required('Roll number is required')
  .min(10000)
  .max(99999999);
const passwordValidator = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be atleast 8 characters')
  .max(24, 'Password should be shorter than 24 characters');

/**
 * Screen for entering user's basic info and password to
 * verify account and then send user to dashboard
 */
const AccountVerificationScreen = () => {
  const [name, setName, nameError] = useFormField('', nameValidator);
  const [rollNo, setRollNo, rollNoError] = useFormField(0, rollNoValidator);
  const [passwd, setPasswd, passwdError] = useFormField('', passwordValidator);
  const [formError, setFormError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const profileManager = React.useContext(ProfileContext);
  const history = useHistory();

  // Login, fetch profile and enter the app
  const loginAndLaunchApp = React.useCallback(async () => {
    const profile = await getProfile();
    profileManager.setProfile(profile);
    history.replace('/home');
  }, [history]);

  // Send verification request to server
  const handleSubmit = React.useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
        // Get and check token
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (!token) {
          setFormError('Invalid verification link.');
          return setLoading(false);
        }
        // Send verification request and login to app
        await verifyAccount(token, name, rollNo, passwd);
        loginAndLaunchApp();
      } catch (error) {
        setLoading(false);
        const status = error.response && error.response.status;
        const errorMsg = errorForStatus[status] as string;
        setFormError(errorMsg || 'An unknown error occured');
      }
    },
    [name, rollNo, passwd, loginAndLaunchApp]
  );

  return (
    <div className="public__wrapper">
      <div className="public__content">
        <div className="public__card">
          <EuiText>
            <h2>Verify your account</h2>
          </EuiText>
          <br />
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
              label="Name"
              isInvalid={!!nameError}
              error={nameError}
              fullWidth
            >
              <EuiFieldText
                name="name"
                isInvalid={!!nameError}
                value={name}
                spellCheck={false}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </EuiFormRow>

            <EuiFormRow
              label="IITK Roll no"
              isInvalid={!!rollNoError}
              error={rollNoError}
              fullWidth
            >
              <EuiFieldNumber
                name="rollno"
                isInvalid={!!rollNoError}
                value={rollNo}
                spellCheck={false}
                fullWidth
                onChange={(e: any) => setRollNo(e.target.value)}
              />
            </EuiFormRow>

            <EuiFormRow
              label="Password"
              isInvalid={!!passwdError}
              error={passwdError}
              fullWidth
            >
              <EuiFieldPassword
                name="password"
                isInvalid={!!passwdError}
                value={passwd}
                fullWidth
                onChange={(e) => setPasswd(e.target.value)}
              />
            </EuiFormRow>

            <EuiButton
              type="submit"
              isLoading={loading}
              fullWidth
              fill
              onClick={handleSubmit}
            >
              Start using Courza!
            </EuiButton>
          </EuiForm>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationScreen;
