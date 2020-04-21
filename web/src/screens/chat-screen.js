import React from 'react';
import messages from '../samples/messages.json';
import Message from '../components/message';
import { useSelector } from 'react-redux';
import { getProfile } from '../redux/selectors';

const ChatScreen = (props) => {
  const now = new Date().getTime();
  const date = new Date(now - 1000 * 60 * 60);
  const profile = useSelector(getProfile);

  return (
    <div className="cz-messages__wrapper">
      <div className="cz-messages__list">
        {messages.map((m) => (
          <Message
            name={m.authorId.name}
            key={m._id}
            content={m.content}
            isOwn={m.authorId._id === profile._id}
            date={date}
          ></Message>
        ))}
      </div>
      <div className="cz-messages__input">Input box</div>
    </div>
  );
};

export default ChatScreen;
