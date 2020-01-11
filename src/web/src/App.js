import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './utils';
import { connect } from 'react-redux';
import { Selectors } from './redux';
import { PublicPage, LoadingPage } from './screens';
import MainContainer from './containers/main-container';

const App = props => {
  const { isLoggedIn, isLoading } = props;
  if (isLoading !== null) return <LoadingPage text={isLoading}></LoadingPage>;
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact render={() => <PublicPage></PublicPage>}></Route>
        <PrivateRoute
          path="/home"
          isPrivate={true}
          authenticated={isLoggedIn}
          redirect="/"
          render={() => <MainContainer></MainContainer>}
        ></PrivateRoute>
      </BrowserRouter>
    </div>
  );
};

export default connect(state => ({ isLoggedIn: Selectors.isLoggedIn(state), isLoading: Selectors.isLoading(state) }))(
  App
);
