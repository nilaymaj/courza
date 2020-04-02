import React from 'react';
import Icon from '../../elements/icon';
import { Link } from 'react-router-dom';

const SidebarOption = props => {
  const course = props.course;
  return (
    <Link
      to={{ pathname: `/home/c/${course._id}`, state: course.code }}
      style={{ textDecoration: 'none' }}
    >
      <div className="cz-sidebar-menu__option">
        <Icon
          name="arrow-forward"
          className="cz-sidebar-menu__option-icon"
        ></Icon>
        <span className="cz-sidebar-menu__option-text">{course.code}</span>
      </div>
    </Link>
  );
};

export default SidebarOption;
