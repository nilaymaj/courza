import React from 'react';
import { Icon, Text } from '../../elements';

const CourseRow = props => {
  const course = props.course;
  return (
    <div className="search-result" onClick={() => props.onClick(course)}>
      <div className="search-result__left">
        <Text medium>{course.code}</Text>
        <br></br>
        <Text small note>
          {course.name}
        </Text>
      </div>
      <div className="search-result__right">
        <Icon name="person"></Icon>
        <Text note>{course.numOfStudents}</Text>
      </div>
    </div>
  );
};

export default CourseRow;
