import { Course, Profile } from '../types';
import { Action } from './actions';

export interface Store {
  isLoggedIn: boolean;
  profile: Profile | null;
  loading: boolean;
  sidebarOpen: boolean;
  courses: Course[];
  activeCourseId: string | null;
  activeChatId: string | null;
}

const initialState: Store = {
  isLoggedIn: false,
  profile: null,
  loading: true,
  sidebarOpen: false,
  courses: [],
  activeCourseId: null,
  activeChatId: null,
};

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case 'OPEN_COURSE': {
      const courseId = action.courseId;
      const course = state.courses.find((c) => c._id === courseId);
      if (!course) {
        console.warn("Course does not exist in user's profile");
        return state;
      }
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
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.loading,
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
