import '../styles/RegisterStyle.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthWrapper from './authwrapper';
import { simpleError } from '../utils/functions';
// import { clear } from '@testing-library/user-event/dist/clear';

export default function Register() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setNameError('');
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsSubmitting(true);
    }
  }
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setIsSubmitting(false);
    }
  }


  // useState to ensure that button style changes when submitting with enter
  const handleSubmit = (e) => {
    clearErrors();
    e.preventDefault();
    // This grabs the data from the form and converts it to a JavaScript object
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    // Catch as many registration errors here as you can to avoid unnecessary API calls
    const { email, password, confirm, name } = formData;

    // FRONT END FORM VALIDATION
    // Ensure all fields are filled, return if not
    if (!email) setEmailError('Required');
    if (!password) setPasswordError('Required');
    if (!confirm) setConfirmPasswordError('Required');
    if (!name) setNameError('Required');
    if (!email || !password || !confirm || !name) return;

    // Check for valid email, return if not
    // Need to figure out why eslint is highlighting these escape characters \
    if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      email !== ''
    ) {
      setEmailError(`Invalid Email`);
      return;
    }

    // Check for valid password, return if not
    if (password.length < 6 && password !== '') {
      setPasswordError(`Your Password Must Be At Least Six Characters Long`);
      return;
    }

    // Ensure password and confirm match, return if they don't
    if (password !== confirm) {
      setPasswordError('Passwords must match');
      setConfirmPasswordError('Passwords must match');
      return;
    }

    // Check for valid name, return if not
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'-]+$/.test(name) && name !== '') {
      setNameError(`Invalid Name`);
      return;
    }

    // Registration API call
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, formData)
      .then((res) => {
        setTimeout(() => {
          navigate('/thanks');
        }, 1000);
      })
      .catch((err) => {
        setEmailError(simpleError(err).registration.email);
        setPasswordError(simpleError(err).registration.password);
        setConfirmPasswordError(simpleError(err).registration.confirm);
        setNameError(simpleError(err).registration.name);
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
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
              <label>Email</label>
              <input id="email" name="email" type="text" />
              <div className="form-error">{printEmailError()}</div>
              <label>Password</label>
              <input id="password" name="password" type="password" />
              <div className="form-error">{printPasswordError()}</div>
              <label>Confirm Password</label>
              <input id="confirm" name="confirm" type="password" />
              <div className="form-error">{printConfirmPasswordError()}</div>
              <label>First Name</label>
              <input id="name" name="name" type="text" />
              <div className="form-error">{printNameError()}</div>
              <button className={`hover-hand ${isSubmitting? "main-button-inverse": "main-button"}`} type="submit">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
