import React from 'react';
import { Spinner } from '../elements';

const LoadingPage = props => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex'
      }}
    >
      <Spinner text={props.text}></Spinner>
    </div>
  );
};

export default LoadingPage;
