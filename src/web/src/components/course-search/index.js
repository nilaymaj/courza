import React from 'react';
import { Input } from '../../elements';
import CourseRow from './course-row';

const markUserCourses = (rawList, userCourses) => {
  userCourses.forEach(c => {
    const idx = rawList.findIndex(r => r.code === c.code);
    if (idx === -1) return;
    rawList[idx].isMember = true;
  });
  return rawList;
};

const CourseSearchBar = props => {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState(props.courses);
  const [focused, setFocused] = React.useState(false);

  const _handleChange = e => {
    const input = e.target.value;
    setQuery(input);
    const res = filter(input);
    setResults(res);
  };

  const _handleFocus = () => {
    setFocused(!focused);
  };

  const filter = query => {
    query = query.toUpperCase();
    const allCourses = props.courses;
    if (query === '') return allCourses;
    const res = allCourses.filter(c => c.code.indexOf(query) !== -1);
    return res;
  };

  const _selectCourse = course => {
    console.log('Selected: ', course);
  };

  return (
    <div className="course-search">
      <div className="searchbox__wrapper">
        <Input
          block
          placeholder="Enter course code..."
          onChange={_handleChange}
          value={query}
          onFocus={_handleFocus}
          onBlur={_handleFocus}
        ></Input>
      </div>
      {focused && (
        <div className="searchbox-results__wrapper">
          {results.map((course, idx) => (
            <CourseRow
              course={course}
              key={idx}
              onClick={_selectCourse}
            ></CourseRow>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSearchBar;
