import '../styles/ThanksStyle.css';
import { useNavigate } from 'react-router-dom';

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
