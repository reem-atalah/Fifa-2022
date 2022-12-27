const express = require('express');
const path = require('path');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const cors = require('cors');

 
const fileUpload = require('express-fileupload');

const session = require('express-session');
const flush = require('connect-flash');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'ejs');

app.use(fileUpload()); //to upload files/pictures

app.get('/', (req, res) => {
    
    return res.redirect('home');
});
app.use(cors({
    origin: '*'
}));

//flash messages middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


// app.use('/home', require('./routes/home'));
app.use('/login', require('./BackEnd/routes/login'));
app.use('/register', require('./BackEnd/routes/register'));
app.use('/matches', require('./BackEnd/routes/matches'));
app.use('/home', require('./BackEnd/routes/home'));
app.use('/users', require('./BackEnd/routes/users'));

global.global_username = "";
global.global_type = "None";

app.listen(port,(error)=>{ 
    if(error) return console.log(error);
    console.log(`server started listening at ${port}`);
    
});
