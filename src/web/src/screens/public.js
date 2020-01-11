import React from 'react';
import mainLogo from '../assets/main-logo.png';
import { Text, Input } from '../elements';

const PublicPage = props => {
  return (
    <div className="public__wrapper">
      <div className="public__content">
        <div className="public__text">
          <img src={mainLogo} alt="Courza" className="public__logo"></img>
          <br></br>
          <Text medium>Find and share course-related discussions and resources easily!</Text>
        </div>
        <div className="public__login">
          <Text large>Login</Text>
          <br></br>
          <form>
            <Input block placeholder="IITK Email"></Input>
            <br></br>
            <br></br>
            <Input block placeholder="Password"></Input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
