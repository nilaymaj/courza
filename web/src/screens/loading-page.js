import * as React from 'react';
import { EuiLoadingSpinner } from '@elastic/eui';

const LoadingPage = (props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <EuiLoadingSpinner size="xl" />
    </div>
  );
};

export default LoadingPage;
