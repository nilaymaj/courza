import React from 'react';
import { Chat } from '../../types';
import { useSelector } from 'react-redux';
import { EuiPanel, EuiEmptyPrompt } from '@elastic/eui';
import { getActiveChat } from '../../redux/selectors';
import { useMessageManager } from './utils';
import MessageList from './message-list';
import ChatInput from './chat-input';

const ChatScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const activeChat = useSelector(getActiveChat) as Chat;
  const Manager = useMessageManager();

  // Fetch messages on chat change
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await Manager.init();
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, [activeChat._id]);

  return (
    <div className="cz-chat__wrapper">
      <div className="cz-chat__messagepanel">
        {/* Messages panel */}
        <div className="cz-messages__wrapper">
          <MessageList
            messages={Manager.messages}
            loading={loading}
          ></MessageList>
          <ChatInput onPost={Manager.postNew} loading={loading}></ChatInput>
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
