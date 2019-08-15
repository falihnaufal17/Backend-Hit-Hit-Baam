const scoreModel = require('../models/score')
const miscHelper = require('../helpers/miscHelpers')

module.exports = {
    getAllScore: (req, res) => {
        scoreModel.getAllScore()
            .then((result) => {
                miscHelper.response(res, result)
            })
            .catch((error) => {
                console.log(error)
                miscHelper.response(res, '', '', error)
            })
    },

    getByUser: (req, res) => {
        iduser = req.params.iduser
        scoreModel.getByUser(iduser)
            .then((result) => {
                const resultdata = result[0]

                miscHelper.response(res, resultdata)
            })
            .then((error) => {
                console.log(error)
            })
    },

    addScore: (req, res) => {
        const data = {
            iduser: req.body.iduser,
            skor: req.body.skor,
            created_at: new Date(),
            updated_at: new Date()
        }

        scoreModel.addScore(data)
            .then(() => {
                miscHelper.response(res, data, 201)
            })
            .catch((error) => {
                console.log(error)
                miscHelper.response(res, error, 400, error)
            })
    },

    updateScore: (req, res) => {
        const iduser = req.params.iduser
        const data = {
            skor: req.body.skor,
            updated_at: new Date()
        }

        scoreModel.updateScore(iduser, data)
            .then(() => {
                miscHelper.response(res, data)
            })
            .catch((error) => {
                console.log(error)
                miscHelper.response(res, error, 400, error)
            })
    }


}