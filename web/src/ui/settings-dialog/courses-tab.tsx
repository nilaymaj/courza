import {
  EuiIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';
import * as React from 'react';
import CoursesContext from '../../providers/course-provider';
import CourseSearch from './course-search';

const CoursesTab = () => {
  const coursesManager = React.useContext(CoursesContext);
  const coursesData = coursesManager.courses;

  return (
    <>
      <EuiSpacer size="s" />
      <EuiListGroup>
        {coursesData.map((courseData) => (
          <EuiListGroupItem
            key={courseData.course._id}
            label={
              <EuiText>
                {courseData.course.code}
                <br />
                <EuiTextColor color="subdued">
                  {courseData.course.name}
                </EuiTextColor>
              </EuiText>
            }
            extraAction={{
              color: 'danger',
              'aria-label': 'delete',
              onClick: () => coursesManager.leaveCourse(courseData.course._id),
              iconType: 'trash',
              iconSize: 'm',
            }}
            icon={<EuiIcon size="xl" type="notebookApp" />}
          ></EuiListGroupItem>
        ))}
        <EuiSpacer size="m" />
        <CourseSearch onJoin={coursesManager.joinCourse} />
      </EuiListGroup>
    </>
  );
};

export default CoursesTab;
