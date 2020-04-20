import React, { useEffect, useCallback } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { PrivateRoute } from './utils/base';
import { connect } from 'react-redux';
import { Selectors } from './redux';
import { getProfile } from './requests/student';
import { PublicPage, LoadingPage } from './screens';
import MainContainer from './containers/main-container';
import { login } from './redux/actions';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';

const App = (props) => {
  const history = useHistory();
  const { isLoggedIn } = props;
  const [loading, setLoading] = React.useState(true);
  const sendToHome = useCallback(() => history.push('/home'), [history]);

  useEffect(() => {
    (async () => {
      try {
        console.log('=== FETCHING PROFILE ===');
        const profile = await getProfile();
        props.login(profile);
        sendToHome();
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (loading) return <LoadingPage text="Loading..."></LoadingPage>;

  return (
    <div className="App">
      <Route path="/" exact render={() => <PublicPage></PublicPage>}></Route>
      <PrivateRoute
        path="/home"
        isPrivate={true}
        authenticated={isLoggedIn}
        redirect="/login"
        render={() => <MainContainer></MainContainer>}
      ></PrivateRoute>
    </div>
  );
};

export default connect(
  (state) => ({
    isLoggedIn: Selectors.isLoggedIn(state),
  }),
  { login }
)(App);
