import * as React from 'react';

type ProfileValues = {
  profile: IProfile | null;
};

type ProfileContainer = ProfileValues & {
  setProfile: (profile: IProfile) => void;
};

const ProfileContext = React.createContext<ProfileContainer>({
  profile: null,
  setProfile: (_) => {},
});

export default ProfileContext;

/**
 * Stores the student's profile information
 */
export const ProfileProvider = (props: { children: React.ReactNode }) => {
  const [profileValues, setProfileValues] = React.useState<ProfileValues>({
    profile: null,
  });

  const setProfile = React.useCallback(
    (profile: IProfile) => {
      setProfileValues({ ...profileValues, profile });
    },
    [profileValues]
  );

  return (
    <ProfileContext.Provider value={{ ...profileValues, setProfile }}>
      {props.children}
    </ProfileContext.Provider>
  );
};
