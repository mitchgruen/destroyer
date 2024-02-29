import '../styles/RegisterStyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthWrapper from './authwrapper';
import { simpleError } from '../utils/functions';

export default function Register() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  console.log(process.env.REACT_APP_API_URL);

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
      .catch((err) => {
        // setEmailError(simpleError(err).message.email);
        // setPasswordError(simpleError(err).message.password);
        // setConfirmPasswordError(simpleError(err).message.confirm);
        // setNameError(simpleError(err).message.name);
        setEmailError(simpleError(err).message);
        setPasswordError(simpleError(err).message);
        setConfirmPasswordError(simpleError(err).message);
        setNameError(simpleError(err).message);
        console.log(simpleError(err).message);
      });
  };

  const printEmailError = () => {
    return emailError;
  };
  const printPasswordError = () => {
    return passwordError;
  };
  const printConfirmPasswordError = () => {
    return confirmPasswordError;
  };
  const printNameError = () => {
    return nameError;
  };

  return (
    <AuthWrapper>
      <div className="inner-auth">
        <div className="inner-auth-container">
          <div className="inner-auth-header">Create Your Account</div>
          <div className="inner-auth-error"></div>
          <div>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input id="email" name="email" type="text" />
              <div className='form-error'>{printEmailError()}</div>
              <label>Password</label>
              <input id="password" name="password" type="text" />
              <div className='form-error'>{printPasswordError()}</div>
              <label>Confirm Password</label>
              <input
                id="confirm"
                name="confirm"
                type="text"
              />
              <div className='form-error'>{printConfirmPasswordError()}</div>
              <label>First Name</label>
              <input id="name" name="name" type="text" />
              <div className='form-error'>{printNameError()}</div>
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
