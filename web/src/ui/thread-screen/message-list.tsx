import React from 'react';
import { EuiLoadingContent, EuiSpacer, EuiEmptyPrompt } from '@elastic/eui';
import { UIMessage, scrollToBottom } from './utils';
import Message from './message';

type Props = {
  loading: boolean;
  messages: UIMessage[];
};

const MessageList = (props: Props) => {
  const messages = props.messages;

  // Scroll to bottom when opened
  React.useEffect(() => {
    scrollToBottom(true);
  }, [props.loading]);

  return (
    <div id="cz-messages__scroll" className="cz-messages__list">
      {props.loading ? (
        // Loading screen
        <div className="cz-messages__loading">
          <EuiLoadingContent></EuiLoadingContent>
          <EuiSpacer></EuiSpacer>
          <EuiLoadingContent></EuiLoadingContent>
          <EuiSpacer></EuiSpacer>
          <EuiLoadingContent></EuiLoadingContent>
          <EuiSpacer></EuiSpacer>
        </div>
      ) : messages && messages.length ? (
        // Message list
        messages.map((m) => <Message message={m} key={m._id || m.tempId} />)
      ) : (
        // No messages in thread
        <EuiEmptyPrompt
          iconType="asterisk"
          title={<h2>No comments yet!</h2>}
          body={<p>Post the first comment on this topic.</p>}
        />
      )}
    </div>
  );
};

export default MessageList;
