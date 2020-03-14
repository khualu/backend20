// SETUP & NODE MODULES
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

// MODULES
const dbconnect = require('./modules/mongoCon')
const postGames = require('./modules/postGames')
const searchUser = require('./modules/searchUser')
const getHome = require('./modules/getHome')
const getMyGames = require('./modules/getMyGames')
const postGamesDD = require('./modules/postGamesDD')

// IMPORT GAMES.JSON FILE
const games = require('./modules/game.json')

// DATA BASE CONNECTION
dbconnect()

// TESTING QUERIES
searchUser()

// SERVER SETUP
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
  .set('view engine', 'ejs')
  .use(express.static('src'))
  .get('/', getHome)
  .get('/about', function (req, res) { res.render('pages/about.ejs') })
  .get('/mygames', getMyGames)
  .post('/', postGames)
  .post('/mygames', postGamesDD)
  .get('*', function (req, res) { res.redirect('/') })
  .listen(port)

console.log(`Server is listening to ${port}`)
