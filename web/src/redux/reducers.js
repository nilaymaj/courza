const initialState = {
  isLoggedIn: false,
  profile: null,
  loadingText: null,
  sidebarOpen: false,
  courses: [],
  activeCourseId: null,
  activeChatId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_NEW_COURSE': {
      return {
        ...state,
        courses: [...state.courses, action.data],
      };
    }
    case 'OPEN_COURSE': {
      const courseId = action.courseId;
      const course = state.courses.find((c) => c._id === courseId);
      return {
        ...state,
        activeCourseId: courseId,
        activeChatId: course.chats[0] && course.chats[0]._id,
      };
    }
    case 'OPEN_CHAT': {
      return {
        ...state,
        activeChatId: action.chatId,
      };
    }
    case 'LOGIN': {
      const { profile, courses } = action;
      return {
        ...state,
        isLoggedIn: true,
        profile,
        courses,
        activeCourseId: courses[0] && courses[0]._id,
        activeChatId: courses[0].chats[0] && courses[0].chats[0]._id,
      };
    }
    case 'SHOW_LOADING': {
      return {
        ...state,
        loadingText: action.text,
      };
    }
    case 'STOP_LOADING': {
      return {
        ...state,
        loadingText: null,
      };
    }
    case 'TOGGLE_SIDEBAR': {
      let open = action.open === undefined ? !state.sidebarOpen : action.open;
      return {
        ...state,
        sidebarOpen: open,
      };
    }
    default:
      return state;
  }
}
