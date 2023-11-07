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
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://api.supabase.io/rest/v1/tables/questions');
      const { data } = response.data;
      this.setState({
        questions: data,
      });
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    }
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
  };

  render() {
    const { questions, currentQuestionIndex, score } = this.state;
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="quiz-app">
        {currentQuestion ? (
          <Question question={currentQuestion} handleAnswer={this.handleAnswer} />
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

export default App;