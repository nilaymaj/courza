import React from 'react';
import classNames from 'classnames';

const Input = props => {
  const { block, error, ...rest } = props;
  const classes = classNames('cz-input', { block, error });
  return <input className={classes} {...rest}></input>;
};

export default Input;
