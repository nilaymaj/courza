import React from 'react';
import loader from '../assets/loader.svg';
import { Text } from '../elements';

const LoadingPage = props => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img src={loader} alt="Loading..."></img>
      {props.text && (
        <Text note medium>
          {props.text}
        </Text>
      )}
    </div>
  );
};

export default LoadingPage;
