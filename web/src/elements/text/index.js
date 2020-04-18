// @flow
import * as React from 'react';
import classNames from 'classnames';

// type Props = {
//   heading?: boolean,
//   note?: boolean,
//   note?: boolean,
//   note?: boolean,
//   note?: boolean,
//   note?: boolean,
//   note?: boolean,
// };

type Props = {
  type?: 'heading' | 'note' | 'title',
  size?: 'small' | 'medium' | 'large',
  className?: string,
  children?: React.Node,
};

const Text = (props: Props) => {
  const { type, size, className } = props;
  const classes = classNames('cz-text', type, size, className);
  return <span className={classes}>{props.children}</span>;
};

export default Text;
