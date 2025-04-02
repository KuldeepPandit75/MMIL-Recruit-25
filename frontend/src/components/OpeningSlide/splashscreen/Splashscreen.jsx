import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vector from '/assets/Vector.png';
import image from '/images/1000058712_f1beee89cb94ffdbc7b3a05cbdf6e5cc-30_9_2023, 1_42_36 pm 1.png';
import './Splashscreen.css';

const Splashscreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/Rocket');
    }, 3000); 
    
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className='splash'>
      <div className="cover">
        <img src={vector} className="icon" alt="" />
        <img src={image} className="icon" id="static-icon" alt="" />
      </div>
    </div>
  );
};

export default Splashscreen;
