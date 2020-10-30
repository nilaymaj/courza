import * as React from 'react';
import { useActiveCourse, useActiveThread } from '../../providers/route';
import Sidebar from '../sidebar';
import ProfilePopoverButton from './profile-popover';
import { useAppNavigator } from '../hooks';
import * as mainIcon from '../../assets/icon-512.png';
import {
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiIcon,
  Breadcrumb,
} from '@elastic/eui';

const Topbar = () => {
  const course = useActiveCourse();
  const thread = useActiveThread();
  const appNav = useAppNavigator();

  const breadcrumbs = React.useMemo(() => {
    const bc: Breadcrumb[] = [
      {
        text: course ? course.code : 'Dashboard',
        onClick: course
          ? (e: React.MouseEvent) => {
              e.preventDefault();
              appNav.goToCourse(course._id);
            }
          : () => {},
      },
    ];
    if (course) {
      bc.push({
        text: thread ? thread.title : 'Home',
      });
    }
    return bc;
  }, [course, thread, appNav]);

  return (
    <EuiHeader position="fixed">
      {/* Sidebar */}
      <EuiHeaderSection>
        <Sidebar></Sidebar>
      </EuiHeaderSection>
      {/* App logo */}
      <EuiHeaderSection grow={false} onClick={() => appNav.goToHome()}>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo iconType={mainIcon} aria-label="Go to home page">
            Courza
          </EuiHeaderLogo>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      {/* Breadcrumbs */}
      <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />
      <EuiHeaderSection side="right">
        {/* Search button */}
        <EuiHeaderSectionItem>
          <ProfilePopoverButton />
        </EuiHeaderSectionItem>
        {/* Profile button */}
        <EuiHeaderSectionItem>
          <EuiHeaderSectionItemButton aria-label="Search">
            <EuiIcon type="search" size="m" />
          </EuiHeaderSectionItemButton>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};

export default Topbar;
