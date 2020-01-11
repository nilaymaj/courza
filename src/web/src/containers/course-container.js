import React from 'react';
import CourseCard from '../components/course-card';

const CourseContainer = props => {
  const courses = props.data;
  return courses.map((course, idx) => <CourseCard key={idx} course={course}></CourseCard>);
};

export default CourseContainer;
