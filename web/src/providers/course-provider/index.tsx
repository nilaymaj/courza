import * as React from 'react';
import ProfileContext from '../profile-provider';
import {
  getStudentCourses,
  joinCourse as sendJoinRequest,
  leaveCourse as sendLeaveRequest,
} from '../../utils/requests';
import LoadingPage from '../../ui/loading-page';
import { useAllCourseEvents } from '../realtime/hooks';
import { useActiveCourseId } from '../route';
import SettingsDialog from '../../ui/settings-dialog';
import { useAppNavigator } from '../../ui/hooks';

type CourseMetadata = {
  course: ICourse;
  hasUnread: boolean;
};

type CoursesContainer = {
  courses: CourseMetadata[];
  clearCourseUnread: (courseId: string) => void;
  openSettingsDialog: (open: boolean) => void;
  joinCourse: (courseId: string) => void;
  leaveCourse: (courseId: string) => void;
};

const CoursesContext = React.createContext<CoursesContainer>({
  courses: [],
  clearCourseUnread: (_) => {},
  openSettingsDialog: (_) => {},
  joinCourse: (_) => {},
  leaveCourse: (_) => {},
});

export default CoursesContext;

export const CoursesProvider = (props: { children: React.ReactNode }) => {
  const profile = React.useContext(ProfileContext).profile as IProfile;
  const [coursesLoading, setCoursesLoading] = React.useState(true);
  const [coursesData, setCoursesData] = React.useState<CourseMetadata[]>([]);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const appNav = useAppNavigator();
  const activeCourseId = useActiveCourseId();

  // Fetch user's courses
  React.useEffect(() => {
    (async () => {
      setCoursesLoading(true);
      const courses: ICourse[] = await getStudentCourses();
      setCoursesData(courses.map((course) => ({ course, hasUnread: false })));
      setCoursesLoading(false);
    })();
  }, [profile._id]);

  // Listen to events for each course
  useAllCourseEvents(
    coursesData.map((cData) => cData.course._id),
    (courseId) => {
      console.log(courseId, activeCourseId);
      if (courseId === activeCourseId) return;
      const newCoursesData = [...coursesData];
      const eventCourse = newCoursesData.find(
        (cData) => cData.course._id === courseId
      );
      if (!eventCourse) return;
      eventCourse.hasUnread = true;
      setCoursesData(newCoursesData);
    }
  );

  // Clears the unread status of specified course
  const clearCourseUnread = React.useCallback(
    (courseId: string) => {
      const newCoursesData = [...coursesData];
      const course = newCoursesData.find((c) => c.course._id === courseId);
      if (!course) return;
      course.hasUnread = false;
      setCoursesData(newCoursesData);
    },
    [coursesData]
  );

  // Opens or closes the settings dialog
  const openSettingsDialog = React.useCallback((open: boolean) => {
    setSettingsOpen(open);
  }, []);

  // Join a course
  const joinCourse = React.useCallback(
    async (courseId: string) => {
      const exists = coursesData.find((cData) => cData.course._id === courseId);
      if (exists) return;

      const course = await sendJoinRequest(courseId);
      const newCoursesData = [...coursesData, { course, hasUnread: true }];
      setCoursesData(newCoursesData);
    },
    [coursesData]
  );

  // Leave a course
  const leaveCourse = React.useCallback(
    async (courseId: string) => {
      const index = coursesData.findIndex(
        (cData) => cData.course._id === courseId
      );
      if (index === -1) return;

      await sendLeaveRequest(courseId);
      if (courseId === activeCourseId) appNav.goToHome();
      const newCoursesData = [...coursesData];
      newCoursesData.splice(index, 1);
      setCoursesData(newCoursesData);
    },
    [coursesData]
  );

  return (
    <CoursesContext.Provider
      value={{
        courses: coursesData,
        clearCourseUnread,
        openSettingsDialog,
        joinCourse,
        leaveCourse,
      }}
    >
      {coursesLoading ? (
        <LoadingPage />
      ) : (
        <>
          {props.children}
          {settingsOpen && <SettingsDialog />}
        </>
      )}
    </CoursesContext.Provider>
  );
};
