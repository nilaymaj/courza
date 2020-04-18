export const getCourses = store => store && store.courses;
export const getProfile = store => store && store.profile;
export const isLoggedIn = store => store && store.isLoggedIn;
export const isLoading = store => store && store.loadingText;

export default { getCourses, getProfile, isLoggedIn, isLoading };
