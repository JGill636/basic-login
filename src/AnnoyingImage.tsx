import React, { useEffect, useState } from 'react';
import annoyingImage from './fun.png'; // Import your annoying image

const AnnoyingImage: React.FC = () => {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });

  useEffect(() => {
    // Randomly move the image across the screen every second
    const interval = setInterval(() => {
      setPosition({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        transition: 'top 0.5s ease, left 0.5s ease'
      }}
    >
      <img
        src={annoyingImage}
        alt="Annoying"
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '5px solid red',
          animation: 'spin 2s linear infinite'
        }}
      />
    </div>
  );
};

export default AnnoyingImage;
