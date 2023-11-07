const express = require('express');
const router = express.Router();
const quizController = require('./quizController');


router.post('/quizzes', quizController.createQuiz);

router.get('/quizzes', quizController.getAllQuizzes);

router.get('/quizzes/:quizId', quizController.getQuizById);

router.post('/quizzes/:quizId/submit', quizController.submitQuizAnswers);

module.exports = router;
