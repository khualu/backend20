// // RESTful API manner
// GET /events              // list the events
// GET /events/:eventId     // get a single event by ID
// POST /events             // add a new event
// PUT /events/:eventId     // update an existing event
// DELETE /events/:eventId  // remove an event

// const path = require('path')
// const ejs = require('ejs')
// const fs = require('fs')

const format = require('date-format')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

// MODULAR FUNCTIONS
const dbconnect = require('./mongoCon')

// DATA BASE CONNECTION
dbconnect()

// SCHEMA MAKING FOR DB
const Schema = mongoose.Schema

const favGamesSchema = new Schema({
  userName: String,
  titleGame1: String,
  titleGame2: String,
  titleGame3: String,
  date: {
    type: String,
    read: format('dd/MM/yy hh.mm.ss', new Date()),
    default: Date.now()
  }
})

// MODEL
const favGames = mongoose.model('FavGames', favGamesSchema)

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// EJS TEMPLATE SERVER
app.set('view engine', 'ejs')
app.use(express.static('src'))

// INDEX PAGE
app.get('/', function (req, res) {
  // NEED TO GET THE PAGE TO RENDER DATA FROM DB
  // res.render('pages/index.ejs', games)
})
// ABOUT PAGE
app.get('/about', function (req, res) {
  res.render('pages/about.ejs')
})

// POST FAVORITE GAME
app.post('/', function (req, res) {
// sanity check
//   const testGame = req.body

  // Describe what value correspons in which key
  const gameData = {
    titleGame1: req.body.titleGame1,
    titleGame2: req.body.titleGame2,
    titleGame3: req.body.titleGame3
  }
  // Define a new model
  // eslint-disable-next-line new-cap
  const newFavGames = new favGames(gameData)

  // use .save function to send data to db
  newFavGames.save((err) => {
    if (err) {
      console.log('Could not save games')
      res.status(400).send('Games were not saved')
    } else {
      console.log('Games succesfully saved')
      res.send('Your games were succesfully uploaded to the database')
    }
  })
})

// CATCH REST REDIRECT TO HOME
app.get('*', function (req, res) {
  res.redirect('/')
})

// WHICH PORT
app.listen(port)
console.log(`Server is listening to ${port}`)
