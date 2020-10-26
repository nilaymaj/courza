import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PrivateRoute } from './utils/base';
import PublicPage from './ui/public-page';
import MainContainer from './ui/main-container';
import ProfileContext from './providers/profile-provider';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';

const App = () => {
  const profile = React.useContext(ProfileContext).profile;

  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact render={() => <PublicPage></PublicPage>}></Route>
        <PrivateRoute
          path="/home"
          isPrivate={true}
          authenticated={!!profile}
          redirect="/login"
          render={() => <MainContainer></MainContainer>}
        ></PrivateRoute>
      </BrowserRouter>
    </div>
  );
};

export default App;
