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

app.listen(8081);
console.log('Server running at http://127.0.0.1:8081/');
