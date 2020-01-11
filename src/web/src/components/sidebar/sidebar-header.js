import React from 'react';
import mainLogo from '../../assets/main-logo.png';

const SidebarHeader = props => {
  return (
    <div className="cz-sidebar-header">
      <img src={mainLogo} className="cz-sidebar-header__logo" alt="Courza"></img>
    </div>
  );
};

export default SidebarHeader;
