import React from 'react';
import SidebarOption from './sidebar-option';

const sampleOptions = [
  {
    name: 'Home',
    icon: 'home'
  },
  {
    name: 'Email',
    icon: 'mail'
  }
];

const SidebarMenu = props => {
  return (
    <div className="cz-sidebar-menu">
      {sampleOptions.map((option, idx) => (
        <SidebarOption option={option} key={idx}></SidebarOption>
      ))}
    </div>
  );
};

export default SidebarMenu;
