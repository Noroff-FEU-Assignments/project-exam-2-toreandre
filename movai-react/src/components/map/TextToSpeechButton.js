import React from 'react';

// TextToSpeechButton component
const TextToSpeechButton = ({ text }) => {
  const speakText = () => {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  };

  return (
    <button onClick={speakText} aria-label="Read out this section">
      🔊
    </button>
  );
};

export default TextToSpeechButton;
