import '../styles/RegisterStyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
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
    <div className="register">
      <div className="register-container">
        <div className="register-header">Destroyer</div>
        <div className="register-subheader">Create Your Account</div>
        <form onSubmit={handleSubmit}>
          <div className="register-a">
            <label>Email</label>
          </div>
          <div className="register-b">
            <input id="email" name="email" type="text" />
          </div>
          <div className="register-c">
            <label>Password</label>
          </div>
          <div className="register-d">
            <input id="password" name="password" type="text" />
          </div>
          <div className="register-e">
            <label>Confirm Password</label>
          </div>
          <div className="register-f">
            <input id="confirm-password" name="confirm-password" type="text" />
          </div>
          <div className="register-g">
            <label>First Name</label>
          </div>
          <div className="register-h">
            <input id="name" name="name" type="text" />
          </div>
          <div className="register-i">
            <button type="submit" onSubmit={handleSubmit}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
