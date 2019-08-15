const express = require('express')
const Routes = express.Router()
const Auth = require('../helpers/auth')
const scoreController = require('../controllers/score')

Routes
    .all('/*', Auth.authInfo)
    .get('/', scoreController.getAllScore)
    .get('/:iduser', scoreController.getByUser)
    .post('/', scoreController.addScore)
    .patch('/:iduser', scoreController.updateScore)

module.exports = Routes