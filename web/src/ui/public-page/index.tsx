import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { EuiText } from '@elastic/eui';
import mainLogo from '../../assets/main-logo.png';
import LoginForm from './login-form';
import LoadingPage from '../loading-page';
import { useDispatch, useSelector } from 'react-redux';
import { login as lgnAction, setLoading } from '../../redux/actions';
import { getFullProfile } from '../../utils/requests';
import { isLoading } from '../../redux/selectors';

const PublicPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  // Fetch profile, send user to prev route or home
  const handleLogin = React.useCallback(async () => {
    dispatch(setLoading(true));
    const profile = await getFullProfile();
    dispatch(lgnAction(profile));
    const routeState = history.location.state;
    // TODO: Try to remove this ts-ignore
    // @ts-ignore
    if (routeState) history.replace(routeState.from);
    else history.replace('/home');
    dispatch(setLoading(false));
  }, [history, dispatch]);

  // Check if user is already logged in
  React.useEffect(() => {
    (async () => {
      try {
        await handleLogin();
      } catch (error) {
        dispatch(setLoading(false));
      }
    })();
  }, [handleLogin, dispatch]);

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="public__wrapper">
      <div className="public__content">
        <div className="public__text">
          <img src={mainLogo} alt="Courza" className="public__logo"></img>
          <br></br>
          <EuiText>
            Find and share course-related discussions and resources easily!
          </EuiText>
        </div>
        <div className="public__login">
          <EuiText>
            <h2>Login</h2>
          </EuiText>
          <br></br>
          <LoginForm onLogin={handleLogin}></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
