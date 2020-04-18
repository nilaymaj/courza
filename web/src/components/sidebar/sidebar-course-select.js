import * as React from 'react';
import Dropdown from '../../elements/dropdown';
import { connect } from 'react-redux';
import { Selectors } from '../../redux';

const SidebarCourseSelect = (props) => {
  const { courses, onOpenCourse } = props;
  const options = courses.map((c) => ({ label: c.code, value: c._id }));
  console.log(courses);

  const handleCourseChange = (a) => {
    console.log(a);
  };

  return (
    <div className="cz-sidebar-course">
      <Dropdown
        options={options}
        defaultOption={options[0]}
        onChange={handleCourseChange}
      ></Dropdown>
    </div>
  );
};

export default connect((state) => ({ courses: Selectors.getCourses(state) }))(
  SidebarCourseSelect
);
