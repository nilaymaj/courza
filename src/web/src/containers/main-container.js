import React from 'react';
import Sidebar from '../components/sidebar';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import sampleCourses from '../samples/courses.json';
import { Dashboard, CourseHome } from '../screens';

const MainContainer = props => {
  const match = useRouteMatch();

  return (
    <div className="app-wrapper">
      <Sidebar></Sidebar>
      <div className="app-content">
        <Switch>
          <Route
            path={match.url + '/'}
            exact
            render={() => <Dashboard courses={sampleCourses}></Dashboard>}
          ></Route>
          <Route
            path={match.url + '/c/:courseId'}
            render={() => <CourseHome></CourseHome>}
          ></Route>
        </Switch>
      </div>
    </div>
  );
};

export default MainContainer;
