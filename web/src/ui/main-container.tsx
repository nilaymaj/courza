import * as React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Dashboard from './dashboard';
import RealtimeEventsProvider from '../providers/realtime';
import { CoursesProvider } from '../providers/course-provider';
import CourseContainer from './course-container';
import ProfileContext from '../providers/profile-provider';

const MainContainer = () => {
  const profile = React.useContext(ProfileContext).profile as IProfile;
  const match = useRouteMatch();

  // Check for dark mode and import CSS conditionally
  // Live changes won't work because CSS once imported cannot be unloaded,
  // thus we need the user to refresh page for theme change
  const useDarkMode = React.useRef(profile.settings.useDarkMode);
  if (useDarkMode.current) import('@elastic/eui/dist/eui_theme_dark.css');

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
