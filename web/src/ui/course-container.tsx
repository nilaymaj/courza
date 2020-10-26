import * as React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import CoursesContext from '../providers/course-provider';
import { useActiveCourseId } from '../providers/route';
import { ThreadsProvider } from '../providers/thread-provider';
import CourseHome from './course-home';
import ResourcesScreen from './resources-screen';
import ThreadScreen from './thread-screen';

const CourseContainer = () => {
  const match = useRouteMatch();
  const coursesManager = React.useContext(CoursesContext);
  const courseId = useActiveCourseId() as string;

  React.useEffect(() => {
    coursesManager.clearCourseUnread(courseId);
    return () => coursesManager.clearCourseUnread(courseId);
  }, [courseId]);

  return (
    <ThreadsProvider>
      <Switch>
        <Route
          path={match.url + '/'}
          exact
          render={() => <CourseHome />}
        ></Route>
        <Route
          path={match.url + '/resources'}
          render={() => <ResourcesScreen />}
        ></Route>
        <Route
          path={match.url + '/:threadId'}
          render={() => <ThreadScreen />}
        ></Route>
        <Route>
          <Redirect to={match.url + '/'}></Redirect>
        </Route>
      </Switch>
    </ThreadsProvider>
  );
};

export default CourseContainer;
