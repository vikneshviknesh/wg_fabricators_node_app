const db = require('../config/db.config');
const { createNewRole: createNewRoleQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class Role {
    constructor(role_name, role_description) {
        this.role_name = role_name;
        this.role_description = role_description;
    }

    static create(newUser, cb) {
        const role_access = newUser.role_name === 'Admin' ? ['READ','WRITE','DELETE'] : ['READ','WRITE'];
        db.query(createNewRoleQuery,
            [
                newUser.role_name,
                newUser.role_description,
                role_access
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    role_name: newUser.role_name,
                    role_description: newUser.role_description,
                    role_access: res.role_access
                });
            });
    }

}

module.exports = Role;