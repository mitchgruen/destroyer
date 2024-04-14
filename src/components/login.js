import '../styles/LoginStyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from './authwrapper';
import { useState } from 'react';
import { simpleError } from '../utils/functions';

function Login() {
  // Test that .env variables are loaded in production
  console.log('API URL');
  console.log(process.env.REACT_APP_API_URL);

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState();
  // This is copied from registter.js, is there a way to make this DRYer by making it a function/putting it in a separate file?
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setIsSubmitting(false);
    }
  };
  // Press enter to login
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsSubmitting(true);
      handleSubmit(e);
    }
  };

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
  };

  function printLoginError() {
    return loginError;
  }

  console.log(process.env.REACT_APP_TEST)
  console.log(process.env.REACT_APP_API_URL)

  return (
    <AuthWrapper>
      <div className="inner-auth">
        <div className="inner-auth-container">
          <h1>{process.env.REACT_APP_TEST}</h1>
          <div className="inner-auth-header">Login</div>
          <div className="inner-auth-error">{printLoginError()}</div>
          <div>
            <form
              onSubmit={handleSubmit}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
            >
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
              <button
                className={isSubmitting ? 'main-button-inverse' : 'main-button'}
                type="submit"
              >
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
