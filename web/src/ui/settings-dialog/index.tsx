import * as React from 'react';

import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiTabbedContent,
} from '@elastic/eui';
import ProfileTab from './profile-tab';
import CoursesTab from './courses-tab';
import CoursesContext from '../../providers/course-provider';

const SettingsDialog = () => {
  const coursesManager = React.useContext(CoursesContext);

  const tabs = [
    { id: 'settings__profile', name: 'Profile', content: <ProfileTab /> },
    { id: 'settings__courses', name: 'Courses', content: <CoursesTab /> },
  ];

  return (
    <EuiOverlayMask className="cz-overlay">
      <EuiModal
        onClose={() => coursesManager.openSettingsDialog(false)}
        maxWidth={800}
      >
        <EuiModalHeader>
          <EuiModalHeaderTitle>Settings</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiTabbedContent tabs={tabs} />
        </EuiModalBody>
      </EuiModal>
    </EuiOverlayMask>
  );
};

export default SettingsDialog;
