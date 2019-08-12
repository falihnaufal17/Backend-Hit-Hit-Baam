const conn = require('../configs/db')

module.exports = {
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT user.iduser, user.fullname, user.image, user.username, user.password, user.salt, user.token, role.role, user.created_at, user.updated_at FROM user INNER JOIN role ON user.idrole = role.idrole', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    detailUser: (iduser) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT user.iduser, user.fullname, user.image, user.username, user.password, user.salt, user.token, role.role, user.created_at, user.updated_at FROM user INNER JOIN role ON user.idrole = role.idrole WHERE iduser = ?', iduser, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    register: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO user SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

    login: (username) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT user.iduser, user.fullname, user.image, user.username, user.password, user.salt, user.token, role.role, user.created_at, user.updated_at FROM user INNER JOIN role ON user.idrole = role.idrole WHERE username = ?', username, (err, result) => {
                if (!err) {
                    console.log(result)
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    updateToken: (username, token) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE user SET token = ? WHERE username = ?', [token, username], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    logout: (iduser) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE user SET token = '' WHERE iduser = ?`, iduser, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
}