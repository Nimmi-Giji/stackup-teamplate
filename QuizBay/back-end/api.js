const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const quizController = require('./quizController');


router.post('/quizzes', quizController.createQuiz);

router.get('/quizzes', quizController.getAllQuizzes);

router.get('/quizzes/:quizId', quizController.getQuizById);

router.post('/quizzes/:quizId/submit', quizController.submitQuizAnswers);

// opentdb
router.get('/quizzes', async (req, res) => {
  try {
    // fetch questions from opentdb
    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: 10, // number,type subject to change
        type: 'multiple',
      },
    });

    const questions = response.data.results;
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
