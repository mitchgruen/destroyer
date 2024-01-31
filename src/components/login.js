import '../styles/LoginStyle.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">Destroyer</div>
        <div className="username">
          <input type="text" placeholder="Username" />
        </div>
        <div className="password">
          <input type="password" placeholder="Password" />
        </div>
        <div className="remember-me"></div>
        <div className="login-button">
        <Link to="/app"><button>Login</button></Link>
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
