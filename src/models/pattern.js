const conn = require('../configs/db')

module.exports = {
    getPattern: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM pattern', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    addPattern: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO pattern SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    updatePattern: (idpattern, data) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE pattern SET ? WHERE idpattern = ?', [data, idpattern], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    deletePattern: (idpattern) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM pattern WHERE idpattern = ?', idpattern, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}