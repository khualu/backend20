// // RESTful API manner
// GET /events              // list the events
// GET /events/:eventId     // get a single event by ID
// POST /events             // add a new event
// PUT /events/:eventId     // update an existing event
// DELETE /events/:eventId  // remove an event

const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

// DATA BASE CONNECTION
const uri = process.env.DB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected...');
});

// SCHEMA MAKING FOR DB
const Schema = mongoose.Schema;

const favGamesSchema = new Schema({
    titleGame1: String,
    titleGame2: String,
    titleGame3: String,
    date: {
        type: String,
        default: Date.now()
    }
})

// MODEL
const favGames = mongoose.model('FavGames', favGamesSchema);

// IMPORT GAMES.JSON FILE
const games = require('./views/pages/game.json');

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

// EJS TEMPLATE SERVER
app.set('view engine', 'ejs');
app.use(express.static('src'));

// INDEX PAGE
app.get('/', function(req, res) {
    // res.render('pages/index.ejs', games);
    res.render('pages/index.ejs', games);
})
// ABOUT PAGE
app.get('/about', function(req, res) {
    res.render('pages/about.ejs');
})

// POST FAVORITE GAME
app.post('/', function(req, res) {
    // sanity check
    let testGame = req.body;

    // Describe what value correspons in which key
    let gameData = {
        titleGame1: req.body.titleGame1,
        titleGame2: req.body.titleGame2,
        titleGame3: req.body.titleGame3
    }
    // Define a new model
    const newFavGames = new favGames(gameData);

    // use .save function to send data to db
    newFavGames.save((err) => {
        if (err) {
            console.log('Could not save games')
            res.status(400).send('Games were not saved')
            return;
        } else {
            console.log('Games succesfully saved')
            res.send("Your games were succesfully uploaded to the database")
        }
    })
})

// CATCH REST REDIRECT TO HOME
app.get('*', function(req, res) {
    res.redirect('/');
})

// WHICH PORT
app.listen(port);
console.log(`Server is listening to ${port}`);


// // FUNCTION: SAVING GAMES 
// function saveGame(testGame, cb) {
//     fs.writeFile('./views/pages/game.json', JSON.stringify(testGame), cb);
// }

