import * as React from 'react';
import {
  EuiCollapsibleNav,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiEmptyPrompt,
} from '@elastic/eui';
import { useSelector } from 'react-redux';
import { getActiveCourse } from '../../redux/selectors';
import CourseSelect from './course-select';
import CourseNav from './course-nav';

const Sidebar = () => {
  const activeCourse = useSelector(getActiveCourse);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <EuiCollapsibleNav
        isOpen={open}
        isDocked
        onClose={() => setOpen(false)}
        button={
          <EuiHeaderSectionItemButton
            aria-label="Toggle sidebar"
            onClick={() => setOpen(!open)}
          >
            <EuiIcon type="menu" size="m" aria-hidden="true" />
          </EuiHeaderSectionItemButton>
        }
      >
        <CourseSelect></CourseSelect>
        {!!activeCourse ? (
          <CourseNav></CourseNav>
        ) : (
          <EuiEmptyPrompt
            iconType="indexFlush"
            body={<p>Select a course to see details</p>}
          />
        )}
      </EuiCollapsibleNav>
    </>
  );
};

export default Sidebar;
