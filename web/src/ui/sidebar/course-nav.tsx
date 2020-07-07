import * as React from 'react';
import ThreadSelect from './thread-select';
import { useSelector } from 'react-redux';
import { isResourcesOpen } from '../../redux/selectors';
import { useAppNavigator } from '../hooks';
import { EuiListGroup, EuiListGroupItem } from '@elastic/eui';

const CourseNav = () => {
  const resourcesOpen = useSelector(isResourcesOpen);
  const appNav = useAppNavigator();

  return (
    <>
      <EuiListGroup>
        <EuiListGroupItem
          label="Resources"
          isActive={resourcesOpen}
          iconType="empty"
          onClick={() => appNav.goToResources()}
          style={{
            padding: 10,
            background: resourcesOpen ? 'rgba(211, 218, 230, 0.25)' : undefined,
          }}
        ></EuiListGroupItem>
      </EuiListGroup>
      <ThreadSelect></ThreadSelect>
    </>
  );
};

export default CourseNav;
