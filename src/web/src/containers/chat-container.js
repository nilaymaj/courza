import React from 'react';
import ChatCard from '../components/chat-card';

const ChatContainer = props => {
  const chats = props.data;
  return chats.map((chat, idx) => <ChatCard key={idx} chat={chat}></ChatCard>);
};

export default ChatContainer;
