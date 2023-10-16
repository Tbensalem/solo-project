const express = require('express');
const dbController = require('./dbCommands');
const router = express.Router();

router.get('/getLeaderboard', dbController.getLeaderboard, (req, res) => {
    // console.log('welcome back', res.locals.leaderboard)
    return res.status(200).json(res.locals.leaderboard)
})

router.post('/getHighScore', dbController.getHighScore, (req, res) => {
    // console.log('score', res.locals.highScore)
    return res.status(200).json(`Players high score is: ${res.locals.highScore}`)
})

router.post('/checkLeaderboard', dbController.checkLeaderboard, (req, res) => {
    // console.log('does it exist?', res.locals.exists)
    return res.status(200).json(`Do you exist? ${res.locals.exists}`)
})

router.post('/addToLeaderboard', dbController.addToLeaderboard, (req, res) => {
    // console.log('Player was added!')
    return res.status(200).json(('Player was added!'))
})

router.post('/updateLeaderboard', dbController.updateLeaderboard, (req, res) => {
    // console.log('Player was updated')
    return res.status(200).json('Player was updated!')
})

router.post('/deleteFromLeaderboard', dbController.deleteFromLeaderboard, (req, res) => {
    return res.status(200).json('Player has been deleted from the leaderboard!')
})

module.exports = router;