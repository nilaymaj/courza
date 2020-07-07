import React from 'react';
import { Thread } from '../../types';
import { useSelector } from 'react-redux';
import { EuiPanel, EuiEmptyPrompt } from '@elastic/eui';
import { getActiveThread } from '../../redux/selectors';
import { useMessageManager } from './utils';
import MessageList from './message-list';
import ThreadInput from './thread-input';

const ThreadScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const activeThread = useSelector(getActiveThread) as Thread;
  const Manager = useMessageManager();

  // Fetch messages on thread change
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await Manager.init();
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, [activeThread._id]);

  return (
    <div className="cz-thread__wrapper">
      <div className="cz-thread__messagepanel">
        {/* Messages panel */}
        <div className="cz-messages__wrapper">
          <MessageList
            messages={Manager.messages}
            loading={loading}
          ></MessageList>
          <ThreadInput onPost={Manager.postNew} loading={loading}></ThreadInput>
        </div>
      </div>
      <div className="cz-thread__threadpanel">
        {/* Thread information panel */}
        <EuiPanel style={{ height: '100%' }} hasShadow paddingSize="l">
          <EuiEmptyPrompt
            iconType="editorComment"
            title={<h2>{activeThread.title}</h2>}
          />
        </EuiPanel>
      </div>
    </div>
  );
};

export default ThreadScreen;
