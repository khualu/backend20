const gamesModel = require('./gamesModel')
// const alert = require('alert-node')

function postGames (req, res) {
  const gameData = {
    userName: req.body.userName,
    titleGame1: req.body.titleGame1,
    titleGame2: req.body.titleGame2,
    titleGame3: req.body.titleGame3
  }

  const newFavGames = new gamesModel(gameData)

  newFavGames.save((err) => {
    if (err) {
      console.log('Could not save games')
      res.status(400).send('Games were not saved')
    } else {
      console.log('Games saved succesfully!')
      res.redirect('pages/home.ejs')
      .send('Your games were saved')
    }
  })
}

module.exports = postGames
