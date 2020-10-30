import {
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiSwitchEvent,
  EuiText,
  EuiTextColor,
} from '@elastic/eui';
import * as React from 'react';
import ProfileContext from '../../providers/profile-provider';

const ProfileTab = () => {
  const profileManager = React.useContext(ProfileContext);
  const profile = profileManager.profile as IProfile;

  const updatePreference = (fieldName: string, e: EuiSwitchEvent) => {
    profileManager.updateSettings(fieldName, e.target.checked);
  };

  return (
    <>
      {/* Profile section */}
      <EuiFlexGroup
        gutterSize="m"
        responsive={false}
        className="euiHeaderProfile"
      >
        <EuiFlexItem grow={false}>
          <EuiAvatar name={profile.name} size="xl" />
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiText>
            <p>
              {profile.name}
              <br />
              <EuiTextColor color="subdued">
                {profile.iitkEmail}
                <br />
                {profile.rollNo}
              </EuiTextColor>
            </p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
      {/* Preferences */}
      <EuiText>
        <h3>Preferences</h3>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiFormRow helpText="Refresh the page to see theme changes">
        <EuiSwitch
          label="Dark mode"
          checked={profile.settings.useDarkMode}
          onChange={(e) => updatePreference('useDarkMode', e)}
        />
      </EuiFormRow>
    </>
  );
};

export default ProfileTab;
