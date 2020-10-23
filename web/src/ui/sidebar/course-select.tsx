import * as React from 'react';
import { useAppNavigator } from '../hooks';
import { EuiText, EuiCollapsibleNavGroup, EuiSuperSelect } from '@elastic/eui';
import { CoursesContext } from '../../providers/course-provider';
import { useActiveCourse } from '../../providers/route';

const CourseSelect = () => {
  const courses = React.useContext(CoursesContext).courses;
  const activeCourse = useActiveCourse();
  const appNav = useAppNavigator();

  const handleOpenCourse = (courseId: string) => {
    if (courseId === 'home') appNav.goToHome();
    else appNav.goToCourse(courseId);
  };

  const options = [
    {
      value: 'home',
      inputDisplay: <EuiText>Dashboard</EuiText>,
    },
    ...courses.map(({ course }) => ({
      value: course._id,
      inputDisplay: <EuiText>{course.code}</EuiText>,
      dropdownDisplay: (
        <>
          <strong>{course.code}</strong>
          <EuiText size="s" color="subdued">
            <p>{course.name}</p>
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
