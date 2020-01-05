import React from 'react';

const Icon = props => {
  const iconName = 'ios-' + props.name;
  return <ion-icon name={iconName} md={iconName} class={props.className} {...props}></ion-icon>;
};

export default Icon;
