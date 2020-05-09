import { Course, Profile } from '../types';
import { Action } from './actions';

export interface Store {
  isLoggedIn: boolean;
  profile: Profile | null;
  loading: boolean;
  courses: Course[];
  activeCourseId: string | null;
  activeChatId: string | null;
}

const initialState: Store = {
  isLoggedIn: false,
  profile: null,
  loading: true,
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
        activeChatId: null,
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
      };
    }
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.loading,
      };
    }
    case 'ADD_NEW_CHAT': {
      const { courseId, chat } = action;
      const newCourses = [...state.courses];
      const course = newCourses.find((c) => c._id === courseId);
      if (!course) {
        console.warn('Tried to add chat for non-existent course');
        return state;
      }
      course.chats.push(chat);
      return {
        ...state,
        courses: newCourses,
      };
    }
    case 'RESET_ACTIVE': {
      return {
        ...state,
        activeChatId: null,
        activeCourseId: null,
      };
    }
    default:
      return state;
  }
}
