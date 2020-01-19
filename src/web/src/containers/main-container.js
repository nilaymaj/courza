import React from 'react';
import Sidebar from '../components/sidebar';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import sampleCourses from '../samples/courses.json';
import { Dashboard, CourseHome } from '../screens';
import CourseSearchBar from '../components/course-search';

const MainContainer = props => {
  const match = useRouteMatch();

  return (
    <div className="app-wrapper">
      <Sidebar></Sidebar>
      <div className="app-content">
        <Switch>
          {/* <Route
            path={match.url + '/'}
            exact
            render={() => <Dashboard courses={sampleCourses}></Dashboard>}
          ></Route> */}
          <Route
            path={match.url + '/'}
            exact
            render={() => (
              <React.Fragment>
                <CourseSearchBar courses={sampleCourses}></CourseSearchBar>
                <Dashboard></Dashboard>
              </React.Fragment>
            )}
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
