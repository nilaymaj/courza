import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Topbar from './topbar';
import ThreadScreen from './thread-screen';
import CourseHome from './course-home';
import Dashboard from './dashboard';
import { useStateFromRoute } from './hooks';
import { openCourse, openThread } from '../redux/actions';
import LoadingPage from './loading-page';
import ResourcesScreen from './resources-screen';
import RealtimeEventsProvider from '../realtime';

const MainContainer = () => {
  const match = useRouteMatch();
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const appState = useStateFromRoute();

  // Set body padding-top to remove narrow gap below topbar
  React.useEffect(() => {
    document.body.style.setProperty('padding-top', '48px', 'important');
    return () => {
      document.body.style.removeProperty('padding-top');
    };
  }, []);

  // Sync the Redux state with URL params
  // Necessary if user directly jumps to specific link
  React.useEffect(() => {
    if (!appState) return;
    if (appState.courseId) dispatch(openCourse(appState.courseId));
    if (appState.threadId) dispatch(openThread(appState.threadId));
    setLoading(false);
    return () => setLoading(true);
  }, [appState, dispatch]);

  if (loading)
    return (
      <>
        <Topbar></Topbar>
        <LoadingPage></LoadingPage>
      </>
    );

  return (
    <RealtimeEventsProvider>
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
      </Switch>
    </RealtimeEventsProvider>
  );
};

export default MainContainer;
