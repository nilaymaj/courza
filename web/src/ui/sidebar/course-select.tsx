import * as React from 'react';
import { useAppNavigator } from '../hooks';
import {
  EuiText,
  EuiCollapsibleNavGroup,
  EuiSuperSelect,
  EuiNotificationBadge,
  EuiHealth,
} from '@elastic/eui';
import { CoursesContext } from '../../providers/course-provider';
import { useActiveCourse } from '../../providers/route';

const CourseSelect = () => {
  const coursesManager = React.useContext(CoursesContext);
  const courses = coursesManager.courses;
  const activeCourse = useActiveCourse();
  const appNav = useAppNavigator();

  const handleOpenCourse = (courseId: string) => {
    if (courseId === 'home') appNav.goToHome();
    else appNav.goToCourse(courseId);
    coursesManager.clearCourseUnread(courseId);
  };

  const options = [
    {
      value: 'home',
      inputDisplay: <EuiText>Dashboard</EuiText>,
    },
    ...courses.map((courseData) => ({
      value: courseData.course._id,
      inputDisplay: <EuiText>{courseData.course.code}</EuiText>,
      dropdownDisplay: (
        <>
          {courseData.hasUnread ? (
            <EuiHealth color="primary">
              <strong>{courseData.course.code}</strong>
            </EuiHealth>
          ) : (
            <strong>{courseData.course.code}</strong>
          )}
          <EuiText size="s" color="subdued">
            <p>{courseData.course.name}</p>
          </EuiText>
        </>
      ),
    })),
  ];

  return (
    <EuiCollapsibleNavGroup>
      <EuiSuperSelect
        hasDividers
        options={options}
        valueOfSelected={activeCourse ? activeCourse._id : 'home'}
        onChange={handleOpenCourse}
      ></EuiSuperSelect>
    </EuiCollapsibleNavGroup>
  );
};

export default CourseSelect;
