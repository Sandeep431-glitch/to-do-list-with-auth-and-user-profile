const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const customFlash = require('./config/flash');

const app = express();
const PORT = process.env.PORT || 3000;

//------------ Passport Configuration ------------//
require('./config/passport')(passport);

//------------ DB Configuration ------------//
const db = require('./config/key').MongoURI;

console.log({db});

//------------ Mongo Connection ------------//
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

//------------ EJS Configuration ------------//
app.use(express.static("./views"));
// sing middleware to use url encoder
app.use(express.urlencoded());
app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');

//------------ Bodyparser Configuration ------------//
app.use(express.urlencoded({ extended: false }))

//------------ Express session Configuration ------------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

//------------ Connecting flash ------------//
app.use(flash());
//------------ Global variables ------------//
app.use(customFlash.setFlash);
//------------ Routes ------------//
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log(`Server Started At Port ${PORT}`);
    }
});