const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NULL,
    lastname VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_on TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, ?, NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

const createNewPermission = `
CREATE TABLE IF NOT EXISTS permission (
    id INT PRIMARY KEY AUTO_INCREMENT,
    perm_name VARCHAR(50) NULL,
    perm_description VARCHAR(50) NULL,
    NOW(),
    NOW()
)
`;

const createNewRole = `
CREATE TABLE IF NOT EXISTS role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NULL,
    role_description VARCHAR(50) NULL,
    role_access VARCHAR(100) NULL,
    NOW(),
    NOW()
)
`;

const getAllUsers = `
SELECT id, firstname, lastname, email, role, created_on FROM users ORDER BY id ASC
`;

const deleteUserById = `
DELETE FROM users WHERE id = ?
`;

const getUserById = `
SELECT id, firstname, lastname, email, role FROM users WHERE id = ?
`;

const updateUserById = `
UPDATE users SET firstname = ?, lastname = ?, email = ?, role = ? WHERE id = ?
`;

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail,
    createNewPermission,
    createNewRole,
    getAllUsers,
    deleteUserById,
    getUserById,
    updateUserById
};