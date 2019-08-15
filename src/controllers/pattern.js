const patternModel = require('../models/pattern')
const miscHelper = require('../helpers/miscHelpers')

module.exports = {
    getPattern: (req, res) => {
        patternModel.getPattern()
            .then((result) => {
                miscHelper.response(res, result)
            })
            .catch((error) => {
                miscHelper.response(res, error, 400, error)
            })
    },

    addPattern: (req, res) => {
        const data = {
            pattern: req.body.pattern,
            status: 0,
            created_at: new Date(),
            updated_at: new Date()
        }
        patternModel.addPattern(data)
            .then(() => {
                miscHelper.response(res, data, 201)
            })
            .catch((error) => {
                miscHelper.response(res, null, 400, error)
            })
    },

    updatePattern: (req, res) => {
        const idpattern = req.params.idpattern
        const data = {
            pattern: req.body.pattern,
            status: 0,
            updated_at: new Date()
        }
        patternModel.updatePattern(idpattern, data)
            .then(() => {
                miscHelper.response(res, data)
            })
            .catch((error) => {
                console.log(error)
                miscHelper.response(res, null, 400, error)
            })
    },

    deletePattern: (req, res) => {
        const idpattern = req.params.idpattern
        patternModel.deletePattern(idpattern)
            .then((result) => {
                const resultDelete = result[0]
                miscHelper.response(res, result)
            })
            .catch((error) => {
                miscHelper.response(res, null, 400, error)
            })
    }
}