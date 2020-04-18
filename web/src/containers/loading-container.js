import * as React from 'react';
import { Spinner } from '../elements';

const LoadingContainer = (props) => {
  if (props.loading) return <Spinner text={props.text}></Spinner>;
  return props.children;
};

export default LoadingContainer;
