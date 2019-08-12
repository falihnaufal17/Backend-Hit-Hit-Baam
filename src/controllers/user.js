const userModel = require('../models/user')
const miscHelpers = require('../helpers/miscHelpers')
const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken')

module.exports = {
    getAllUsers: (req, res) => {
        userModel.getAllUsers()
            .then((resultData) => {
                const result = resultData
                resultData.map((item) => {
                    delete item.salt
                    delete item.password
                })
                miscHelpers.response(res, result)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    userDetail: (req, res) => {
        const iduser = req.params.iduser

        userModel.detailUser(iduser)
            .then((resultUser) => {
                const result = resultUser[0]
                delete result.salt
                delete result.password
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    register: async (req, res) => {
        const salt = miscHelpers.generateSalt(18)
        const passwordHash = miscHelpers.setPassword(req.body.password, salt)

        let path = req.file.path
        let geturl = async (req) => {
            cloudinary.config({
                cloud_name: 'dnqtceffv',
                api_key: '796497613444653',
                api_secret: 'We2TAGrwko6E8C4t3Uemrm9kbeA'
            })

            let data
            await cloudinary.uploader.upload(path, (result) => {
                const fs = require('fs')
                fs.unlinkSync(path)
                data = result.url
            })

            return data
        }
        let filename = 'images/' + req.file.filename
        console.log("FILE IMAGE: ", filename)

        const data = {
            fullname: req.body.fullname,
            image: await geturl(),
            username: req.body.username,
            password: passwordHash.passwordHash,
            salt: passwordHash.salt,
            token: '',
            idrole: req.body.idrole,
            created_at: new Date(),
            updated_at: new Date()
        }

        userModel.register(data)
            .then(() => {
                miscHelpers.response(res, data, 201)
            })
            .catch((error) => {
                miscHelpers.response(res, 'Username sudah terdaftar!', 403)
            })
    },

    login: (req, res) => {
        const username = req.body.username
        const password = req.body.password

        userModel.login(username)
            .then((result) => {
                const dataUser = result[0]
                const usePassword = miscHelpers.setPassword(password, dataUser.salt).passwordHash

                if (usePassword === dataUser.password) {
                    dataUser.token = jwt.sign({
                        iduser: dataUser.iduser,
                        fullname: dataUser.fullname,
                        image: dataUser.image,
                        username: dataUser.username,
                        role: dataUser.role
                    }, process.env.SECRET_KEY, { expiresIn: '1H' })
                    const token = dataUser.token
                    delete dataUser.salt
                    delete dataUser.password

                    userModel.updateToken(username, token)
                        .then((resultToken) => {
                            return miscHelpers.response(res, dataUser, 200)
                        })
                        .catch((error) => {
                            console.log(error)
                        })

                    return miscHelpers.response(res, dataUser, 200)
                } else {
                    return miscHelpers.response(res, null, 403, 'Wrong Password!')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },
    logout: (req, res) => {
        const iduser = req.params.iduser

        userModel.logout(iduser)
            .then(() => {
                miscHelpers.response(res, 'anda sudah logout', 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}