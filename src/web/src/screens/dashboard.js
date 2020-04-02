import React from 'react';
import { connect } from 'react-redux';
import { Selectors } from '../redux/index.js';
import sampleCourses from '../samples/courses.json';
import CourseContainer from '../containers/course-container.js';
import Topbar from '../components/topbar';
import CourseSearchBar from '../components/course-search';

const Dashboard = props => {
  const courses = props.courses;
  return (
    <React.Fragment>
      <Topbar title="Dashboard"></Topbar>
      <CourseSearchBar
        courses={sampleCourses}
        userCourses={courses}
      ></CourseSearchBar>
      <CourseContainer data={courses}></CourseContainer>
    </React.Fragment>
  );
};

export default connect(state => ({ courses: Selectors.getCourses(state) }))(
  Dashboard
);
