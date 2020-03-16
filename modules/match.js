const gamesModel = require('./gamesModel')

const title_1 = 'coil'

function match (title_1) {
  gamesModel.find({ titleGame1: title_1 }, function (err, docs) {
    if (err) {
      console.log(err)
      console.log('Er is iets fout gegaan')
    } else {
      console.log('Found match')
      console.log('dit zijn de docs ' + docs)
    }
  })
}

module.exports = match
