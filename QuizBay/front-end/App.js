import React, { Component } from 'react';
import Question from './Question';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
    };
  }

  componentDidMount() {
    // Fetch questions from OpenTDB API
    axios
      .get('https://opentdb.com/api.php?amount=10&type=multiple') // Modify the URL as needed
      .then((response) => {
        const fetchedQuestions = response.data.results;
        this.setState({
          questions: fetchedQuestions,
        });
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }

  handleAnswer = (selectedOption, correctAnswer) => {
    const { currentQuestionIndex, questions, score } = this.state;
  
    if (selectedOption === correctAnswer) {
      this.setState({
        score: score + 1,
      });
    }
  
    this.setState({
      currentQuestionIndex: currentQuestionIndex + 1,
    });
  }

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