const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

// DATE TEST

// DATA BASE CONNECTION
const uri = process.env.DB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected...');
});


// SCHEMA MAKING FOR DB || TESTING 
const Schema = mongoose.Schema;

const favGamesSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
})

// MODEL || TESTING
const favGames = mongoose.model('FavGames', favGamesSchema);

// SAVING DATA TO DATABASE || TEST
const data = {
    title: 'Favorite game 1#',
    body: 'Overwatch'
}

// .save SAVING METHOD || TEST
const newFavGames = new favGames(data);

newFavGames.save((err) => {
    if (err) {
        console.log("Something went wrong saving the data...");
    } else {
        console.log("Data has been succesfully saved!");
    }
})


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
    // console.log((JSON.stringify(req.body)));
    let testGame = req.body;
    console.log(testGame);

    saveGame(testGame, function(err) {
        if(err) {
            res.status(404).send('Game not send');
            return;
        } 
        // console.log("Your games are saved");
        // res.render('pages/index.ejs', games)
        res.send("Your games are saved");
    })
})

// CATCH REST REDIRECT TO HOME
app.get('*', function(req, res) {
    res.redirect('/');
})

// WHICH PORT
app.listen(port);
console.log(`Server is listening to ${port}`);


// FUNCTION: SAVING GAMES 
function saveGame(testGame, cb) {
    fs.writeFile('./views/pages/game.json', JSON.stringify(testGame), cb);
}

