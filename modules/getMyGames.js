const games = require('./game.json')
require('./searchUser')

function getMyGames(req, res) {
    res.render('pages/mygames', {matchGame})
}

module.exports = getMyGames