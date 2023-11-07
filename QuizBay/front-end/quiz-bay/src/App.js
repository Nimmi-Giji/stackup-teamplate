import React, { Component } from 'react';
import { createClient } from '@supabase/supabase-js';
import Question from './Question';
import { getAllQuizzes } from './supabaseFunctions'; // Update the path as needed.

// SUPABASE CLIENT CREATION

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// END OF CLIENT CREATION

// SIGN IN

async function signInWithProvider() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'github', // or 'google', 'facebook'
  });
}

// SIGN IN

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
    };

    this.signInWithProvider = this.signInWithProvider.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('Authentication state change:', event, session);
    });

    // Fetch quiz questions from Supabase
    getAllQuizzes()
      .then((quizzes) => {
        if (quizzes.length > 0) {
          const fetchedQuestions = quizzes[0].questions; // Modify this based on your Supabase schema
          this.setState({
            questions: fetchedQuestions,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching quiz questions:', error);
      });
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
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
    const user = supabase.auth.user();

    if (!user) {
      return <button onClick={this.signInWithProvider}>Sign In With GitHub</button>;
    }

    return (
      <div className="quiz-app">
        <button onClick={this.signOut}>Sign Out</button>
        {currentQuestionIndex < questions.length ? (
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