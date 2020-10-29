import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PrivateRoute } from './utils/base';
import PublicPage from './ui/public-page';
import MainContainer from './ui/main-container';
import ProfileContext from './providers/profile-provider';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';
import AccountVerificationScreen from './ui/verify-account';

const App = () => {
  const profile = React.useContext(ProfileContext).profile;

  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact render={() => <PublicPage />} />
        <Route
          path="/verify"
          exact
          render={() => <AccountVerificationScreen />}
        />
        <PrivateRoute
          path="/home"
          isPrivate={true}
          authenticated={!!profile}
          redirect="/login"
          render={() => <MainContainer />}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
