import '../styles/ThanksStyle.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from './authwrapper';

export default function Thanks() {
  const navigate = useNavigate();

  return (
    <div className='thanks'>
      <div className='thanks-container'>
        <div className='thanks-text'>Thanks for Registering</div>
        <div>
          <button className='thanks-button' onClick={() => {navigate('/app')}}>
            Take Me to Destroyer
          </button>
        </div>
      </div>
    </div>
  );
}
