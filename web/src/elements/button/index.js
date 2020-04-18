// @flow
import * as React from 'react';
import classNames from 'classnames';

type Props = {|
  block?: boolean,
  disabled?: boolean,
  bordered?: boolean,
  block?: boolean,
  transparent?: boolean,
  primary?: boolean,
  danger?: boolean,
  children?: string | React.Node,
  type?: string,
  style?: Object,
|};

const Button = (props: Props) => {
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
    disabled,
  });
  return (
    <button {...rest} className={classes}>
      {props.children}
    </button>
  );
};

export default Button;
