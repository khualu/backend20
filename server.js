// SETUP & NODE MODULES
const bodyParser = require('body-parser')
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

// MODULES
const dbconnect = require('./modules/mongoCon')
const gamesModel = require('./modules/gamesModel')
const postGames = require('./modules/postGames')
const searchUser = require('./modules/searchUser')

// IMPORT GAMES.JSON FILE
const games = require('./views/pages/game.json')

// DATA BASE CONNECTION
dbconnect()

// TESTING QUERIES
searchUser()

// SERVER SETUP
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .set('view engine', 'ejs')
  .use(express.static('src'))
  .get('/', function (req, res) { res.render('pages/index.ejs', games) })
  .get('/about', function (req, res) { res.render('pages/about.ejs') })
  .get('/mygames', function (req, res) { res.render('pages/mygames.ejs', games) })
  .post('/', postGames)
  .get('*', function (req, res) { res.redirect('/') })
  .listen(port)

  console.log(`Server is listening to ${port}`)
