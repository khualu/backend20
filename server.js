// SETUP & NODE MODULES
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
// const session = require('express-session')
const app = express()
const port = 3000

// MODULES
const dbconnect = require('./modules/mongoCon')
const postGames = require('./modules/postGames')
const searchUser = require('./modules/searchUser')
const getHome = require('./modules/getHome')
const getMyGames = require('./modules/getMyGames')
const postGamesDD = require('./modules/postGamesDD')
const getMatches = require('./modules/getMatches')
const getAbout = require('./modules/getAbout')
const gamesModel = require('./modules/gamesModel')
const match = require('./modules/match')

// DATA BASE CONNECTION
dbconnect()

// SERVER SETUP
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  // .use(session({
  //   secret: process.env.SESS_SECRET,
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: { secure: true }
  // }))
  .set('view engine', 'ejs')
  .use(express.static('src'))
  .get('/', getHome)
  .get('/about', getAbout)
  .get('/mygames', getMyGames)
  .get('/matches', getMatches)
  .post('/', postGames)
  .post('/mygames', postGamesDD)
  .post('/matches', searchUser)
  .get('*', function (req, res) { res.redirect('/') })
  .listen(port)

console.log(`Server is listening to ${port}`)
