const express = require('express')
const Routes = express.Router()
const Auth = require('../helpers/auth')
const patternController = require('../controllers/pattern')

Routes
    .all('/*', Auth.authInfo)
    .get('/', patternController.getPattern)
    .post('/', patternController.addPattern)
    .patch('/:idpattern', patternController.updatePattern)
    .delete('/:idpattern', patternController.deletePattern)

module.exports = Routes