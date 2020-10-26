import * as React from 'react';
import ProfileContext from '../profile-provider';
import { getStudentCourses } from '../../utils/requests';
import LoadingPage from '../../ui/loading-page';
import { useAllCourseEvents } from '../realtime/hooks';
import { useActiveCourseId } from '../route';

type CourseMetadata = {
  course: ICourse;
  hasUnread: boolean;
};

type CoursesContainer = {
  courses: CourseMetadata[];
  clearCourseUnread: (courseId: string) => void;
};

const CoursesContext = React.createContext<CoursesContainer>({
  courses: [],
  clearCourseUnread: (_) => {},
});

export default CoursesContext;

export const CoursesProvider = (props: { children: React.ReactNode }) => {
  const profile = React.useContext(ProfileContext).profile as IProfile;
  const [coursesLoading, setCoursesLoading] = React.useState(true);
  const [coursesData, setCoursesData] = React.useState<CourseMetadata[]>([]);
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

  return (
    <CoursesContext.Provider
      value={{
        courses: coursesData,
        clearCourseUnread,
      }}
    >
      {coursesLoading ? <LoadingPage /> : props.children}
    </CoursesContext.Provider>
  );
};
