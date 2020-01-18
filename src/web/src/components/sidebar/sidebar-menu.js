import React from 'react';
import SidebarOption from './sidebar-option';
import { connect } from 'react-redux';
import { Selectors } from '../../redux';

const SidebarMenu = props => {
  const { courses } = props;

  return (
    <div className="cz-sidebar-menu">
      {courses.map((course, idx) => (
        <SidebarOption course={course} key={idx}></SidebarOption>
      ))}
    </div>
  );
};

export default connect(state => ({ courses: Selectors.getCourses(state) }))(
  SidebarMenu
);
