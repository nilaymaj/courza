import * as React from 'react';
import ProfileContext from '../../providers/profile-provider';
import CoursesContext from '../../providers/course-provider';
import {
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeaderSectionItemButton,
  EuiLink,
  EuiPopover,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';

const ProfilePopoverButton = () => {
  const profile = React.useContext(ProfileContext).profile as IProfile;
  const coursesManager = React.useContext(CoursesContext);
  const [open, setOpen] = React.useState(false);

  const button = (
    <EuiHeaderSectionItemButton onClick={() => setOpen(!open)}>
      <EuiAvatar name={profile.name} size="s" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      ownFocus
      button={button}
      isOpen={open}
      anchorPosition="downRight"
      closePopover={() => setOpen(false)}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
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
              <p>{profile.name}</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink
                      onClick={() => {
                        setOpen(false);
                        coursesManager.openSettingsDialog(true);
                      }}
                    >
                      Settings
                    </EuiLink>
                  </EuiFlexItem>

                  <EuiFlexItem grow={false}>
                    <EuiLink>Log out</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};

export default ProfilePopoverButton;
