import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppNavigator } from '../hooks';
import {
  getCourseThreads,
  getActiveThread,
  getActiveCourse,
} from '../../redux/selectors';
import { addNewThread } from '../../redux/actions';
import CreateThreadDialog from '../dialogs/create-thread-dialog';
import { createNewThread } from '../../utils/requests';
import {
  EuiCollapsibleNavGroup,
  EuiButtonIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiEmptyPrompt,
} from '@elastic/eui';

const ThreadSelect = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const threads = useSelector(getCourseThreads);
  const activeCourse = useSelector(getActiveCourse);
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
          <EuiListGroup maxWidth="none" color="subdued">
            {threads.map((c) => {
              const active = activeThread ? c._id === activeThread._id : false;
              return (
                <div onClick={() => appNav.goToThread(c._id)} key={c._id}>
                  <EuiListGroupItem
                    label={c.title}
                    isActive={active}
                    iconType="empty"
                    value={c._id}
                    key={c._id}
                    onClick={() => {}}
                    style={{
                      padding: 10,
                      background: active
                        ? 'rgba(211, 218, 230, 0.25)'
                        : undefined,
                    }}
                  ></EuiListGroupItem>
                </div>
              );
            })}
          </EuiListGroup>
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
