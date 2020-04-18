import * as React from 'react';
import chats from '../../samples/chats.json';
import SidebarHeader from './sidebar-header';
import SidebarCourseSelect from './sidebar-course-select';
import SidebarChatSelect from './sidebar-chat-select';

const Sidebar = (props) => {
  return (
    <div className="cz-sidebar__wrapper">
      <SidebarHeader></SidebarHeader>
      <hr className="cz-sidebar__divider"></hr>
      <SidebarCourseSelect></SidebarCourseSelect>
      <hr className="cz-sidebar__divider"></hr>
      <SidebarChatSelect
        chats={chats}
        activeId={'idOfChat1'}
      ></SidebarChatSelect>
    </div>
  );
};

export default Sidebar;
