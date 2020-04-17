import * as React from 'react';
import { useHistory } from 'react-router-dom';
import mainLogo from '../assets/main-logo.png';
import { Text } from '../elements';
import { LoginForm } from '../forms';
import { login } from '../requests/student';
import { connect } from 'react-redux';
import { login as lgnAction } from '../redux/actions';

const PublicPage = (props) => {
  const history = useHistory();

  const handleLogin = async (data) => {
    try {
      const profile = await login(data);
      props.login(profile);
      history.push('/home');
    } catch (err) {
      console.log(err);
      return err.response.status;
    }
  };

  return (
    <div className="public__wrapper">
      <div className="public__content">
        <div className="public__text">
          <img src={mainLogo} alt="Courza" className="public__logo"></img>
          <br></br>
          <Text medium>
            Find and share course-related discussions and resources easily!
          </Text>
        </div>
        <div className="public__login">
          <Text large>Login</Text>
          <br></br>
          <LoginForm onSubmit={handleLogin}></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { login: lgnAction })(PublicPage);
