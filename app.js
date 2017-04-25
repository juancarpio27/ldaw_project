var express = require('express');
var session = require('express-session');
var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Strategy = require('passport-facebook').Strategy;

//IN CASE OF CREDENTIDALS AND DATABASE
var credentials = require('./app/config/credentials');
var sessionStore = new MySQLStore(credentials.db);
var db = require('./app/config/db');

var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'app', 'views', 'layouts')
});

var app = express();


//IN CASE OF MYSQL SESSIONS
app.use(session
    ({
        key: 'key',
        secret: 'secret',
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie: {
            expires: false,
            maxAge: null
        }
    })
);

passport.use(new Strategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: 'https://rocky-scrubland-84805.herokuapp.com/login/facebook/return'
    },
    function (accessToken, refreshToken, profile, cb) {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

//IN CASE OF CREDENTIDALS AND DATABASE
db.connect(function (err) {
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1)
    }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'app', 'views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//ROUTES FILES
var index = require('./app/routes/index');
var users = require('./app/routes/users');
var categories = require('./app/routes/categories');
var category_users = require('./app/routes/category_users');
var user_likes = require('./app/routes/user_likes');
var matches = require('./app/routes/matches');
var sessions = require('./app/routes/sessions');
var user_seen = require('./app/routes/user_seen');

//ANGULAR ROUTES
//Always pointing to index because it will only render angular content
app.use('/', index);
app.use('/login', index);
app.use('/register', index);
app.use('/welcome', index);
app.use('/search', index);
app.use('/update', index);
app.use('/profile', index);
app.use('/matches', index);



app.use('/users', users);
app.use('/sessions', sessions);
app.use('/categories', categories);
app.use('/category_users', category_users);
app.use('/user_likes', user_likes);
app.use('/user_seen', user_seen);
app.use('/matches', matches);
app.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
});

app.get('/test',function(req,res){
    console.log('Im GOIN To INDEXX!!');
    res.render('index');
});

//API ROUES

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/test',
        failureRedirect: '/test'
    }));

app.use(passport.initialize());
app.use(passport.session());









// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

module.exports = app;

