import '../styles/RegisterStyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from './authwrapper';

export default function Register() {
  const navigate = useNavigate();

  console.log(process.env.REACT_APP_API_URL)

  const handleSubmit = (e) => {
    e.preventDefault();
    // This grabs the data from the form and converts it to a JavaScript object
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, formData)
      .then((res) => {
        navigate('/login');
        console.log(res.status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthWrapper>
      <div className="inner-auth">
        <div className="inner-auth-container">
          <div className="inner-auth-header">Create Your Account</div>
          <div>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input id="email" name="email" type="text" />
              <label>Password</label>
              <input id="password" name="password" type="text" />
              <label>Confirm Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="text"
              />
              <label>First Name</label>
              <input id="name" name="name" type="text" />
              <button className="main-button" type="submit">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
