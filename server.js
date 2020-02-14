// const camelCase = require('camelcase');
const path = require('path');
const ejs = require('ejs');

const express = require('express');
const app = express();
const port = 3000;

// MIGHTY SERVER EXPRESS STATIC
// app.use('/', express.static(path.join(__dirname, 'public')))
//     .use('/audio', express.static(path.join(__dirname, '/audio')))
//     .get('*', (req, res) => res.status(404).send("This page does not exist."))
//     .listen(port, () => console.log(`Server is now listening on port ${port}`));

// EJS TEMPLATE SERVER
app.set('view engine', 'ejs');
app.use(express.static('src'));
// index page
app.get('/', function(req, res) {
    res.render('pages/index.ejs');
})

app.get('/about', function(req, res) {
    res.render('pages/about.ejs');
})

app.get('*', function(req, res) {
    res.redirect('/');
})

app.listen(port);
console.log(`Server is listening to ${port}`);

// http://localhost:3000/static/index.html
// http://localhost:3000/static/about.html
// http://localhost:3000/static/images/animu.jpg