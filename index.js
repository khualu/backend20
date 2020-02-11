const camelCase = require('camelcase');
const path = require('path');
// console.log(camelCase('tortilla-de-patatas'));

const express = require('express');
const app = express();
const port = 3000;

app.use('/static', express.static('public'));

app.get('*', function(req, res){
    res.status(404).send('TEEEEEEEEEEEEEEEEST');
  });
// WHY USE THIS UNDERNEATH
// app.use('/static', express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`Server is now listening on port ${port}`));

