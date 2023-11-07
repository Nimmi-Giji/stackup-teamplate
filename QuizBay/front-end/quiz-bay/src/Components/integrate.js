import React from 'react';
import Auth from './Auth';
import Question from './Question';
import axios from 'axios';

class App extends React.Component {
  // ...

  render() {
    const { questions, currentQuestionIndex, score, user } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="quiz-app">
        {user ? (
          currentQuestionIndex < questions.length ? (
            <Question
              question={currentQuestion}
              handleAnswer={this.handleAnswer}
            />
          ) : (
            <div className="result">
              <h2>Quiz Completed!</h2>
              <p>Your Score: {score}/{questions.length}</p>
            </div>
          )
        ) : (
          <Auth />
        )}
      </div>
    );
  }
}