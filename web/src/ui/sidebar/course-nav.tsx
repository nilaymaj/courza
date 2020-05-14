import * as React from 'react';
import ChatSelect from './chat-select';
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
      <ChatSelect></ChatSelect>
    </>
  );
};

export default CourseNav;
