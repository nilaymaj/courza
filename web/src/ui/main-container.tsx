import * as React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Topbar from './topbar';
import ThreadScreen from './thread-screen';
import CourseHome from './course-home';
import Dashboard from './dashboard';
import ResourcesScreen from './resources-screen';
import RealtimeEventsProvider from '../realtime';
import CoursesProvider from '../providers/course-provider';
import ThreadsProvider from '../providers/thread-provider';

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
        <ThreadsProvider>
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
              path={match.url + '/c/:courseId/resources'}
              exact
              render={() => <ResourcesScreen />}
            ></Route>
            <Route
              path={match.url + '/c/:courseId/:threadId'}
              render={() => <ThreadScreen />}
            ></Route>
            <Route>
              <Redirect to={match.url + '/'}></Redirect>
            </Route>
          </Switch>
        </ThreadsProvider>
      </CoursesProvider>
    </RealtimeEventsProvider>
  );
};

export default MainContainer;
