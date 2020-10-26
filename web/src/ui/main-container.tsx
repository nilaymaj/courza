import * as React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Dashboard from './dashboard';
import RealtimeEventsProvider from '../providers/realtime';
import { CoursesProvider } from '../providers/course-provider';
import CourseContainer from './course-container';

const MainContainer = () => {
  const match = useRouteMatch();

  // Set body padding-top to remove narrow gap below topbar
  React.useEffect(() => {
    document.body.style.setProperty('padding-top', '48px', 'important');
    return () => {
      document.body.style.removeProperty('padding-top');
    };
  }, []);

  return (
    <RealtimeEventsProvider>
      <CoursesProvider>
        <Switch>
          <Route
            path={match.url + '/'}
            exact
            render={() => <Dashboard />}
          ></Route>
          <Route
            path={match.url + '/c/:courseId'}
            render={() => <CourseContainer />}
          ></Route>
          <Route>
            <Redirect to={match.url + '/abc'} />
          </Route>
        </Switch>
      </CoursesProvider>
    </RealtimeEventsProvider>
  );
};

export default MainContainer;
