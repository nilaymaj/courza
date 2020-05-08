import * as React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoute } from './utils/base';
import { useSelector } from 'react-redux';
import PublicPage from './ui/public-page';
import MainContainer from './ui/main-container';
import { isLoggedIn } from './redux/selectors';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';

const App = () => {
  const loggedIn = useSelector(isLoggedIn);

  return (
    <div className="App">
      <Route path="/" exact render={() => <PublicPage></PublicPage>}></Route>
      <PrivateRoute
        path="/home"
        isPrivate={true}
        authenticated={loggedIn}
        redirect="/login"
        render={() => <MainContainer></MainContainer>}
      ></PrivateRoute>
    </div>
  );
};

export default App;