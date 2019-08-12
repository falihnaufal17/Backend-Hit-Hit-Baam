const app = require('express')
const Routes = app.Router()
const multer = require('multer')
const path = require('path')
const userController = require('../controllers/user')
const auth = require('../helpers/auth')

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/images/')
    },

    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })
Routes
    .all('/*', auth.authInfo)
    .get('/', auth.accessToken, userController.getAllUsers)
    .post('/', upload.single('image'), userController.register)
    .post('/login', userController.login)
    .patch('/logout/:iduser', userController.logout)

module.exports = Routes