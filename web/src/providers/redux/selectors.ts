import { Store } from './reducers';

export const getProfile = (store: Store) => store && store.profile;
export const isLoggedIn = (store: Store) => store && !!store.profile;
