import * as React from 'react';
import { EuiPanel, EuiEmptyPrompt } from '@elastic/eui';
import { usePageTitle } from '../hooks';

const Dashboard = () => {
  usePageTitle('Home | Courza');

  return (
    <div className="cz-course__wrapper">
      <div className="cz-course__panel">
        <EuiPanel>
          <EuiEmptyPrompt
            title={<h2>Dashboard</h2>}
            body="Hello, user!"
            iconType="home"
          ></EuiEmptyPrompt>
        </EuiPanel>
      </div>
    </div>
  );
};

export default Dashboard;
