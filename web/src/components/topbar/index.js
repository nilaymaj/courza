import * as React from 'react';
import { useSelector } from 'react-redux';
import { getActiveCourse, getActiveChat } from '../../redux/selectors';
import Sidebar from '../sidebar';
import { useAppNavigator } from '../../utils/hooks';
import mainIcon from '../../assets/icon-512.png';
import {
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiIcon,
} from '@elastic/eui';

const Topbar = () => {
  const course = useSelector(getActiveCourse);
  const chat = useSelector(getActiveChat);
  const appNav = useAppNavigator();

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      {
        text: course.code,
        onClick: (e) => {
          e.preventDefault();
          appNav.goToCourse(course._id);
        },
      },
      {
        text: chat ? chat.title : '',
      },
    ];

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
  };

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
      {renderBreadcrumbs()}
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
