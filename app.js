require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const logger = require('morgan');
const passport = require('passport');
const expressSession = require('express-session');
const moment = require('moment');
const methodOverride = require('method-override');
const homeRouter = require('./routes/home');
const bookRouter = require('./routes/book');
const peopleRouter = require('./routes/people');
const adminRouter = require('./routes/admin');
const User = require('./models/admin');

const URI = process.env.HOSTED_DB || LOCAL_DB;

mongoose.connect(URI, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true 
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine','ejs');
app.use(flash());
app.set('views', path.join(__dirname,'views'));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.locals.moment = moment;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    next();
});

app.use(homeRouter);
app.use(bookRouter);
app.use(peopleRouter);
app.use(adminRouter);

app.all('*', (req, res, next) => {
	res.status(404).render('./404.ejs');
});

app.use((err, req, res, next) => {
	res.status(404).render('./404.ejs');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log("serving on port 3000");
});