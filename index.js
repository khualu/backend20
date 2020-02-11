// const camelCase = require('camelcase');
const path = require('path');

const express = require('express');
const app = express();
const port = 3000;

// app.use('/static', express.static('public'));

// app.get('*', function(req, res){
//     res.status(404).send('FOUTE LINK');
//   });
// WHY USE THIS UNDERNEATH
app.use('/static', express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`Server is now listening on port ${port}`));

// http://localhost:3000/static/index.html
// http://localhost:3000/static/about.html
// http://localhost:3000/static/images/animu.jpg