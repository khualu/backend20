const gamesModel = require('./gamesModel')

function searchUser (req, res) {
  gamesModel.findOne({ userName: 'ANDY-MODULE-TEST' },
    function (err, gamesModel) {
      if (err) {
        console.log(err)
        console.log('An error has occured')
      } else {
        console.log('User found')
        console.log(gamesModel.userName, gamesModel.titleGame1, gamesModel.titleGame2, gamesModel.titleGame3)
      }
    })
}

module.exports = searchUser
