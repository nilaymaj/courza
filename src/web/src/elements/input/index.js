import React from 'react';
import classNames from 'classnames';

const Input = props => {
  const { block, hidden, ...rest } = props;
  const classes = classNames('cz-input', { block, hidden });
  return <input className={classes} {...rest}></input>;
};

export default Input;
