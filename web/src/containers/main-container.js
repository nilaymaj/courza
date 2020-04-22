import * as React from 'react';
import Topbar from '../components/topbar';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ChatScreen from '../screens/chat-screen';

const MainContainer = (props) => {
  const match = useRouteMatch();

  return (
    <>
      <Topbar></Topbar>
      <Switch>
        <Route
          path={match.url + '/'}
          exact
          render={() => <ChatScreen />}
        ></Route>
        <Route
          path={match.url + '/c/:courseId'}
          render={() => <ChatScreen></ChatScreen>}
        ></Route>
      </Switch>
    </>
  );
};

export default MainContainer;
