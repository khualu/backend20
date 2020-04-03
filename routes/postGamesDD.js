const gamesModel = require('../models/gamesModel')

function postGamesDD (req, res) {
  const gameData = {
    userName: req.body.userName,
    titleGame1: req.body.dd_game1
  }

  const NewDropDownGames = new gamesModel(gameData)

  NewDropDownGames.save((err) => {
    if (err) {
      console.log('Could not save games')
      res.status(400).send('Games were not saved')
    } else {
      console.log('Dropdown games saved succesfully')
      res.redirect('pages/mygames')
    }
  })
}

module.exports = postGamesDD
