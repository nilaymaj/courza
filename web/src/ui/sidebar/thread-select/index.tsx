import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppNavigator } from '../../hooks';
import {
  getCourseThreads,
  getActiveThread,
  getActiveCourse,
} from '../../../redux/selectors';
import { addNewThread } from '../../../redux/actions';
import CreateThreadDialog from '../../dialogs/create-thread-dialog';
import { createNewThread } from '../../../utils/requests';
import {
  EuiCollapsibleNavGroup,
  EuiButtonIcon,
  EuiEmptyPrompt,
  EuiDescriptionList,
} from '@elastic/eui';
import ThreadRow from './thread-row';
import { Course } from '../../../types';
import { useNewMessageEvent } from '../../../realtime/hooks';

const ThreadSelect = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const threads = useSelector(getCourseThreads);
  const activeCourse = useSelector(getActiveCourse) as Course;
  const activeThread = useSelector(getActiveThread);
  const appNav = useAppNavigator();

  const handleCreateThread = async (title: string, description: string) => {
    const courseId = activeCourse && activeCourse._id;
    if (!courseId)
      return console.warn('Cannot create thread when no course is open.');
    const newThread = await createNewThread(courseId, title, description);
    dispatch(addNewThread(courseId, newThread));
    appNav.goToThread(newThread._id, courseId);
  };

  useNewMessageEvent(activeCourse._id, (message) => {
    if (activeThread && activeThread._id === message.threadId) return;

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
        {threads && threads.length ? (
          <EuiDescriptionList>
            {threads.map((t) => (
              <ThreadRow
                key={t._id}
                onClick={() => appNav.goToThread(t._id)}
                isActive={t._id === activeThread?._id}
                hasUnread={false}
                thread={t}
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
