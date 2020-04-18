import * as React from 'react';
import { Input } from '../../elements';

const CourseSearchBar = (props) => {
  return (
    <React.Fragment>
      <div className="searchbox__wrapper">
        <Input block placeholder="Enter course code..."></Input>
      </div>
      <div className="searchbox-results__wrapper"></div>
    </React.Fragment>
  );
};

export default CourseSearchBar;
