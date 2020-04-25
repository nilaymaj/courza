// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import autosize from 'autosize';
import { getActiveChat } from '../redux/selectors';
import {
  EuiTextArea,
  EuiPanel,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from '@elastic/eui';
import { scrollToBottom } from '../utils/chat-utils';
import { useMessageManager } from '../utils/hooks';
import MessageList from '../components/message-list';

const ChatScreen = () => {
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const activeChat = useSelector(getActiveChat);
  const textareaRef = React.useRef(null);
  const [initMessages, getMessages, postNewMessage] = useMessageManager();

  const onPostMessage = React.useCallback(
    (e) => {
      e && e.preventDefault();
      const content = input.trim();
      if (!content || loading) return;
      setInput('');
      postNewMessage(content);
      scrollToBottom();
    },
    [input, loading, postNewMessage]
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
      await initMessages();
      setLoading(false);
    })();
  }, [initMessages]);

  return (
    <div className="cz-chat__wrapper">
      <div className="cz-chat__messagepanel">
        {/* Messages panel */}
        <div className="cz-messages__wrapper">
          <MessageList messages={getMessages()} loading={loading}></MessageList>
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
