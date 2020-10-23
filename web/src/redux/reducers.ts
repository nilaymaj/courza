import { Action } from './actions';

export interface Store {
  isLoggedIn: boolean;
  profile: IProfile | null;
  loading: boolean;
  courses: ICourse[];

  activeCourseId: string | null;
  activeThreadId: string | null;
  resourcesOpen: boolean;
}

const initialState: Store = {
  isLoggedIn: false,
  profile: null,
  loading: true,
  courses: [],

  // Navigation state
  activeCourseId: null,
  activeThreadId: null,
  resourcesOpen: false,
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
        activeThreadId: null,
        resourcesOpen: false,
      };
    }
    case 'OPEN_THREAD': {
      return {
        ...state,
        activeThreadId: action.threadId,
        resourcesOpen: false,
      };
    }
    case 'OPEN_RESOURCES': {
      return {
        ...state,
        resourcesOpen: true,
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
    case 'ADD_NEW_THREAD': {
      const { courseId, thread } = action;
      const newCourses = [...state.courses];
      const course = newCourses.find((c) => c._id === courseId);
      if (!course) {
        console.warn('Tried to add thread for non-existent course');
        return state;
      }
      course.threads.push(thread);
      return {
        ...state,
        courses: newCourses,
      };
    }
    case 'RESET_ACTIVE': {
      return {
        ...state,
        activeThreadId: null,
        activeCourseId: null,
        resourcesOpen: false,
      };
    }
    default:
      return state;
  }
}
