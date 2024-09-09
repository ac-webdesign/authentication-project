require('dotenv').config();

const express = require('express')
const session = require('express-session');
const PORT = process.env.PORT;
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const mongoURI = process.env.MONGO
const authRoutes = require('./routes/auth')
const noteRoutes = require('./routes/notes')

mongoose.connect(mongoURI)

    .then((result) => {
        console.log('Connected to mongoDB')
        app.listen(PORT, ()=> console.log(`Connected to port ${PORT}`))
        
    }).catch((err) => console.log(err))

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(express.static('public'))

 // Session Middleware
app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true if using HTTPS
}));

//ejs view engine
app.set('view engine', 'ejs')

app.use(authRoutes)
app.use(noteRoutes)



//routes

app.get('/', (req, res) => {
    res.render('index', { title : 'Splash Screen' })
})

app.get('/login', (req, res) => {
    res.render('login', {title : 'Login'})
})

app.get('/signup', (req, res) => {
    res.render('signup', {title : 'Sign up'})
})

app.use((req, res) => {
    res.render('404', {title : 'Page not found'})
})
