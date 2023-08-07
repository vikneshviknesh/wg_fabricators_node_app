const db = require('../config/db.config');
const { createNewPermission: createNewPermissionQuery } = require('../database/queries');
const { logger } = require('../utils/logger');

class Permission {
    constructor(perm_name, perm_description) {
        this.perm_name = perm_name;
        this.perm_description = perm_description;
    }

    static create(newUser, cb) {
        db.query(createNewPermissionQuery,
            [
                newUser.perm_name,
                newUser.perm_description
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    perm_name: newUser.perm_name,
                    perm_description: newUser.perm_description
                });
            });
    }

}

module.exports = Permission;