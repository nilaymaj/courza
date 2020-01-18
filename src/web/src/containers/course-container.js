import React from 'react';
import CourseCard from '../components/course-card';
import { Card } from '../elements';

const CourseContainer = props => {
  const courses = props.data;
  if (courses === []) return <Card filler text="No courses to show!"></Card>;
  return courses.map((course, idx) => (
    <CourseCard key={idx} course={course}></CourseCard>
  ));
};

export default CourseContainer;
