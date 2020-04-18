// @flow
import React from 'react';
import Text from '../../elements/text';

type ChatOption = {
  title: string,
  body: string,
  _id: string,
};

type Props = {
  chat: ChatOption,
  active: boolean,
  onSelect: (_id: string) => void,
};

const SidebarChatOption = (props: Props) => {
  return (
    <div
      className="cz-sidebar-chat__option"
      onClick={() => props.onSelect(props.chat._id)}
    >
      <Text>{props.chat.title}</Text>
      <br></br>
      <Text type="note">{props.chat.body}</Text>
    </div>
  );
};

export default SidebarChatOption;
