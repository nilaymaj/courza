import React from 'react';
import { connect } from 'react-redux';
import { Selectors } from '../redux/index.js';
import CourseContainer from '../containers/course-container.js';

const Dashboard = props => {
  const courses = props.courses;
  return <CourseContainer data={courses}></CourseContainer>;
};

export default connect(state => ({ courses: Selectors.getCourses(state) }))(Dashboard);
