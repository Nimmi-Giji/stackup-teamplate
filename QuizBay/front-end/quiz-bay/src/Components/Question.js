import React from 'react';
import Answer from './Answer';

const Question = ({ question, handleAnswer }) => {
  return (
    <div className="question">
      <h2>{question.text}</h2>
      <ul>
        {question.options.map((option, index) => (
          <Answer
            key={index}
            option={option}
            handleAnswer={handleAnswer}
          />
        ))}
      </ul>
    </div>
  );
};

export default Question;