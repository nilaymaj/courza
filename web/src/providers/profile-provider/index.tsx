import * as React from 'react';
import { updateUserSettings } from '../../utils/requests';

type ProfileValues = {
  profile: IProfile | null;
};

type ProfileContainer = ProfileValues & {
  setProfile: (profile: IProfile) => void;
  updateSettings: (fieldName: string, value: boolean) => void;
};

const ProfileContext = React.createContext<ProfileContainer>({
  profile: null,
  setProfile: (_) => {},
  updateSettings: (_a, _b) => {},
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

  const updateSettings = React.useCallback(
    async (fieldName: string, value: boolean) => {
      // Send settings update to server
      const patchObject = { [fieldName]: value };
      await updateUserSettings(patchObject);

      // Update local preferences
      if (!profileValues.profile) return;
      const newProfileValues = { ...profileValues };
      (newProfileValues.profile as IProfile).settings[fieldName] = value;
      setProfileValues(newProfileValues);
    },
    [profileValues]
  );

  return (
    <ProfileContext.Provider
      value={{ ...profileValues, setProfile, updateSettings }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
