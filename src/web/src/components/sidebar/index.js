import * as React from 'react';
import SidebarHeader from './sidebar-header';
import SidebarMenu from './sidebar-menu';

const Sidebar = (props) => {
  return (
    <div className="cz-sidebar__wrapper">
      <SidebarHeader></SidebarHeader>
      <hr className="cz-sidebar__divider"></hr>
      <SidebarMenu></SidebarMenu>
    </div>
  );
};

export default Sidebar;
