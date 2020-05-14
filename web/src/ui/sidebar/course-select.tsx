import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAppNavigator } from '../hooks';
import { getCourses, getActiveCourse } from '../../redux/selectors';
import { EuiText, EuiCollapsibleNavGroup, EuiSuperSelect } from '@elastic/eui';

const CourseSelect = () => {
  const courses = useSelector(getCourses);
  const activeCourse = useSelector(getActiveCourse);
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
    ...courses.map((c) => ({
      value: c._id,
      inputDisplay: <EuiText>{c.code}</EuiText>,
      dropdownDisplay: (
        <>
          <strong>{c.code}</strong>
          <EuiText size="s" color="subdued">
            <p>{c.name}</p>
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
