import * as React from 'react';
import { useAppNavigator } from '../../hooks';
import CreateThreadDialog from '../../dialogs/create-thread-dialog';
import { createNewThread } from '../../../utils/requests';
import {
  EuiCollapsibleNavGroup,
  EuiButtonIcon,
  EuiEmptyPrompt,
  EuiDescriptionList,
} from '@elastic/eui';
import ThreadRow from './thread-row';
import { useNewMessageEvent } from '../../../providers/realtime/hooks';
import ThreadsContext from '../../../providers/thread-provider';
import { useActiveCourse, useActiveThread } from '../../../providers/route';

const ThreadSelect = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const threadsManager = React.useContext(ThreadsContext);
  const threadsData = threadsManager.threads;
  const activeCourse = useActiveCourse() as ICourse;
  const activeThread = useActiveThread();
  const appNav = useAppNavigator();

  const handleCreateThread = async (title: string, description: string) => {
    const courseId = activeCourse && activeCourse._id;
    if (!courseId)
      return console.warn('Cannot create thread when no course is open.');
    const newThread = await createNewThread(courseId, title, description);
    threadsManager.addNewThread(newThread);
    appNav.goToThread(newThread._id, courseId);
  };

  useNewMessageEvent(activeCourse._id, (message) => {
    if (activeThread && activeThread._id === message.thread) return;
    console.log('Message received: ', message);
  });

  return (
    <>
      <EuiCollapsibleNavGroup
        title="Threads"
        iconType="editorComment"
        isCollapsible={true}
        initialIsOpen={true}
        extraAction={
          <EuiButtonIcon
            title="Create new thread"
            iconType="plusInCircle"
            aria-label="create new thread"
            onClick={() => setDialogOpen(true)}
          ></EuiButtonIcon>
        }
      >
        {threadsData && threadsData.length ? (
          <EuiDescriptionList>
            {threadsData.map((threadData) => (
              <ThreadRow
                key={threadData.thread._id}
                onClick={() => appNav.goToThread(threadData.thread._id)}
                isActive={threadData.thread._id === activeThread?._id}
                hasUnread={threadData.isUnread}
                threadData={threadData}
              />
            ))}
          </EuiDescriptionList>
        ) : (
          <EuiEmptyPrompt
            iconType="asterisk"
            body={
              <p>This course does not have any threads yet - create one!</p>
            }
          />
        )}
      </EuiCollapsibleNavGroup>
      {dialogOpen && (
        <CreateThreadDialog
          onCreate={handleCreateThread}
          onClose={() => setDialogOpen(false)}
        ></CreateThreadDialog>
      )}
    </>
  );
};

export default ThreadSelect;
