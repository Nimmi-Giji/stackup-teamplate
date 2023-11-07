import React, { Component } from 'react';
import axios from 'axios';
import Question from './Components/Question';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      isLoggedIn: false,
      isQuizStarted: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://isclssxahgldembekjxw.supabase.co/rest/v1/quizzes');
      const questions = response.data;
      this.setState({
        questions: questions,
      });
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
  }

  handleLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  handleStartQuiz = () => {
    this.setState({
      isQuizStarted: true,
    });
  };

  handleAnswer = (selectedOption, correctAnswer) => {
    const { currentQuestionIndex, questions, score } = this.state;

    if (selectedOption === correctAnswer) {
      this.setState({
        score: score + 1,
      });
    }

    if (currentQuestionIndex === questions.length - 1) {
      this.setState({
        isQuizStarted: false,
      });
    } else {
      this.setState({
        currentQuestionIndex: currentQuestionIndex + 1,
      });
    }
  };

  render() {
    const { questions, currentQuestionIndex, score, isLoggedIn, isQuizStarted } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="quiz-app">
        {!isLoggedIn ? (
          <div className="login">
            <h2>Welcome to the Quiz App!</h2>
            <button onClick={this.handleLogin}>Sign Up / Login</button>
          </div>
        ) : (
          <div className="quiz-interface">
            {!isQuizStarted ? (
              <div className="start-quiz">
                <h2>Quiz Interface</h2>
                <button onClick={this.handleStartQuiz}>Start Quiz</button>
              </div>
            ) : (
              <div className="question-container">
                {currentQuestion ? (
                  <Question question={currentQuestion} handleAnswer={this.handleAnswer} />
                ) : (
                  <div className="result">
                    <h2>Quiz Completed!</h2>
                    <p>Your Score: {score}/{questions.length}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;