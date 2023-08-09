const db = require('../config/db.config');
const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery, getAllUsers: getAllUsersQuery, deleteUserById: deleteUserByIdQuery,
    getUserById: getUserByIdQuery, updateUserById: updateUserByIdQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class User {
    constructor(firstname, lastname, email, password, role) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery,
            [
                newUser.firstname,
                newUser.lastname,
                newUser.email,
                newUser.password,
                newUser.role
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email,
                    role: newUser.role
                });
            });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static getAllUsers(cb) {
        db.query(getAllUsersQuery, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static deleteUserById(id, cb) {
        db.query(deleteUserByIdQuery, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.affectedRows === 1) {
                cb(null, id);
                return;
            }
            cb({ message: "not_found", statusCode: 404 }, null);
        })
    }

    static getUserById(id, cb) {
        db.query(getUserByIdQuery, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length === 1) {
                cb(null, res[0]);
                return;
            }
            cb({ message: "not_found", statusCode: 404 }, null);
        })
    }

    static updateUserById(user, cb) {
        const {id, firstname, lastname, email, role} = user;
        db.query(updateUserByIdQuery, [firstname, lastname, email, role, id], (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            console.log('res=> ', res);
            if (res.affectedRows) {
                cb(null, id);
                return;
            }
            cb({ message: "not_found", statusCode: 404 }, null);
        })
    }
}

module.exports = User;