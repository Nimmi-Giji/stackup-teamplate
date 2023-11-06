const Quiz = require('./quizModel'); 
const User = require('./userModel'); 


exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    const quiz = new Quiz({
      title,
      questions,
      createdBy: req.user._id, // user authentication yet to be coded
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the quiz', message: error.message });
  }
};

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve quizzes', message: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  const quizId = req.params.quizId;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve quiz details', message: error.message });
  }
};

exports.submitQuizAnswers = async (req, res) => {
  const { quizId, answers } = req.body;
  const userId = req.user._id; // line 12

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    //scoring

    //update user profile in db

    res.status(200).json({ message: 'Quiz answers submitted successfully', score });
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to submit quiz answers', message: error.message });
  }
};
