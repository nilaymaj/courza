import React from 'react';
import ChatCard from '../components/chat-card';
import { Card } from '../elements';

const ChatContainer = props => {
  const chats = props.data;
  if (chats.length === 0) return <Card filler text="No chats to show!"></Card>;
  return chats.map((chat, idx) => <ChatCard key={idx} chat={chat}></ChatCard>);
};

export default ChatContainer;
