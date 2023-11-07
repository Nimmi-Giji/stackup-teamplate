const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://isclssxahgldembekjxw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzY2xzc3hhaGdsZGVtYmVranh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwNzgzNDcsImV4cCI6MjAxNDY1NDM0N30.Fx2VpD9-NMB5H13OPdHz198QuUXfbkSXgG4YTeqOnLk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createUser(Username, password) {
  const { data, error } = await supabase.from('users').upsert([
    {
      Username,
      password,
    },
  ]);

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }

  return data[0];
}

//update user info
async function updateUser(userId, updatedUserData) {
  const { data, error } = await supabase
    .from('users')
    .update(updatedUserData)
    .eq('id', userId);

  if (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }

  return data[0];
}

async function getUserByUsername(Username) {
  const { data, error } = await supabase.from('users').select('*').eq('Username', Username).single();

  if (error) {
    throw new Error(`Failed to retrieve user details: ${error.message}`);
  }

  return data;
}

module.exports = {
  createUser,
  updateUser,
  getUserByUsername,
};
