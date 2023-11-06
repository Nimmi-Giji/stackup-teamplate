const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://isclssxahgldembekjxw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzY2xzc3hhaGdsZGVtYmVranh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNzgzNDcsImV4cCI6MjAxNDY1NDM0N30.Fx2VpD9-NMB5H13OPdHz198QuUXfbkSXgG4YTeqOnLk';
const supabase = createClient(supabaseUrl, supabaseKey);

const tableName = 'quizzes';//subject to change as per db


async function createQuiz(title, questions, createdBy) {
  const { data, error } = await supabase.from(tableName).upsert([
    {
      title,
      questions,
      created_by: createdBy,
    },
  ]);

  if (error) {
    throw new Error(`Failed to create quiz: ${error.message}`);
  }

  return data[0];
}


async function getAllQuizzes() {
  const { data, error } = await supabase.from(tableName).select('*');

  if (error) {
    throw new Error(`Failed to retrieve quizzes: ${error.message}`);
  }

  return data;
}

async function getQuizById(quizId) {
  const { data, error } = await supabase.from(tableName).select('*').eq('id', quizId).single();

  if (error) {
    throw new Error(`Failed to retrieve quiz details: ${error.message}`);
  }

  return data;
}

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
};
