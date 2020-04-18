// @flow
import React from 'react';
import SidebarChatOption from './sidebar-chat';

type ChatOption = {
  title: string,
  body: string,
  _id: string,
};

type Props = {
  chats: Array<ChatOption>,
  activeId: string,
};

const handleSelect = (id) => {
  console.log('Opened id: ', id);
};

const SidebarChatSelect = (props: Props) => {
  return (
    <div className="cz-sidebar-chat">
      {props.chats.map((chat) => (
        <SidebarChatOption
          chat={chat}
          active={chat._id === props.activeId}
          onSelect={handleSelect}
        ></SidebarChatOption>
      ))}
    </div>
  );
};

export default SidebarChatSelect;
