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

// setting up bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// EJS TEMPLATE SERVER
app.set('view engine', 'ejs')
app.use(express.static('src'))

// INDEX PAGE
app.get('/', function (req, res) {
  res.render('pages/index.ejs', games)
})
// ABOUT PAGE
app.get('/about', function (req, res) {
  res.render('pages/about.ejs')
})

// MYGAMES PAGE
app.get('/mygames', function (req, res) {
  res.render('pages/mygames.ejs', games)
})

// POST FAVORITE GAME
app.post('/', postGames)

// CATCH REST REDIRECT TO HOME
app.get('*', function (req, res) {
  res.redirect('/')
})

// WHICH PORT
app.listen(port)
console.log(`Server is listening to ${port}`)

// // FUNCTION: SAVING GAMES
// function saveGame(testGame, cb) {
//     fs.writeFile('./views/pages/game.json', JSON.stringify(testGame), cb);
// }

// // RESTful API manner
// GET /events              // list the events
// GET /events/:eventId     // get a single event by ID
// POST /events             // add a new event
// PUT /events/:eventId     // update an existing event
// DELETE /events/:eventId  // remove an event

// const path = require('path')
// const ejs = require('ejs')
// const fs = require('fs')
