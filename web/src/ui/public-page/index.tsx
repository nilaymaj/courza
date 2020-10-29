import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { EuiText } from '@elastic/eui';
import mainLogo from '../../assets/main-logo.png';
import LoginForm from './login-form';
import LoadingPage from '../loading-page';
import ProfileContext from '../../providers/profile-provider';
import { getProfile } from '../../utils/requests';
import RegistrationForm from './register-form';

const PublicPage = () => {
  const history = useHistory();
  const profileManager = React.useContext(ProfileContext);
  const [loading, setLoading] = React.useState(false);

  // Fetch profile, send user to prev route or home
  const handleLogin = React.useCallback(async () => {
    setLoading(true);
    const profile = await getProfile();
    profileManager.setProfile(profile);
    const routeState = history.location.state;
    if (routeState) history.replace((routeState as any).from.pathname);
    else history.replace('/home');
  }, [history]);

  // Check if user is already logged in
  React.useEffect(() => {
    (async () => {
      try {
        await handleLogin();
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [handleLogin]);

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="public__wrapper">
      <div className="public__content">
        <div className="public__text">
          <img src={mainLogo} alt="Courza" className="public__logo"></img>
          <br></br>
          <EuiText>
            <h3>
              Find and share course-related discussions and resources easily!
            </h3>
          </EuiText>
        </div>
        <div className="public__side">
          <div className="public__card login">
            <EuiText>
              <h2>Login</h2>
            </EuiText>
            <br></br>
            <LoginForm onLogin={handleLogin}></LoginForm>
          </div>
          <div className="public__card register">
            <EuiText>
              <h2>Register</h2>
            </EuiText>
            <br />
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
