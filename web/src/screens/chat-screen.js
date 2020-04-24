// @flow
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import autosize from 'autosize';
import { getProfile, getActiveChat } from '../redux/selectors';
import {
  EuiTextArea,
  EuiPanel,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from '@elastic/eui';
import { getChatMessages, postMessage } from '../utils/requests';
import {
  type UIMessage,
  parseToUIMessage,
  scrollToBottom,
  createTempMessage,
} from '../utils/chat-utils';
import MessageList from '../components/message-list';

const ChatScreen = () => {
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [messages, setMessages] = React.useState(null);
  const textareaRef = React.useRef(null);
  // Maintain a temporary message ID for optimistic UI
  const tempMessageId = React.useRef(1);
  const activeChat = useSelector(getActiveChat);
  const profile = useSelector(getProfile);

  const onPostMessage = React.useCallback(
    (e) => {
      e && e.preventDefault();
      const content = input.trim();
      if (!content || !messages || loading) return;
      postMessage(activeChat._id, content);
      // Optimistic UI - add message without
      // waiting for server confirmation
      setInput('');
      const tempId = (tempMessageId.current++).toString();
      const newMessage = createTempMessage(profile, content, tempId);
      const newMessageList = [...messages, newMessage];
      setMessages(newMessageList);
      scrollToBottom();
    },
    [input, activeChat._id, profile._id, profile.name, messages, loading]
  );

  // Auto-resize input box on input change
  React.useEffect(() => {
    if (textareaRef) autosize(textareaRef.current);
  }, [input]);

  // Ctrl+Enter keyboard shortcut
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
      const messageList = rawMessages.map((m) =>
        parseToUIMessage(m, profile._id)
      );
      setMessages(messageList);
      setLoading(false);
    })();
  }, [activeChat._id, profile._id]);

  return (
    <div className="cz-chat__wrapper">
      <div className="cz-chat__messagepanel">
        {/* Messages panel */}
        <div className="cz-messages__wrapper">
          <MessageList messages={messages} loading={loading}></MessageList>
          <div className="cz-messages__input">
            {/* Input panel */}
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
