export interface Login {
  type: 'LOGIN';
  profile: IProfile;
}

export interface Logout {
  type: 'LOGOUT';
}

export type Action = Login | Logout;

/**
 * Set login status to true with fetched profile
 */
export const login = (data: IProfile & { courses: ICourse[] }): Login => {
  const { courses, ...profile } = data;
  return { type: 'LOGIN', profile };
};

/**
 * Set login status to false, and profile to null
 */
export const logout = (): Logout => {
  return { type: 'LOGOUT' };
};
