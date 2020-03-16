const gamesModel = require('./gamesModel')

function searchMatch (req, res) {
    gamesModel.find({ userName: 'Khualu' })
}

module.exports = searchMatch