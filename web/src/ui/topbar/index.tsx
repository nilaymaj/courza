import * as React from 'react';
import { useSelector } from 'react-redux';
import { getActiveCourse, getActiveThread } from '../../redux/selectors';
import Sidebar from '../sidebar';
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
  const course = useSelector(getActiveCourse);
  const thread = useSelector(getActiveThread);
  const appNav = useAppNavigator();

  const breadcrumbs = React.useMemo(() => {
    const bc: Breadcrumb[] = [
      {
        text: course ? course.code : 'Home',
        onClick: course
          ? (e: React.MouseEvent) => {
              e.preventDefault();
              appNav.goToCourse(course._id);
            }
          : () => {},
      },
    ];
    if (thread) {
      bc.push({
        text: thread ? thread.title : '',
      });
    }
    return bc;
  }, [course, thread, appNav]);

  return (
    <EuiHeader position="fixed">
      <EuiHeaderSection>
        <Sidebar></Sidebar>
      </EuiHeaderSection>
      <EuiHeaderSection grow={false} onClick={() => appNav.goToHome()}>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo iconType={mainIcon} aria-label="Go to home page">
            Courza
          </EuiHeaderLogo>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />
      <EuiHeaderSection side="right">
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
