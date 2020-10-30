import * as React from 'react';
import ThreadSelect from './thread-select';
import { useIsResourcesOpen } from '../../providers/route';
import { useAppNavigator } from '../hooks';
import { EuiListGroup, EuiListGroupItem } from '@elastic/eui';
import classes from 'classnames';

const CourseNav = () => {
  const resourcesOpen = useIsResourcesOpen();
  const appNav = useAppNavigator();

  return (
    <>
      <EuiListGroup>
        <EuiListGroupItem
          label="Resources"
          isActive={resourcesOpen}
          iconType="empty"
          onClick={() => appNav.goToResources()}
          className={classes('cz-sidebar__resources', {
            active: resourcesOpen,
          })}
        ></EuiListGroupItem>
      </EuiListGroup>
      <ThreadSelect></ThreadSelect>
    </>
  );
};

export default CourseNav;
