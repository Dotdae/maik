const express = require('express');
const path = require('path');
const morgan = require('morgan');
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');


// Initialiazations.

const app = express();
require('./database');
require('./config/passport');

// Settings.

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Middlewares.

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'chubby_siento',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Global variables.

app.use((req, res, next) => {

    app.locals.user = req.user;
    next();

});

// Routes.

app.use(require('./routes/index'));
app.use(require('./routes/courses'));
app.use(require('./routes/users'));

// Static files.

app.use(express.static(path.join(__dirname, 'public')));

// Server running.

app.listen(app.get('port'), () => {

    console.log('Server on port', app.get('port'));

});