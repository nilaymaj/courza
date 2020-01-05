import React from 'react';
import classNames from 'classnames';

const Text = props => {
  const { heading, note, title } = props;
  const classes = classNames('cz-text', { heading, note, title });
  return (
    <span className={classes} {...props}>
      {props.children}
    </span>
  );
};

export default Text;
