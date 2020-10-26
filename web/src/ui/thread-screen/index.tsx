import React from 'react';
import { EuiPanel, EuiEmptyPrompt } from '@elastic/eui';
import { useMessageManager } from './utils';
import MessageList from './message-list';
import ThreadInput from './thread-input';
import ThreadsContext from '../../providers/thread-provider';
import { usePageTitle } from '../hooks';
import { useActiveThread } from '../../providers/route';
import Topbar from '../topbar';

const ThreadScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const threadsManager = React.useContext(ThreadsContext);
  const activeThread = useActiveThread() as IThread;
  const Manager = useMessageManager();
  usePageTitle(`${activeThread.title} | Courza`);

  // Fetch messages on thread change
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      await Manager.init();
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, [activeThread._id]);

  // Clear thread unreads on open and close
  React.useEffect(() => {
    threadsManager.clearThreadUnreads(activeThread._id);
    return () => threadsManager.clearThreadUnreads(activeThread._id);
  }, [activeThread._id]);

  return (
    <>
      <Topbar />
      <div className="cz-thread__wrapper">
        <div className="cz-thread__messagepanel">
          {/* Messages panel */}
          <div className="cz-messages__wrapper">
            <MessageList
              messages={Manager.messages}
              loading={loading}
            ></MessageList>
            <ThreadInput
              onPost={Manager.postNew}
              loading={loading}
            ></ThreadInput>
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
    </>
  );
};

export default ThreadScreen;
