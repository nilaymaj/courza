import * as React from 'react';
import ThreadSelect from './thread-select';
import { EuiListGroup, EuiListGroupItem } from '@elastic/eui';

const CourseNav = () => {
  const active = true;
  return (
    <>
      <EuiListGroup>
        <EuiListGroupItem
          label="Resources"
          isActive={active}
          iconType="empty"
          onClick={() => console.log('Opening resources...')}
          style={{
            padding: 10,
            background: active ? 'rgba(211, 218, 230, 0.25)' : undefined,
          }}
        ></EuiListGroupItem>
      </EuiListGroup>
      <ThreadSelect></ThreadSelect>
    </>
  );
};

export default CourseNav;
