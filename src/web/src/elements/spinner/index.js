import React from 'react';
import classNames from 'classnames';
import spinnerSvg from '../../assets/loader.svg';
import Text from '../text';

const Spinner = props => {
  const { className, ...rest } = props;
  const classes = classNames('cz-spinner__wrapper', className);
  return (
    <div className={classes} {...rest}>
      <img src={spinnerSvg} alt="Loading..."></img>
      {props.text && (
        <Text note medium>
          {props.text}
        </Text>
      )}
    </div>
  );
};

export default Spinner;
