import React from 'react';
import { EuiPanel, EuiEmptyPrompt } from '@elastic/eui';
import { usePageTitle } from '../hooks';
import { useActiveCourse } from '../../providers/route';

const CourseHome = () => {
  const course = useActiveCourse() as ICourse;
  usePageTitle(`${course.code} | Courza`);

  return (
    <div className="cz-course__wrapper">
      <div className="cz-course__panel">
        <EuiPanel>
          <EuiEmptyPrompt
            iconType="folderOpen"
            title={<h2>{course.code}</h2>}
            body={course.name}
          ></EuiEmptyPrompt>
        </EuiPanel>
      </div>
    </div>
  );
};

export default CourseHome;
