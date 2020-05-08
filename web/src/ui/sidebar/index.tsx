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
import { toggleSidebar } from '../../redux/actions';
import { useAppNavigator } from '../hooks';

const CourseSelect = () => {
  const courses = useSelector(getCourses);
  const activeCourse = useSelector(getActiveCourse);
  const appNav = useAppNavigator();

  const options = courses.map((c) => ({
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
  }));

  return (
    <EuiCollapsibleNavGroup>
      <EuiSuperSelect
        hasDividers
        options={options}
        valueOfSelected={activeCourse && activeCourse._id}
        onChange={(cId) => appNav.goToCourse(cId)}
      ></EuiSuperSelect>
    </EuiCollapsibleNavGroup>
  );
};

const ChatSelect = () => {
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
        ></EuiButtonIcon>
      }
    >
      {activeChat ? (
        <EuiListGroup maxWidth="none" color="subdued">
          {chats &&
            chats.map((c) => {
              const active = c._id === activeChat._id;
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
