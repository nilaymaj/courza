import React from 'react';
import { useSelector } from 'react-redux';
import { getProfile, getActiveChat } from '../redux/selectors';
import {
  EuiTextArea,
  EuiPanel,
  EuiFormRow,
  EuiButton,
  EuiForm,
  EuiTextAlign,
} from '@elastic/eui';
import { getChatMessages, postMessage } from '../utils/requests';
import MessageList from '../components/message-list';

const ChatScreen = (props) => {
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [messages, setMessages] = React.useState(null);
  const activeChat = useSelector(getActiveChat);
  const profile = useSelector(getProfile);

  const onPostMessage = React.useCallback(
    (e) => {
      e && e.preventDefault();
      // Do not post empty messages
      if (!input || !input.trim()) return;

      postMessage(activeChat._id, input);
      // Optimistic UI - add message without
      // waiting for server confirmation
      const newMessage = {
        authorId: {
          _id: profile._id,
          name: profile.name,
        },
        date: new Date().toISOString(),
        content: input,
        isOwn: true,
      };
      const newMessageList = [...messages];
      newMessageList.push(newMessage);
      setMessages(newMessageList);
    },
    [input, activeChat._id, profile._id, profile.name, messages]
  );

  React.useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 13 && e.ctrlKey) onPostMessage();
    };
    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }, [onPostMessage]);

  // Fetch messages on chat change
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const rawMessages = await getChatMessages(activeChat._id);
      const messageList = rawMessages.map((m) => ({
        ...m,
        date: new Date(m.createdAt),
        isOwn: m.authorId._id === profile._id,
      }));
      setMessages(messageList);
      setLoading(false);
    })();
  }, [activeChat._id, profile._id]);

  return (
    <div className="cz-messages__wrapper">
      <div className="cz-messages__middle">
        <MessageList messages={messages} loading={loading}></MessageList>
        <div className="cz-messages__input">
          <EuiPanel paddingSize="l" style={{ background: '#ebfdff' }} hasShadow>
            <EuiForm component="form">
              <EuiFormRow fullWidth helpText="Ctrl + Enter to post">
                <EuiTextArea
                  fullWidth
                  value={input}
                  rows={3}
                  placeholder="Say something"
                  aria-label="Enter your comment"
                  onChange={(e) => setInput(e.nativeEvent.target.value)}
                />
              </EuiFormRow>
              <EuiTextAlign textAlign="right" style={{ marginTop: 10 }}>
                <EuiButton
                  type="submit"
                  fill
                  style={{ alignSelf: 'flex-end' }}
                  onClick={onPostMessage}
                  disabled={!input || !input.trim()}
                >
                  Post comment
                </EuiButton>
              </EuiTextAlign>
            </EuiForm>
          </EuiPanel>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
