const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');


const apiRoutes = require('./api');
const authRoutes = require('./auth');
const authMiddleware = require('./authMiddleware');


app.use(bodyParser.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Configure authentication ??supabase

//app.use('/api', authMiddleware.ensureAuthenticated, apiRoutes);
//app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
