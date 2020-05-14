import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppNavigator } from '../hooks';
import {
  getCourseChats,
  getActiveChat,
  getActiveCourse,
} from '../../redux/selectors';
import { addNewChat } from '../../redux/actions';
import CreateChatDialog from '../dialogs/create-chat-dialog';
import { createNewChat } from '../../utils/requests';
import {
  EuiCollapsibleNavGroup,
  EuiButtonIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiEmptyPrompt,
} from '@elastic/eui';

const ChatSelect = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const chats = useSelector(getCourseChats);
  const activeCourse = useSelector(getActiveCourse);
  const activeChat = useSelector(getActiveChat);
  const appNav = useAppNavigator();

  const handleCreateChat = async (title: string, description: string) => {
    const courseId = activeCourse && activeCourse._id;
    if (!courseId)
      return console.warn('Cannot create chat when no course is open.');
    const newChat = await createNewChat(courseId, title, description);
    dispatch(addNewChat(courseId, newChat));
    appNav.goToChat(newChat._id, courseId);
  };

  return (
    <>
      <EuiCollapsibleNavGroup
        title="Topics"
        iconType="editorComment"
        isCollapsible={true}
        initialIsOpen={true}
        extraAction={
          <EuiButtonIcon
            title="Create new topic"
            iconType="plusInCircle"
            aria-label="create new topic"
            onClick={() => setDialogOpen(true)}
          ></EuiButtonIcon>
        }
      >
        {chats && chats.length ? (
          <EuiListGroup maxWidth="none" color="subdued">
            {chats.map((c) => {
              const active = activeChat ? c._id === activeChat._id : false;
              return (
                <div onClick={() => appNav.goToChat(c._id)} key={c._id}>
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
            body={<p>This course does not have any topics yet - create one!</p>}
          />
        )}
      </EuiCollapsibleNavGroup>
      {dialogOpen && (
        <CreateChatDialog
          onCreate={handleCreateChat}
          onClose={() => setDialogOpen(false)}
        ></CreateChatDialog>
      )}
    </>
  );
};

export default ChatSelect;
