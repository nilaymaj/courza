import React from 'react';
import { Card, CardHeader, CardFooter, Text, Button, Right } from '../../elements';

const ChatCard = props => {
  const chat = props.chat;
  return (
    <Card>
      <CardHeader>
        <Text title>{chat.title}</Text>
      </CardHeader>
      <Text>{chat.body}</Text>
      <CardFooter>
        <Right>
          <Button>Open topic</Button>
        </Right>
      </CardFooter>
    </Card>
  );
};

export default ChatCard;
