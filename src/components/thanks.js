import '../styles/ThanksStyle.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Thanks() {
  const navigate = useNavigate();
  const [count, setCount] = useState(2);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => (count + 1) % 4);
    }, 750);
    setTimeout(() => {
      navigate('/app');
    }, 11000);
    return () => clearInterval(interval);
  });

  return (
    <div className="thanks">
      <div className="thanks-container">
        <div></div>
        <div className="thanks-text">Thanks for registering.</div>
        <div className="thanks-text">
          Destroyer is loading{'.'.repeat(count)}
        </div>
        <div></div>
      </div>
    </div>
  );
}
