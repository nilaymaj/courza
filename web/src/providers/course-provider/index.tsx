import * as React from 'react';
import { useSelector } from 'react-redux';
import { getProfile } from '../redux/selectors';
import { getStudentCourses } from '../../utils/requests';
import LoadingPage from '../../ui/loading-page';

type CourseData = {
  course: ICourse;
};

type CourseContextData = {
  courses: CourseData[];
  addCourse: (courseId: string) => void;
  removeCourse: (courseId: string) => void;
};

export const CoursesContext = React.createContext<CourseContextData>({
  courses: [],
  addCourse: (id) => {},
  removeCourse: (id) => {},
});

const CoursesProvider = (props: { children: React.ReactNode }) => {
  const profile = useSelector(getProfile) as IProfile;
  const [coursesLoading, setCoursesLoading] = React.useState(true);
  const [coursesData, setCoursesData] = React.useState<CourseData[]>([]);

  React.useEffect(() => {
    (async () => {
      setCoursesLoading(true);
      const courses: ICourse[] = await getStudentCourses();
      setCoursesData(courses.map((course) => ({ course })));
      setCoursesLoading(false);
    })();
  }, [profile._id]);

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
      value={{ courses: coursesData, addCourse, removeCourse }}
    >
      {coursesLoading ? <LoadingPage /> : props.children}
    </CoursesContext.Provider>
  );
};

export default CoursesProvider;
