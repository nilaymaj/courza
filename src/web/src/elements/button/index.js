import React from 'react';
import classNames from 'classnames';

const Button = props => {
  const {
    block,
    disabled,
    bordered,
    transparent,
    primary,
    danger,
    ...rest
  } = props;
  const classes = classNames('cz-button', {
    transparent,
    bordered,
    primary,
    danger,
    block,
    disabled
  });
  return (
    <button {...rest} className={classes}>
      {props.children}
    </button>
  );
};

export default Button;
