import * as React from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../assets/main-logo.png';

const SidebarHeader = (props) => {
  return (
    <Link to="/home">
      <div className="cz-sidebar-header">
        <img
          src={mainLogo}
          className="cz-sidebar-header__logo"
          alt="Courza"
        ></img>
      </div>
    </Link>
  );
};

export default SidebarHeader;
