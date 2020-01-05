import React from 'react';
import SidebarHeader from './sidebar-header';
import SidebarMenu from './sidebar-menu';

const Sidebar = props => {
  return (
    <div className="sidebar__wrapper">
      <SidebarHeader></SidebarHeader>
      <hr className="sidebar__divider"></hr>
      <SidebarMenu></SidebarMenu>
    </div>
  );
};

export default Sidebar;
