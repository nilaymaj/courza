import * as React from 'react';
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTextArea,
  EuiButtonIcon,
} from '@elastic/eui';
import autosize from 'autosize';
import { scrollToBottom } from './utils';

type Props = {
  onPost: (text: string) => any;
  loading: boolean;
};

const ChatInput = (props: Props) => {
  const [input, setInput] = React.useState<string>('');
  const textareaRef = React.useRef<null | HTMLTextAreaElement>(null);
  const { loading, onPost } = props;

  const handlePostMessage = React.useCallback(() => {
    const content = input.trim();
    if (!content || loading) return;
    setInput('');
    onPost(content);
    scrollToBottom();
  }, [input, loading, onPost]);

  // Auto-resize input box on input change
  React.useEffect(() => {
    if (textareaRef.current) autosize(textareaRef.current);
  }, [input]);

  // Ctrl+Enter keyboard shortcut
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode === 13 && e.ctrlKey) handlePostMessage();
    };
    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }, [handlePostMessage]);

  return (
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
              onChange={(e) => setInput(e.target.value)}
              style={{ maxHeight: '9em' }}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButtonIcon
              iconSize="xl"
              aria-label="send message"
              iconType="editorComment"
              onClick={handlePostMessage}
              disabled={!input || !input.trim()}
            ></EuiButtonIcon>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </div>
  );
};

export default ChatInput;
