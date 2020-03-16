const games = require('./game.json')

function getHome (req, res) {
  res.render('pages/index.ejs', games)
}

// function getAbout(req, res) {
//     res.render('pages/about.ejs')
// }

// function getMyGames(req, res) {
//     {
//         res.render('pages/mygames.ejs', games)
//     }
// }

// // module.exports = {
// //     getAbout: getAbout,
// //     getHome: getHome,
// //     getMyGames: getMyGames
// // }

module.exports = getHome
