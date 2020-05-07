// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import autosize from 'autosize';
import { EuiPanel, EuiEmptyPrompt } from '@elastic/eui';
import { getActiveChat } from '../redux/selectors';
import { useMessageManager } from '../utils/hooks';
import MessageList from '../components/message-list';
import ChatInput from '../components/message-box';

const ChatScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const activeChat = useSelector(getActiveChat);
  const [initMessages, messages, postNewMessage] = useMessageManager();

  // Fetch messages on chat change
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await initMessages();
      setLoading(false);
    })();
  }, [initMessages]);

  return (
    <div className="cz-chat__wrapper">
      <div className="cz-chat__messagepanel">
        {/* Messages panel */}
        <div className="cz-messages__wrapper">
          <MessageList messages={messages} loading={loading}></MessageList>
          <ChatInput onPost={postNewMessage} loading={loading}></ChatInput>
        </div>
      </div>
      <div className="cz-chat__chatpanel">
        {/* Chat information panel */}
        <EuiPanel style={{ height: '100%' }} hasShadow paddingSize="l">
          <EuiEmptyPrompt
            iconType="editorComment"
            title={<h2>{activeChat.title}</h2>}
          />
        </EuiPanel>
      </div>
    </div>
  );
};

export default ChatScreen;
