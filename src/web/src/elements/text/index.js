import * as React from 'react';
import classNames from 'classnames';

const Text = (props) => {
  const { heading, note, title, small, medium, large, className } = props;
  const classes = classNames(
    'cz-text',
    { heading, note, title, small, medium, large },
    className
  );
  return <span className={classes}>{props.children}</span>;
};

export default Text;
