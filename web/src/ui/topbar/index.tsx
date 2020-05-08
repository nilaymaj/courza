import * as React from 'react';
import { useSelector } from 'react-redux';
import { getActiveCourse, getActiveChat } from '../../redux/selectors';
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
  const chat = useSelector(getActiveChat);
  const appNav = useAppNavigator();

  const breadcrumbs = React.useMemo(() => {
    const bc: Breadcrumb[] = [];
    if (course) {
      bc.push({
        text: course.code,
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          appNav.goToCourse(course._id);
        },
      });
    }
    if (chat) {
      bc.push({
        text: chat ? chat.title : '',
      });
    }
    return bc;
  }, [course, chat, appNav]);

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
