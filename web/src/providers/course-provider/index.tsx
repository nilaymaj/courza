import * as React from 'react';
import { useSelector } from 'react-redux';
import { getProfile } from '../redux/selectors';
import { getStudentCourses } from '../../utils/requests';
import LoadingPage from '../../ui/loading-page';
import { useAllCourseEvents } from '../realtime/hooks';
import { useActiveCourse } from '../route';

type CourseData = {
  course: ICourse;
  hasUnread: boolean;
};

type CourseContextData = {
  courses: CourseData[];
  clearCourseUnread: (courseId: string) => void;
  addCourse: (courseId: string) => void;
  removeCourse: (courseId: string) => void;
};

export const CoursesContext = React.createContext<CourseContextData>({
  courses: [],
  clearCourseUnread: (_) => {},
  addCourse: (_) => {},
  removeCourse: (_) => {},
});

const CoursesProvider = (props: { children: React.ReactNode }) => {
  const profile = useSelector(getProfile) as IProfile;
  const activeCourse = useActiveCourse();
  const [coursesLoading, setCoursesLoading] = React.useState(true);
  const [coursesData, setCoursesData] = React.useState<CourseData[]>([]);

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
      if (courseId === activeCourse?._id) return;
      const newCoursesData = [...coursesData];
      const eventCourse = newCoursesData.find(
        (cData) => cData.course._id === courseId
      );
      if (!eventCourse) return;
      eventCourse.hasUnread = true;
      setCoursesData(newCoursesData);
    }
  );

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

  const addCourse = React.useCallback(async (courseId: string) => {
    setCoursesLoading(true);
    // TODO: Enrol in course here
    setCoursesLoading(false);
  }, []);

  const removeCourse = React.useCallback(async (courseId: string) => {
    setCoursesLoading(true);
    // TODO: Unenrol from course here
    setCoursesLoading(false);
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        courses: coursesData,
        clearCourseUnread,
        addCourse,
        removeCourse,
      }}
    >
      {coursesLoading ? <LoadingPage /> : props.children}
    </CoursesContext.Provider>
  );
};

export default CoursesProvider;
