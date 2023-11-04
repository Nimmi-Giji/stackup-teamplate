import React, { Component } from 'react';
import Question from './Question';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: 1,
          text: 'What is the capital of France?',
          options: ['Paris', 'London', 'Berlin', 'Madrid'],
          correct: 'Paris',
        },
        // Add more questions here
      ],
      currentQuestionIndex: 0,
      score: 0,
    };
  }

  handleAnswer = (selectedOption) => {
    const { currentQuestionIndex, questions, score } = this.state;
    if (selectedOption === questions[currentQuestionIndex].correct) {
      this.setState({
        score: score + 1,
      });
    }
    this.setState({
      currentQuestionIndex: currentQuestionIndex + 1,
    });
  };

  render() {
    const { questions, currentQuestionIndex, score } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="quiz-app">
        {currentQuestionIndex < questions.length ? (
          <Question
            question={currentQuestion}
            handleAnswer={this.handleAnswer}
          />
        ) : (
          <div className="result">
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score}/{questions.length}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;