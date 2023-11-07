import React from 'react';

const Answer = ({ option, handleAnswer }) => {
  return (
    <li>
      <button onClick={() => handleAnswer(option)}>{option}</button>
    </li>
  );
};

export default Answer;