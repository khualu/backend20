const games = require('./game.json')

function getMyGames(req, res) {
    res.render('pages/mygames', games)
}

module.exports = getMyGames