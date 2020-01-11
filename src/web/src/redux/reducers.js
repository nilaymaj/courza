import sampleCourses from '../samples/courses.json';

const initialState = {
  isLoggedIn: true,
  profile: null,
  loadingText: null,
  courses: sampleCourses
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_NEW_COURSE': {
      return {
        ...state,
        courses: [...state.courses, action.data]
      };
    }
    case 'LOGIN': {
      const { profile, courses } = action;
      return {
        isLoggedIn: true,
        profile,
        courses
      };
    }
    case 'SHOW_LOADING': {
      return {
        ...state,
        loadingText: action.text
      };
    }
    case 'STOP_LOADING': {
      return {
        ...state,
        loadingText: null
      };
    }
    default:
      return state;
  }
}
