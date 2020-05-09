import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Topbar from './topbar';
import ChatScreen from './chat-screen';
import CourseHome from './course-home';
import Dashboard from './dashboard';
import { useStateFromRoute } from './hooks';
import { openCourse, openChat } from '../redux/actions';
import LoadingPage from './loading-page';
import CreateChatDialog from './dialogs/create-chat-dialog';

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
    if (appState.chatId) dispatch(openChat(appState.chatId));
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
