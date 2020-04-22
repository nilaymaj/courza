import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { EuiText } from '@elastic/eui';
import mainLogo from '../assets/main-logo.png';
import { LoginForm } from '../forms';
import { connect } from 'react-redux';
import { login as lgnAction } from '../redux/actions';

const PublicPage = (props) => {
  const history = useHistory();

  const handleLogin = (profile) => {
    props.login(profile);
    history.push('/home');
  };

  return (
    <div className="public__wrapper">
      <div className="public__content">
        <div className="public__text">
          <img src={mainLogo} alt="Courza" className="public__logo"></img>
          <br></br>
          <EuiText>
            Find and share course-related discussions and resources easily!
          </EuiText>
        </div>
        <div className="public__login">
          <EuiText>
            <h2>Login</h2>
          </EuiText>
          <br></br>
          <LoginForm onLogin={handleLogin}></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { login: lgnAction })(PublicPage);
