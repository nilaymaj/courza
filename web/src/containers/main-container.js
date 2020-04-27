import * as React from 'react';
import Topbar from '../components/topbar';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ChatScreen from '../screens/chat-screen';
import CourseHome from '../screens/course-home';
import Dashboard from '../screens/dashboard';
import { useStateFromRoute } from '../utils/hooks';
import { openCourse, openChat } from '../redux/actions';
import { useDispatch } from 'react-redux';
import LoadingPage from '../screens/loading-page';

const MainContainer = () => {
  const match = useRouteMatch();
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const appState = useStateFromRoute();

  // Sync the Redux state with URL params
  // Necessary if user directly jumps to specific link
  React.useEffect(() => {
    if (!appState) return;
    if (appState.courseId) dispatch(openCourse(appState.courseId));
    if (appState.chatId) dispatch(openChat(appState.chatId));
    setLoading(false);
    return () => setLoading(true);
  }, [appState, dispatch]);

  return (
    <>
      <Topbar></Topbar>
      {loading ? (
        <LoadingPage />
      ) : (
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
      )}
    </>
  );
};

export default MainContainer;
