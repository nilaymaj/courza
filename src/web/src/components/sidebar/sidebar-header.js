import React from 'react';
import mainLogo from '../../assets/main-logo.png';

const SidebarHeader = props => {
  return (
    <div className="sidebar-header">
      <img src={mainLogo} className="sidebar-header__logo"></img>
    </div>
  );
};

export default SidebarHeader;
