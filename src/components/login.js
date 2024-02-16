import '../styles/LoginStyle.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from './authwrapper';

function Login() {
  const navigate = useNavigate();

  // const [credentials, setCredentials] = useState({
  //   username: '',
  //   password: '',
  // });

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setCredentials({ ...credentials, [name]: value });
  // }

  // function handleLogin() {
  //   axios
  //     .post('http://localhost:8000/auth', credentials)
  //     .then((res) => {
  //       navigate('/app');
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // This grabs the data from the form and converts it to a JavaScript object
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    axios
      .post('http://localhost:8000/auth', formData)
      .then((res) => {
        navigate('/app');
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthWrapper>
      <div className="inner-auth">
        <div className="inner-auth-container">
          <div className="inner-auth-header">Login</div>
          <div>
            <form onSubmit={handleSubmit}>
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
