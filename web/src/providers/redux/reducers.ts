import { Action } from './actions';

export interface Store {
  profile: IProfile | null;
}

const initialState: Store = {
  profile: null,
};

export default function (state: Store = initialState, action: Action): Store {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case 'LOGOUT': {
      return { profile: null };
    }
    default:
      return state;
  }
}
