const express = require('express')
const router = express.Router()
const fs = require('fs')

// OWN FILES
const gamesModel = require('../models/gamesModel')
const top100Games = require('../api/outputGames.json')
const onlineUser = require('../modules/user.json')

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
    res.render('pages/profile', { onlineUser, top100Games })
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
  })

  .post('/profile', (req, res) => {
    const name = req.body.userName
    console.log(name)

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
          const userData = foundObject
          console.log(userData)
          res.render('pages/profile', { userData, top100Games })
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

          foundObject.save((err, updatedObject) => {
            if (err) {
              console.log(err)
              res.status(500).send()
            } else {
              res.render('pages/index')
            }
          })
        }
      }
    })
  })

module.exports = router
