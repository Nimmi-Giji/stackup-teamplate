const { createClient } = require('@supabase/supabase-js');
 
const supabaseUrl = '';
const supabaseKey = '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function registerUser(req, res) {
  try {
    const { email, password } = req.body;

    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return res.status(400).json({ error: 'User registration failed' });
    }

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const { user, error } = await supabase.auth.signIn({ email, password });

    if (error) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.json({ message: 'User logged in successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

async function getUserProfile(req, res) {
  try {
    // Retrieve user information from the currently logged in user
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
