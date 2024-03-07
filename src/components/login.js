import '../styles/LoginStyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from './authwrapper';
import { useState } from 'react';
import { simpleError } from '../utils/functions';

function Login() {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState();

  // Click login, authorize user, take them to app
  const handleSubmit = (e) => {
    e.preventDefault();
    // This grabs the data from the form and converts it to a JavaScript object
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, formData)
      .then((res) => {
        navigate('/app');
      })
      .catch((err) => {
        setLoginError(simpleError(err).message);
        console.log(err);
      });
  };

  const handleGuest = () => {
    navigate('/app');
  }

  // Press enter to login
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  function printLoginError() {
    return loginError;
  }

  return (
    <AuthWrapper>
      <div className="inner-auth">
        <div className="inner-auth-container">
          <div className="inner-auth-header">Login</div>
          <div className="inner-auth-error">{printLoginError()}</div>
          <div>
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
              <label>Email</label>
              <input id="email" name="email" type="text" />
              <label>Password</label>
              <input id="password" name="password" type="password" />
              <button
                onClick={() => navigate('/forgotpassword')}
                style={{ color: 'grey' }}
              >
                Forgot Password?
              </button>
              <button className="main-button" type="submit">
                Login
              </button>
              <button className="main-button" onClick={handleGuest}>
                Login as Guest
              </button>
            </form>
          </div>
          <div>
            <p>Don't have an account?</p>
            <button
              onClick={() => navigate('/register')}
              style={{ color: 'black' }}
              className="signup-button"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}

export default Login;
