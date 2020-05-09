import * as React from 'react';
import {
  EuiCollapsibleNav,
  EuiButtonIcon,
  EuiText,
  EuiCollapsibleNavGroup,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiSuperSelect,
  EuiListGroup,
  EuiListGroupItem,
  EuiEmptyPrompt,
} from '@elastic/eui';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCourses,
  getActiveCourse,
  getActiveChat,
  getCourseChats,
  isSidebarOpen,
} from '../../redux/selectors';
import { toggleSidebar, addNewChat } from '../../redux/actions';
import { useAppNavigator } from '../hooks';
import CreateChatDialog from '../dialogs/create-chat-dialog';
import { createNewChat } from '../../utils/requests';

const CourseSelect = () => {
  const courses = useSelector(getCourses);
  const activeCourse = useSelector(getActiveCourse);
  const appNav = useAppNavigator();

  const handleOpenCourse = (courseId: string) => {
    if (courseId === 'home') appNav.goToHome();
    else appNav.goToCourse(courseId);
  };

  const options = [
    {
      value: 'home',
      inputDisplay: <EuiText>Dashboard</EuiText>,
    },
    ...courses.map((c) => ({
      value: c._id,
      inputDisplay: <EuiText>{c.code}</EuiText>,
      dropdownDisplay: (
        <>
          <strong>{c.code}</strong>
          <EuiText size="s" color="subdued">
            <p>{c.name}</p>
          </EuiText>
        </>
      ),
    })),
  ];

  return (
    <EuiCollapsibleNavGroup>
      <EuiSuperSelect
        hasDividers
        options={options}
        valueOfSelected={activeCourse ? activeCourse._id : 'home'}
        onChange={handleOpenCourse}
      ></EuiSuperSelect>
    </EuiCollapsibleNavGroup>
  );
};

type ChatSelectProps = {
  onCreate: () => void;
};

const ChatSelect = (props: ChatSelectProps) => {
  const chats = useSelector(getCourseChats);
  const activeChat = useSelector(getActiveChat);
  const appNav = useAppNavigator();

  return (
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
          onClick={props.onCreate}
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
                    background: active ? '#eee' : undefined,
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
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const open = useSelector(isSidebarOpen);
  const activeCourse = useSelector(getActiveCourse);
  const appNav = useAppNavigator();
  const [newChatDialogOpen, setNewChatDialogOpen] = React.useState(false);

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
      <EuiCollapsibleNav
        isOpen={open}
        isDocked
        onClose={() => dispatch(toggleSidebar())}
        button={
          <EuiHeaderSectionItemButton
            aria-label="Toggle sidebar"
            onClick={() => dispatch(toggleSidebar())}
          >
            <EuiIcon type="menu" size="m" aria-hidden="true" />
          </EuiHeaderSectionItemButton>
        }
      >
        <CourseSelect></CourseSelect>
        {!!activeCourse ? (
          <ChatSelect onCreate={() => setNewChatDialogOpen(true)}></ChatSelect>
        ) : (
          <EuiEmptyPrompt
            iconType="indexFlush"
            body={<p>Select a course to see details</p>}
          />
        )}
      </EuiCollapsibleNav>
      {newChatDialogOpen && (
        <CreateChatDialog
          onCreate={handleCreateChat}
          onClose={() => setNewChatDialogOpen(false)}
        ></CreateChatDialog>
      )}
    </>
  );
};

export default Sidebar;
