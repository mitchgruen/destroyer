import '../styles/LoginStyle.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }

  function handleLogin() {
    axios
      .post('http://localhost:8000/auth', credentials)
      .then((res) => {
        navigate('/app');
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">Destroyer</div>
        <div className="username">
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="password">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="remember-me"></div>
        <div className="login-button">
          <Link to="/app">
            <button onClick={handleLogin}>Login</button>
          </Link>
        </div>
        <div className="create-account">
          <Link to="/register">Create Account</Link>
        </div>
        <div className="forgot-password">
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
