const express = require('express')
const router = express.Router()
const fs = require('fs')

// OWN FILES
const gamesModel = require('../models/gamesModel')
const top100Games = require('../api/outputGames.json')

router
  .get('/', (req, res) => {
    res.render('pages/index')
  })

  .get('/mygames', (req, res) => {
    res.render('pages/mygames', { top100Games })
  })

  .get('/update', (req, res) => {
    res.render('pages/update', { top100Games })
  })

  .get('/profile', (req, res) => {
    res.render('pages/profile', { top100Games })
  })

  .post('/mygames', (req, res) => {
    const gameData = {
      userName: req.body.userName,
      titleGame1: req.body.dd_game1
    }

    const NewDropDownGames = new gamesModel(gameData)

    NewDropDownGames.save((err) => {
      if (err) {
        console.log('Games could not be saved')
        res.status(400).send(err)
      } else {
        console.log('Dropdown games were saved succesfully')
        res.redirect('mygames')
      }
    }
    )
    // fs.writeFile('../modules/user.json', gameData.userName, (err) => {
    //     if (err) throw err
    //     console.log('The file has been saved')
    // })
  })

  .post('/profile', (req, res) => {
    const name = req.body.userName

    gamesModel.findOne({ userName: name }, (err, foundObject) => {
      if (err) {
        console.log(err)
        res.status(500).send()
      } else {
        if (!foundObject) {
          res.status(404).send('404, User: ' + name + ' not found')
          console.log('Could not find user')
        } else {
          if (req.body.name) {
            foundObject.name = req.body.name
          }

          //   ZORGEN DAT GAME RENDER PLAATS VIND
          const game = foundObject.titleGame1
        //     https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
        //   const item = top100Games.find(item => item.name === game)
        //   res.render(game)
        }
      }
    })
  })

  .post('/update', (req, res) => {
    const name = req.body.userName
    //   console.log(name)
    // SOURCE https://www.youtube.com/watch?v=5_pvYIbyZlU
    gamesModel.findOne({ userName: name }, (err, foundObject) => {
      if (err) {
        console.log(err)
        res.status(500).send()
      } else {
        if (!foundObject) {
          res.status(404).send('404, User: ' + name + ' not found')
          console.log('Could not find user')
        } else {
          // If user wrote a username
          if (req.body.name) {
            foundObject.name = req.body.name
          }
          // if user gave a new game to update
          if (req.body.dd_game1) {
            foundObject.titleGame1 = req.body.dd_game1
          }
          // THEN
          foundObject.save((err, updatedObject) => {
            if (err) {
              console.log(err)
            } else {
              console.log('Your favorite game was updated')
              updatedObject.save()
            }
          })
        }
      }
    })
  })

module.exports = router
