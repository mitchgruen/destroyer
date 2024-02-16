import '../styles/ForgotPasswordStyle.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthWrapper from './authwrapper';

export default function ForgotPassword() {
  const navigate = useNavigate();

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
          <div className="inner-auth-header">Reset Password</div>
          <div>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input id="email" name="email" type="text" />
              <button className="main-button" type="submit">
                Send Reset Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
