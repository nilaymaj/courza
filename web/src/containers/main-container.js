import * as React from 'react';
import Topbar from '../components/topbar';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ChatScreen from '../screens/chat-screen';
import CourseHome from '../screens/course-home';
import Dashboard from '../screens/dashboard';

const MainContainer = () => {
  const match = useRouteMatch();

  return (
    <>
      <Topbar></Topbar>
      <Switch>
        <Route
          path={match.url + '/'}
          exact
          render={() => <Dashboard />}
        ></Route>
        <Route
          path={match.url + '/c/:courseId'}
          exact
          render={() => <CourseHome />}
        ></Route>
        <Route
          path={match.url + '/c/:courseId/:chatId'}
          render={() => <ChatScreen />}
        ></Route>
      </Switch>
    </>
  );
};

export default MainContainer;
