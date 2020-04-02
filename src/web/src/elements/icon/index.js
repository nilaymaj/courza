import React from 'react';

const Icon = props => {
  const { name, color, ...rest } = props;
  const iconName = 'ios-' + props.name;
  return (
    <ion-icon
      name={iconName}
      md={iconName}
      class={props.className}
      style={color && { color }}
      {...rest}
    ></ion-icon>
  );
};

export default Icon;
