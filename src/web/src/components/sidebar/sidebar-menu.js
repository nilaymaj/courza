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
    <div className="sidebar-menu">
      {sampleOptions.map(option => (
        <SidebarOption option={option}></SidebarOption>
      ))}
    </div>
  );
};

export default SidebarMenu;
