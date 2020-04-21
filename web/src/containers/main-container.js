import * as React from 'react';
import Topbar from '../components/topbar';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Dashboard, CourseHome } from '../screens';

const MainContainer = (props) => {
  const match = useRouteMatch();

  return (
    <>
      {/* <Sidebar></Sidebar> */}
      <Topbar></Topbar>
      <Switch>
        <Route
          path={match.url + '/'}
          exact
          render={() => <Dashboard></Dashboard>}
        ></Route>
        <Route
          path={match.url + '/c/:courseId'}
          render={() => <CourseHome></CourseHome>}
        ></Route>
      </Switch>
    </>
  );
};

export default MainContainer;
