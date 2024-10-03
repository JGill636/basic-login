import React, { useState, useEffect } from 'react';
import './App.css';
import AnnoyingImage from './AnnoyingImage';
import annoyingSound from './assets/annoying-sound.mp3'; // Import the sound file

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isTyping, setIsTyping] = useState(false); // State to track when typing starts

  useEffect(() => {
    let audio: HTMLAudioElement | null = null; // Explicitly type the `audio` object
    let interval: NodeJS.Timeout | null = null;

    if (isTyping) {
      // Play the annoying sound when typing starts
      audio = new Audio(annoyingSound);
      audio.loop = true; // Keep playing the sound in a loop
      audio.play();

      // Start changing the background color every second
      interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomColor();
      }, 1000);
    } else {
      // Stop the sound and clear the interval when typing stops
      if (audio) {
        //audio.pause(); // Explicitly use `audio.pause()`
        audio = null;
      }
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }

    // Cleanup when component unmounts
    return () => {
      if (audio) {
        audio.pause();
      }
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTyping]);

  // Function to generate random bright colors
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true); // Trigger effects when the user starts typing
    if (event.target.id === 'name') {
      setName(event.target.value);
    } else if (event.target.id === 'password') {
      setPassword(event.target.value);
    }
  };

  return (
    <div className="App">
      <form>
        <h1>Login</h1>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleTyping} // Detect when the user is typing
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleTyping} // Detect when the user is typing
            required
          />
        </div>
      </form>
      {isTyping && (
        <div>
          <AnnoyingImage /> {/* Show the annoying image when the user is typing */}
        </div>
      )}
    </div>
  );
};

export default App;
