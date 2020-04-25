import React from 'react';
import { EuiPanel, EuiEmptyPrompt } from '@elastic/eui';
import { getActiveCourse } from '../redux/selectors';
import { useSelector } from 'react-redux';

const CourseHome = (props) => {
  const course = useSelector(getActiveCourse);

  React.useEffect(() => {
    document.title = `${course.code} | Courza`;
  }, [course.code]);

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
