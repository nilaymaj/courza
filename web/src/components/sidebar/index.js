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
import { openCourse, openChat, toggleSidebar } from '../../redux/actions';

const CourseSelect = () => {
  const courses = useSelector(getCourses);
  const activeCourse = useSelector(getActiveCourse);
  const dispatch = useDispatch();

  const handleCourseChange = (courseId) => {
    dispatch(openCourse(courseId));
  };

  const options = courses.map((c) => ({
    value: c._id,
    inputDisplay: <EuiText>{c.code}</EuiText>,
  }));

  return (
    <EuiCollapsibleNavGroup>
      <EuiSuperSelect
        options={options}
        valueOfSelected={activeCourse._id}
        onChange={handleCourseChange}
      ></EuiSuperSelect>
    </EuiCollapsibleNavGroup>
  );
};

const ChatSelect = () => {
  const chats = useSelector(getCourseChats);
  const activeChat = useSelector(getActiveChat);
  const dispatch = useDispatch();

  const handleClick = (chatId) => {
    dispatch(openChat(chatId));
  };

  return (
    <EuiCollapsibleNavGroup
      title="Topics"
      iconType="editorComment"
      isCollapsible={true}
      initialIsOpen={true}
      extraAction={
        <EuiButtonIcon
          title="Create new topic"
          iconType="createSingleMetricJob"
          aria-label="create new topic"
        ></EuiButtonIcon>
      }
    >
      {activeChat ? (
        <EuiListGroup maxWidth="none" color="subdued">
          {chats.map((c) => {
            const active = c._id === activeChat._id;
            return (
              <div onClick={() => handleClick(c._id)} key={c._id}>
                <EuiListGroupItem
                  label={c.title}
                  isActive={active}
                  iconType="empty"
                  value={c._id}
                  key={c._id}
                  onClick={() => {}}
                  style={{
                    padding: 10,
                    background: active && '#eee',
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
  const open = useSelector(isSidebarOpen);
  const dispatch = useDispatch();

  return (
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
      <ChatSelect></ChatSelect>
    </EuiCollapsibleNav>
  );
};

export default Sidebar;
