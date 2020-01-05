import React from 'react';
import classNames from 'classnames';

const Button = props => {
  const { bordered, transparent, primary, danger } = props;
  const classes = classNames('cz-button', { transparent, bordered, primary, danger });
  return (
    <div className="cz-button__wrapper">
      <button {...props} className={classes}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
