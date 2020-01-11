import React from 'react';
import classNames from 'classnames';

const Text = props => {
  const { heading, note, title, small, medium, large } = props;
  const classes = classNames('cz-text', { heading, note, title, small, medium, large });
  return <span className={classes}>{props.children}</span>;
};

export default Text;
