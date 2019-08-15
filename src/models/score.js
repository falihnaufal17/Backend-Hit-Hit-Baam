const conn = require('../configs/db')

module.exports = {
    getAllScore: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT skor.idskor, user.iduser, user.fullname, skor.skor, skor.created_at, skor.updated_at FROM skor INNER JOIN user ON skor.iduser = user.iduser ORDER BY skor.skor DESC LIMIT 10 OFFSET 0', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getByUser: (iduser) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT skor.idskor, user.fullname, user.username, skor.skor, skor.created_at, skor.updated_at FROM skor INNER JOIN user ON skor.iduser = user.iduser WHERE skor.iduser = ?', iduser, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    addScore: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO skor SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    updateScore: (iduser, data) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE skor SET skor = ? WHERE iduser = ?', [data, iduser], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}