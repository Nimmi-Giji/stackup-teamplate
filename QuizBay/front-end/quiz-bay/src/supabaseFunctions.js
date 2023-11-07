import { supabase } from './supabaseClient';

export const getAllQuizzes = async () => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*');
  
    if (error) {
      throw error;
    }
  
    return data;
  };