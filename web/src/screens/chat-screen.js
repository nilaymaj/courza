import React from 'react';
import { useSelector } from 'react-redux';
import autosize from 'autosize';
import { getProfile, getActiveChat } from '../redux/selectors';
import {
  EuiTextArea,
  EuiPanel,
  EuiButton,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from '@elastic/eui';
import { getChatMessages, postMessage } from '../utils/requests';
import MessageList from '../components/message-list';

const ChatScreen = (props) => {
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [messages, setMessages] = React.useState(null);
  const textareaRef = React.useRef(null);
  const activeChat = useSelector(getActiveChat);
  const profile = useSelector(getProfile);

  const onPostMessage = React.useCallback(
    (e) => {
      e && e.preventDefault();
      const content = input.trim();
      // Do not post only-whitespace messages
      if (!content) return;

      postMessage(activeChat._id, content);
      // Optimistic UI - add message without
      // waiting for server confirmation
      setInput('');
      const newMessage = {
        authorId: {
          _id: profile._id,
          name: profile.name,
        },
        date: new Date().toISOString(),
        content,
        isOwn: true,
      };
      const newMessageList = [...messages, newMessage];
      setMessages(newMessageList);
    },
    [input, activeChat._id, profile._id, profile.name, messages]
  );

  // Auto-resize input box on input change
  React.useEffect(() => {
    if (textareaRef) autosize(textareaRef.current);
  }, [input]);

  // Ctrl+Enter keyboard shortcut
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

  const chatInput = (
    <div className="cz-messages__input">
      <EuiPanel paddingSize="s" hasShadow>
        <EuiFlexGroup gutterSize="s" responsive={false}>
          <EuiFlexItem>
            <EuiTextArea
              fullWidth
              value={input}
              rows={1}
              inputRef={(ref) => (textareaRef.current = ref)}
              placeholder="Say something"
              aria-label="Enter your comment"
              onChange={(e) => setInput(e.nativeEvent.target.value)}
              style={{ maxHeight: '9em' }}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconSize="xl"
              aria-label="send message"
              iconType="editorComment"
              onClick={onPostMessage}
              disabled={!input || !input.trim()}
            ></EuiButtonIcon>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </div>
  );

  const messagePanel = (
    <div className="cz-messages__wrapper">
      <MessageList messages={messages} loading={loading}></MessageList>
      {chatInput}
    </div>
  );

  const chatInfoPanel = (
    <EuiPanel style={{ height: '100%' }} hasShadow paddingSize="l">
      <EuiEmptyPrompt
        iconType="editorComment"
        title={<h2>{activeChat.title}</h2>}
        body={
          <p>
            Navigators use massive amounts of spice to gain a limited form of
            prescience. This allows them to safely navigate interstellar space,
            enabling trade and travel throughout the galaxy.
          </p>
        }
        actions={
          <EuiButton color="primary" fill>
            Harvest spice
          </EuiButton>
        }
      />
    </EuiPanel>
  );

  return (
    <div className="cz-chat__wrapper">
      <div className="cz-chat__messagepanel">{messagePanel}</div>
      <div className="cz-chat__chatpanel">{chatInfoPanel}</div>
    </div>
  );
};

export default ChatScreen;
